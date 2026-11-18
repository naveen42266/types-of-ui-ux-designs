import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESIGN_STYLES } from '../models/designStyles';
import { Clock, ArrowLeft, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

export const StyleShowcasePlaceholder: React.FC = () => {
  const { styleId } = useParams<{ styleId: string }>();
  
  const currentStyle = DESIGN_STYLES.find(
    (s) => s.id === styleId || s.route.replace('/', '') === styleId
  ) || {
    id: styleId || 'unknown',
    name: (styleId || 'Design').replace('-', ' ').toUpperCase(),
    tagline: 'Under active design & prototyping in the portfolio sequence',
    category: 'Next Paradigm',
    status: 'upcoming',
    description: 'This paradigm is planned in the upcoming phases of the portfolio showcase.',
    keyCharacteristics: ['Clean component primitives', 'Signature styling tokens', 'Full interactive playground'],
    route: `/${styleId}`,
    accentColor: '#2554EE',
  };

  return (
    <div className="min-h-[85vh] bg-[#E6ECF5] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#E6ECF5] rounded-[36px] p-8 sm:p-12 shadow-neu-flat border border-white/70 text-center relative overflow-hidden">
        
        {/* Category & Status Pill */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Planned in Portfolio Queue</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DEE7F2] text-[#64748B]">
            {currentStyle.category}
          </span>
        </div>

        {/* Title & Tagline */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight mb-3">
          {currentStyle.name}
        </h2>
        <p className="text-sm sm:text-base text-[#64748B] max-w-lg mx-auto mb-8 font-medium">
          {currentStyle.tagline}
        </p>

        {/* Feature Specs Card */}
        <div className="bg-[#E0E9F5] rounded-3xl p-6 text-left shadow-neu-pressed mb-8">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#7A889B]">
            <Palette className="w-4 h-4 text-[#2554EE]" />
            <span>Key Aesthetic Pillars</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentStyle.keyCharacteristics.map((trait, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#334155]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/skeuomorphism"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm shadow-neu-blue flex items-center justify-center gap-2 hover:scale-102 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Live Skeuomorphism Screen</span>
          </Link>
          <div className="text-xs text-[#8A99AD] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Next release ready soon</span>
          </div>
        </div>

      </div>
    </div>
  );
};

