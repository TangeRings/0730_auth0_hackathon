import React, { useState } from 'react';
import { 
  Check, 
  Zap, 
  X, 
  CreditCard, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface PricingPageProps {
  onUpgradeStripe: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onUpgradeStripe }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
          BlueQ Workspace Plans
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Scalable Project-Based Learning for Every Cohort
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Upgrade your online course from passive lecture watching to verified real-world project portfolios.
        </p>
      </div>

      {/* Pricing Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Free Plan */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Free Tier</h3>
            <p className="text-xs text-slate-500">Perfect for testing BlueQ on an initial pilot group.</p>
            <div className="pt-2">
              <span className="text-3xl font-extrabold text-slate-900">$0</span>
              <span className="text-xs text-slate-500"> / forever free</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4 text-xs">
            <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Included Features:</p>
            <ul className="space-y-2.5 text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 course</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5 active students</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 project track</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Basic progress tracking</span>
              </li>
            </ul>
          </div>

          <button
            disabled
            className="w-full bg-slate-100 text-slate-400 font-semibold text-xs py-3 rounded-xl cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* Cohort Pro Plan */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl border-2 border-blue-500 p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            Most Popular
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Cohort Pro</span>
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h3>
            <p className="text-xs text-slate-300">For university courses, bootcamps, and professional programs.</p>
            <div className="pt-2">
              <span className="text-4xl font-extrabold text-white">$29</span>
              <span className="text-xs text-slate-400"> / month per instructor</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
            <p className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">Pro Features Included:</p>
            <ul className="space-y-2.5 text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Up to 30 active students</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Unlimited project tracks</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>AI project customization</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified portfolio generation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instructor analytics & risk telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Custom institution branding</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onUpgradeStripe}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Upgrade to Cohort Pro with Stripe</span>
          </button>
        </div>

      </div>
    </div>
  );
};

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpgrade: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onConfirmUpgrade,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleStripeClick = () => {
    setIsProcessing(true);
    // Simulate real Stripe checkout redirect and return callback
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleFinishSuccess = () => {
    setShowSuccess(false);
    onConfirmUpgrade();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xl max-w-md w-full space-y-6 text-slate-900 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {!showSuccess ? (
          <>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
                <Users className="w-6 h-6" />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Workspace Limit Reached
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Your free workspace supports five active students. Upgrade to <strong>Cohort Pro</strong> to add this student and unlock AI portfolio generation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Cohort Pro Plan</span>
                <span className="text-blue-600">$29 / month</span>
              </div>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Up to 30 active students</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> AI portfolio generation & verification</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited project tracks</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleStripeClick}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Connecting to Stripe Checkout...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Upgrade with Stripe ($29/mo)</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="w-full text-slate-500 hover:text-slate-800 font-semibold text-xs py-2"
              >
                Not now
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Welcome to Cohort Pro!
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your workspace seat limit has been expanded to 30 students and all AI portfolio generation features are now unlocked.
            </p>

            <button
              onClick={handleFinishSuccess}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow"
            >
              Return to Workspace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
