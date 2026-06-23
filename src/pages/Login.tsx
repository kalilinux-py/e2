import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, ShieldCheck, BookOpen, Key, Phone, ArrowRight, CornerDownLeft } from 'lucide-react';
import { loginUser } from '../lib/storage';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [demoHint, setDemoHint] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !studentId) {
      setError('Please provide matches for all mandatory credential fields.');
      return;
    }

    const success = loginUser(phone, studentId);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid Phone Number or Student ID. Check your credentials and try again.');
    }
  };

  const useDemoCredentials = () => {
    setPhone('9876543210');
    setStudentId('DL2606004928');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row" id="login-viewport">
      {/* Left Column: Evalo Branding */}
      <div className="hidden md:flex md:w-[45%] bg-zinc-950 text-white p-12 flex-col justify-between border-r border-border/20 relative overflow-hidden select-none">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Section */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 group hover:opacity-90 transition-opacity">
          <div className="p-2 rounded-xl bg-primary text-primary-foreground">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="font-heading font-bold text-2xl tracking-tight block">Evalo</span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">National Syllabus Practice Portal</span>
          </div>
        </Link>

        {/* Main Value Proposition Section */}
        <div className="relative z-10 max-w-sm my-auto py-8">
          <h1 className="text-4xl font-extrabold tracking-tight font-heading leading-[1.15] mb-6">
            Assess and Master Computer Certifications with Confidence.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Specifically optimized for NIELIT CCC and O Level computer concepts examinations. Track candidate readiness through precise metrics, test simulators, and automated evaluation grids.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-5 w-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <ShieldCheck className="h-3 w-3" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">100% Safe Offline Evaluation</h4>
                <p className="text-[11px] text-zinc-500">Your test progress, performance reviews, and certificates remain entirely under your local browser custody.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-5 w-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <BookOpen className="h-3 w-3" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200">Official Syllabus Mock Test Library</h4>
                <p className="text-[11px] text-zinc-500">Practice questions generated in strict alignment with national certification models.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Section */}
        <div className="relative z-10 border-t border-zinc-900 pt-6">
          <p className="text-[10px] text-zinc-500 font-mono">
            SECURE EXAMINATION ENTRANCE • LOCAL CLIENT ENGINE
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-24 bg-background relative">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Brand Header */}
          <Link to="/" className="md:hidden flex items-center gap-2 mb-8 hover:opacity-90 transition-opacity" id="login-brand-mobile">
            <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
              <Award className="h-5 w-5" />
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight">Evalo</span>
          </Link>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
              Sign in to Evalo
            </h2>
            <p className="text-xs text-muted-foreground mt-1.5">
              Enter your registered mobile number and unique Student ID.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-[11px] font-medium text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 text-xs py-5"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="studentId" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Student ID
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="studentId"
                  type="text"
                  placeholder="e.g. EV-12345 or DL26..."
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="pl-9 text-xs font-mono uppercase py-5"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full text-xs font-semibold py-5">
              Access Candidate Workspace <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </form>

          {/* Quick Demo Assist */}
          {demoHint && (
            <div className="mt-6 p-4 rounded-xl bg-muted/65 border border-border/80 text-[11px]">
              <div className="flex items-center justify-between mb-1.5 font-semibold text-foreground">
                <span>Demo Student Credentials</span>
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/10">Quick Auto-Fill</span>
              </div>
              <p className="text-muted-foreground leading-normal mb-3">
                Already have records? You can use the mock candidate account to explore without signing up:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3 bg-card border border-border/50 p-2 rounded-lg">
                <div>
                  <span className="block text-[9px] text-muted-foreground font-sans uppercase">Phone</span>
                  <span className="text-foreground tracking-tight">9876543210</span>
                </div>
                <div>
                  <span className="block text-[9px] text-muted-foreground font-sans uppercase">Student ID</span>
                  <span className="text-foreground tracking-tight">DL2606004928</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={useDemoCredentials} 
                className="w-full text-[10px] h-8 flex items-center justify-center gap-1 bg-card hover:bg-muted"
              >
                <CornerDownLeft className="h-3 w-3 text-primary" /> Apply Credentials Automatically
              </Button>
            </div>
          )}

          <div className="mt-8 border-t border-border/60 pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              New candidate?{' '}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create a candidate profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
