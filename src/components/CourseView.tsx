import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Clock,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Course, LearningModule } from '../types';

interface CourseViewProps {
  course: Course;
  onOpenProjectBuilder: () => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ course, onOpenProjectBuilder }) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true,
    'mod-3': true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Course Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold uppercase tracking-wider">
            <span className="bg-blue-500/20 px-2.5 py-0.5 rounded border border-blue-400/30">Acme LMS Platform</span>
            <span>•</span>
            <span>6 Modules • 18 Video Lessons</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {course.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* Prominent Project Track CTA Box */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-300 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Project-Based Learning Layer</p>
                <p className="text-xs text-slate-300">Upgrade theoretical lectures with real user interviews & verified portfolios.</p>
              </div>
            </div>

            <button
              onClick={onOpenProjectBuilder}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 border border-blue-400/30 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Add a Real-World Project Track</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Modules Accordion List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-slate-900">Syllabus & Core Modules (6)</h2>
          <span className="text-xs text-slate-500">Standard LMS Curriculum</span>
        </div>

        {course.modules.map((mod) => {
          const isExpanded = !!expandedModules[mod.id];
          return (
            <div 
              key={mod.id} 
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
            >
              {/* Module Header Bar */}
              <div 
                onClick={() => toggleModule(mod.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                    0{mod.number}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">{mod.items.length} items</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Module Content Items */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-2.5">
                  {mod.items.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.type === 'video' && <Video className="w-4 h-4 text-blue-600" />}
                        {item.type === 'reading' && <FileText className="w-4 h-4 text-emerald-600" />}
                        {item.type === 'quiz' && <HelpCircle className="w-4 h-4 text-purple-600" />}
                        
                        <span className="font-semibold text-slate-800">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                        {item.completed ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
