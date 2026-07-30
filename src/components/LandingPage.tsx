import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Award, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  BarChart3,
  ExternalLink,
  Target,
  FileCheck
} from 'lucide-react';

interface LandingPageProps {
  onCreateTrack: () => void;
  onViewStudentDemo: () => void;
  onGoToCourse: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateTrack,
  onViewStudentDemo,
  onGoToCourse,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-indigo-100/30 to-violet-200/30 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-indigo-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Introducing BlueQ Project Layer</span>
            <span className="w-1 h-1 rounded-full bg-indigo-300"></span>
            <span className="text-slate-500 font-normal">AI-Powered Experiential Education</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Turn any online course into a <span className="text-indigo-600">guided, real-world project</span> experience.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            BlueQ helps instructors customize project-based learning with AI, coordinate student progress, and turn completed work into verified portfolios.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onCreateTrack}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm group"
            >
              <Sparkles className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
              <span>Create a Project Track</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onViewStudentDemo}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Users className="w-4 h-4 text-slate-500" />
              <span>View Student Demo</span>
            </button>
          </div>
        </div>

        {/* Core Product Diagram */}
        <div className="mt-16 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/50 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">The BlueQ Experiential Loop</h3>
            <p className="text-sm text-slate-600 mt-1">Seamless bridge from theoretical lecture content to hiring-manager ready evidence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div 
              onClick={onGoToCourse}
              className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 text-center cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 font-bold group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">1. Course Content</h4>
              <p className="text-[11px] text-slate-500 mt-1">Lectures, quizzes & readings</p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={onCreateTrack}
              className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl p-4 text-center cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-2 font-bold group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">2. AI Project</h4>
              <p className="text-[11px] text-slate-500 mt-1">Customized weekly tracks</p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={onViewStudentDemo}
              className="bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl p-4 text-center cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold group-hover:scale-110 transition-transform">
                <FileCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">3. Student Evidence</h4>
              <p className="text-[11px] text-slate-500 mt-1">Interviews & reflections</p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center mx-auto mb-2 font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">4. Instructor Review</h4>
              <p className="text-[11px] text-slate-500 mt-1">AI-assisted milestone checks</p>
            </div>

            {/* Step 5 */}
            <div className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white rounded-xl p-4 text-center shadow-md">
              <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center mx-auto mb-2 font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold">5. Verified Portfolio</h4>
              <p className="text-[11px] text-blue-100 mt-1">Shareable proof of skill</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Project Architect</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Transform standard syllabus modules into structured, 4-week industry projects with customized milestones, deliverables, and rubrics in seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Risk & Cohort Telemetry</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Flag students missing raw interview notes or facing scope creep early. AI analyzes evidence completeness before human review.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Verified Student Case Studies</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Automatically convert raw student notes, user test videos, and prototype links into elegant, instructor-verified portfolio case studies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
