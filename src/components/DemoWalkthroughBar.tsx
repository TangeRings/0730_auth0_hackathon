import React from 'react';
import { Sparkles, ArrowRight, CheckCircle, Play } from 'lucide-react';

interface DemoWalkthroughBarProps {
  currentStep: number;
  onNavigateStep: (stepNumber: number) => void;
}

const STEPS = [
  { id: 1, label: '1. Landing Page', tab: 'landing' },
  { id: 2, label: '2. Instructor Hub', tab: 'instructor-dashboard' },
  { id: 3, label: '3. Course Page', tab: 'course-view' },
  { id: 4, label: '4. AI Project Builder', tab: 'builder' },
  { id: 5, label: '5. Student Workspace', tab: 'student-workspace' },
  { id: 6, label: '6. Instructor Review', tab: 'reviews' },
  { id: 7, label: '7. Portfolio Generator', tab: 'portfolio' },
  { id: 8, label: '8. Pricing & Upgrade', tab: 'pricing' },
];

export const DemoWalkthroughBar: React.FC<DemoWalkthroughBarProps> = ({
  currentStep,
  onNavigateStep,
}) => {
  return (
    <div className="bg-slate-100 border-b border-slate-200 text-slate-700 py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
            <Play className="w-2.5 h-2.5 fill-current" />
          </div>
          <span className="font-bold text-slate-800">Guided Demo Flow:</span>
          <span className="text-slate-500 hidden sm:inline">Follow the product lifecycle sequence</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none max-w-full">
          {STEPS.map((s) => {
            const isActive = currentStep === s.id;
            const isPassed = currentStep > s.id;
            return (
              <button
                key={s.id}
                onClick={() => onNavigateStep(s.id)}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap flex items-center gap-1 text-[11px] ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : isPassed
                    ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    : 'bg-white/60 text-slate-500 hover:text-slate-800 border border-slate-200'
                }`}
              >
                {isPassed && <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />}
                {s.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            const next = currentStep >= 8 ? 1 : currentStep + 1;
            onNavigateStep(next);
          }}
          className="bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-200 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700 shrink-0"
        >
          Next Step <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
