import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DESIGN_STYLES } from '../models/designStyles';
import { Layers, Sparkles, Image as ImageIcon, X, CheckCircle2, ChevronRight } from 'lucide-react';
import sampleImage from '../assets/sample.jpg';

interface NavigationHeaderProps {
  onToggleSound?: () => void;
  soundEnabled?: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onToggleSound,
  soundEnabled = true,
}) => {
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const location = useLocation();

  const activeStyle = DESIGN_STYLES.find(
    (style) => style.route === location.pathname || (location.pathname === '/' && style.id === 'skeuomorphism')
  );

  const liveCount = DESIGN_STYLES.filter((s) => s.status === 'live').length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#E6ECF5]/90 backdrop-blur-md border-b border-[#D4DFED] px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Portfolio Title */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E6ECF5] shadow-neu-flat flex items-center justify-center text-[#2554EE]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-[#1E293B] tracking-tight">UI/UX Design Paradigms</h1>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                    Portfolio
                  </span>
                </div>
                <p className="text-xs text-[#7A889B] hidden sm:block">
                  Mastering modern design styles — currently viewing: <span className="font-semibold text-[#2554EE]">{activeStyle?.name || 'Skeuomorphism'}</span>
                </p>
              </div>
            </div>

            {/* Quick action buttons for mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowReferenceModal(true)}
                className="p-2 rounded-xl bg-[#E6ECF5] shadow-neu-flat active:shadow-neu-pressed text-xs font-medium text-[#4A5568] flex items-center gap-1.5"
                title="Compare with Sample"
              >
                <ImageIcon className="w-4 h-4 text-[#2554EE]" />
              </button>
            </div>
          </div>

          {/* Right Controls: Comparison Button & Sound */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowReferenceModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#E6ECF5] shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed text-xs font-semibold text-[#334155] flex items-center gap-2 transition-all cursor-pointer border border-white/60"
            >
              <ImageIcon className="w-4 h-4 text-[#2554EE]" />
              <span>Reference UI (sample.jpg)</span>
            </button>

            {onToggleSound && (
              <button
                onClick={onToggleSound}
                className="px-3 py-1.5 rounded-xl bg-[#E6ECF5] shadow-neu-flat active:shadow-neu-pressed text-xs font-medium text-[#64748B] flex items-center gap-1.5 transition-all cursor-pointer border border-white/60"
                title="Tactile Feedback Sound"
              >
                <span>Tactile Audio:</span>
                <span className={`font-bold ${soundEnabled ? 'text-[#2554EE]' : 'text-slate-400'}`}>
                  {soundEnabled ? 'ON' : 'OFF'}
                </span>
              </button>
            )}

            <div className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-xl bg-[#DEE7F2] text-[11px] font-medium text-[#64748B]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{liveCount} / {DESIGN_STYLES.length} Live</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Design Paradigms Carousel / Pill Bar */}
        <div className="max-w-7xl mx-auto mt-3 overflow-x-auto scrollbar-hidden pb-1">
          <div className="flex items-center gap-2 min-w-max">
            {DESIGN_STYLES.map((style) => {
              const isCurrent =
                location.pathname === style.route ||
                (location.pathname === '/' && style.id === 'skeuomorphism');

              return (
                <NavLink
                  key={style.id}
                  to={style.route}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-neu-blue font-semibold scale-102'
                      : 'bg-[#E6ECF5] text-[#5A6A80] shadow-neu-badge hover:text-[#1E293B] hover:shadow-neu-flat'
                  }`}
                >
                  <span>{style.name}</span>
                  {style.status === 'live' ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-bold tracking-wider ${
                        isCurrent ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      Live
                    </span>
                  ) : (
                    <span className="text-[9px] px-1 py-0.2 text-[#8C9AA8] font-normal">
                      Plan
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Reference Image Modal */}
      {showReferenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#E6ECF5] rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-white/70 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4DFED]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2554EE]" />
                <h3 className="font-bold text-lg text-[#1E293B]">Sample Reference Design</h3>
                <span className="text-xs text-[#7A889B]">(src/assets/sample.jpg)</span>
              </div>
              <button
                onClick={() => setShowReferenceModal(false)}
                className="w-9 h-9 rounded-full bg-[#E6ECF5] shadow-neu-flat active:shadow-neu-pressed flex items-center justify-center text-[#64748B] hover:text-[#1E293B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 overflow-y-auto rounded-2xl bg-slate-900/10 p-2 flex items-center justify-center">
              <img
                src={sampleImage}
                alt="Target UI Reference"
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-md"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#64748B]">
              <p>Compare the visual hierarchy, shadows, interactive controls, and widgets implemented in your portfolio screen.</p>
              <button
                onClick={() => setShowReferenceModal(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-neu-blue flex items-center gap-1"
              >
                <span>Back to UI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

