import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Check, 
  RefreshCw, 
  Layers, 
  Clock, 
  Users, 
  FileText, 
  Calendar, 
  Briefcase,
  ChevronRight,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { ProjectTrack } from '../types';

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproveAndPublish: (track: ProjectTrack) => void;
  initialTrack: ProjectTrack;
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  onApproveAndPublish,
  initialTrack,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1 Form Fields
  const [goal, setGoal] = useState('Validate a product idea with real users');
  const [level, setLevel] = useState('Intermediate');
  const [industry, setIndustry] = useState('Open choice');
  const [format, setFormat] = useState<'Individual' | 'Team'>('Individual');
  const [duration, setDuration] = useState(4);
  const [weeklyEffort, setWeeklyEffort] = useState('3–4 hours');

  // Step 2 Editable Generated Track
  const [trackTitle, setTrackTitle] = useState(initialTrack.title);
  const [objective, setObjective] = useState(initialTrack.objective);
  const [finalDeliverable, setFinalDeliverable] = useState(initialTrack.finalDeliverable);
  const [milestones, setMilestones] = useState(initialTrack.milestones);
  const [requiredEvidence, setRequiredEvidence] = useState(initialTrack.requiredEvidence);
  const [rubric, setRubric] = useState(initialTrack.rubric);

  if (!isOpen) return null;

  const handleGenerateProject = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 1200);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Slight variation simulation
      setTrackTitle('Validate a Real Product Opportunity (AI Refined)');
      setObjective('Students conduct qualitative interviews with target users, extract core pain points, develop a low-fidelity clickable prototype, and execute user testing for actionable iterations.');
    }, 1000);
  };

  const handleSave = () => {
    const updatedTrack: ProjectTrack = {
      ...initialTrack,
      title: trackTitle,
      goal,
      level,
      industry,
      format,
      durationWeeks: duration,
      weeklyEffortHours: weeklyEffort,
      objective,
      milestones,
      requiredEvidence,
      finalDeliverable,
      rubric,
      published: true,
    };
    onApproveAndPublish(updatedTrack);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Sparkles className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Project Track Architect</h2>
              <p className="text-xs text-slate-400">Step {step} of 2 — {step === 1 ? 'Project Context & Constraints' : 'Review & Customize AI Output'}</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {step === 1 ? (
            /* STEP 1: Context Form */
            <div className="space-y-6">
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 text-xs text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-blue-800">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Define Course Context
                </p>
                <p className="text-blue-700/90 leading-relaxed">
                  BlueQ AI converts your lecture syllabus into a customized real-world project track matching your students' background and course duration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Project Goal */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Project Goal</label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="e.g. Validate a product idea with real users"
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Student Experience Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Beginner">Beginner (Introductory)</option>
                    <option value="Intermediate">Intermediate (Undergrad / Early Pro)</option>
                    <option value="Advanced">Advanced (Graduate / Executive)</option>
                  </select>
                </div>

                {/* Industry Domain */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Industry or Domain</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="e.g. Open choice, EdTech, SaaS"
                  />
                </div>

                {/* Format */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Individual or Team</label>
                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={format === 'Individual'}
                        onChange={() => setFormat('Individual')}
                        className="text-blue-600"
                      />
                      <span>Individual Project</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={format === 'Team'}
                        onChange={() => setFormat('Team')}
                        className="text-blue-600"
                      />
                      <span>Team Cohort</span>
                    </label>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Project Duration (Weeks)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value={2}>2 Weeks</option>
                    <option value={4}>4 Weeks (Standard)</option>
                    <option value={6}>6 Weeks</option>
                    <option value={8}>8 Weeks</option>
                  </select>
                </div>

                {/* Weekly Effort */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Expected Weekly Effort</label>
                  <input
                    type="text"
                    value={weeklyEffort}
                    onChange={(e) => setWeeklyEffort(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    placeholder="e.g. 3–4 hours"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Generated Track Customization */
            <div className="space-y-6">
              
              {/* Track Title & Objective */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded">AI Generated Project Title</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Edit3 className="w-3 h-3" /> Editable</span>
                </div>
                
                <input
                  type="text"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  className="w-full text-lg font-bold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />

                <div>
                  <label className="text-xs font-bold text-slate-700">Project Objective</label>
                  <textarea
                    rows={2}
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500/20 outline-none mt-1"
                  />
                </div>
              </div>

              {/* Milestones Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Milestone Breakdown (4 Weeks)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {milestones.map((m, index) => (
                    <div key={m.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-blue-700">{m.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Week {m.weekNumber}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold text-slate-700">Key Tasks:</p>
                        <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                          {m.tasks.map((t, idx) => (
                            <li key={idx} className="truncate">{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Evidence & Final Deliverable */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-800">Required Student Evidence</h4>
                  <ul className="space-y-1 text-slate-600">
                    {requiredEvidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-800">Evaluation Rubric Criteria</h4>
                  <div className="space-y-1 text-[11px] text-slate-600">
                    {rubric.map((r, i) => (
                      <p key={i}>• <strong>{r.criteria}:</strong> {r.description}</p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between gap-4">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleGenerateProject}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Generating Track...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Generate AI Project Track</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-4 py-2"
              >
                ← Back to Constraints
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate with AI</span>
                </button>

                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve and Publish</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
