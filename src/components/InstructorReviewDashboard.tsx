import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Link as LinkIcon, 
  Check, 
  RotateCcw,
  User,
  ChevronRight
} from 'lucide-react';
import { StudentProject, InstructorReview } from '../types';

interface InstructorReviewDashboardProps {
  studentProjects: StudentProject[];
  onUpdateProject: (updated: StudentProject) => void;
  onNavigateToPortfolio: () => void;
}

export const InstructorReviewDashboard: React.FC<InstructorReviewDashboardProps> = ({
  studentProjects,
  onUpdateProject,
  onNavigateToPortfolio,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('sp-maya');
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  const selectedProject = studentProjects.find(p => p.id === selectedStudentId) || studentProjects[0];

  const handleApprove = () => {
    const feedbackText = feedbackInput.trim() || 'Approved! Excellent evidence synthesis and clear problem statement.';
    const newRev: InstructorReview = {
      id: `rev-${Date.now()}`,
      studentProjectId: selectedProject.id,
      milestoneId: `m-${selectedProject.currentWeek}`,
      instructorId: 'usr-nicole',
      status: 'approved',
      feedback: feedbackText,
      reviewedAt: 'Just now',
    };

    onUpdateProject({
      ...selectedProject,
      riskStatus: 'On track',
      reviewStatus: 'Approved',
      reviews: [newRev, ...selectedProject.reviews],
    });
    setFeedbackInput('');
  };

  const handleRequestRevision = () => {
    const feedbackText = feedbackInput.trim() || 'Please narrow your target user definition and add at least 2 raw user quotes before re-submitting.';
    const newRev: InstructorReview = {
      id: `rev-${Date.now()}`,
      studentProjectId: selectedProject.id,
      milestoneId: `m-${selectedProject.currentWeek}`,
      instructorId: 'usr-nicole',
      status: 'revision_requested',
      feedback: feedbackText,
      reviewedAt: 'Just now',
    };

    onUpdateProject({
      ...selectedProject,
      riskStatus: 'Scope alert',
      reviewStatus: 'Revision Requested',
      reviews: [newRev, ...selectedProject.reviews],
    });
    setFeedbackInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <span className="bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">AI Evidence Inspector</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Fall 2026 Cohort</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Instructor Review Dashboard</h1>
          <p className="text-xs text-slate-500">Evaluate student evidence, review AI risk telemetry, and sign off on milestone deliverables.</p>
        </div>

        <button
          onClick={onNavigateToPortfolio}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>View Generated Portfolios</span>
        </button>
      </div>

      {/* Main Dual Grid: Student Roster Table (Left) | Selected Inspector Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Student Roster List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Cohort Roster ({studentProjects.length})</h2>
            <span className="text-[11px] text-slate-400">Select to inspect</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {studentProjects.map((p) => {
              const isSelected = p.id === selectedStudentId;
              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedStudentId(p.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 text-xs ${
                    isSelected 
                      ? 'bg-blue-50/60 border-blue-400 ring-2 ring-blue-500/10 shadow-sm' 
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={p.studentAvatar} alt={p.studentName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-slate-900">{p.studentName}</p>
                        <p className="text-[10px] text-slate-500">Week {p.currentWeek} • {p.evidence.length} Evidence Items</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      p.riskStatus === 'On track' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : p.riskStatus === 'Waiting review'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {p.riskStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100/80 pt-2 font-mono">
                    <span>Progress: <strong>{p.overallProgress}%</strong></span>
                    <span className="text-slate-600 font-sans font-medium">{p.reviewStatus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Student Inspector Pane (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            {/* Student Meta Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <img src={selectedProject.studentAvatar} alt={selectedProject.studentName} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedProject.studentName}</h2>
                  <p className="text-xs text-slate-500">Current Milestone: Week {selectedProject.currentWeek} Opportunity Definition</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  selectedProject.riskStatus === 'On track' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  Status: {selectedProject.riskStatus}
                </span>
              </div>
            </div>

            {/* AI Telemetry Summary Box */}
            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Bot className="w-4 h-4 text-blue-300" />
                BlueQ AI Evidence Summary & Risk Analysis:
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedProject.studentName === 'Maya Chen' && 'Student submitted 3 detailed user interview transcripts with verbatim quotes identifying invoice transparency as the primary friction. High quality qualitative evidence.'}
                {selectedProject.studentName === 'Ethan Park' && 'Student survey has only 1 response. Missing required qualitative external user interview notes for Week 2 approval.'}
                {selectedProject.studentName === 'Sofia Martinez' && 'All 3 milestone evidence items complete with Notion prototype link and audio testing logs. Ready for final instructor sign-off.'}
                {selectedProject.studentName === 'Liam Johnson' && 'Project scope spans global supply chain, ocean freight, and agricultural billing. Recommended action: Request revision to narrow target user focus.'}
                {!['Maya Chen', 'Ethan Park', 'Sofia Martinez', 'Liam Johnson'].includes(selectedProject.studentName) && 'Student on schedule with complete evidence files.'}
              </p>
            </div>

            {/* Student Reflection Preview */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Student Reflection Statement</h3>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 italic leading-relaxed">
                "{selectedProject.reflectionText || 'No reflection submitted yet.'}"
              </div>
            </div>

            {/* Submitted Evidence Files */}
            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Submitted Evidence Items ({selectedProject.evidence.length})</h3>
              <div className="space-y-2">
                {selectedProject.evidence.map((ev) => (
                  <div key={ev.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{ev.title}</span>
                      <span className="text-[10px] text-slate-400">{ev.submittedAt}</span>
                    </div>
                    {ev.type === 'link' ? (
                      <a href={ev.content} target="_blank" rel="noreferrer" className="text-blue-600 font-mono text-[11px] hover:underline flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> {ev.content}
                      </a>
                    ) : (
                      <p className="text-slate-600 font-mono text-[11px] whitespace-pre-line">{ev.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Instructor Feedback & Decision Box */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Instructor Feedback & Decision Notes
                </label>
                <textarea
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="e.g. Great interview depth! Approved for Week 2."
                  className="w-full text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              {/* Approve vs Request Revision Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleRequestRevision}
                  className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Request Revision</span>
                </button>

                <button
                  onClick={handleApprove}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve Milestone</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
