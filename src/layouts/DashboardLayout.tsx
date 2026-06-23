import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Clock, 
  BarChart3, 
  User as UserIcon, 
  Menu, 
  X, 
  Award,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { getCurrentUser, logoutUser } from '../lib/storage';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  // Dark mode handler
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const current = document.documentElement.classList.toggle('dark');
    setIsDark(current);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tests', path: '/tests', icon: BookOpen },
    { name: 'Attempts', path: '/attempts', icon: Clock },
    { name: 'Results', path: '/results', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-50">
        <div className="flex items-center gap-2" id="mobile-logo-wrap">
          <div className="p-1 rounded bg-primary text-primary-foreground">
            <Award className="h-5 w-5" />
          </div>
          <span className="font-heading font-semibold text-lg tracking-tight">Evalo</span>
          <span className="text-[10px] bg-secondary text-secondary-foreground font-medium px-1.5 py-0.5 rounded border border-border">NIELIT</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDark ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-card border-b border-border z-40 p-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-150">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path === '/results' && location.pathname.startsWith('/results'));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between px-3 py-1 text-xs text-muted-foreground">
              <span>{user.name}</span>
              <span>{user.rollNo}</span>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[calc(var(--destructive))] hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4 text-destructive" />
              <span className="text-destructive font-medium">Exit Platform</span>
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border shrink-0 sticky top-0 h-screen select-none">
        
        {/* Sidebar Header Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg leading-none tracking-tight">Evalo</h1>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium tracking-wide">CERTIFICATION TRACKS</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-8 w-8 rounded-md hover:bg-accent">
            {isDark ? <Sun className="h-3.5 w-3.5 text-foreground" /> : <Moon className="h-3.5 w-3.5 text-foreground" />}
          </Button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 my-3 bg-muted/65 rounded-xl border border-border/80 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-border">
            {(user.name || 'Student').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'S'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-foreground truncate">{user.name || 'Student'}</h4>
            <p className="text-[10px] text-muted-foreground font-mono truncate">{user.rollNo || 'N/A'}</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-3 flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Navigation Portal</span>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            // Handle active checks correctly
            const isActive = location.pathname === item.path || (item.path === '/results' && location.pathname.startsWith('/results'));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs transition-all duration-150 group ${
                  isActive 
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.name === 'Tests' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground group-hover:bg-card'} font-semibold border border-transparent`}>
                    6 Test
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border mt-auto flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="w-full justify-start text-[calc(var(--destructive))] hover:bg-destructive/10 hover:text-destructive h-8 text-xs font-medium"
          >
            <LogOut className="h-3.5 w-3.5 mr-2 shrink-0 text-destructive" />
            <span>Close Session</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        {/* Header content section containing context or breadcrumb */}
        <div className="hidden md:flex h-14 bg-card/90 backdrop-blur-md border-b border-border items-center justify-between px-8 py-3 sticky top-0 z-30 shadow-sm/5">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Evalo Certification Workspace</span>
            <span className="text-muted-foreground select-none">/</span>
            <span className="text-foreground font-semibold capitalize">
              {location.pathname.substring(1) || 'Landing'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded border border-border">
              SECURED CANDIDATE SESSION
            </span>
          </div>
        </div>
        
        {/* Main nested layout container */}
        <div className="p-4 md:p-8 flex-1 bg-background">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
