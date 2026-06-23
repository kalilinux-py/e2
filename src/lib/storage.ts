import { TestMeta, TestAttempt, User, Question, CourseType } from '../types';
import { currentUser, mockTests, mockAttempts } from '../data/mockData';

const USER_KEY = 'evalo_current_user';
const ATTEMPTS_KEY = 'evalo_attempts';
const REGISTERED_USERS_KEY = 'evalo_registered_users';
const SESSION_ACTIVE_KEY = 'evalo_session_active';

export function initializeStorage(): void {
  if (!localStorage.getItem(REGISTERED_USERS_KEY)) {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([
      { ...currentUser, phone: '9876543210' }
    ]));
  }
  if (!localStorage.getItem(USER_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify({ ...currentUser, phone: '9876543210' }));
  }
  if (!localStorage.getItem(SESSION_ACTIVE_KEY)) {
    // Keep it active by default for pre-existing sandbox previews if they already loaded,
    // but allow explicit routing guarding. Let's start with true first so default flow isn't broken
    localStorage.setItem(SESSION_ACTIVE_KEY, 'true');
  }
  if (!localStorage.getItem(ATTEMPTS_KEY)) {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(mockAttempts));
  }
}

export function isSessionActive(): boolean {
  initializeStorage();
  return localStorage.getItem(SESSION_ACTIVE_KEY) === 'true';
}

export function getRegisteredUsers(): User[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [{ ...currentUser, phone: '9876543210' }];
  } catch {
    return [{ ...currentUser, phone: '9876543210' }];
  }
}

export function registerUser(name: string, phone: string, course: CourseType): { user: User; studentId: string } {
  const list = getRegisteredUsers();
  
  // System automatically generates a unique Student ID
  // e.g., EV- followed by 5 random digits
  let uniqueId = '';
  while (true) {
    const num = Math.floor(10000 + Math.random() * 90000);
    const candidateId = `EV-${num}`;
    if (!list.some(u => u.rollNo.toUpperCase() === candidateId || u.id === candidateId)) {
      uniqueId = candidateId;
      break;
    }
  }

  const newUser: User = {
    id: uniqueId,
    name: name,
    email: `${name.toLowerCase().replace(/\s+/g, '')}@evalo.edu`,
    rollNo: uniqueId,
    phone: phone,
    enrolledCourses: [course],
    joinedDate: new Date().toISOString().split('T')[0],
    activeStreak: 1,
    stats: {
      totalTests: 0,
      avgAccuracy: 0,
      practiceHours: 0,
      readinessGrade: 'N/A'
    }
  };

  const updatedList = [...list, newUser];
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedList));
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  localStorage.setItem(SESSION_ACTIVE_KEY, 'true');
  return { user: newUser, studentId: uniqueId };
}

export function loginUser(phone: string, studentId: string): boolean {
  const list = getRegisteredUsers();
  const cleanPhone = phone.trim();
  const cleanId = studentId.trim().toUpperCase();

  const matched = list.find(u => {
    const uPhone = u.phone || '';
    return uPhone.trim() === cleanPhone && (u.rollNo.toUpperCase() === cleanId || u.id.toUpperCase() === cleanId);
  });

  if (matched) {
    localStorage.setItem(USER_KEY, JSON.stringify(matched));
    localStorage.setItem(SESSION_ACTIVE_KEY, 'true');
    return true;
  }
  return false;
}

export function logoutUser(): void {
  localStorage.setItem(SESSION_ACTIVE_KEY, 'false');
}

export function getCurrentUser(): User {
  initializeStorage();
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return currentUser;
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      name: parsed?.name || currentUser.name,
      rollNo: parsed?.rollNo || currentUser.rollNo,
      enrolledCourses: parsed?.enrolledCourses || currentUser.enrolledCourses,
      stats: {
        totalTests: parsed?.stats?.totalTests ?? 0,
        avgAccuracy: parsed?.stats?.avgAccuracy ?? 0,
        practiceHours: parsed?.stats?.practiceHours ?? 0,
        readinessGrade: parsed?.stats?.readinessGrade ?? 'N/A'
      }
    };
  } catch {
    return currentUser;
  }
}

export function updateCurrentUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Keep the list updated too
  try {
    const list = getRegisteredUsers();
    const idx = list.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      list[idx] = user;
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(list));
    }
  } catch {}
}

export function getAttempts(): TestAttempt[] {
  initializeStorage();
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : mockAttempts;
  } catch {
    return mockAttempts;
  }
}

export function getAttemptById(id: string): TestAttempt | undefined {
  const list = getAttempts();
  return list.find(a => a.id === id);
}

export function addAttempt(attempt: TestAttempt): void {
  const currentAttempts = getAttempts();
  const updatedAttempts = [attempt, ...currentAttempts];
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updatedAttempts));

  // Recalculate user statistics of ADC based on current attempts
  const user = getCurrentUser();
  const matchedAttempts = updatedAttempts.filter(a => a.course);
  
  if (matchedAttempts.length > 0) {
    const totalScore = matchedAttempts.reduce((acc, curr) => acc + curr.score, 0);
    const totalQuestions = matchedAttempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    const accuracy = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 74.5;
    const totalTimeHours = matchedAttempts.reduce((acc, curr) => acc + curr.durationSecondsUsed, 0) / 3600;
    
    // Determine Readiness Grade
    let grade = 'B';
    if (accuracy >= 85) grade = 'A+';
    else if (accuracy >= 75) grade = 'A';
    else if (accuracy >= 65) grade = 'B+';
    else if (accuracy >= 50) grade = 'C';
    else grade = 'D';

    user.stats = {
      totalTests: updatedAttempts.length,
      avgAccuracy: Math.round(accuracy * 10) / 10,
      practiceHours: Math.round((32.5 + totalTimeHours) * 10) / 10,
      readinessGrade: grade
    };
    updateCurrentUser(user);
  }
}

export function getTestsList(): TestMeta[] {
  return mockTests;
}

export function getTestById(id: string): TestMeta | undefined {
  return mockTests.find(t => t.id === id);
}
