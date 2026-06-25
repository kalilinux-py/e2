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
  GraduationCap,
  FileSpreadsheet,
  AlertCircle,
  Clock,
  LayoutGrid,
  Check
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/accordion';

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
        <section id="hero-section" className="text-center max-w-3xl flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div id="hero-badge" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/60 text-muted-foreground text-xs font-medium tracking-wide">
            <Zap id="hero-badge-icon" className="h-3 w-3 text-primary animate-pulse" />
            <span id="hero-badge-text">The Ultimate Assessment Platform for NIELIT Training Institutes</span>
          </div>
          
          <h1 id="hero-title" className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-none max-w-2xl text-foreground">
            Run NIELIT Mock Tests Like a <span className="underline decoration-primary decoration-4 underline-offset-4 text-primary">Modern Coaching Center</span>
          </h1>
          
          <p id="hero-description" className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            Save hours of manual test-creation time with our curriculum-aligned assessment engine. Effortlessly host CCC and O Level mock exams, track results automatically, and leverage student performance analytics to elevate your institute's success.
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link id="hero-dashboard-link" to="/login">
              <Button id="hero-dashboard-btn" size="lg" className="w-full sm:w-auto px-8 gap-2 font-semibold text-sm">
                <span>Enter Learning Dashboard</span>
                <ArrowRight id="hero-dashboard-icon" className="h-4 w-4" />
              </Button>
            </Link>
            <a id="hero-how-it-works-link" href="#how-it-works">
              <Button id="hero-how-it-works-btn" size="lg" variant="outline" className="w-full sm:w-auto px-8 font-semibold text-sm">
                See How It Works
              </Button>
            </a>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section id="social-proof-bar" className="w-full py-4 bg-muted/40 border-y border-border">
          <div id="social-proof-container" className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs text-muted-foreground font-medium">
            <span id="proof-item-1" className="flex items-center gap-1.5">
              <span id="proof-dot-1" className="h-1.5 w-1.5 rounded-full bg-primary" />
              Built for NIELIT-aligned centers
            </span>
            <span id="proof-item-2" className="flex items-center gap-1.5">
              <span id="proof-dot-2" className="h-1.5 w-1.5 rounded-full bg-primary" />
              Multi-panel architecture
            </span>
            <span id="proof-item-3" className="flex items-center gap-1.5">
              <span id="proof-dot-3" className="h-1.5 w-1.5 rounded-full bg-primary" />
              Admin + Academy + Student roles
            </span>
            <span id="proof-item-4" className="flex items-center gap-1.5">
              <span id="proof-dot-4" className="h-1.5 w-1.5 rounded-full bg-primary" />
              Real-time result analytics
            </span>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem-section" className="w-full max-w-5xl px-6 py-12 bg-card border border-border rounded-2xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div id="problem-header" className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
            <h2 id="problem-badge" className="text-xs font-bold uppercase tracking-wider text-primary">The Bottlenecks</h2>
            <p id="problem-title" className="text-xl md:text-2xl font-heading font-extrabold text-foreground tracking-tight leading-snug">
              Running a coaching center shouldn't mean drowning in spreadsheets.
            </p>
          </div>

          <div id="problem-items-container" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div id="problem-item-1" className="flex flex-col gap-3 p-5 rounded-xl bg-background border border-border">
              <div id="problem-icon-wrapper-1" className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit">
                <FileSpreadsheet id="problem-icon-1" className="h-5 w-5" />
              </div>
              <h3 id="problem-item-title-1" className="font-semibold text-base text-foreground">
                Manual Test Creation
              </h3>
              <p id="problem-item-desc-1" className="text-sm text-muted-foreground leading-relaxed">
                Manually creating mock tests every week, wasting hours on typesetting and manual printing.
              </p>
            </div>

            <div id="problem-item-2" className="flex flex-col gap-3 p-5 rounded-xl bg-background border border-border">
              <div id="problem-icon-wrapper-2" className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit">
                <AlertCircle id="problem-icon-2" className="h-5 w-5" />
              </div>
              <h3 id="problem-item-title-2" className="font-semibold text-base text-foreground">
                Spreadsheet Tracking
              </h3>
              <p id="problem-item-desc-2" className="text-sm text-muted-foreground leading-relaxed">
                Tracking results across scattered Excel sheets, causing fragmented records and errors.
              </p>
            </div>

            <div id="problem-item-3" className="flex flex-col gap-3 p-5 rounded-xl bg-background border border-border">
              <div id="problem-icon-wrapper-3" className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit">
                <Clock id="problem-icon-3" className="h-5 w-5" />
              </div>
              <h3 id="problem-item-title-3" className="font-semibold text-base text-foreground">
                No Analytics Visibility
              </h3>
              <p id="problem-item-desc-3" className="text-sm text-muted-foreground leading-relaxed">
                Zero instant visibility into which students are struggling, delaying critical remedial interventions.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid Concept Features */}
        <section id="features-section" className="w-full flex flex-col gap-8">
          <div className="text-center md:text-left flex flex-col gap-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Smarter Preparation</h2>
            <p className="text-xl font-heading font-semibold text-foreground tracking-tight">Features designed for official curriculum benchmarking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
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
                  Enforce official examination constraints with fully accurate timers, preparing students for CCC and O Level environments.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/20">
                <span className="font-semibold text-foreground text-[11px]">Syllabus standards calibrated</span>
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
                  Ready-to-use question banks matching LibreOffice, Linux, and cybersecurity modules, eliminating manual preparation work.
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
                  Analyze performance gaps across whole batches or individual students to identify exactly where your classes should focus.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/20">
                <span className="font-semibold text-foreground text-[11px]">Batch-wide progress reports</span>
                <span className="font-semibold text-primary text-[10px] uppercase font-mono tracking-wider">Pro Edition</span>
              </CardContent>
            </Card>

            {/* Feature 4: Centralized Admin Dashboard */}
            <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden group hover:border-primary/40 duration-200 flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="p-2.5 rounded-xl bg-secondary text-secondary-foreground w-fit mb-4 border border-border">
                  <LayoutGrid className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="text-base font-bold font-heading text-foreground tracking-tight">
                  Centralized Admin Dashboard
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  Manage your entire institute—students, batches, customized test configurations, and historical logs—from one simple panel.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/40 bg-muted/20">
                <span className="font-semibold text-foreground text-[11px]">All-in-one controller</span>
                <span className="font-semibold text-primary text-[10px] uppercase font-mono tracking-wider">Control Panel</span>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full max-w-5xl px-6 py-12 border-t border-border flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div id="how-it-works-header" className="text-center flex flex-col gap-2">
            <h2 id="how-it-works-subtitle" className="text-xs font-bold uppercase tracking-wider text-primary">Simple Workflow</h2>
            <p id="how-it-works-title" className="text-2xl md:text-3xl font-heading font-extrabold text-foreground tracking-tight">
              From setup to results in 3 steps
            </p>
          </div>

          <div id="how-it-works-steps-container" className="relative">
            {/* Horizontal divider line for desktop */}
            <div id="how-it-works-desktop-line" className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-[1px] bg-border" />
            
            <div id="how-it-works-steps" className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div id="step-1" className="flex flex-col items-center text-center gap-4">
                <div id="step-number-1" className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-heading text-lg shadow-sm">
                  1
                </div>
                <div id="step-content-1" className="flex flex-col gap-1.5">
                  <h3 id="step-title-1" className="font-bold text-lg text-foreground font-heading">
                    Create your academy
                  </h3>
                  <p id="step-desc-1" className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    Set up your coaching center profile in under a minute to start managing your institute.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div id="step-2" className="flex flex-col items-center text-center gap-4">
                <div id="step-number-2" className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-heading text-lg shadow-sm">
                  2
                </div>
                <div id="step-content-2" className="flex flex-col gap-1.5">
                  <h3 id="step-title-2" className="font-bold text-lg text-foreground font-heading">
                    Add students & assign tests
                  </h3>
                  <p id="step-desc-2" className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    Bulk import or manually add students, and easily assign structured mock tests by module.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div id="step-3" className="flex flex-col items-center text-center gap-4">
                <div id="step-number-3" className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-heading text-lg shadow-sm">
                  3
                </div>
                <div id="step-content-3" className="flex flex-col gap-1.5">
                  <h3 id="step-title-3" className="font-bold text-lg text-foreground font-heading">
                    Track results instantly
                  </h3>
                  <p id="step-desc-3" className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    View dynamic, live analytics of performance and batch-wide readiness scores as students complete tests.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing-section" className="w-full max-w-5xl px-6 py-12 border-t border-border flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div id="pricing-header" className="text-center flex flex-col gap-2">
            <h2 id="pricing-subtitle" className="text-xs font-bold uppercase tracking-wider text-primary">Transparent Plans</h2>
            <p id="pricing-title" className="text-2xl md:text-3xl font-heading font-extrabold text-foreground tracking-tight">
              Simple pricing for growing centers
            </p>
          </div>

          <div id="pricing-cards-container" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
            
            {/* Starter Plan */}
            <div id="pricing-plan-starter" className="bg-card border border-border rounded-lg p-6 flex flex-col justify-between gap-6 relative">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground font-semibold text-lg">Starter Academy</h3>
                  <p className="text-xs text-muted-foreground">Perfect for individual instructors starting with NIELIT tests.</p>
                </div>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl font-extrabold text-foreground">₹999</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
                <div className="border-t border-border/60 my-2" />
                <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Up to 50 active students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>CCC syllabus aligned mock tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Automated basic reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
              </div>
              <Link to="/login" className="w-full mt-4">
                <Button variant="outline" className="w-full border-border text-foreground font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div id="pricing-plan-pro" className="bg-card border-2 border-primary rounded-lg p-6 flex flex-col justify-between gap-6 relative shadow-md">
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Most Popular
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground font-semibold text-lg">Pro Center</h3>
                  <p className="text-xs text-muted-foreground">Ideal for larger multi-panel coaching institutes.</p>
                </div>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl font-extrabold text-foreground">₹2,499</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
                <div className="border-t border-border/60 my-2" />
                <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground font-medium">Unlimited active students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>CCC & O Level comprehensive tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Real-time batch-wide analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Priority 24/7 support & setup help</span>
                  </li>
                </ul>
              </div>
              <Link to="/login" className="w-full mt-4">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>

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

        {/* FAQ Section */}
        <section id="faq-section" className="w-full max-w-3xl px-6 py-12 border-t border-border flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div id="faq-header" className="text-center flex flex-col gap-2">
            <h2 id="faq-subtitle" className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</h2>
            <p id="faq-title" className="text-2xl md:text-3xl font-heading font-extrabold text-foreground tracking-tight">
              Common questions from coaching center owners
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="text-foreground text-sm font-semibold py-4 hover:no-underline">
                How secure and private is our coaching center data?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                We take data safety and privacy extremely seriously. All student data, mock exam attempts, and institute logs are isolated and secured with industry-standard encryption. Your student records are never shared or used for other purposes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="text-foreground text-sm font-semibold py-4 hover:no-underline">
                How long does the setup process take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                Setup is virtually instant. Once you register your academy profile, you can immediately import your student list via bulk CSV or manual input, configure your panels, and assign ready-made CCC & O Level mock tests in less than five minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="text-foreground text-sm font-semibold py-4 hover:no-underline">
                Does the platform support both CCC and O Level syllabi?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                Yes, absolutely! The platform contains separate question banks and test templates meticulously calibrated to both CCC and O Level structures. It includes dedicated modules covering LibreOffice Writer, Calc, Impress, Linux OS operations, and basic cybersecurity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="text-foreground text-sm font-semibold py-4 hover:no-underline">
                What kind of customer and setup support is available?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                Our team provides dedicated support. Starter plan members have access to 24-hour email support, while Pro plan subscribers receive priority round-the-clock support, custom onboarding sessions, and direct assistance with importing batch lists.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

      </main>

      {/* Call-to-Action Band */}
      <section id="cta-band" className="w-full bg-primary text-primary-foreground py-16 md:py-20 flex flex-col items-center justify-center text-center px-6">
        <div id="cta-container" className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 id="cta-title" className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight leading-tight">
            Ready to modernize your coaching center?
          </h2>
          <p id="cta-description" className="text-sm md:text-base text-primary-foreground/80 max-w-xl leading-relaxed">
            Empower your instructors, streamline test creation, and deliver real-time student analytics for CCC & O Level certifications today.
          </p>
          <Link id="cta-link" to="/signup" className="mt-2">
            <Button id="cta-btn" size="lg" className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-sm font-semibold rounded-xl shadow-md transition-all">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer block */}
      <footer id="footer-section" className="border-t border-border bg-card py-12">
        <div id="footer-container" className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
          
          <div id="footer-grid" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1: Info */}
            <div id="footer-col-info" className="flex flex-col gap-3 col-span-2 md:col-span-1">
              <span id="footer-brand" className="font-bold text-foreground font-heading text-sm">Evalo Certification</span>
              <p id="footer-tagline" className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Empowering CCC and O Level training academies with automated benchmarking tools.
              </p>
            </div>

            {/* Column 2: Product */}
            <div id="footer-col-product" className="flex flex-col gap-3">
              <span id="footer-product-title" className="font-bold text-foreground text-xs uppercase tracking-wider">Product</span>
              <ul id="footer-product-links" className="flex flex-col gap-2 text-xs text-muted-foreground">
                <li><a href="#features-section" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing-section" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#faq-section" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div id="footer-col-resources" className="flex flex-col gap-3">
              <span id="footer-resources-title" className="font-bold text-foreground text-xs uppercase tracking-wider">Resources</span>
              <ul id="footer-resources-links" className="flex flex-col gap-2 text-xs text-muted-foreground">
                <li className="cursor-not-allowed hover:text-foreground transition-colors">Course Catalog</li>
                <li className="cursor-not-allowed hover:text-foreground transition-colors">Security Policies</li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div id="footer-col-company" className="flex flex-col gap-3">
              <span id="footer-company-title" className="font-bold text-foreground text-xs uppercase tracking-wider">Company</span>
              <ul id="footer-company-links" className="flex flex-col gap-2 text-xs text-muted-foreground">
                <li className="cursor-not-allowed hover:text-foreground transition-colors">About</li>
                <li className="cursor-not-allowed hover:text-foreground transition-colors">Contact</li>
              </ul>
            </div>
          </div>

          <div id="footer-bottom-divider" className="border-t border-border/60" />

          <div id="footer-bottom" className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span id="footer-copyright">&copy; 2026 Evalo Platforms. All rights reserved.</span>
            <div id="footer-legal-links" className="flex gap-6">
              <span className="cursor-not-allowed hover:text-foreground transition-colors">Terms of Service</span>
              <span className="cursor-not-allowed hover:text-foreground transition-colors">Privacy Policy</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
