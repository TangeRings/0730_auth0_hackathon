import React from 'react';
import { 
  Compass, 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  UserCheck, 
  FileText, 
  CreditCard, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenProjectBuilder: () => void;
  onOpenUpgradeModal: () => void;
  planSeatsUsed: number;
  maxSeats: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenProjectBuilder,
  onOpenUpgradeModal,
  planSeatsUsed,
  maxSeats
}) => {
  const isInstructor = currentRole === 'instructor' || currentRole === 'organization_admin';

  return (
    <header className="sticky top-0 z-40 bg-white backdrop-blur-md text-slate-800 border-b border-slate-200 shadow-sm">
      {/* Top Banner & Role Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Prototype Mode
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-slate-600 hidden sm:inline font-medium">Acme Academy Workspace</span>
        </div>

        {/* View As Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 border border-slate-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">View as</span>
          <div className="flex gap-1 text-xs font-semibold">
            <button
              onClick={() => {
                onRoleChange('instructor');
                if (activeTab === 'student-workspace') onTabChange('instructor-dashboard');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isInstructor
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Instructor
            </button>
            <button
              onClick={() => {
                onRoleChange('student');
                if (activeTab === 'instructor-dashboard' || activeTab === 'reviews') onTabChange('student-workspace');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                !isInstructor
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Student (Maya)
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onTabChange('landing')}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <span>B</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-800">BlueQ <span className="text-slate-400 font-medium text-base">Project Layer</span></span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500">
          <button
            onClick={() => onTabChange('landing')}
            className={`py-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'landing' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            Overview
          </button>

          {isInstructor && (
            <button
              onClick={() => onTabChange('instructor-dashboard')}
              className={`py-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'instructor-dashboard' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              Instructor Hub
            </button>
          )}

          <button
            onClick={() => onTabChange('course-view')}
            className={`py-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'course-view' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Course View
          </button>

          <button
            onClick={() => onTabChange('student-workspace')}
            className={`py-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'student-workspace' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-500" />
            Student Workspace
          </button>

          {isInstructor && (
            <button
              onClick={() => onTabChange('reviews')}
              className={`py-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'reviews' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-violet-500" />
              Reviews
            </button>
          )}

          <button
            onClick={() => onTabChange('portfolio')}
            className={`py-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'portfolio' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-500" />
            Portfolio
          </button>

          <button
            onClick={() => onTabChange('pricing')}
            className={`py-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'pricing' ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold' : 'hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4 text-rose-500" />
            Pricing
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {isInstructor && (
            <button
              onClick={onOpenProjectBuilder}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span className="hidden sm:inline">Add Project Track</span>
              <span className="sm:hidden">+ Track</span>
            </button>
          )}

          {/* Seat Usage Indicator / Upgrade */}
          <button
            onClick={onOpenUpgradeModal}
            className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 text-xs transition-colors font-medium"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Seats: <strong className="text-slate-900">{planSeatsUsed}/{maxSeats}</strong></span>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">Free</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer Bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 scrollbar-none text-xs">
        <button
          onClick={() => onTabChange('landing')}
          className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          Overview
        </button>
        {isInstructor && (
          <button
            onClick={() => onTabChange('instructor-dashboard')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'instructor-dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            Instructor Hub
          </button>
        )}
        <button
          onClick={() => onTabChange('course-view')}
          className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'course-view' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          Course View
        </button>
        <button
          onClick={() => onTabChange('student-workspace')}
          className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'student-workspace' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          Student Workspace
        </button>
        {isInstructor && (
          <button
            onClick={() => onTabChange('reviews')}
            className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            Reviews
          </button>
        )}
        <button
          onClick={() => onTabChange('portfolio')}
          className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'portfolio' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          Portfolio
        </button>
        <button
          onClick={() => onTabChange('pricing')}
          className={`px-2.5 py-1 rounded-md shrink-0 font-medium ${activeTab === 'pricing' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          Pricing
        </button>
      </div>
    </header>
  );
};
