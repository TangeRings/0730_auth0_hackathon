import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Copy, 
  Share2, 
  ExternalLink, 
  Edit3, 
  Check, 
  Sparkles, 
  FileText, 
  Quote, 
  ArrowRight,
  Layers,
  User,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { Portfolio, StudentProject } from '../types';

interface PortfolioGeneratorProps {
  portfolio: Portfolio;
  studentProject: StudentProject;
  onUpdatePortfolio: (updated: Portfolio) => void;
}

export const PortfolioGenerator: React.FC<PortfolioGeneratorProps> = ({
  portfolio,
  studentProject,
  onUpdatePortfolio,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPublicModal, setShowPublicModal] = useState(false);

  // Editable states
  const [projectTitle, setProjectTitle] = useState(portfolio.projectTitle);
  const [challenge, setChallenge] = useState(portfolio.projectChallenge);
  const [outcome, setOutcome] = useState(portfolio.finalOutcome);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolio.publishedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onUpdatePortfolio({
      ...portfolio,
      projectTitle,
      projectChallenge: challenge,
      finalOutcome: outcome,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">BlueQ Portfolio Transformation Engine</span>
            <span>•</span>
            <span className="text-slate-300">Raw Notes → Verified Case Study</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Student Portfolio Showcase</h1>
          <p className="text-xs text-slate-400">Transform unformatted student evidence and reflections into a verified public case study page.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 border border-slate-600"
          >
            <Edit3 className="w-4 h-4 text-slate-300" />
            <span>{isEditing ? 'Done Editing' : 'Edit Portfolio'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Public Link'}</span>
          </button>

          <button
            onClick={() => setShowPublicModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Globe className="w-4 h-4 text-slate-950" />
            <span>Preview Public Link</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen Demo Payoff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Raw Student Documentation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Raw Student Submissions
              </span>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">Unstructured Data</span>
            </div>

            {/* Raw Notes */}
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
                <p className="font-bold text-amber-300">1. Raw User Interview Notes</p>
                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  "Subject A: I spend 3 hours chasing $500 invoices.<br/>
                  Subject B: Need read receipts on PDFs.<br/>
                  Subject C: Late milestone payments."
                </p>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
                <p className="font-bold text-blue-300">2. Figma Prototype Link & Screenshot</p>
                <p className="text-slate-300 font-mono text-[11px] truncate">https://figma.com/proto/maya-paytrack-prototype-v1</p>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
                <p className="font-bold text-violet-300">3. Raw Student Reflection</p>
                <p className="text-slate-300 italic text-[11px] leading-relaxed">
                  "Pivoted from calendar scheduling to invoice payment transparency after 3 users complained about delayed cash flow."
                </p>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
                <p className="font-bold text-emerald-300">4. Dr. Nicole Wang Review Sign-Off</p>
                <p className="text-slate-300 text-[11px]">Approved Milestone 2 with praise on qualitative depth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Visually Impressive Generated Portfolio Preview */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Instructor Verified Badge */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-5 gap-3">
            <div className="flex items-center gap-3">
              <img src={portfolio.studentAvatar} alt={portfolio.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400" />
              <div>
                <h2 className="text-lg font-bold text-white">{portfolio.studentName}</h2>
                <p className="text-xs text-slate-400">Product Management Foundations Case Study</p>
              </div>
            </div>

            {/* Official Badge */}
            <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-400/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-cyan-300 fill-cyan-950" />
              <span className="text-xs font-extrabold text-cyan-200 tracking-wide">INSTRUCTOR VERIFIED</span>
            </div>
          </div>

          {/* Portfolio Main Title */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Verified Case Study</span>
            {isEditing ? (
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full text-2xl font-extrabold text-white bg-slate-900 p-2 rounded border border-slate-700"
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {projectTitle}
              </h1>
            )}
            <p className="text-xs text-slate-400">Verified by {portfolio.verifiedBy}</p>
          </div>

          {/* Section 1: Project Challenge */}
          <div className="space-y-2 border-l-2 border-cyan-500 pl-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">1. Project Challenge</h3>
            {isEditing ? (
              <textarea
                rows={3}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full text-xs text-slate-200 bg-slate-900 p-2 rounded border border-slate-700"
              />
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">{challenge}</p>
            )}
          </div>

          {/* Section 2: User Research & Quotes */}
          <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Quote className="w-4 h-4 text-cyan-400" />
              2. User Research & Evidence Grounding
            </h3>
            <p className="text-xs text-slate-300">{portfolio.userResearch.summary}</p>

            <div className="space-y-2 pt-1">
              {portfolio.userResearch.keyQuotes.map((q, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs italic text-cyan-200">
                  {q}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Key Insights */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">3. Key Insights</h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {portfolio.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Prototype Preview */}
          <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">4. Clickable Prototype</h3>
              <a href={portfolio.prototype.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono">
                View Figma Canvas <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-slate-300">{portfolio.prototype.description}</p>
            {portfolio.prototype.imageUrl && (
              <img src={portfolio.prototype.imageUrl} alt="Prototype" className="w-full h-48 object-cover rounded-xl border border-slate-700 shadow-md" />
            )}
          </div>

          {/* Section 5: Testing & Iteration */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">5. Testing & Iteration</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{portfolio.testingAndIteration}</p>
          </div>

          {/* Section 6: Final Outcome & Reflection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl space-y-1">
              <h4 className="text-xs font-bold text-emerald-300 uppercase">6. Final Outcome</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">{outcome}</p>
            </div>

            <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-xl space-y-1">
              <h4 className="text-xs font-bold text-indigo-300 uppercase">7. Student Reflection</h4>
              <p className="text-xs text-indigo-100 leading-relaxed italic">{portfolio.reflection}</p>
            </div>
          </div>

          {/* Save Edits Bar */}
          {isEditing && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
              >
                Save Portfolio Changes
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Preview Public Link Modal */}
      {showPublicModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold">Public Verified Portfolio URL</h3>
              </div>
              <button onClick={() => setShowPublicModal(false)} className="text-slate-400 hover:text-white">×</button>
            </div>

            <p className="text-xs text-slate-300">
              This public URL can be shared with hiring managers, recruiters, and LinkedIn connections as verified proof of product experience.
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 break-all">
              {portfolio.publishedUrl}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleCopyLink}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
