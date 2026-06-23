export type CourseType = 'CCC' | 'O Level';

export type QuestionState = 'unvisited' | 'visited' | 'answered';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  rollNo: string;
  phone?: string;
  enrolledCourses: CourseType[];
  joinedDate: string;
  activeStreak: number;
  stats: {
    totalTests: number;
    avgAccuracy: number;
    practiceHours: number;
    readinessGrade: string;
  };
}

export interface TestMeta {
  id: string;
  title: string;
  course: CourseType;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  passingAccuracy: number; // e.g. 50 (NIELIT CCC passing is 50%)
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex?: number;
  state: QuestionState;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  course: CourseType;
  date: string;
  score: number; // count of correct answers
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  durationSecondsUsed: number;
  questionSnapshots: Question[];
}
