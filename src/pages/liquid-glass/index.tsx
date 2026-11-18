import React, { useState, useRef } from 'react';
import {
  Mail,
  Eye,
  EyeOff,
  Plus,
  Share2,
  ChevronDown,
  Download,
  Home,
  Calendar,
  Bell,
  Settings,
  ArrowUp,
  Check,
  Droplets,
  Sparkles,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';
import oceanCausticsImg from '../../assets/liquid-daylight-prism.png';
import studioPrismImg from '../../assets/liquid-aurora-waves.png';

type LiquidSceneKey = 'caustics' | 'studio' | 'aurora';

interface LiquidSceneConfig {
  label: string;
  bgImage?: string;
  canvasBg: string;
  orb1: string;
  orb2: string;
  orb3: string;
  wave1: [string, string, string];
  wave2: [string, string, string];
  ctaGradient: string;
  pillGradient: string;
}

const FLOATING_BUBBLES = [
  { left: '8%', bottom: '8%', size: 42, delay: '0s', duration: '11s' },
  { left: '22%', bottom: '14%', size: 24, delay: '-3s', duration: '9.5s' },
  { left: '38%', bottom: '5%', size: 54, delay: '-6s', duration: '13s' },
  { left: '58%', bottom: '10%', size: 32, delay: '-2s', duration: '10.5s' },
  { left: '74%', bottom: '6%', size: 46, delay: '-7.5s', duration: '12s' },
  { left: '88%', bottom: '16%', size: 28, delay: '-4.5s', duration: '9s' },
] as const;

const LIQUID_SCENES: Record<LiquidSceneKey, LiquidSceneConfig> = {
  caustics: {
    label: 'Ocean Caustics',
    bgImage: oceanCausticsImg,
    canvasBg: 'linear-gradient(135deg, #064E6B 0%, #0284C7 55%, #0F766E 100%)',
    orb1: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #67E8F9 32%, #06B6D4 65%, rgba(14,116,144,0.18) 100%)',
    orb2: 'radial-gradient(circle at 60% 35%, #FEF08A 0%, #38BDF8 35%, #0284C7 72%, rgba(14,116,144,0.2) 100%)',
    orb3: 'radial-gradient(circle at 45% 40%, #A7F3D0 0%, #2DD4BF 35%, #0EA5E9 74%, transparent 100%)',
    wave1: ['#A5F3FC', '#FFFFFF', '#38BDF8'],
    wave2: ['#5EEAD4', '#38BDF8', '#0284C7'],
    ctaGradient:
      'linear-gradient(145deg, rgba(34,211,238,0.92) 0%, rgba(14,165,233,0.95) 55%, rgba(37,99,235,0.92) 100%)',
    pillGradient: 'linear-gradient(145deg, rgba(34,211,238,0.92) 0%, rgba(2,132,199,0.96) 100%)',
  },
  studio: {
    label: 'Studio 3D Orbs',
    bgImage: studioPrismImg,
    canvasBg: 'linear-gradient(135deg, #0A1845 0%, #1E1B4B 52%, #0E7490 100%)',
    orb1: 'radial-gradient(circle at 35% 30%, #FFFBEB 0%, #FDE047 34%, #FB7185 68%, rgba(190,18,60,0.2) 100%)',
    orb2: 'radial-gradient(circle at 65% 35%, #FFFFFF 0%, #38BDF8 34%, #2563EB 72%, rgba(30,58,138,0.2) 100%)',
    orb3: 'radial-gradient(circle at 45% 40%, #A5F3FC 0%, #34D399 38%, #F43F5E 75%, transparent 100%)',
    wave1: ['#FDE047', '#FFFFFF', '#FB7185'],
    wave2: ['#22D3EE', '#F472B6', '#FBBF24'],
    ctaGradient:
      'linear-gradient(145deg, rgba(244,63,94,0.92) 0%, rgba(168,85,247,0.94) 55%, rgba(14,165,233,0.92) 100%)',
    pillGradient: 'linear-gradient(145deg, rgba(251,113,133,0.92) 0%, rgba(124,58,237,0.95) 100%)',
  },
  aurora: {
    label: 'Aurora Silk',
    canvasBg:
      'radial-gradient(circle at 15% 18%, #0EA5E9 0%, transparent 45%), radial-gradient(circle at 85% 20%, #8B5CF6 0%, transparent 46%), radial-gradient(circle at 72% 84%, #10B981 0%, transparent 48%), linear-gradient(135deg, #041C32 0%, #0A3A5E 45%, #1E1B4B 100%)',
    orb1: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #67E8F9 32%, #06B6D4 65%, rgba(14,116,144,0.18) 100%)',
    orb2: 'radial-gradient(circle at 60% 35%, #FDE68A 0%, #F472B6 30%, #7C3AED 68%, rgba(49,46,129,0.2) 100%)',
    orb3: 'radial-gradient(circle at 45% 40%, #A7F3D0 0%, #2DD4BF 35%, #2563EB 74%, transparent 100%)',
    wave1: ['#67E8F9', '#FFFFFF', '#E879F9'],
    wave2: ['#34D399', '#38BDF8', '#A855F7'],
    ctaGradient:
      'linear-gradient(145deg, rgba(56,189,248,0.92) 0%, rgba(37,99,235,0.94) 55%, rgba(124,58,237,0.9) 100%)',
    pillGradient: 'linear-gradient(145deg, rgba(34,211,238,0.9) 0%, rgba(37,99,235,0.95) 100%)',
  },
};

export const LiquidGlass: React.FC = () => {
  const [sceneKey, setSceneKey] = useState<LiquidSceneKey>('caustics');
  const scene = LIQUID_SCENES[sceneKey];

  // Pointer optical spotlight coordinates (%)
  const [pointer, setPointer] = useState({ x: 50, y: 35 });

  // Login Form States
  const [email, setEmail] = useState('username@mail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Quick Navigation Active Tab
  const [activeNav, setActiveNav] = useState<'home' | 'calender' | 'notification' | 'setting'>('home');

  // Toggle Switch State
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  // Main Slider Value (71% default as in sample.jpg)
  const [sliderValue, setSliderValue] = useState(71);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Buttons State
  const [friendCount, setFriendCount] = useState(14);
  const [category, setCategory] = useState('Select Category');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  // Mountain Chart Bottom Slider
  const [chartTimeline, setChartTimeline] = useState(65);

  // Timeline Stepper Year
  const [activeYear, setActiveYear] = useState<2019 | 2020 | 2021 | 2022>(2019);

  // Notification Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const handleAction = (type: 'click' | 'toggle' | 'slider' | 'success', fn?: () => void) => {
    playTactileClick(type);
    if (fn) fn();
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.round(Math.min(Math.max((clickX / rect.width) * 100, 5), 95));
    setSliderValue(percent);
    playTactileClick('slider');
  };

  const handleDownload = () => {
    handleAction('click');
    if (downloadProgress !== null) return;
    setDownloadProgress(10);
    triggerToast('Condensing fluid asset droplet...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Complete: UI-Kit-LiquidGlass.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPointer({ x, y });
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  // Fluid mountain crest scaling based on chartTimeline slider
  const peakScale = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTipY = Math.round(135 - 115 * peakScale);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-slate-900 transition-colors duration-700"
      style={{ background: scene.canvasBg }}
    >
      {/* Crisp Studio Raster Wallpaper (Animated gentle optical drift) or Silk Vector Scene */}
      {scene.bgImage ? (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <img
            src={scene.bgImage}
            alt=""
            aria-hidden="true"
            className="animate-liquid-bg w-full h-full object-cover opacity-95"
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 55%), linear-gradient(180deg, rgba(2,12,32,0.12) 0%, rgba(2,12,32,0.34) 100%)',
            }}
          />
        </div>
      ) : (
        <div
          className="pointer-events-none fixed inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.65) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
      )}

      {/* Pointer-Tracking Luminous Optical Caustic Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(560px circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.22) 0%, rgba(103,232,249,0.09) 35%, transparent 72%)`,
        }}
      />

      {/* Rising Liquid Micro-Droplets & Sculpted Wave Orbs behind Glass Cards */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {FLOATING_BUBBLES.map((b, i) => (
          <div
            key={i}
            className="animate-liquid-bubble absolute rounded-full liquid-droplet"
            style={{
              left: b.left,
              bottom: b.bottom,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          />
        ))}

        {!scene.bgImage && (
          <>
            {/* Sharp Glossy 3D Spheres (unblurred so glass rims visually refract them) */}
            <div
              className="animate-liquid-drift absolute -top-10 left-[6%] w-[300px] h-[300px] rounded-full shadow-[0_24px_60px_rgba(0,0,0,0.35)] opacity-85"
              style={{ background: scene.orb1 }}
            />
            <div
              className="animate-liquid-drift absolute top-[24%] right-[4%] w-[360px] h-[360px] rounded-full shadow-[0_24px_60px_rgba(0,0,0,0.35)] opacity-80"
              style={{ animationDelay: '-4.5s', background: scene.orb2 }}
            />
            <div
              className="animate-liquid-drift absolute -bottom-16 left-[34%] w-[420px] h-[340px] rounded-full shadow-[0_24px_60px_rgba(0,0,0,0.35)] opacity-75"
              style={{ animationDelay: '-8.5s', background: scene.orb3 }}
            />
          </>
        )}

        {/* Crisp Animated Fluid Optical Ribbons */}
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className={`animate-liquid-wave w-[112%] h-[112%] -ml-[6%] -mt-[4%] ${
            scene.bgImage ? 'opacity-45' : 'opacity-85'
          }`}
        >
          <defs>
            <linearGradient id="lgSilk1" x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor={scene.wave1[0]} stopOpacity="0.92" />
              <stop offset="50%" stopColor={scene.wave1[1]} stopOpacity="0.85" />
              <stop offset="100%" stopColor={scene.wave1[2]} stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id="lgSilk2" x1="1" y1="0" x2="0" y2="0.6">
              <stop offset="0%" stopColor={scene.wave2[0]} stopOpacity="0.88" />
              <stop offset="50%" stopColor={scene.wave2[1]} stopOpacity="0.78" />
              <stop offset="100%" stopColor={scene.wave2[2]} stopOpacity="0.88" />
            </linearGradient>
          </defs>

          {/* Bold Sculpted Optical Ribbon 1 */}
          <path
            d="M-60,260 C210,110 470,410 780,220 C1050,55 1270,310 1510,165 L1510,235 C1270,385 1040,130 780,295 C470,485 210,185 -60,335 Z"
            fill="url(#lgSilk1)"
            fillOpacity="0.42"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="2"
          />

          {/* Bold Sculpted Optical Ribbon 2 */}
          <path
            d="M-60,600 C280,430 510,740 840,530 C1120,350 1290,630 1510,485 L1510,565 C1290,715 1110,430 840,610 C510,820 280,515 -60,680 Z"
            fill="url(#lgSilk2)"
            fillOpacity="0.38"
            stroke="rgba(255,255,255,0.68)"
            strokeWidth="1.8"
          />

          {/* Fine Crisp Specular Caustic Arcs */}
          <path
            d="M-40,420 C240,320 530,520 820,370 C1080,235 1290,440 1500,320"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2.5"
          />
          <path
            d="M-40,760 C270,660 560,840 880,690 C1150,565 1320,760 1500,660"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Refractive Liquid Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full liquid-pill text-slate-950 shadow-2xl">
          <span className="w-3 h-3 rounded-full liquid-droplet animate-pulse shrink-0" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Liquid Glass Header Banner + Interactive Scene Switcher */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-[34px] liquid-surface p-6 sm:p-7 overflow-hidden">
        {/* Specular Top Curved Meniscus */}
        <div
          className="pointer-events-none absolute inset-x-8 top-1 h-4 rounded-full opacity-80"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
        {/* Animated Specular Glint Sweep */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-transparent via-white/30 to-transparent liquid-sheen-bar" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/45 border border-white/85 text-[11px] font-bold uppercase tracking-widest text-slate-900 shadow-sm mb-2.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-700" />
              Optical Refraction // Liquid Glass
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(2,12,32,0.55)]">
              Liquid Glass UI System
            </h1>
            <p className="text-xs sm:text-sm text-white/95 font-medium mt-1.5 max-w-2xl leading-relaxed drop-shadow-[0_1px_5px_rgba(2,12,32,0.45)]">
              Clear optical capsules bending sharp sculpted light ribbons underneath — featuring curved specular meniscus rims, chromatic dispersion fringes, animated caustic sheen, and cursor-reactive glow.
            </p>
          </div>

          {/* Interactive Backdrop Scene Switcher */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/85 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Backdrop Optics Scene
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(LIQUID_SCENES) as LiquidSceneKey[]).map((key) => {
                const active = sceneKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setSceneKey(key);
                        triggerToast(`Optics scene: ${LIQUID_SCENES[key].label}`);
                      })
                    }
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all active:scale-95 ${active
                        ? 'text-white border-[1.5px] border-white shadow-lg'
                        : 'liquid-pill text-slate-900 opacity-90 hover:opacity-100'
                      }`}
                    style={active ? { background: scene.pillGradient } : undefined}
                  >
                    {LIQUID_SCENES[key].label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Login Card + 4 Action Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-[36px] liquid-surface p-8 pb-14">
            {/* Specular Lens Arc */}
            <div
              className="pointer-events-none absolute top-2 left-6 right-6 h-8 rounded-t-[28px] opacity-80"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 100%)',
              }}
            />

            <h2 className="relative text-[28px] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(2,12,32,0.45)] mb-7">
              Login
            </h2>

            {/* Email Input */}
            <div className="relative mb-6">
              <div className="relative flex items-center rounded-2xl bg-white/35 backdrop-blur-md border border-white/80 shadow-[inset_0_2px_6px_rgba(2,12,32,0.18),0_1px_0_rgba(255,255,255,0.75)] focus-within:bg-white/55 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-transparent text-slate-950 font-semibold text-[14px] placeholder-slate-700 focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-slate-900 absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative mb-5">
              <div className="relative flex items-center rounded-2xl bg-white/35 backdrop-blur-md border border-white/80 shadow-[inset_0_2px_6px_rgba(2,12,32,0.18),0_1px_0_rgba(255,255,255,0.75)] focus-within:bg-white/55 transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-transparent text-slate-950 font-semibold text-[14px] tracking-wider focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-white/50 text-slate-900 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="relative mb-3">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('Optical recovery link dispatched'))
                }
                className="text-[13px] font-semibold text-white underline underline-offset-4 hover:text-cyan-100 transition-colors drop-shadow-[0_1px_4px_rgba(2,12,32,0.5)]"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Liquid Capsule Sign Up Button with Glint Sweep */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'Session reset' : `Fluid account activated for ${email}`
                    );
                  })
                }
                className="relative overflow-hidden min-w-[190px] px-8 py-3.5 rounded-full font-bold text-[15px] text-white transition-all active:scale-95 border-[1.5px] border-white/90"
                style={{
                  background: isSignedUp
                    ? 'linear-gradient(145deg, rgba(16,185,129,0.9) 0%, rgba(6,182,212,0.94) 100%)'
                    : scene.ctaGradient,
                  backdropFilter: 'blur(10px) saturate(210%)',
                  boxShadow:
                    '0 18px 36px -6px rgba(2,12,32,0.58), inset 0 2px 3px rgba(255,255,255,0.95), inset 0 -4px 8px rgba(15,23,42,0.25)',
                }}
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent liquid-sheen-bar" />
                <span className="relative z-10">{isSignedUp ? 'Signed Up ✓' : 'Sign Up'}</span>
              </button>
            </div>
          </div>

          {/* 4 Stacked Liquid Action Pills */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Connection sphere expanded (${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 rounded-full liquid-pill transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white border border-white/90"
                  style={{
                    background: scene.ctaGradient,
                    boxShadow:
                      '0 8px 18px rgba(2,12,32,0.35), inset 0 2px 2px rgba(255,255,255,0.9)',
                  }}
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[15px] font-bold text-slate-950">Add Friend</span>
              </div>
              <span className="text-xs font-extrabold text-slate-950 bg-white/75 border border-white px-2.5 py-0.5 rounded-full shadow-sm">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Shareable liquid link copied'))
              }
              className="w-full flex items-center gap-4 px-4 py-3 rounded-full liquid-pill transition-transform active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-full liquid-droplet flex items-center justify-center text-slate-900">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-[15px] font-bold text-slate-950">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full liquid-pill transition-transform active:scale-[0.98]"
              >
                <span className="text-[15px] font-bold text-slate-950">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-900 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-[26px] liquid-surface p-2 shadow-2xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`Category: ${cat}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${category === cat
                          ? 'bg-white/85 text-slate-950 shadow-sm'
                          : 'text-white hover:bg-white/30'
                        }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4 text-cyan-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-3 rounded-full liquid-pill transition-transform active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400/60 via-sky-300/70 to-indigo-400/60 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div
                className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center text-white border border-white/90"
                style={{
                  background: scene.pillGradient,
                  boxShadow:
                    '0 8px 16px rgba(2,12,32,0.34), inset 0 2px 2px rgba(255,255,255,0.9)',
                }}
              >
                <Download className="w-4 h-4" />
              </div>
              <span className="relative z-10 text-[15px] font-bold text-slate-950">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-7">
          {/* ROW 1: 4 Quick Navigation Glass Squircles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', icon: Home },
                { id: 'calender', label: 'Calender', icon: Calendar },
                { id: 'notification', label: 'Notification', icon: Bell },
                { id: 'setting', label: 'Setting', icon: Settings },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAction('click', () => {
                      setActiveNav(item.id);
                      triggerToast(`Opened ${item.label}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.92] rounded-[28px] flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${isActive
                      ? 'liquid-pill ring-2 ring-white shadow-[0_18px_36px_rgba(2,12,32,0.36)]'
                      : 'liquid-surface opacity-90 hover:opacity-100'
                    }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${isActive
                        ? 'liquid-droplet text-slate-900'
                        : 'bg-white/25 border border-white/60 text-white'
                      }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span
                    className={`text-xs font-bold tracking-tight ${isActive ? 'text-slate-950' : 'text-white drop-shadow-[0_1px_4px_rgba(2,12,32,0.5)]'
                      }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Sparkline Card + Liquid Droplet Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            {/* Sparkline Card */}
            <div className="flex-1 rounded-[30px] liquid-surface px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-white/95 drop-shadow-[0_1px_4px_rgba(2,12,32,0.5)]">
                  Last 7 days
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full liquid-droplet text-slate-950">
                    <ArrowUp className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="text-xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(2,12,32,0.55)]">
                    +22,12
                  </span>
                </div>
              </div>

              {/* Liquid Gloss Spline Curve */}
              <div className="w-[210px] sm:w-[250px] h-[64px] shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="liquidWaveStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={scene.wave1[0]} />
                      <stop offset="50%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor={scene.wave1[2]} />
                    </linearGradient>
                    <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#liquidWaveStroke)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    filter="url(#liquidGlow)"
                  />
                  {/* Specular Liquid Node */}
                  <circle cx="192" cy="15" r="7" fill="#FFFFFF" fillOpacity="0.95" />
                  <circle cx="192" cy="15" r="3.5" fill="#06B6D4" />
                </svg>
              </div>
            </div>

            {/* Liquid Droplet ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Optics engine ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className="relative w-full sm:w-[144px] min-h-[82px] rounded-full liquid-surface p-2.5 flex items-center justify-between transition-all active:scale-95"
            >
              <span
                className={`pl-3 text-xs font-extrabold tracking-widest transition-opacity drop-shadow-sm ${isSwitchOn ? 'text-white opacity-100' : 'text-white/45'
                  }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-extrabold tracking-widest transition-opacity drop-shadow-sm ${!isSwitchOn ? 'text-white opacity-100' : 'text-white/45'
                  }`}
              >
                OFF
              </span>

              {/* Translucent Refracting Glass Droplet Thumb */}
              <div
                className={`absolute top-2 bottom-2 w-[64px] rounded-full liquid-droplet transition-all duration-300 flex items-center justify-center ${isSwitchOn ? 'left-[calc(100%-72px)]' : 'left-2'
                  }`}
              >
                <div className="w-7 h-2 rounded-full bg-white/85 -translate-y-2.5 blur-[0.5px]" />
              </div>
            </button>
          </div>

          {/* ROW 3: Interactive Slider + Optical Droplet Knob + Tooltip */}
          <div className="rounded-[32px] liquid-surface p-6 pb-7">
            <div className="flex items-center gap-5">
              {/* Fluid Glass Channel */}
              <div
                ref={sliderRef}
                onClick={handleSliderClick}
                role="slider"
                aria-valuemin={5}
                aria-valuemax={95}
                aria-valuenow={sliderValue}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    setSliderValue((v) => Math.min(v + 2, 95));
                    playTactileClick('slider');
                  } else if (e.key === 'ArrowLeft') {
                    setSliderValue((v) => Math.max(v - 2, 5));
                    playTactileClick('slider');
                  }
                }}
                className="relative flex-1 h-4 rounded-full bg-white/25 border border-white/65 shadow-[inset_0_2px_6px_rgba(2,12,32,0.28)] cursor-pointer"
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${sliderValue}%`,
                    background: `linear-gradient(90deg, ${scene.wave1[0]} 0%, ${scene.wave2[1]} 55%, ${scene.wave1[2]} 100%)`,
                    boxShadow: '0 0 14px rgba(103,232,249,0.75)',
                  }}
                />
                {/* Optical Magnifying Water-Drop Lens Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full liquid-droplet flex items-center justify-center transition-transform hover:scale-110"
                  style={{ left: `${sliderValue}%` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                </div>
              </div>

              <div className="text-xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(2,12,32,0.5)] min-w-[58px] text-right">
                {sliderValue}%
              </div>
            </div>

            {/* Bottom Callout Bubble */}
            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-[22px] liquid-pill px-4 py-2.5">
                <div className="w-3 h-3 bg-white/80 border-l border-t border-white rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-slate-950 font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Analytics Cards ($4891.22 Liquid Gauge + 2201 Fluid Mountain Wave) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Analytics Card ($4891.22 + 75% Liquid Ring Gauge) */}
            <div className="md:col-span-7 rounded-[34px] liquid-surface p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/90 drop-shadow-sm mb-2">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(2,12,32,0.5)]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full liquid-droplet text-slate-950">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-bold text-white drop-shadow-sm">75%</span>
                  </div>
                </div>

                {/* Glossy Molten Glass Tube 75% Gauge */}
                <div className="relative w-[142px] h-[142px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="liquidRingGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={scene.wave1[0]} />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor={scene.wave1[2]} />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="11"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="rgba(255,255,255,0.62)"
                      strokeWidth="5"
                      strokeDasharray="207"
                      strokeDashoffset="78"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="url(#liquidRingGrad)"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute w-[62px] h-[62px] rounded-full liquid-droplet flex items-center justify-center">
                    <span className="text-sm font-extrabold text-slate-950">75%</span>
                  </div>
                </div>
              </div>

              {/* Dual Legends matching sample.jpg */}
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-white/80 border border-white shadow-sm shrink-0" />
                  <span className="text-xs font-semibold text-white/95 drop-shadow-sm">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-sm shrink-0"
                    style={{ background: scene.pillGradient }}
                  />
                  <span className="text-xs font-semibold text-white/95 drop-shadow-sm">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Analytics Card (2201 + Fluid Mountain Peaks + Slider) */}
            <div className="md:col-span-5 rounded-[34px] liquid-surface p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(2,12,32,0.5)]">
                    2201
                  </span>
                  <div className="flex-1 h-[2px] bg-white/55 relative rounded-full">
                    <span className="w-3 h-3 rounded-full liquid-droplet absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-white/90 font-medium mt-2 leading-snug drop-shadow-sm">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              {/* Liquid Translucent Mountain Wave SVG */}
              <div className="my-4 h-[132px]">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="liquidPeakBack" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
                    </linearGradient>
                    <linearGradient id="liquidPeakFront" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={scene.wave1[0]} stopOpacity="0.94" />
                      <stop offset="55%" stopColor={scene.wave2[1]} stopOpacity="0.76" />
                      <stop offset="100%" stopColor={scene.wave1[2]} stopOpacity="0.48" />
                    </linearGradient>
                  </defs>
                  {/* Back fluid wave */}
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="url(#liquidPeakBack)"
                    stroke="rgba(255,255,255,0.72)"
                    strokeWidth="1.5"
                  />
                  {/* Front fluid wave driven by timeline slider */}
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#liquidPeakFront)"
                    stroke="rgba(255,255,255,0.94)"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              {/* Bottom Timeline Slider */}
              <input
                type="range"
                min={15}
                max={100}
                value={chartTimeline}
                onChange={(e) => {
                  setChartTimeline(Number(e.target.value));
                  playTactileClick('slider');
                }}
                aria-label="Chart timeline scale"
                className="w-full accent-cyan-300 cursor-pointer h-2 rounded-full bg-white/30"
              />
            </div>
          </div>

          {/* ROW 5: Timeline Stepper (2019 - 2022) */}
          <div className="rounded-[32px] liquid-surface px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-5">
              {/* Refracting Horizontal Channel */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-cyan-300/80 via-white/85 to-purple-400/80" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Timeline milestone: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-7 h-7 rounded-full liquid-droplet flex items-center justify-center transition-transform ${isSelected ? 'scale-125 ring-2 ring-white' : 'opacity-85 hover:opacity-100'
                      }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-cyan-500' : 'bg-white/90'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-5">
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Timeline milestone: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all active:scale-95 ${isSelected
                        ? 'text-white border-[1.5px] border-white/95 shadow-[0_10px_22px_rgba(2,12,32,0.4)]'
                        : 'liquid-pill text-slate-950'
                      }`}
                    style={isSelected ? { background: scene.pillGradient } : undefined}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidGlass;
