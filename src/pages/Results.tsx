import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Hourglass, 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  BarChart2,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookmarkCheck,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { getAttempts, getTestsList, getCurrentUser } from '../lib/storage';
import { TestAttempt, CourseType } from '../types';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters to see if we are focusing on a single specific test result
  const params = new URLSearchParams(location.search);
  const attemptId = params.get('attemptId');

  const attempts = getAttempts();
  const allTests = getTestsList();
  const user = getCurrentUser();
  const primaryEnrolledCourse = user.enrolledCourses?.[0] || 'CCC';

  // Set course filter dynamically based on user's primary enrolled course
  const courseFilter = primaryEnrolledCourse;

  // Find attempt of interest if attemptId is present
  let selectedAttempt: TestAttempt | undefined = undefined;
  if (attemptId) {
    selectedAttempt = attempts.find(a => a.id === attemptId);
  }

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeSpent = (seconds: number) => {
    if (seconds === 0) return '0 min';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m ${secs}s`;
  };

  const getFeedbackMessage = (pct: number) => {
    if (pct >= 90) return { title: 'Elite Mastery (Grade S)!', desc: 'Outstanding job. You are fully prepared to rank in the highest tier of the official certification exam.' };
    if (pct >= 75) return { title: 'Excellent readiness (Grade A)!', desc: 'Strong performance. Refine specific LibreOffice formulas or Linux command arguments and you are clear for success.' };
    if (pct >= 60) return { title: 'Comfortable Pass (Grade B/C)!', desc: 'Satisfactory work. You meet the credential threshold comfortably. Focus on weak components to increase your margin.' };
    if (pct >= 50) return { title: 'Pass Standard met (Grade D)!', desc: 'You surpassed the minimum 50% benchmark. We recommend completing more sessions to ensure stability.' };
    return { title: 'Requires Curriculum Review (Grade F)', desc: 'Score remains below the passing barrier. We advise analyzing core operating systems, networking models, or Python formats and trying again.' };
  };

  const getReadinessGrade = (accuracy: number) => {
    if (accuracy >= 85) return { grade: 'A+', label: 'Elite Readiness', color: 'text-emerald-500' };
    if (accuracy >= 75) return { grade: 'A', label: 'Strong Readiness', color: 'text-primary' };
    if (accuracy >= 65) return { grade: 'B+', label: 'Good Progress', color: 'text-amber-500' };
    if (accuracy >= 50) return { grade: 'C', label: 'Pass Candidate', color: 'text-amber-600' };
    if (accuracy > 0) return { grade: 'D', label: 'Weak Margin', color: 'text-destructive' };
    return { grade: 'N/A', label: 'No attempts logged', color: 'text-muted-foreground' };
  };

  // -------------------------------------------------------------
  // RENDER DETAILED REPORT STATE
  // -------------------------------------------------------------
  if (attemptId && selectedAttempt) {
    const feedback = getFeedbackMessage(selectedAttempt.percentage);
    
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full" id="results-detailed-view">
        {/* Navigation header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/results')}
            className="w-full sm:w-auto text-xs gap-1.5 hover:bg-muted py-1.5 px-3 rounded-lg font-semibold"
          >
            <ArrowLeft className="h-4 w-4 text-primary" />
            <span>Back to Performance Dashboard</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/test-window/${selectedAttempt?.testId}`)}
            className="w-full sm:w-auto text-xs gap-1.5 h-8 font-semibold rounded-lg shrink-0 border-primary/25 text-primary bg-primary/5 hover:bg-primary/10"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retake Graded Assessment</span>
          </Button>
        </div>

        {/* Main Results Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Metric 1: Massive Responsive Score Card */}
          <Card className="bg-card border border-border mt-0.5 shadow-sm rounded-2xl flex flex-col justify-between overflow-hidden relative lg:min-h-[280px]" id="performance-metric-card">
            <div className="p-6 flex flex-col justify-center flex-1 py-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono text-center lg:text-left mb-4 block">
                Performance Metric
              </span>
              
              <div className="flex flex-row lg:flex-col items-center justify-around lg:justify-center gap-4 sm:gap-6 lg:gap-4 w-full py-2">
                {/* Massive Percentage */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-foreground leading-none select-none font-mono">
                  {selectedAttempt.percentage}%
                </h1>

                {/* Badges & Extra details */}
                <div className="flex flex-col items-center lg:items-center gap-1.5">
                  <Badge 
                    className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                      selectedAttempt.passed ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
                    }`}
                  >
                    {selectedAttempt.passed ? 'PASSED' : 'RETRY NEEDED'}
                  </Badge>
                  <span className="text-[11px] sm:text-xs text-muted-foreground font-mono font-semibold tracking-tight text-center">
                    {selectedAttempt.score} / {selectedAttempt.totalQuestions} Correct
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted/45 border-t border-border/50 text-center text-[10px] uppercase font-bold tracking-wider text-muted-foreground font-mono">
              <span>Pass Threshold: 50%</span>
            </div>
          </Card>

          {/* Metric 2: Feedback & Meta Details Card (Col Span 2) */}
          <Card className="lg:col-span-2 bg-card border border-border shadow-sm rounded-2xl flex flex-col justify-between overflow-hidden min-h-[280px]">
            <CardHeader className="p-6 pb-4 border-b border-border/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[10px] bg-secondary text-secondary-foreground font-mono font-bold px-2 py-0.5 rounded border border-border w-fit">
                  {selectedAttempt.course} Syllabus Graded Overview
                </span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[11px] font-semibold">{formatDate(selectedAttempt.date)}</span>
                </div>
              </div>
              <CardTitle className="text-base md:text-lg font-bold font-heading text-foreground mt-3 leading-tight">
                {selectedAttempt.testTitle}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Curriculum training session completed and officially processed.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-xl border border-border/60">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-foreground">{feedback.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{feedback.desc}</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-3 bg-muted/20 border-t border-border/50 grid grid-cols-2 gap-4 text-xs divide-x divide-border">
              <div className="flex items-center gap-2 pl-2">
                <Hourglass className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase font-bold leading-none">Registered Timer</p>
                  <p className="font-mono font-bold text-foreground mt-1 text-[11px]">{formatTime(selectedAttempt.durationSecondsUsed)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <Layers className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground uppercase font-bold leading-none">Assessment Items</p>
                  <p className="font-mono font-bold text-foreground mt-1 text-[11px]">{selectedAttempt.totalQuestions} Questions</p>
                </div>
              </div>
            </CardFooter>
          </Card>

        </div>

        {/* Dynamic Question Review snapshot list */}
        <div className="mt-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono">Response Snapshots Analysis</h3>
          <div className="space-y-3">
            {selectedAttempt.questionSnapshots?.map((q, idx) => {
              const answeredIndex = q.selectedAnswerIndex;
              const isCorrectAnswer = answeredIndex === q.correctAnswerIndex;
              
              return (
                <div 
                  key={q.id || idx} 
                  className={`p-4 rounded-xl border bg-card text-left transition-all ${
                    answeredIndex === undefined 
                      ? 'border-border/60 bg-card/60 opacity-85'
                      : isCorrectAnswer 
                        ? 'border-primary/20 bg-primary/2' 
                        : 'border-destructive/10 bg-destructive/2'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-muted rounded border border-border">
                        Item {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      {answeredIndex === undefined ? (
                        <span className="text-[10px] bg-secondary text-secondary-foreground font-semibold px-2 py-0.5 rounded font-mono">
                          SKIPPED / UNRESOLVED
                        </span>
                      ) : isCorrectAnswer ? (
                        <span className="text-[10px] text-primary flex items-center gap-1 font-bold font-mono">
                          <CheckCircle2 className="h-3.5 w-3.5 fill-primary/10" /> CORRECT
                        </span>
                      ) : (
                        <span className="text-[10px] text-destructive flex items-center gap-1 font-bold font-mono">
                          <XCircle className="h-3.5 w-3.5 fill-destructive/10" /> INCORRECT
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-foreground mb-4 leading-relaxed">
                    {q.text}
                  </p>

                  {/* Options Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrectOption = oIdx === q.correctAnswerIndex;
                      const isSelectedOption = oIdx === answeredIndex;

                      let optBorderColor = 'border-border/60 bg-muted/10';
                      let labelPill = 'bg-muted text-muted-foreground';

                      if (isCorrectOption) {
                        optBorderColor = 'border-primary bg-primary/5 text-primary font-medium';
                        labelPill = 'bg-primary text-primary-foreground';
                      } else if (isSelectedOption && !isCorrectAnswer) {
                        optBorderColor = 'border-destructive bg-destructive/5 text-destructive font-medium';
                        labelPill = 'bg-destructive text-destructive-foreground';
                      }

                      return (
                        <div 
                          key={oIdx} 
                          className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs leading-tight transition-colors ${optBorderColor}`}
                        >
                          <span className={`h-5 w-5 font-mono font-bold text-[10px] rounded flex items-center justify-center shrink-0 ${labelPill}`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="truncate">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER ALL TEST RESULTS SUMMARY DASHBOARD (DEFAULT VIEW)
  // -------------------------------------------------------------
  const filteredAttempts = attempts.filter(att => att.course === courseFilter);

  const totalAttemptsCount = filteredAttempts.length;
  const passedAttemptsCount = filteredAttempts.filter(a => a.passed).length;
  const passedPercentage = totalAttemptsCount > 0 ? Math.round((passedAttemptsCount / totalAttemptsCount) * 100) : 0;
  
  const avgAccuracy = totalAttemptsCount > 0 
    ? Math.round(filteredAttempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttemptsCount) 
    : 0;

  const totalTimeUsed = filteredAttempts.reduce((sum, a) => sum + a.durationSecondsUsed, 0);
  const readiness = getReadinessGrade(avgAccuracy);

  const filteredTests = allTests.filter(test => test.course === courseFilter);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full" id="results-overview-dashboard">
      
      {/* 2. Page Title Block */}
      <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-0.5 text-left">
          <h2 className="text-xl font-bold tracking-tight font-heading text-foreground">Syllabus Performance Analytics</h2>
          <p className="text-xs text-muted-foreground">
            Dynamic grades breakdown from all practice runs and security evaluation sessions.
          </p>
        </div>
      </div>

      {attempts.length === 0 ? (
        /* Empty State with instructions */
        <Card className="bg-card border border-border p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto rounded-3xl shadow-sm min-h-[350px]">
          <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center border border-primary/10 mb-4 animate-bounce">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-base font-bold text-foreground">No Practice Records Detected</h4>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-xs leading-relaxed">
            You haven't finished any graded curriculum sessions yet. Once you complete a test, your scores and comprehensive analytics will display here.
          </p>
          <div className="grid grid-cols-1 gap-2.5 mt-6 w-full">
            <Link to="/tests">
              <Button size="sm" className="w-full text-xs font-semibold rounded-lg h-9">
                Launch First Syllabus Test
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <>
          {/* Aggregated Bento Grid (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Average Accuracy */}
            <Card className="bg-card border border-border shadow-sm p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground font-mono block text-left">
                  Average Syllabus Accuracy
                </span>
                <div className="flex items-baseline gap-1 mt-2.5">
                  <h3 className="text-3xl font-bold font-mono text-foreground">{avgAccuracy}%</h3>
                  <span className="text-xs text-muted-foreground">overall</span>
                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${avgAccuracy}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 text-left font-semibold">
                  Across {totalAttemptsCount} graded attempts
                </p>
              </div>
            </Card>

            {/* Card 2: Readiness Grade */}
            <Card className="bg-card border border-border shadow-sm p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground font-mono block text-left">
                  Readiness Rating Grade
                </span>
                <div className="flex items-center gap-3 mt-1 text-left">
                  <h3 className={`text-4xl font-extrabold font-mono ${readiness.color}`}>{readiness.grade}</h3>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">{readiness.label}</p>
                    <p className="text-[10px] text-muted-foreground">Curriculum metric</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/60 p-1.5 rounded-lg border border-border/40 text-left font-mono">
                <Sparkles className="h-3 w-3 text-primary shrink-0" />
                <span>Computed via certified NIELIT criteria</span>
              </div>
            </Card>

            {/* Card 3: Graded Pass Rate */}
            <Card className="bg-card border border-border shadow-sm p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground font-mono block text-left">
                  Graded Exams Success
                </span>
                <div className="flex items-baseline gap-1 mt-2.5">
                  <h3 className="text-3xl font-bold font-mono text-foreground">{passedPercentage}%</h3>
                  <span className="text-xs text-muted-foreground">pass rate</span>
                </div>
              </div>
              <div className="mt-4 text-left">
                <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 border border-primary/25 text-primary font-bold px-2 py-0.5 rounded-full font-mono">
                  {passedAttemptsCount} / {totalAttemptsCount} Passed
                </span>
              </div>
            </Card>

            {/* Card 4: Committed Time */}
            <Card className="bg-card border border-border shadow-sm p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground font-mono block text-left">
                  Committed Practice Time
                </span>
                <div className="flex items-baseline gap-1 mt-2.5">
                  <h3 className="text-3xl font-bold font-mono text-foreground">
                    {formatTimeSpent(totalTimeUsed)}
                  </h3>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-muted-foreground text-left">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Total test interaction logs captured</span>
              </div>
            </Card>
          </div>

          {/* Core Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
            
            {/* LEFT COLUMN: syllabus Tests performance breakdown Matrix */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono text-left">
                  Syllabus Exam Performance Matrix
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {filteredTests.length} Modules listed
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {filteredTests.map(test => {
                  const testAttempts = attempts.filter(a => a.testId === test.id);
                  const attemptsCount = testAttempts.length;
                  const highestPercentage = attemptsCount > 0 
                    ? Math.max(...testAttempts.map(a => a.percentage)) 
                    : null;
                  
                  // Latest run point
                  const sorted = [...testAttempts].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                  const latestRun = sorted[0];

                  const passedTest = highestPercentage !== null && highestPercentage >= test.passingAccuracy;

                  return (
                    <Card 
                      key={test.id} 
                      className="bg-card border border-border/80 p-4 rounded-xl flex flex-col justify-between hover:border-border transition-colors hover:shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge variant="outline" className="text-[9px] uppercase font-bold bg-primary/10 text-primary border-transparent">
                              {test.course}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground font-mono">{test.subject}</span>
                          </div>
                          <h4 className="text-xs font-bold text-foreground leading-snug">
                            {test.title}
                          </h4>
                        </div>

                        {/* Performance Tag */}
                        <div className="shrink-0 self-start sm:self-auto text-right">
                          {highestPercentage !== null ? (
                            <div className="flex flex-col items-start sm:items-end gap-1">
                              <Badge 
                                className={`text-[9px] font-extrabold uppercase rounded-full ${
                                  passedTest ? 'bg-primary/15 text-primary border-transparent' : 'bg-destructive/10 text-destructive border-transparent'
                                }`}
                              >
                                {passedTest ? 'PASSED SYLLABUS' : 'RETRY SUGGESTED'}
                              </Badge>
                              <span className="text-xs font-mono font-bold text-foreground">
                                High Score: {highestPercentage}%
                              </span>
                            </div>
                          ) : (
                            <Badge variant="outline" className="text-[9px] font-bold bg-muted/65 text-muted-foreground border-border/40">
                              NOT ATTEMPTED YET
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Score completion bar if attempted */}
                      {highestPercentage !== null && (
                        <div className="mt-4 pt-3 border-t border-border/40 w-full">
                          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                            <span>Syllabus Target Accrued</span>
                            <span>{highestPercentage}% achieved / {test.passingAccuracy}% passing</span>
                          </div>
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${passedTest ? 'bg-primary' : 'bg-amber-500'}`} 
                              style={{ width: `${highestPercentage}%` }} 
                            />
                          </div>
                        </div>
                      )}

                      {/* Quick action triggers */}
                      <div className="mt-4 pt-3 border-t border-border/30 flex flex-wrap items-center justify-between gap-2.5">
                        <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                          {attemptsCount} graded run{attemptsCount !== 1 ? 's' : ''} logged
                        </span>

                        <div className="flex items-center gap-1.5">
                          {latestRun && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/results?attemptId=${latestRun.id}`)}
                              className="text-[11px] font-semibold h-7 px-2.5 rounded-lg text-primary hover:bg-primary/5"
                            >
                              <span>View Latest Run</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => navigate(`/test-window/${test.id}`)}
                            className="bg-primary hover:bg-primary/95 text-primary-foreground text-[11px] font-bold h-7 px-3 rounded-lg flex items-center gap-1"
                          >
                            <Zap className="h-3 w-3" />
                            <span>{latestRun ? 'Retake Exam' : 'Begin Exam'}</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Chronological Log Logs */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground font-mono text-left">
                Graded Run Log Timeline
              </h3>

              <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 bg-muted/20 border-b border-border/50 text-left">
                  <h4 className="text-xs font-bold text-foreground">Chronological Transcripts</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Click any entry to inspect response sheet snapshots</p>
                </div>

                <div className="divide-y divide-border/40 max-h-[500px] overflow-y-auto">
                  {filteredAttempts.map((attempt) => (
                    <div 
                      key={attempt.id}
                      onClick={() => navigate(`/results?attemptId=${attempt.id}`)}
                      className="p-3.5 hover:bg-muted/30 transition-colors cursor-pointer text-left flex items-start gap-3 group"
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 transition-colors ${
                        attempt.passed 
                          ? 'bg-primary/5 border-primary/20 text-primary group-hover:bg-primary/10' 
                          : 'bg-destructive/5 border-destructive/15 text-destructive group-hover:bg-destructive/10'
                      }`}>
                        {attempt.passed ? <CheckCircle className="h-4.5 w-4.5" /> : <XCircle className="h-4.5 w-4.5" />}
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[9px] text-muted-foreground">
                            {formatShortDate(attempt.date)}
                          </span>
                          <span className="text-xs font-mono font-bold text-foreground shrink-0">
                            {attempt.percentage}%
                          </span>
                        </div>
                        <h5 className="text-[11px] font-bold text-foreground truncate group-hover:text-primary transition-colors leading-tight">
                          {attempt.testTitle}
                        </h5>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider font-mono">
                          {attempt.course} Syllabus • {attempt.score}/{attempt.totalQuestions} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-muted/20 border-t border-border/40 text-[10px] text-muted-foreground font-mono flex items-center justify-between px-4">
                  <span>Authorized Profile Records</span>
                  <span className="font-semibold text-primary">NIELIT VERIFIED</span>
                </div>
              </Card>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
