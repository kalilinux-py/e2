import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Award, ShieldCheck, BookOpen, User as UserIcon, Phone, CheckCircle, Copy, ArrowRight, BookMarked, ExternalLink } from 'lucide-react';
import { registerUser } from '../lib/storage';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { CourseType } from '../types';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState<CourseType>('CCC');
  const [error, setError] = useState('');
  
  // Registration success tracking
  const [generatedId, setGeneratedId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your actual name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter a valid mobile number.');
      return;
    }

    try {
      const result = registerUser(name.trim(), phone.trim(), course);
      setGeneratedId(result.studentId);
      setError('');
    } catch (err) {
      setError('An unexpected error occur during registration. Choose another username.');
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(generatedId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceed = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row" id="signup-viewport">
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

      {/* Right Column: Interactive Form/Success State */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-24 bg-background relative">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Brand Header */}
          <Link to="/" className="md:hidden flex items-center gap-2 mb-8 hover:opacity-90 transition-opacity" id="signup-brand-mobile">
            <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
              <Award className="h-5 w-5" />
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight">Evalo</span>
          </Link>

          {!generatedId ? (
            /* REGISTRATION FORM STATE */
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
                  New Candidate Profile
                </h2>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Register with your mobile and select your certification target course. Your unique Student ID will be generated.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-[11px] font-medium text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    Full Candidate Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. Aditya Vardhan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-9 text-xs py-5"
                      required
                    />
                  </div>
                </div>

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
                  <label htmlFor="course" className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    Select Syllabus Target Course
                  </label>
                  <div className="relative">
                    <BookMarked className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <select
                      id="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value as CourseType)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                    >
                      <option value="CCC">CCC (Course on Computer Concepts)</option>
                      <option value="O Level">O Level Certification Syllabus</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full text-xs font-semibold py-5">
                  Generate Student account <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </form>

              <div className="mt-8 border-t border-border/60 pt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Already registered?{' '}
                  <Link to="/login" className="font-semibold text-primary hover:underline">
                    Sign in with your Student ID
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* AUTOMATIC SYSTEM GENERATED ID CONFIRMATION STATE */
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/10">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight font-heading text-foreground">
                  Registration Successful!
                </h2>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Your customized candidate file is generated. Use the generated ID to sign in on subsequent learning instances.
                </p>
              </div>

              {/* Unique ID Card widget */}
              <div className="p-6 bg-muted/65 border border-border/80 rounded-2xl relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-muted-foreground/60">
                  EVALO ID DECAL
                </div>
                
                <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                  System Generated Student ID
                </span>
                
                <div className="flex items-center justify-between bg-card border border-border/60 p-4 rounded-xl shadow-sm mb-4">
                  <span className="text-2xl font-black font-mono tracking-wider text-primary">
                    {generatedId}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyId}
                    className="h-8 text-[11px] gap-1 px-2.5 font-semibold bg-card border-border/60 text-foreground"
                  >
                    <Copy className="h-3 w-3 text-muted-foreground" />
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>

                {/* Candidate Summary Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="block text-[10px] text-muted-foreground font-semibold">Candidate</span>
                    <span className="font-semibold truncate block text-foreground">{name}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground font-semibold">Contact Mobile</span>
                    <span className="font-semibold block text-foreground">{phone}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-border/50">
                    <span className="block text-[10px] text-muted-foreground font-semibold">Selected Curriculum</span>
                    <span className="font-semibold text-primary">{course === 'CCC' ? 'CCC (Course on Computer Concepts)' : 'O Level Certification'}</span>
                  </div>
                </div>
              </div>

              {/* Warning note */}
              <div className="p-3 bg-primary/5 text-primary/80 border border-primary/10 rounded-lg text-[10px] leading-relaxed text-center font-medium">
                ⚠️ Store your Student ID carefully. It serves as your unique verification key.
              </div>

              <Button onClick={handleProceed} className="w-full text-xs font-semibold py-5">
                Proceed to Candidate Dashboard <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
