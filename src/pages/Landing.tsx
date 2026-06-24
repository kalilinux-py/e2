import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ArrowRight, 
  Timer, 
  FileCheck, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-accent-foreground">
      
      {/* Navbar segment */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
              <Award className="h-5 w-5" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">Evalo</span>
            <span className="text-xs bg-secondary text-secondary-foreground font-semibold px-2 py-0.5 rounded border border-border hidden sm:inline-block">National Syllabus Core</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-xs font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/signup" className="hidden sm:inline-flex">
              <Button size="sm" className="text-xs font-semibold">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 md:py-16 flex flex-col items-center gap-14">
        
        {/* Minimal Hero Section */}
        <section className="text-center max-w-3xl flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/60 text-muted-foreground text-xs font-medium tracking-wide">
            <Zap className="h-3 w-3 text-primary animate-pulse" />
            <span>Curriculum-Aligned NIELIT Exam Solutions (CCC & O Level)</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-none max-w-2xl text-foreground">
            Succeed in your <span className="underline decoration-primary decoration-4 underline-offset-4 text-primary">NIELIT Certification</span> Exams
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            A specialized digital preparation hub built for CCC and O Level certifications. Highly interactive practice tests incorporating the latest LibreOffice commands, Linux diagnostics, and cybersecurity metrics.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2 font-semibold text-sm">
                <span>Enter Learning Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 font-semibold text-sm">
                Browse Tests
              </Button>
            </Link>
          </div>
        </section>

        {/* Bento Grid Concept Features */}
        <section className="w-full flex flex-col gap-8">
          <div className="text-center md:text-left flex flex-col gap-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Smarter Preparation</h2>
            <p className="text-xl font-heading font-semibold text-foreground tracking-tight">Features designed for official curriculum benchmarking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1: Real-time Timer */}
            <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden group hover:border-primary/40 duration-200 flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="p-2.5 rounded-xl bg-secondary text-secondary-foreground w-fit mb-4 border border-border">
                  <Timer className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="text-base font-bold font-heading text-foreground tracking-tight">
                  Real-time Adaptive Timer
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  Replicates live examination constraints with accurate tracking and auto-saving scheme integration.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/20">
                <span className="font-semibold text-foreground text-[11px]">Syllabus standards fully calibrated</span>
                <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
              </CardContent>
            </Card>

            {/* Feature 2: NIELIT Exam Patterns */}
            <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden group hover:border-primary/40 duration-200 flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="p-2.5 rounded-xl bg-secondary text-secondary-foreground w-fit mb-4 border border-border">
                  <FileCheck className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="text-base font-bold font-heading text-foreground tracking-tight">
                  Official Course Blueprint
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  Full LibreOffice suite alignment (Writer, Calc, Impress) instead of general applications. Adheres strictly to high outcomes.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/20">
                <span className="font-semibold text-foreground text-[11px]">Covers CCC & O Level modules</span>
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              </CardContent>
            </Card>

            {/* Feature 3: Analytical Insights */}
            <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden group hover:border-primary/40 duration-200 flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="p-2.5 rounded-xl bg-secondary text-secondary-foreground w-fit mb-4 border border-border">
                  <TrendingUp className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="text-base font-bold font-heading text-foreground tracking-tight">
                  Syllabus Metrics & Analytics
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  Find individual concept vulnerabilities. Instant evaluation reports, score analytics, and thorough historic tracking.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/20">
                <span className="font-semibold text-foreground text-[11px]">Readiness rank calculations</span>
                <span className="font-semibold text-primary text-[10px] uppercase font-mono tracking-wider">Pro Edition</span>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Quick statistics horizontal list */}
        <section className="w-full border-t border-border pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading select-none">100%</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Official Syllabus coverage</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading select-none">32h+</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Student practice log hours</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading select-none">A+</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Target Readiness level</p>
          </div>
        </section>

      </main>

      {/* Footer block */}
      <footer className="border-t border-border bg-card py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-3 text-center sm:text-left">
            <span className="font-bold text-foreground font-heading">Evalo Certification</span>
            <span className="hidden sm:inline text-muted-foreground/40">|</span>
            <span>&copy; 2026 Evalo Platforms. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 justify-center">
            <span className="cursor-not-allowed hover:text-foreground transition-colors duration-150">Course Catalog</span>
            <span className="cursor-not-allowed hover:text-foreground transition-colors duration-150">Security Policies</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
