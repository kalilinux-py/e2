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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Header section with welcome banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-5 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary text-primary-foreground font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider">
              Student Hub
            </span>
            <span className="text-[10px] text-muted-foreground">• Active Practice Profile</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
            Welcome back, {(user.name || 'Student').split(' ')[0]}
          </h2>
          <p className="text-xs text-muted-foreground">
            Complete your current syllabus targets below.
          </p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <Link to="/tests" className="w-full md:w-auto">
            <Button size="sm" className="w-full md:w-auto gap-1.5 text-xs font-semibold">
              <BookOpen className="h-4 w-4" />
              <span>Explore Courses & Tests</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Bento grid layout - dense & beautiful */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Bento Cell 1: Total Assessments Completed */}
        <Card className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden h-[155px]">
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
          <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/60 flex items-center justify-between">
            <span className="font-semibold text-foreground">Active syllabus</span>
            <span className="text-[10px] font-mono">100% Validated</span>
          </div>
        </Card>

        {/* Bento Cell 2: Average Accuracy */}
        <Card className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden h-[155px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">Average Accuracy</span>
              <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono leading-none">
                {avgAccuracy}%
              </span>
            </div>
            <div className="p-2 bg-secondary text-secondary-foreground rounded-lg border border-border">
              <Percent className="h-4 w-4" />
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/60 flex items-center justify-between">
            <span>Minimum Pass: 50%</span>
            <span className="font-medium text-foreground">Grade {readinessGrade}</span>
          </div>
        </Card>

        {/* Bento Cell 3: Practice Time Hours */}
        <Card className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden h-[155px]">
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
          <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/60 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Updated Live
            </span>
            <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Course Hours</span>
          </div>
        </Card>

        {/* Bento Cell 4: Exam Readiness Grade */}
        <Card className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between group hover:border-primary/45 transition-all duration-150 relative overflow-hidden h-[155px] ring-1 ring-primary/40">
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
          <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/60 flex items-center justify-between">
            <span>Syllabus Aligned</span>
            <Badge variant="outline" className="text-[9px] h-4 px-1.5 p-0 font-bold bg-primary/5 border-primary/20 text-primary">NIELIT A+ PRO</Badge>
          </div>
        </Card>

      </div>

      {/* Advanced Full Width Recent Performance Logs & Results Ledger */}
      <Card className="w-full bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <CardHeader className="p-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold font-heading text-foreground tracking-tight">Recent Exam Attempts & Results Ledger</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">Your official curriculum practice logs and certification readiness assessments.</CardDescription>
          </div>
          <Link to="/attempts" className="shrink-0">
            <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 h-8 border-border hover:bg-muted/40">
              <span>View Practice History</span>
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        
        <div className="flex-1 w-full overflow-x-auto">
          {recentAttempts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-muted-foreground min-h-[220px]">
              <Clock className="h-10 w-10 text-muted/60 mb-2 animate-pulse" />
              <p className="text-xs font-bold text-foreground">No recent evaluation records found</p>
              <p className="text-[11px] text-muted-foreground mt-1 max-w-xs mx-auto">Complete your first active training assessment in the syllabus catalog to populate your ledger metrics.</p>
              <Link to="/tests" className="mt-4">
                <Button size="sm" className="text-xs font-semibold">Browse Syllabus Catalog</Button>
              </Link>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="bg-muted/30 border-b border-border/50 text-[10px] uppercase font-bold text-muted-foreground">
                  <th className="p-4 pl-6 whitespace-nowrap">Date & Time</th>
                  <th className="p-4">Course / Syllabus Title</th>
                  <th className="p-4 text-center whitespace-nowrap">Score Ratio</th>
                  <th className="p-4 text-center whitespace-nowrap">Time Used</th>
                  <th className="p-4 text-right pr-6 whitespace-nowrap">Certification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {recentAttempts.map((att) => (
                  <tr 
                    key={att.id} 
                    onClick={() => navigate(`/results?attemptId=${att.id}`)}
                    className="hover:bg-muted/40 cursor-pointer transition-colors group"
                  >
                    <td className="p-4 pl-6 font-mono text-muted-foreground tracking-tight text-[11px] whitespace-nowrap">
                      {formatDate(att.date)}
                    </td>
                    <td className="p-4 font-semibold text-foreground">
                      <div className="flex flex-col gap-0.5">
                        <span className="truncate max-w-xs sm:max-w-md group-hover:text-primary transition-colors">{att.testTitle}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge variant="secondary" className="text-[9px] font-mono leading-none py-0.5 px-1 rounded font-bold border border-border">
                            {att.course}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-normal">Syllabus Track</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-mono font-black text-foreground text-xs text-center whitespace-nowrap">{att.score} / {att.totalQuestions} ({att.percentage}%)</span>
                        <div className="h-1 text-primary-muted w-16 bg-muted rounded-full overflow-hidden border border-border/10 hidden sm:block">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${att.passed ? 'bg-primary' : 'bg-destructive'}`}
                            style={{ width: `${att.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center font-mono text-foreground font-semibold text-[11px] whitespace-nowrap">
                      {formatTime(att.durationSecondsUsed)}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <Badge 
                        className={`text-[9px] tracking-wide font-bold uppercase py-0.5 px-2 rounded-full border ${
                          att.passed 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-destructive/10 text-destructive border-destructive/20'
                        }`}
                      >
                        {att.passed ? 'PASSED' : 'RETRY'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 bg-muted/20 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground px-6 gap-2 shrink-0">
          <span className="flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-primary" /> 
            <span>Active learning sync active. Selected syllabus results are updated in real-time.</span>
          </span>
          <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-primary">NIELIT PLATFORM REGISTERED</span>
        </div>
      </Card>

    </div>
  );
}
