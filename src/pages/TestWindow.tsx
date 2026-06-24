import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Timer, 
  ChevronLeft, 
  ChevronRight, 
  CheckSquare, 
  HelpCircle,
  AlertTriangle,
  Award,
  BookOpen,
  X,
  FileText,
  Menu
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { getTestById, addAttempt } from '../lib/storage';
import { mockQuestions } from '../data/mockData';
import { Question, TestAttempt, QuestionState } from '../types';

export default function TestWindow() {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const test = getTestById(testId || '');
  
  if (!test) {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive animate-pulse mb-3" />
        <h2 className="text-lg font-bold text-foreground">Examination Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">The requested curriculum modules cannot be loaded or have been modified. Please view the active catalogs.</p>
        <Link to="/tests" className="mt-4"><Button size="sm" className="text-xs font-semibold">Back to Catalog</Button></Link>
      </div>
    );
  }

  // Load questions for this test and clone them so we do not mutate mock database
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Initialize questions once testId loads
  useEffect(() => {
    const rawQuestions = mockQuestions[test.id] || [];
    const cloned = rawQuestions.map(q => ({
      ...q,
      state: 'unvisited' as QuestionState,
      selectedAnswerIndex: undefined as number | undefined
    }));
    // Set first question state as visited immediately
    if (cloned.length > 0) {
      cloned[0].state = 'visited';
    }
    setQuestions(cloned);
  }, [test.id]);

  // Clock Countdown Timer Handler
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Navigating to question index
  const handleNavToIdx = (index: number) => {
    if (index < 0 || index >= questions.length) return;

    setQuestions(prev => {
      const updated = [...prev];
      // Mark current index question as visited if it is not already answered
      if (updated[index].state === 'unvisited') {
        updated[index].state = 'visited';
      }
      return updated;
    });
    
    setCurrentIndex(index);
  };

  // Handle option select action
  const handleSelectOption = (optIdx: number) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[currentIndex].selectedAnswerIndex = optIdx;
      updated[currentIndex].state = 'answered';
      return updated;
    });
  };

  const currentQ = questions[currentIndex];

  const answeredCount = questions.filter(q => q.state === 'answered').length;
  const unvisitedCount = questions.filter(q => q.state === 'unvisited').length;
  const visitedUnansweredCount = questions.length - answeredCount - unvisitedCount;

  // Auto-submit on timer end
  const handleAutoSubmit = () => {
    submitEvaluation();
  };

  // Generate evaluation model and save to DB
  const submitEvaluation = () => {
    const finalScore = questions.reduce((acc, curr) => {
      if (curr.selectedAnswerIndex === curr.correctAnswerIndex) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const totalQ = questions.length;
    const percentage = Math.round((finalScore / totalQ) * 100);
    const passed = percentage >= test.passingAccuracy;
    const usedSeconds = (test.durationMinutes * 60) - timeLeft;

    const newAttempt: TestAttempt = {
      id: 'att_' + Date.now() + Math.random().toString(36).substring(4, 8),
      testId: test.id,
      testTitle: test.title,
      course: test.course,
      date: new Date().toISOString(),
      score: finalScore,
      totalQuestions: totalQ,
      percentage,
      passed,
      durationSecondsUsed: usedSeconds > 0 ? usedSeconds : 10,
      questionSnapshots: questions
    };

    addAttempt(newAttempt);
    navigate(`/results?attemptId=${newAttempt.id}`);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground select-none">
      
      {/* 1. TOP BAR PANEL: Fixed course summaries & countdown */}
      <header className="h-16 bg-card border-b border-border px-4 md:px-6 flex items-center justify-between z-45 shrink-0" id="test-window-header">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
            id="mobile-palette-toggle"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Badge className="text-[9px] uppercase font-bold px-2 py-0.5 bg-primary/10 text-primary border-primary/20 shrink-0">
            {test.course} Course
          </Badge>
          <Separator orientation="vertical" className="h-4 hidden xs:block" />
          <h2 className="text-xs md:text-sm font-bold text-foreground font-heading truncate max-w-[120px] xs:max-w-[200px] sm:max-w-md">
            {test.title}
          </h2>
        </div>

        {/* Dynamic Timer with Warning States */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-secondary border border-border shrink-0">
            <Timer className={`h-3.5 w-3.5 ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-primary'}`} />
            <span className={`text-xs md:text-sm font-mono font-bold ${timeLeft < 60 ? 'text-destructive font-bold animate-pulse' : 'text-foreground'}`}>
              {formatTimer(timeLeft)}
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN BODY WRAPPER */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Backdrop for mobile palette */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200" 
            onClick={() => setShowSidebar(false)} 
          />
        )}

        {/* RESPONSIVE LEFT PANEL: Question Navigator Palette */}
        <aside className={`fixed inset-y-0 left-0 w-64 h-full bg-card border-r border-border flex flex-col justify-between shrink-0 overflow-y-auto z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:z-30 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 md:p-5 flex flex-col gap-3 md:gap-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider font-mono">
              <span>Question Palette</span>
              <div className="flex items-center gap-1.5">
                <span className="text-primary font-semibold">{answeredCount} / {questions.length} Solved</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSidebar(false)}
                  className="md:hidden h-5 w-5 text-muted-foreground hover:text-foreground p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Squares Grid Map */}
            <div className="grid grid-cols-5 xs:grid-cols-8 sm:grid-cols-10 md:grid-cols-5 gap-1.5 md:gap-2 mt-1 md:mt-2">
              {questions.map((q, idx) => {
                let btnStyle = 'border border-border text-muted-foreground bg-background hover:bg-muted/50 hover:border-muted-foreground/30';
                
                if (q.state === 'answered') {
                  btnStyle = 'bg-primary border-primary text-primary-foreground font-bold shadow-sm hover:opacity-95';
                } else if (q.state === 'visited') {
                  btnStyle = 'border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-500/15';
                }

                if (idx === currentIndex) {
                  btnStyle += ' ring-2 ring-foreground ring-offset-2 scale-102';
                }

                return (
                  <Button
                    key={q.id}
                    variant="ghost"
                    onClick={() => {
                      handleNavToIdx(idx);
                      setShowSidebar(false);
                    }}
                    className={`h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 p-0 rounded-none text-xs font-mono font-bold transition-all tracking-tight ${btnStyle}`}
                  >
                    {idx + 1}
                  </Button>
                );
              })}
            </div>

            <Separator className="my-2" />

            {/* Legend Explaining States */}
            <div className="flex flex-col gap-2.5 text-[10px] text-muted-foreground font-semibold font-mono">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-none bg-primary" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-none bg-amber-500/5 border border-amber-500/40" />
                <span>Visited unanswered ({visitedUnansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-none bg-background border border-border" />
                <span>Unvisited ({unvisitedCount})</span>
              </div>
            </div>

          </div>

          <div className="p-4 bg-muted/20 border-t border-border mt-auto">
            <span className="text-[9px] text-muted-foreground font-mono uppercase font-semibold">
              SECURE ASSESSMENT INTEGRITY ACTIVE
            </span>
          </div>
        </aside>

        {/* CENTRAL PANEL: Active Question */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-muted/10 flex items-center justify-center">
          {currentQ ? (
            <Card className="w-full max-w-2xl bg-card border border-border shadow-sm rounded-2xl p-5 md:p-6 flex flex-col justify-between">
              
              <CardHeader className="p-0 pb-5">
                <div className="flex justify-between items-center text-xs">
                  <Badge variant="outline" className="text-[10px] font-mono leading-none select-none bg-muted text-muted-foreground border-border/60">
                    Syllabus Question {(currentIndex + 1).toString().padStart(2, '0')} of {questions.length}
                  </Badge>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider font-mono">Multiple Choice Select</span>
                </div>
                <h3 className="text-sm md:text-base font-bold font-heading text-foreground mt-4 leading-relaxed">
                  {currentQ.text}
                </h3>
              </CardHeader>

              <CardContent className="p-0 py-2 flex flex-col gap-2.5">
                {currentQ.options.map((option, optIdx) => {
                  const isChecked = currentQ.selectedAnswerIndex === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3.5 px-4 border rounded-xl text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isChecked 
                          ? 'border-primary bg-primary/5 font-bold text-foreground' 
                          : 'border-border bg-card hover:bg-muted/45 font-medium text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-primary border-primary text-primary-foreground' : 'border-border'
                        }`}>
                          {isChecked && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                        </div>
                        <span className="text-foreground text-xs leading-none mt-0.5">{option}</span>
                      </div>
                      
                      <span className="text-[10px] text-muted-foreground font-bold font-mono uppercase tracking-wider">{['A', 'B', 'C', 'D'][optIdx]}</span>
                    </div>
                  );
                })}
              </CardContent>

              <CardFooter className="p-0 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground mt-4">
                <span className="flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Choose correct option to save state</span>
                </span>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider">Official Curriculum Standards</span>
              </CardFooter>

            </Card>
          ) : (
            <div className="text-center text-xs text-muted-foreground">Loading Evaluation Database...</div>
          )}
        </main>

      </div>

      {/* 3. BOTTOM PANEL: Navigation & Submit actions */}
      <footer className="h-20 bg-card border-t border-border px-4 md:px-6 flex items-center justify-between gap-2 z-40 shrink-0">
        
        {/* Previous Button link */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex <= 0}
          onClick={() => handleNavToIdx(currentIndex - 1)}
          className="text-xs h-9 px-3 md:px-4 rounded-lg font-semibold shrink-0"
        >
          <ChevronLeft className="h-4 w-4 mr-1 text-foreground" />
          <span className="hidden sm:inline">Previous Question</span>
          <span className="sm:hidden">Prev</span>
        </Button>

        {/* Central Submit CTA */}
        <Button
          onClick={() => setShowSubmitConfirm(true)}
          className="text-xs font-bold uppercase tracking-wider h-10 px-4 sm:px-8 rounded-lg bg-primary text-primary-foreground shadow-sm shrink-0"
        >
          <CheckSquare className="h-4 w-4 mr-1.5 sm:mr-2 inline" />
          <span className="hidden sm:inline">Save & Complete Exam</span>
          <span className="sm:hidden">Complete</span>
        </Button>

        {/* Next Button link */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex >= questions.length - 1}
          onClick={() => handleNavToIdx(currentIndex + 1)}
          className="text-xs h-9 px-3 md:px-4 rounded-lg font-semibold shrink-0"
        >
          <span className="hidden sm:inline">Next Question</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="h-4 w-4 ml-1 text-foreground" />
        </Button>

      </footer>

      {/* 4. SUBMIT CONFIRMATION SCREEN OVERLAY CARD */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-background/80 z-60 flex items-center justify-center p-4 backdrop-blur-xs">
          <Card className="w-full max-w-sm bg-card border border-border shadow-lg rounded-2xl overflow-hidden p-6 text-center animate-in scale-in duration-100">
            <HelpCircle className="h-10 w-10 text-primary mx-auto mb-3 animate-bounce" />
            <h3 className="text-sm font-bold text-foreground">Confirm Submission</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              You answered <span className="font-bold text-foreground">{answeredCount} out of {questions.length} questions</span>. Are you sure you want to finalize and evaluate your responses?
            </p>

            {questions.length > answeredCount && (
              <div className="mt-3 p-2.5 rounded-xl border border-destructive bg-destructive/10 text-destructive text-[11px] font-semibold text-center leading-tight">
                Warning: {questions.length - answeredCount} question(s) remain unanswered!
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSubmitConfirm(false)}
                className="text-xs py-2 h-9 rounded-lg border-border"
              >
                Continue Exam
              </Button>
              <Button 
                size="sm" 
                onClick={submitEvaluation}
                className="text-xs py-2 h-9 rounded-lg bg-primary text-primary-foreground font-bold"
              >
                Submit & Grade
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
