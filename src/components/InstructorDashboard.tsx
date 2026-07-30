import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  ArrowUpRight, 
  Plus, 
  Award, 
  CreditCard, 
  UserPlus,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { Course, Cohort, ProjectTrack, StudentProject, Portfolio } from '../types';

interface InstructorDashboardProps {
  course: Course;
  cohort: Cohort;
  projectTrack: ProjectTrack;
  studentProjects: StudentProject[];
  portfolio: Portfolio;
  onOpenProjectBuilder: () => void;
  onSelectStudent: (studentId: string) => void;
  onOpenReviews: () => void;
  onOpenPortfolio: () => void;
  onOpenUpgradeModal: () => void;
  onGoToCourse: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  course,
  cohort,
  projectTrack,
  studentProjects,
  portfolio,
  onOpenProjectBuilder,
  onSelectStudent,
  onOpenReviews,
  onOpenPortfolio,
  onOpenUpgradeModal,
  onGoToCourse,
}) => {
  const pendingReviewsCount = studentProjects.filter(p => p.reviewStatus === 'Needs Review').length;
  const atRiskCount = studentProjects.filter(p => p.riskStatus !== 'On track').length;

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Course Meta Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <span className="bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">{course.title}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">{cohort.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Instructor Command Center
          </h1>
          <p className="text-xs text-slate-500">Manage AI project tracks, evaluate student evidence, and publish verified portfolios.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenProjectBuilder}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Add Project Track</span>
          </button>

          <button
            onClick={onOpenUpgradeModal}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Invite Student (+1)</span>
          </button>
        </div>
      </div>

      {/* Cohort Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Active Students */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Students</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">{cohort.totalStudents}</span>
            <span className="text-xs text-green-600 font-medium">+2 today</span>
          </div>
        </div>

        {/* Avg Completion */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Completion</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">{cohort.avgCompletionRate}%</span>
            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: `${cohort.avgCompletionRate}%` }}></div>
            </div>
          </div>
        </div>

        {/* Needing Attention */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 border-l-4 border-l-red-400">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Attention</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">{cohort.studentsNeedingAttention}</span>
            <span className="text-xs text-slate-400">Students at risk</span>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Plan</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">Free</span>
            <span className="text-xs text-indigo-600 font-medium">Starter</span>
          </div>
        </div>

        {/* Plan Seat Usage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors" onClick={onOpenUpgradeModal}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Seat Usage</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600">5 / 5</span>
            <span className="text-[10px] font-bold text-amber-600 uppercase">Limit Reached</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols wide): Active Track & Roster */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Project Track Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">{projectTrack.title}</h3>
                <p className="text-sm text-slate-500 max-w-lg">{projectTrack.objective}</p>
              </div>
              <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider shrink-0">
                AI-Customized
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                <span className="text-sm font-semibold text-slate-800">{projectTrack.durationWeeks} Weeks</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Industry</span>
                <span className="text-sm font-semibold text-slate-800">{projectTrack.industryContext}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Format</span>
                <span className="text-sm font-semibold text-slate-800">{projectTrack.format}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Effort</span>
                <span className="text-sm font-semibold text-slate-800">{projectTrack.estimatedHoursPerWeek} Hours</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Milestones</span>
                <button 
                  onClick={onOpenProjectBuilder}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Edit Track
                </button>
              </div>
              <div className="space-y-3">
                {projectTrack.milestones.map((m, idx) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      idx === 0 ? 'bg-green-100 text-green-600' : idx === 1 ? 'bg-indigo-100 text-indigo-600' : 'border border-slate-300 text-slate-400'
                    }`}>
                      {idx === 0 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      ) : idx === 1 ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      ) : (
                        <span className="text-[10px] font-bold">{m.weekNumber}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-700">{m.title}</span>
                        <span className="text-slate-400 text-[11px]">{m.deliverables.length} Deliverables</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Progress Overview Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Student Progress & Risk Roster</h3>
                <p className="text-xs text-slate-500">Monitored by BlueQ AI evidence telemetry</p>
              </div>
              <button 
                onClick={onOpenReviews}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Open Review Queue ({pendingReviewsCount}) <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {studentProjects.slice(0, 4).map((p) => {
                const isRisk = p.riskStatus !== 'On track';
                return (
                  <div 
                    key={p.id} 
                    onClick={() => onSelectStudent(p.id)}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.studentAvatar} alt={p.studentName} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.studentName}</p>
                        <p className="text-[11px] text-slate-500">Week {p.currentWeek} • {p.evidence.length} evidence uploads</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Risk Badge */}
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        p.riskStatus === 'On track'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : p.riskStatus === 'Waiting review'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {p.riskStatus}
                      </span>

                      {/* Progress Bar */}
                      <div className="w-24 hidden sm:block">
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
                          <span>Progress</span>
                          <span>{p.overallProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.overallProgress}%` }}></div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col wide): Action Cards */}
        <div className="space-y-6">
          
          {/* Instructor Reviews Queue Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">Pending Reviews</h3>
              </div>
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full">{pendingReviewsCount}</span>
            </div>
            <p className="text-xs text-slate-500">Students waiting for milestone sign-off and feedback.</p>
            
            <button
              onClick={onOpenReviews}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Review Submissions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Published Portfolios Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-600" />
                <h3 className="text-sm font-bold text-slate-900">Verified Portfolios</h3>
              </div>
              <span className="bg-cyan-50 text-cyan-700 text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-200">1 Published</span>
            </div>
            
            <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2">
                <img src={portfolio.studentAvatar} alt={portfolio.studentName} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-bold text-slate-800">{portfolio.studentName}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 ml-auto" />
              </div>
              <p className="text-[11px] font-semibold text-slate-700 truncate">{portfolio.projectTitle}</p>
            </div>

            <button
              onClick={onOpenPortfolio}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Maya’s Portfolio Showcase</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Plan Usage & Upgrade Notice */}
          <div className="p-5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl text-white space-y-3 shadow-lg shadow-indigo-900/20">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase opacity-80 tracking-widest">Plan Usage</span>
              <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">5/5 Seats</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="w-full h-full bg-white rounded-full"></div>
            </div>
            <p className="text-xs leading-relaxed opacity-90 font-medium">
              Unlock AI-Portfolio generation and unlimited project tracks with Cohort Pro.
            </p>
            <button
              onClick={onOpenUpgradeModal}
              className="w-full py-2.5 bg-white text-indigo-600 text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/20 active:scale-95 transition-transform"
            >
              Upgrade Workspace
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
