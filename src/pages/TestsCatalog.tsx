import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Timer, 
  Layers, 
  Award, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  Filter,
  GraduationCap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { getTestsList, getCurrentUser } from '../lib/storage';
import { CourseType } from '../types';

export default function TestsCatalog() {
  const navigate = useNavigate();
  const tests = getTestsList();
  const user = getCurrentUser();
  const primaryEnrolledCourse = user.enrolledCourses?.[0] || 'CCC';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTestInfo, setActiveTestInfo] = useState<any | null>(null);

  // Filtering Logic - locked to the user's primary course
  const filteredTests = tests.filter(test => {
    const matchesCourse = test.course === primaryEnrolledCourse;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const handleStartTest = (testId: string) => {
    // Navigate to standalone active test window
    navigate(`/test-window/${testId}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Title block */}
      <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight font-heading text-foreground">Syllabus Exam Catalog</h2>
          <p className="text-xs text-muted-foreground">
            Select an official curriculum assessment module below to start your timed evaluation session.
          </p>
        </div>
        <div className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-lg border border-border">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>NIELIT Syllabus Approved</span>
        </div>
      </div>

      {/* Filter and Search controls bar */}
      <Card className="bg-card border border-border rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Active Course Indicator */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">
              Enrolled: <span className="text-primary font-extrabold">{primaryEnrolledCourse} Syllabus</span>
            </span>
          </div>

          {/* Search bar input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search curriculum modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-xs h-9 bg-background outline-none border border-border rounded-lg placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>
      </Card>

      {/* Tests Grid */}
      {filteredTests.length === 0 ? (
        <Card className="bg-card border border-border p-12 text-center flex flex-col items-center justify-center rounded-2xl min-h-[250px]">
          <BookOpen className="h-10 w-10 text-muted/60 mb-2 animate-bounce" />
          <h4 className="text-sm font-bold text-foreground">No matching modules</h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-md">
            We couldn't find any core module matching "{searchQuery}". Try exploring another syllabus term or reset the category filter.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => (
            <Card 
              key={test.id} 
              className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between hover:border-primary/40 duration-200"
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex justify-between items-start gap-2">
                  <Badge 
                    variant="outline" 
                    className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-primary/5 text-primary border-primary/20"
                  >
                    {test.course}
                  </Badge>
                  <Badge 
                    className="text-[9px] font-bold py-0.5 px-2 bg-secondary text-secondary-foreground border border-border"
                  >
                    {test.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-sm md:text-base font-bold font-heading text-foreground tracking-tight mt-3">
                  {test.title}
                </CardTitle>
                <span className="text-[9px] text-muted-foreground font-mono uppercase mt-1 tracking-wider inline-block">
                  {test.subject}
                </span>
                <CardDescription className="text-xs text-muted-foreground mt-2.5 line-clamp-2">
                  {test.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-0 pb-4">
                <div className="grid grid-cols-2 gap-3.5 border-t border-border/40 pt-3.5 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer className="h-3.5 w-3.5 shrink-0 text-foreground" />
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground uppercase font-bold leading-none">Timer</span>
                      <span className="text-[11px] font-mono font-semibold text-foreground mt-0.5">{test.durationMinutes} minutes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 shrink-0 text-foreground" />
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground uppercase font-bold leading-none">Questions</span>
                      <span className="text-[11px] font-mono font-semibold text-foreground mt-0.5">{test.totalQuestions} items</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 bg-muted/20 border-t border-border/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Award className="h-3.5 w-3.5 font-bold" />
                  <span className="text-[10px] font-medium font-mono">Passing Score: {test.passingAccuracy}%</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setActiveTestInfo(test)}
                  className="gap-1.5 font-semibold text-xs h-8 px-3 rounded-lg"
                >
                  <span>Begin Exam</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Test Instructions Modal */}
      {activeTestInfo && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-card border border-border shadow-xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <CardHeader className="bg-muted/30 border-b border-border/60 p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-bold bg-primary/10 text-primary border-primary/20">
                    {activeTestInfo.course} Syllabus
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-mono font-bold uppercase">{activeTestInfo.difficulty} Level</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setActiveTestInfo(null)}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <CardTitle className="text-base md:text-lg font-bold font-heading text-foreground mt-3 tracking-tight">
                {activeTestInfo.title}
              </CardTitle>
              <span className="text-[10px] text-muted-foreground font-mono uppercase mt-0.5 tracking-wider block">
                {activeTestInfo.subject}
              </span>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {/* Exam specs grid */}
              <div className="grid grid-cols-3 gap-3 bg-muted/40 p-3.5 rounded-xl border border-border/50 text-center">
                <div className="flex flex-col items-center">
                  <Timer className="h-4.5 w-4.5 text-primary mb-1" />
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider font-mono">Duration</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5">{activeTestInfo.durationMinutes} min</span>
                </div>
                <div className="flex flex-col items-center border-x border-border/60">
                  <Layers className="h-4.5 w-4.5 text-primary mb-1" />
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider font-mono">Questions</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5">{activeTestInfo.totalQuestions} items</span>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="h-4.5 w-4.5 text-primary mb-1" />
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider font-mono">Pass Limit</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5">{activeTestInfo.passingAccuracy}%</span>
                </div>
              </div>

              {/* Instructions Rules List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-left">Candidate Instructions:</h4>
                <ul className="text-[11px] text-muted-foreground space-y-2.5 leading-relaxed text-left list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>This examination is officially graded based on National Syllabus curricula guidelines.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>The countdown timer will initiate immediately on starting and cannot be paused.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>Closing or refreshing this window while the exam is active will count as an official submission with your current progress.</span>
                  </li>
                </ul>
              </div>

              {/* Warning Alert banner */}
              <div className="flex items-start gap-2.5 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400 p-3 rounded-xl border border-yellow-500/20 text-[11px] leading-relaxed text-left">
                <span className="font-bold shrink-0 mt-0.5 text-xs">⚠️</span>
                <span>By clicking <strong>Begin Assessment</strong>, you certify that you are ready to start this security-evaluated curriculum exam module.</span>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/20 border-t border-border/50 p-4 px-6 flex items-center justify-end gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveTestInfo(null)}
                className="text-xs font-semibold rounded-lg h-9"
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  const testId = activeTestInfo.id;
                  setActiveTestInfo(null);
                  handleStartTest(testId);
                }}
                className="gap-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-lg h-9 px-4 shadow-sm"
              >
                <span>Begin Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

    </div>
  );
}
