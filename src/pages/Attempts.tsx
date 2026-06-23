import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Eye, 
  Calendar, 
  Bookmark,
  ChevronRight,
  Database,
  BarChart2,
  ShieldCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { getAttempts, getCurrentUser } from '../lib/storage';

export default function Attempts() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const enrolledCourse = user.enrolledCourses?.[0] || 'CCC';
  const attempts = getAttempts().filter(att => att.course === enrolledCourse);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPassFailStyle = (passed: boolean) => {
    return passed 
      ? 'bg-primary/10 text-primary border border-primary/20 font-bold' 
      : 'bg-destructive/10 text-destructive border border-destructive/20 font-bold';
  };

  const handleReviewAttempt = (attemptId: string) => {
    navigate(`/results?attemptId=${attemptId}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Page Title Block */}
      <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight font-heading text-foreground">Syllabus Practice History</h2>
          <p className="text-xs text-muted-foreground">
            Complete records of your curriculum practice sessions and official graded attempts.
          </p>
        </div>
        <div className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-lg border border-border">
          <BarChart2 className="h-3.5 w-3.5 text-primary" />
          <span>Profile Verification Synced</span>
        </div>
      </div>

      {/* Main Table Card wrapper */}
      <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-border/50 bg-card/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-bold font-heading text-foreground">Grades Transcript</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Syllabus runs stored in secure local profile storage
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs gap-1.5 px-3 py-1 font-mono cursor-default bg-primary/5 text-primary border-primary/15 self-start sm:self-auto shrink-0">
            <Database className="h-3.5 w-3.5" />
            <span>Secure Data Storage Active</span>
          </Badge>
        </CardHeader>
        
        <CardContent className="p-0">
          {attempts.length === 0 ? (
            <div className="p-16 text-center select-none flex flex-col items-center justify-center min-h-[300px]">
              <Clock className="h-12 w-12 text-muted/60 mb-3 animate-pulse" />
              <h4 className="text-sm font-bold text-foreground">No evaluation records saved</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                No certification attempts have been logged yet. Visit the catalog to launch your primary training exams.
              </p>
              <Button size="sm" onClick={() => navigate('/tests')} className="mt-4 gap-1.5 text-xs">
                <span>Browse Exam Catalog</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40 border-b border-border/50">
                  <TableRow>
                    <TableHead className="w-[180px] p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Date & Timestamp</TableHead>
                    <TableHead className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Course Syllabus Module</TableHead>
                    <TableHead className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center whitespace-nowrap">Score Ratio</TableHead>
                    <TableHead className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center whitespace-nowrap">Percent Accuracy</TableHead>
                    <TableHead className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center whitespace-nowrap">Outcome</TableHead>
                    <TableHead className="p-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-right whitespace-nowrap">Review</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border/20">
                  {attempts.map((attempt) => (
                    <TableRow 
                      key={attempt.id}
                      className="hover:bg-muted/20 transition-colors cursor-pointer group"
                      onClick={() => handleReviewAttempt(attempt.id)}
                    >
                      <TableCell className="p-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span>{formatDate(attempt.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-foreground text-xs leading-none group-hover:text-primary transition-colors">
                            {attempt.testTitle}
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold inline-block mt-1 whitespace-nowrap">
                            {attempt.course} Syllabus
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-center font-mono font-bold text-xs text-foreground whitespace-nowrap">
                        {attempt.score} / {attempt.totalQuestions}
                      </TableCell>
                      <TableCell className="p-4 text-center font-mono font-bold text-xs text-foreground whitespace-nowrap">
                        {attempt.percentage}%
                      </TableCell>
                      <TableCell className="p-4 text-center">
                        <Badge className={`text-[9px] font-extrabold uppercase tracking-wide rounded-full px-2 py-0.5 ${getPassFailStyle(attempt.passed)}`}>
                          {attempt.passed ? 'PASSED' : 'RETRY NEEDED'}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-muted rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReviewAttempt(attempt.id);
                          }}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {attempts.length > 0 && (
          <div className="p-4 border-t border-border bg-muted/15 flex items-center justify-between text-[11px] text-muted-foreground px-5 shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Tracking {attempts.length} active syllabus credentials
            </span>
            <span className="font-semibold text-primary">NIELIT Syllabus Approved</span>
          </div>
        )}
      </Card>

    </div>
  );
}
