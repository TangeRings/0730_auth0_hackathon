import React, { useState } from 'react';
import { 
  UserCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Upload, 
  Link as LinkIcon, 
  FileText, 
  Bot, 
  Send, 
  MessageSquare, 
  Sparkles, 
  AlertCircle, 
  Check, 
  ExternalLink,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { StudentProject, ProjectTrack, Evidence } from '../types';

interface StudentWorkspaceProps {
  studentProject: StudentProject;
  projectTrack: ProjectTrack;
  onUpdateProject: (updated: StudentProject) => void;
  onRequestReview: () => void;
  onNavigateToPortfolio: () => void;
}

export const StudentWorkspace: React.FC<StudentWorkspaceProps> = ({
  studentProject,
  projectTrack,
  onUpdateProject,
  onRequestReview,
  onNavigateToPortfolio,
}) => {
  const [reflectionInput, setReflectionInput] = useState(studentProject.reflectionText);
  const [isSavingReflection, setIsSavingReflection] = useState(false);
  const [showAddEvidenceModal, setShowAddEvidenceModal] = useState(false);
  
  // New Evidence Modal Form
  const [evTitle, setEvTitle] = useState('');
  const [evType, setEvType] = useState<'text' | 'link' | 'file'>('text');
  const [evContent, setEvContent] = useState('');

  // Agent Chat prompt state
  const [chatInput, setChatInput] = useState('');

  const toggleTask = (taskId: string) => {
    const exists = studentProject.completedTaskIds.includes(taskId);
    const newTasks = exists 
      ? studentProject.completedTaskIds.filter(id => id !== taskId)
      : [...studentProject.completedTaskIds, taskId];

    // Calculate progress roughly
    const totalTasks = projectTrack.milestones.flatMap(m => m.tasks).length;
    const progress = Math.round((newTasks.length / totalTasks) * 100);

    onUpdateProject({
      ...studentProject,
      completedTaskIds: newTasks,
      overallProgress: progress,
    });
  };

  const handleSaveReflection = () => {
    setIsSavingReflection(true);
    setTimeout(() => {
      setIsSavingReflection(false);
      onUpdateProject({
        ...studentProject,
        reflectionText: reflectionInput,
      });
    }, 600);
  };

  const handleAddEvidence = () => {
    if (!evTitle || !evContent) return;
    const newEv: Evidence = {
      id: `ev-${Date.now()}`,
      studentProjectId: studentProject.id,
      milestoneId: `m-${studentProject.currentWeek}`,
      title: evTitle,
      type: evType === 'file' ? 'text' : evType,
      content: evContent,
      submittedAt: 'Just now',
    };

    onUpdateProject({
      ...studentProject,
      evidence: [newEv, ...studentProject.evidence],
    });

    setEvTitle('');
    setEvContent('');
    setShowAddEvidenceModal(false);
  };

  const handleSendAgentMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');

    const newLogs = [
      ...studentProject.agentGuidanceLogs,
      { sender: 'student' as const, text: userMsg, timestamp: 'Just now' }
    ];

    onUpdateProject({
      ...studentProject,
      agentGuidanceLogs: newLogs,
    });

    // Contextual AI Agent response simulation
    setTimeout(() => {
      let agentReply = "That's a solid observation. Ensure you document this explicitly in your Week 2 reflection before requesting Dr. Nicole Wang’s review.";
      if (userMsg.toLowerCase().includes('interview') || userMsg.toLowerCase().includes('evidence')) {
        agentReply = "Your interview logs highlight delayed payments clearly. Make sure to link your Figma value proposition map to fulfill Milestone 2 deliverables.";
      }

      onUpdateProject({
        ...studentProject,
        agentGuidanceLogs: [
          ...newLogs,
          { sender: 'agent' as const, text: agentReply, timestamp: 'Just now' }
        ],
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Student Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={studentProject.studentAvatar} 
              alt={studentProject.studentName} 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">{studentProject.studentName}</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                  Student View
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Course: Product Management Foundations • Instructor: <strong className="text-slate-700">{studentProject.instructorName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddEvidenceModal(true)}
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Add Evidence</span>
            </button>

            <button
              onClick={onRequestReview}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-blue-200" />
              <span>Request Instructor Review</span>
            </button>
          </div>
        </div>

        {/* Project Context & Progress Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-[10px] uppercase font-bold text-slate-400">Project Track</p>
            <p className="font-bold text-slate-900 mt-0.5 truncate">{projectTrack.title}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-[10px] uppercase font-bold text-slate-400">Current Phase</p>
            <p className="font-bold text-blue-700 mt-0.5">Week {studentProject.currentWeek} of {projectTrack.durationWeeks}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-[10px] uppercase font-bold text-slate-400">Next Deadline</p>
            <p className="font-bold text-slate-800 mt-0.5 truncate">{studentProject.nextDeadline}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <p className="text-[10px] uppercase font-bold text-slate-400">Overall Progress</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${studentProject.overallProgress}%` }}></div>
              </div>
              <span className="font-bold text-slate-900">{studentProject.overallProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column Tasks & Evidence | Right Column AI Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Milestone Timeline & Interactive Task Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Milestone Tasks & Checkpoints</h3>
                <p className="text-xs text-slate-500">Check off deliverables as you gather real user evidence</p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-100">
                Week {studentProject.currentWeek} Active
              </span>
            </div>

            <div className="space-y-4">
              {projectTrack.milestones.map((m) => {
                const isCurrentWeek = m.weekNumber === studentProject.currentWeek;
                const isCompletedWeek = m.weekNumber < studentProject.currentWeek;
                return (
                  <div 
                    key={m.id} 
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrentWeek
                        ? 'bg-blue-50/30 border-blue-300 ring-2 ring-blue-500/10'
                        : isCompletedWeek
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                      {isCompletedWeek && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Completed</span>
                      )}
                    </div>

                    <div className="space-y-2 pt-1">
                      {m.tasks.map((task, idx) => {
                        const isDone = studentProject.completedTaskIds.includes(task);
                        return (
                          <div 
                            key={idx}
                            onClick={() => toggleTask(task)}
                            className="flex items-start gap-2.5 cursor-pointer select-none group text-xs"
                          >
                            <div className="mt-0.5">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                              )}
                            </div>
                            <span className={`text-slate-700 ${isDone ? 'line-through text-slate-400' : 'group-hover:text-slate-900'}`}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submitted Evidence Locker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Submitted Evidence Locker ({studentProject.evidence.length})</h3>
                <p className="text-xs text-slate-500">Raw interview notes, Figma prototypes, and user recordings</p>
              </div>

              <button
                onClick={() => setShowAddEvidenceModal(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Upload Evidence
              </button>
            </div>

            <div className="space-y-3">
              {studentProject.evidence.map((ev) => (
                <div key={ev.id} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ev.title}</span>
                    <span className="text-[10px] text-slate-400">{ev.submittedAt}</span>
                  </div>

                  {ev.type === 'link' ? (
                    <a 
                      href={ev.content} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-blue-600 font-mono text-[11px] hover:underline flex items-center gap-1 truncate"
                    >
                      <LinkIcon className="w-3 h-3" />
                      {ev.content}
                    </a>
                  ) : (
                    <p className="text-slate-600 text-[11px] whitespace-pre-line leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/80 font-mono">
                      {ev.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Student Reflection Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Weekly Student Reflection</h3>
                <p className="text-xs text-slate-500">Explain what changed between your hypothesis and user evidence</p>
              </div>

              <button
                onClick={handleSaveReflection}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-all"
              >
                {isSavingReflection ? 'Saving...' : 'Save Reflection'}
              </button>
            </div>

            <textarea
              rows={4}
              value={reflectionInput}
              onChange={(e) => setReflectionInput(e.target.value)}
              placeholder="Record your interview findings and prototype iterations here..."
              className="w-full text-xs text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none leading-relaxed"
            />
          </div>

        </div>

        {/* Right Column (1 Col wide): Contextual Agent Guidance & Instructor Feedback */}
        <div className="space-y-6">
          
          {/* Agent Guidance Panel (Contextual Assistant) */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Bot className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">BlueQ Project Coach</h3>
                  <p className="text-[10px] text-slate-400">Contextual Evidence Telemetry</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Contextual Guidance Callout Box explicitly matching Prompt */}
            <div className="bg-blue-950/80 border border-blue-500/30 p-3.5 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Contextual Analysis Prompt:
              </div>
              <p className="text-blue-100 text-[11px] leading-relaxed italic">
                "Your interviews describe several frustrations, but the evidence is still broad. Which problem appeared consistently across at least two interviews?"
              </p>
            </div>

            {/* Agent Chat Stream */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
              {studentProject.agentGuidanceLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl space-y-1 ${
                    log.sender === 'agent' 
                      ? 'bg-slate-800 text-slate-200 border border-slate-700/60 ml-0 mr-4' 
                      : 'bg-blue-600 text-white ml-4 mr-0'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75">
                    <span>{log.sender === 'agent' ? 'BlueQ Coach' : 'Maya Chen'}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{log.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAgentMessage()}
                placeholder="Ask coach about evidence or synthesis..."
                className="flex-1 bg-slate-800 text-xs text-white px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
              />
              <button
                onClick={handleSendAgentMessage}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Instructor Comments History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Instructor Reviews</h3>

            {studentProject.reviews.length > 0 ? (
              studentProject.reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{studentProject.instructorName}</span>
                    <span className="text-[10px] text-slate-400">{rev.reviewedAt}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{rev.feedback}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No instructor comments yet.</p>
            )}
          </div>

        </div>

      </div>

      {/* Add Evidence Modal */}
      {showAddEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Project Evidence</h3>
              <button onClick={() => setShowAddEvidenceModal(false)} className="text-slate-400 hover:text-slate-700">
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Evidence Title</label>
                <input
                  type="text"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  placeholder="e.g. 2 User Interview Transcripts"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Type</label>
                <select
                  value={evType}
                  onChange={(e) => setEvType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none mt-1 bg-white"
                >
                  <option value="text">Raw Text / Notes</option>
                  <option value="link">Figma / Loom / Web Link</option>
                  <option value="file">File Upload / Screenshot</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Evidence Content or URL</label>
                <textarea
                  rows={3}
                  value={evContent}
                  onChange={(e) => setEvContent(e.target.value)}
                  placeholder="Paste quotes, transcripts, or URL..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddEvidenceModal(false)}
                className="text-xs text-slate-600 hover:text-slate-900 px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvidence}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl"
              >
                Upload Evidence
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
