import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Award, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  RefreshCw, 
  BookOpen, 
  Settings, 
  CheckCircle2,
  Lock,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { getCurrentUser, updateCurrentUser } from '../lib/storage';
import { CourseType } from '../types';

export default function Profile() {
  const [user, setUser] = useState(getCurrentUser());
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [rollNo, setRollNo] = useState(user.rollNo);
  const [selectedCourses, setSelectedCourses] = useState<CourseType[]>(user.enrolledCourses.slice(0, 1) || ['CCC']);
  const [isSaved, setIsSaved] = useState(false);

  // Set single course enrollment track
  const handleToggleCourse = (course: CourseType) => {
    setSelectedCourses([course]);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      rollNo,
      enrolledCourses: selectedCourses
    };
    updateCurrentUser(updated);
    setUser(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* Title */}
      <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight font-heading text-foreground">Syllabus Profiles & Enrollment</h2>
          <p className="text-xs text-muted-foreground">
            Manage your official educational identifiers, enrolled syllabus tracks, and account credentials.
          </p>
        </div>
        <div className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-lg border border-border">
          <UserCheck className="h-3.5 w-3.5 text-primary" />
          <span>Profile Authenticated</span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN: Student ID Badge (Col Span 1) */}
        <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden text-center flex flex-col justify-between min-h-[350px]">
          <div className="p-6 pt-8 pb-8 flex flex-col items-center">
            
            {/* Avatar block */}
            <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-2xl relative select-none">
              {(name || 'Student').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'S'}
              <div className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full border border-card">
                <Award className="h-3 w-3" />
              </div>
            </div>

            <h3 className="text-base font-bold text-foreground font-heading mt-4">{name}</h3>
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground font-mono mt-0.5">Certified Student Profile</span>
            
            <div className="h-px bg-border/50 w-full my-4" />

            <div className="flex flex-col gap-3 w-full text-xs text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-border/30 pb-2">
                <span className="text-muted-foreground font-medium">Roll Number:</span>
                <span className="font-mono font-bold text-foreground select-all break-all">{rollNo}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-border/30 pb-2">
                <span className="text-muted-foreground font-medium">Registry Status:</span>
                <Badge variant="outline" className="text-[9px] h-5 py-0 px-2 font-bold bg-primary/10 text-primary border-transparent w-fit">Fully Active</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span className="text-muted-foreground font-medium">Registration Date:</span>
                <span className="text-foreground flex items-center gap-1 font-semibold text-[11px] shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>March 15, 2026</span>
                </span>
              </div>
            </div>

          </div>
          
          <div className="p-3 bg-muted/40 border-t border-border flex flex-col sm:flex-row gap-2 items-center justify-between text-[11px] text-muted-foreground px-5 font-mono select-none">
            <span className="text-center sm:text-left">Official Candidate Records Only</span>
            <span className="font-semibold text-primary shrink-0">NIELIT DL-01</span>
          </div>
        </Card>

        {/* RIGHT COLUMN: Settings grids (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
            
            {/* Bento block 1: Profile forms */}
            <Card className="bg-card border border-border shadow-sm rounded-2xl">
              <CardHeader className="p-5 pb-3 border-b border-border/45 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold font-heading text-foreground">Syllabus Profile Credentials</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Configure your registered candidate credentials saved securely in this browser section
                  </CardDescription>
                </div>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Candidate Full Name</label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="text-xs rounded-lg h-9 bg-background border-border placeholder:text-muted-foreground text-foreground max-w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Registered Email Address</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-xs rounded-lg h-9 bg-background border-border placeholder:text-muted-foreground text-foreground max-w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Roll Number / Unique Identification Key</label>
                    <Input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      required
                      className="text-xs font-mono rounded-lg h-9 bg-background border-border placeholder:text-muted-foreground text-foreground max-w-full"
                    />
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Bento block 2: Course active selector */}
            <Card className="bg-card border border-border shadow-sm rounded-2xl">
              <CardHeader className="p-5 pb-3 border-b border-border/45">
                <CardTitle className="text-sm font-bold font-heading text-foreground">Active Graded Syllabus Track</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-0.5">
                  Select your single primary curriculum track to load specific resources and customized evaluation parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Course Box 1: CCC */}
                  <div 
                    onClick={() => handleToggleCourse('CCC')}
                    className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 select-none ${
                      selectedCourses.includes('CCC') 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-background hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-foreground">CCC Credential Track</span>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        selectedCourses.includes('CCC') ? 'bg-primary border-primary text-primary-foreground' : 'border-border'
                      }`}>
                        {selectedCourses.includes('CCC') && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">National computer literacy concept program. Basic operations, hardware diagnostics, and full LibreOffice suites.</p>
                  </div>

                  {/* Course Box 2: O Level */}
                  <div 
                    onClick={() => handleToggleCourse('O Level')}
                    className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 select-none ${
                      selectedCourses.includes('O Level') 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-background hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-foreground">O Level Certification Track</span>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        selectedCourses.includes('O Level') ? 'bg-primary border-primary text-primary-foreground' : 'border-border'
                      }`}>
                        {selectedCourses.includes('O Level') && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Higher information technology module covering structured programming in Python, CSS Web design, and Networking systems.</p>
                  </div>

                </div>
              </CardContent>
              <CardFooter className="p-4 px-5 border-t border-border bg-muted/15 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Exactly 1 active course path required</span>
                
                <div className="flex items-center gap-2">
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="font-semibold text-xs h-8 px-4 rounded-lg bg-primary text-primary-foreground"
                  >
                    Save Changes
                  </Button>
                </div>
              </CardFooter>
            </Card>

          </form>

          {/* Success Notification Banner */}
          {isSaved && (
            <div className="p-4 rounded-xl border border-primary bg-primary/10 text-primary text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Student profile records updated successfully. Refreshing academic boards.</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
