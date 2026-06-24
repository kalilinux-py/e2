import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Percent, 
  Hourglass, 
  Bookmark, 
  Clock, 
  ArrowUpRight, 
  BookOpen, 
  ChevronsRight,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { getCurrentUser, getAttempts } from '../lib/storage';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const attempts = getAttempts();

  const enrolledCourse = user.enrolledCourses?.[0] || 'CCC';
  const courseAttempts = attempts.filter(att => att.course === enrolledCourse);

  // Pick top 4 recent attempts for Dashboard list
  const recentAttempts = courseAttempts.slice(0, 4);

  // Dynamic statistics
  const totalTests = courseAttempts.length;
  const totalPercentage = courseAttempts.reduce((sum, att) => sum + att.percentage, 0);
  const avgAccuracy = totalTests > 0 ? Math.round(totalPercentage / totalTests) : 0;
  
  const totalSeconds = courseAttempts.reduce((sum, att) => sum + att.durationSecondsUsed, 0);
  const practiceTimeStr = totalSeconds < 3600 
    ? `${Math.round(totalSeconds / 60)}m` 
    : `${(totalSeconds / 3600).toFixed(1)}h`;

  const getReadinessGrade = (pct: number) => {
    if (pct >= 90) return 'A+';
    if (pct >= 75) return 'A';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct > 0) return 'D';
    return 'N/A';
  };
  const readinessGrade = totalTests > 0 ? getReadinessGrade(avgAccuracy) : 'N/A';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full" id="dashboard-bento-viewport">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(160px,auto)] gap-6">
        
        {/* Card 1 (Welcome Banner) */}
        <Card className="col-span-full lg:col-span-3 lg:row-span-1 bg-card text-card-foreground border shadow-sm rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden" id="dashboard-bento-welcome">
          <div className="space-y-1 z-10 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-primary text-primary-foreground font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                Student Hub
              </span>
              <span className="text-[10px] text-muted-foreground">• Active Practice Profile</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
              Welcome back, {(user.name || 'Aditya').split(' ')[0]}
            </h2>
            <p className="text-xs text-muted-foreground">
              Complete your current syllabus targets below.
            </p>
          </div>
          <div className="w-full md:w-auto flex gap-2 z-10">
            <Link to="/tests" className="w-full md:w-auto">
              <Button size="sm" className="w-full md:w-auto gap-1.5 text-xs font-semibold">
                <BookOpen className="h-4 w-4" />
                <span>Explore Courses & Tests</span>
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </Card>

        {/* Card 2 (Main Stat - Average Accuracy) */}
        <Card className="col-span-full sm:col-span-1 lg:col-span-1 lg:row-span-2 flex flex-col justify-center items-center text-center p-6 bg-card text-card-foreground border shadow-sm rounded-xl relative overflow-hidden" id="dashboard-bento-accuracy">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="p-2.5 bg-secondary text-secondary-foreground rounded-full border border-border mb-2.5">
            <Percent className="h-5 w-5 text-primary" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">Average Accuracy</span>
          <h3 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground font-mono my-2 select-none">
            {avgAccuracy}%
          </h3>
          <div className="text-xs text-muted-foreground">
            <span>Minimum Pass: 50%</span>
            <div className="font-semibold text-foreground mt-0.5">Grade {readinessGrade}</div>
          </div>
        </Card>

        {/* Card 3 (Small Stat - Completed Exams) */}
        <Card className="col-span-1 lg:col-span-1 lg:row-span-1 bg-card text-card-foreground border shadow-sm rounded-xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden" id="dashboard-bento-completed">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">Completed Exams</span>
              <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono leading-none">
                {totalTests}
              </span>
            </div>
            <div className="p-2 bg-secondary text-secondary-foreground rounded-lg border border-border">
              <Trophy className="h-4 w-4" />
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-1">
            <span className="font-semibold text-foreground">Active syllabus</span>
            <span className="text-[10px] font-mono">100% Validated</span>
          </div>
        </Card>

        {/* Card 4 (Small Stat - Practice Time) */}
        <Card className="col-span-1 lg:col-span-1 lg:row-span-1 bg-card text-card-foreground border shadow-sm rounded-xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden" id="dashboard-bento-time">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">Practice Time</span>
              <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono leading-none">
                {practiceTimeStr}
              </span>
            </div>
            <div className="p-2 bg-secondary text-secondary-foreground rounded-lg border border-border">
              <Hourglass className="h-4 w-4" />
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-1">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Updated Live
            </span>
            <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Course Hours</span>
          </div>
        </Card>

        {/* Card 5 (Exam Readiness) */}
        <Card className="col-span-full sm:col-span-1 lg:col-span-1 lg:row-span-1 bg-card text-card-foreground border shadow-sm rounded-xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden ring-1 ring-primary/40" id="dashboard-bento-readiness">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">Exam Readiness</span>
              <span className="text-4xl font-black text-primary font-heading tracking-tighter leading-none">
                {readinessGrade}
              </span>
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
              <Bookmark className="h-4 w-4" />
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-1">
            <span>Syllabus Aligned</span>
            <Badge variant="outline" className="text-[9px] h-4 px-1.5 p-0 font-bold bg-primary/5 border-primary/20 text-primary">NIELIT A+ PRO</Badge>
          </div>
        </Card>

        {/* Card 6 (Streak/Focus Area) */}
        <Card className="col-span-full lg:col-span-1 lg:row-span-2 bg-card text-card-foreground border shadow-sm rounded-xl p-5 flex flex-col justify-between overflow-hidden" id="dashboard-bento-focus">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">Current Focus</span>
              <Target className="h-4 w-4 text-primary shrink-0" />
            </div>

            <div className="space-y-4">
              <div>
                <Badge variant="outline" className="text-[10px] font-sans font-extrabold uppercase bg-primary/10 text-primary border-primary/20 mb-1.5">
                  {enrolledCourse} Target Syllabus
                </Badge>
                <p className="text-xs font-bold leading-tight text-foreground">
                  {enrolledCourse === 'CCC' 
                    ? 'Course on Computer Concepts' 
                    : 'IT Tools Certification'}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Practicing active modules to maximize examination scores and pass-readiness.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground font-mono block">Recommended Modules</span>
                <div className="space-y-1.5">
                  {(enrolledCourse === 'CCC' ? [
                    'LibreOffice Writer & Calc',
                    'GUI Operating Systems',
                    'E-Governance Services',
                    'Cyber Security Basics'
                  ] : [
                    'IT Tools & Network Basics',
                    'Web Design & Publishing',
                    'Python Programming Core',
                    'Internet of Things (IoT)'
                  ]).map((mod, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground bg-muted/40 p-2 rounded-lg border border-border/30">
                      <span className="font-mono text-[9px] text-primary font-black bg-primary/10 h-4 w-4 rounded flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate font-semibold text-[11px]">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/40 text-[10px] text-muted-foreground font-mono flex items-center justify-between">
            <span>Syllabus Compliance</span>
            <span className="text-primary font-bold">100% Core</span>
          </div>
        </Card>

        {/* Card 7 (Recent Exam Attempts Ledger) */}
        <Card className="col-span-full lg:col-span-3 lg:row-span-2 bg-card text-card-foreground border shadow-sm rounded-xl flex flex-col justify-between overflow-hidden" id="dashboard-bento-ledger">
          <div className="flex flex-col flex-1">
            <div className="p-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold font-heading text-foreground tracking-tight">Recent Exam Attempts & Results Ledger</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Your official practice logs and certification readiness assessments.</p>
              </div>
              <Link to="/attempts" className="shrink-0">
                <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 h-8 border-border hover:bg-muted/40">
                  <span>View Practice History</span>
                  <ChevronsRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex-1 w-full px-6 overflow-y-auto">
              {recentAttempts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground min-h-[160px]">
                  <Clock className="h-8 w-8 text-muted/60 mb-2 animate-pulse" />
                  <p className="text-xs font-bold text-foreground">No recent evaluation records found</p>
                  <p className="text-[11px] text-muted-foreground mt-1 max-w-xs mx-auto">Complete your first active training assessment to populate your ledger.</p>
                  <Link to="/tests" className="mt-4">
                    <Button size="sm" className="text-xs font-semibold">Browse Syllabus Catalog</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col">
                  {recentAttempts.map((att) => (
                    <div 
                      key={att.id} 
                      onClick={() => navigate(`/results?attemptId=${att.id}`)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors px-2 -mx-2 rounded-lg"
                    >
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-muted-foreground tracking-tight text-[11px]">
                            {formatDate(att.date)}
                          </span>
                          <Badge variant="secondary" className="text-[9px] font-mono py-0.5 px-1 rounded font-bold border border-border">
                            {att.course}
                          </Badge>
                        </div>
                        <span className="font-semibold text-foreground text-xs truncate">
                          {att.testTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0 justify-between sm:justify-start">
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="font-mono font-black text-foreground text-xs">
                            {att.score} / {att.totalQuestions}
                          </span>
                          <span className="text-[10px] text-muted-foreground">({att.percentage}%)</span>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-[11px] text-foreground font-semibold">
                            {formatTime(att.durationSecondsUsed)}
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase font-semibold">Time Used</span>
                        </div>

                        <Badge 
                          className={`text-[9px] tracking-wide font-bold uppercase py-0.5 px-2 rounded-full border shrink-0 ${
                            att.passed 
                              ? 'bg-primary/10 text-primary border-primary/20' 
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }`}
                        >
                          {att.passed ? 'PASSED' : 'RETRY'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-muted/20 border-t border-border mt-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground px-6 gap-2 shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-primary" /> 
              <span>Active learning sync active. Selected syllabus results are updated in real-time.</span>
            </span>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-primary">NIELIT PLATFORM</span>
          </div>
        </Card>

      </div>
    </div>
  );
}
