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
  Sparkles,
  Star,
  Zap,
  Flame,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Maximalism: React.FC = () => {
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
    triggerToast('Unleashing maximalist bundle...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('BOOM! Downloaded UI-Kit-Maximal.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  return (
    <div
      className="w-full py-8 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          'linear-gradient(125deg, #3b0764 0%, #86198f 28%, #e11d48 56%, #f97316 82%, #eab308 100%)',
      }}
    >
      {/* Layer 1: Clashing Checkerboard + Grid + Halftone Dot Patchwork */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(253, 224, 71, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, #fef08a 1.6px, transparent 1.6px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Layer 2: Memphis Pattern SVG Squiggles, Zigzags & Confetti Ornaments */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="memphis-pattern" width="220" height="220" patternUnits="userSpaceOnUse">
            <path
              d="M 15 35 Q 30 10, 45 35 T 75 35"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polygon points="170,25 186,55 154,55" fill="none" stroke="#fde047" strokeWidth="3.5" />
            <circle cx="115" cy="95" r="10" fill="none" stroke="#a3e635" strokeWidth="3.5" />
            <path
              d="M 25 160 L 40 145 L 55 160 L 70 145 L 85 160"
              fill="none"
              stroke="#f472b6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="160"
              y="145"
              width="20"
              height="20"
              transform="rotate(24 170 155)"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#memphis-pattern)" />
      </svg>

      {/* Layer 3: Glowing Saturated Color Orbs */}
      <div className="pointer-events-none absolute -top-20 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-lime-300 via-cyan-400 to-indigo-600 opacity-35 blur-2xl" />
      <div className="pointer-events-none absolute top-[40%] -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-yellow-300 via-pink-500 to-purple-800 opacity-40 blur-2xl" />

      {/* Festive Layered Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400 p-[3px] shadow-[6px_6px_0px_#1e1b4b] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-[13px] bg-[#1e1b4b] text-white">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span className="text-xs font-extrabold tracking-wide text-yellow-200">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container matching sample.jpg layout */}
      <div className="max-w-[1140px] mx-auto relative z-10">
        
        {/* Kinetic Maximalist Marquee Tape + Style Paradigm Banner */}
        <div className="mb-7 rounded-[28px] p-[3.5px] bg-gradient-to-r from-lime-300 via-yellow-300 to-cyan-400 shadow-[8px_8px_0px_#1e1b4b] overflow-hidden">
          <div className="rounded-[24px] bg-[#1e1b4b] overflow-hidden">
            {/* Scrolling Kinetic Ticker Ribbon */}
            <div className="bg-gradient-to-r from-pink-600 via-amber-500 to-violet-600 py-1 border-b-2 border-yellow-300 overflow-hidden">
              <div className="animate-max-marquee text-[10px] font-black uppercase tracking-[0.22em] text-yellow-100 whitespace-nowrap">
                <span className="mx-4">★ MORE IS MORE</span>
                <span className="mx-4">✦ CLASHING PATTERNS</span>
                <span className="mx-4">⚡ OVERDRIVE PALETTES</span>
                <span className="mx-4">★ EXPRESSIVE TYPOGRAPHY</span>
                <span className="mx-4">✦ LAYERED STICKERS</span>
                <span className="mx-4">★ MORE IS MORE</span>
                <span className="mx-4">✦ CLASHING PATTERNS</span>
                <span className="mx-4">⚡ OVERDRIVE PALETTES</span>
                <span className="mx-4">★ EXPRESSIVE TYPOGRAPHY</span>
                <span className="mx-4">✦ LAYERED STICKERS</span>
              </div>
            </div>

            <div
              className="p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(236,72,153,0.14) 0px, rgba(236,72,153,0.14) 10px, transparent 10px, transparent 20px)',
              }}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-yellow-300 via-lime-300 to-cyan-300 text-[#1e1b4b] border-2 border-white shadow-[3px_3px_0px_#ec4899]">
                  ★ Style: Maximalism
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest bg-pink-500 text-white -rotate-2 border border-yellow-300">
                  100% Extra
                </span>
                <span className="text-xs text-yellow-100 font-bold">
                  Dense layered textures, kinetic marquee, bold mixed typography & vibrant pop stickers.
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-cyan-300 flex-shrink-0 bg-purple-900/90 px-3 py-1 rounded-full border border-cyan-300">
                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span>Same layout as sample.jpg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout matching sample.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          
          {/* =========================================
              LEFT COLUMN (Login Card + 4 Action Pills)
             ========================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* LOGIN MAXIMALIST CARD (Checkerboard + Polka-Dots + Sunburst Stamp) */}
            <div className="rounded-[40px] p-[4px] bg-gradient-to-br from-lime-300 via-pink-500 to-cyan-400 shadow-[10px_10px_0px_#1e1b4b] relative">
              {/* Rotating Starburst Corner Stamp */}
              <div className="absolute -top-4 -right-3 z-20 w-14 h-14 flex items-center justify-center">
                <div className="absolute inset-0 bg-yellow-300 rounded-full border-2 border-[#1e1b4b] animate-spin-slow" style={{ clipPath: 'polygon(50% 0%, 63% 20%, 85% 15%, 78% 37%, 100% 50%, 78% 63%, 85% 85%, 63% 80%, 50% 100%, 37% 80%, 15% 85%, 22% 63%, 0% 50%, 22% 37%, 15% 15%, 37% 20%)' }} />
                <span className="relative z-10 text-[9px] font-black text-[#1e1b4b] uppercase -rotate-12 leading-none text-center">
                  VIP<br />CLUB
                </span>
              </div>

              <div
                className="rounded-[36px] p-7 sm:p-8 relative overflow-hidden"
                style={{
                  backgroundColor: '#3b0764',
                  backgroundImage: `
                    radial-gradient(circle, rgba(253,224,71,0.22) 2.2px, transparent 2.2px),
                    linear-gradient(155deg, #4c1d95 0%, #9d174d 58%, #be123c 100%)
                  `,
                  backgroundSize: '18px 18px, 100% 100%',
                }}
              >
                {/* Top Checkerboard Ribbon */}
                <div
                  className="absolute top-0 left-0 right-0 h-3.5 opacity-90"
                  style={{
                    backgroundImage:
                      'conic-gradient(#fde047 90deg, #1e1b4b 90deg 180deg, #22d3ee 180deg 270deg, #ec4899 270deg)',
                    backgroundSize: '14px 14px',
                  }}
                />

                <div className="mb-6 mt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <h2
                      className="text-4xl font-black font-serif italic tracking-tight text-yellow-300"
                      style={{
                        textShadow: '3px 3px 0px #ec4899, 6px 6px 0px #1e1b4b',
                      }}
                    >
                      Login
                    </h2>
                    <Flame className="w-5 h-5 text-lime-300 fill-lime-300" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-300 text-[#1e1b4b] text-[10px] font-black uppercase rotate-3 border-2 border-white shadow-[2px_2px_0px_#1e1b4b]">
                    ★ 24/7
                  </span>
                </div>

                {/* Username Input Field */}
                <div className="mb-5">
                  <div className="rounded-2xl bg-[#1e1b4b] border-2 border-cyan-300 px-4 py-3 flex items-center justify-between gap-2 shadow-[5px_5px_0px_#ec4899]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="username@mail.com"
                      className="w-full bg-transparent text-sm text-yellow-200 placeholder-pink-300/60 focus:outline-none font-bold"
                    />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-300 to-blue-600 flex items-center justify-center flex-shrink-0 border-2 border-white">
                      <Mail className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Password Input Field */}
                <div className="mb-5">
                  <div className="rounded-2xl bg-[#1e1b4b] border-2 border-lime-300 px-4 py-3 flex items-center justify-between gap-2 shadow-[5px_5px_0px_#fde047]">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent text-sm text-yellow-200 placeholder-pink-300/60 focus:outline-none font-bold tracking-wider"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleAction('click');
                        setShowPassword(!showPassword);
                      }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0 border-2 border-white text-white cursor-pointer hover:scale-110 transition-transform"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Forget Password Link */}
                <div className="mb-7 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      handleAction('click');
                      triggerToast('Password reset link sent to ' + email);
                    }}
                    className="text-xs text-lime-300 hover:text-yellow-300 underline decoration-wavy underline-offset-4 font-black transition-colors cursor-pointer"
                  >
                    Forget Password?
                  </button>
                  <span className="px-2 py-0.5 rounded bg-pink-500/80 text-[9px] font-mono font-black uppercase text-white tracking-widest border border-yellow-300">
                    ✦ MAX-AUTH ✦
                  </span>
                </div>

                {/* Overdrive Rainbow "Sign Up" Button */}
                <div className="flex justify-center -mb-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleAction('success', () => {
                        setIsSignedUp(true);
                        triggerToast('Woohoo! Welcome to the club!');
                        setTimeout(() => setIsSignedUp(false), 2500);
                      });
                    }}
                    className="w-full h-14 rounded-full bg-gradient-to-r from-lime-300 via-yellow-300 to-cyan-300 p-[3px] shadow-[6px_6px_0px_#1e1b4b] hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="w-full h-full rounded-full bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500 flex items-center justify-center gap-2 text-white font-black text-base uppercase tracking-widest border-2 border-white">
                      {isSignedUp ? (
                        <>
                          <Check className="w-5 h-5 stroke-[3] text-lime-300" />
                          <span>Party On!</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-yellow-200" />
                          <span>Sign Up</span>
                          <Sparkles className="w-4 h-4 text-cyan-200" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* VERTICAL BUTTON STACK (4 Eclectic Patterned Pills with Distinct Personalities) */}
            <div className="flex flex-col gap-3.5">
              
              {/* 1. Add Friend Pill (Hot Pink + Polka Dots + Lime Sticker) */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    setFriendCount((c) => c + 1);
                    triggerToast(`Squad grew! (${friendCount + 1} friends)`);
                  });
                }}
                className="h-16 rounded-full border-2 border-yellow-300 shadow-[6px_6px_0px_#1e1b4b] flex items-center px-3 gap-3.5 cursor-pointer hover:scale-[1.01] active:scale-[0.98] transition-all group relative overflow-hidden"
                style={{
                  backgroundColor: '#db2777',
                  backgroundImage:
                    'radial-gradient(circle, rgba(253,224,71,0.28) 2px, transparent 2px), linear-gradient(90deg, #ec4899 0%, #9333ea 100%)',
                  backgroundSize: '12px 12px, 100% 100%',
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-lime-300 text-[#1e1b4b] flex items-center justify-center border-2 border-white shadow-md group-hover:rotate-90 transition-transform relative z-10">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-2 relative z-10">
                  <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow">
                    Add Friend
                  </span>
                  <span className="text-xs font-black text-[#1e1b4b] bg-lime-300 px-3 py-0.5 rounded-full border-2 border-white -rotate-3 shadow-[2px_2px_0px_#1e1b4b]">
                    +{friendCount}
                  </span>
                </div>
              </div>

              {/* 2. Share Pill (Electric Cyan + Diagonal Stripes) */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    triggerToast('Broadcasted to the universe!');
                  });
                }}
                className="h-16 rounded-full border-2 border-white shadow-[6px_6px_0px_#1e1b4b] flex items-center px-3.5 gap-3.5 cursor-pointer hover:scale-[1.01] active:scale-[0.98] transition-all relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #0284c7 0%, #6366f1 55%, #c026d3 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #fde047 0px, #fde047 4px, transparent 4px, transparent 14px)',
                  }}
                />
                <div className="w-10 h-10 rounded-full bg-yellow-300 text-[#1e1b4b] flex items-center justify-center border-2 border-white relative z-10 shadow-[2px_2px_0px_#1e1b4b]">
                  <Share2 className="w-4 h-4 stroke-[2.8]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-2 relative z-10">
                  <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow">
                    Share
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white text-[#1e1b4b] rotate-2">
                    Viral
                  </span>
                </div>
              </div>

              {/* 3. Select Category Pill (Tangerine-Coral + Checkerboard Strip) */}
              <div className="relative">
                <div
                  onClick={() => {
                    handleAction('click', () => setIsCategoryOpen(!isCategoryOpen));
                  }}
                  className="h-16 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-600 border-2 border-yellow-200 shadow-[6px_6px_0px_#1e1b4b] flex items-center justify-between px-5 cursor-pointer hover:scale-[1.01] transition-all"
                >
                  <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow">
                    {category}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#1e1b4b] text-yellow-300 border-2 border-yellow-300 flex items-center justify-center">
                    <ChevronDown
                      className={`w-4 h-4 stroke-[3] transition-transform duration-200 ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {isCategoryOpen && (
                  <div className="absolute top-[72px] left-0 right-0 z-30 rounded-3xl p-2 bg-[#1e1b4b] border-[3px] border-yellow-300 shadow-[8px_8px_0px_#ec4899] animate-in fade-in zoom-in-95 duration-150">
                    {categories.map((cat, idx) => {
                      const badgeColors = ['bg-pink-500', 'bg-cyan-400', 'bg-lime-400', 'bg-amber-400'];
                      return (
                        <div
                          key={cat}
                          onClick={() => {
                            handleAction('click', () => {
                              setCategory(cat);
                              setIsCategoryOpen(false);
                              triggerToast(`Category: ${cat}`);
                            });
                          }}
                          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold cursor-pointer transition-all flex items-center justify-between mb-1 last:mb-0 ${
                            category === cat
                              ? 'bg-gradient-to-r from-pink-500 to-amber-400 text-white'
                              : 'text-yellow-100 hover:bg-purple-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full border border-white ${badgeColors[idx % badgeColors.length]}`} />
                            <span>{cat}</span>
                          </div>
                          {category === cat && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Download Pill (Acid Emerald-Teal + Candy Progress Bar) */}
              <div
                onClick={handleDownload}
                className="h-16 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 border-2 border-lime-200 shadow-[6px_6px_0px_#1e1b4b] flex items-center px-3 gap-3.5 cursor-pointer hover:scale-[1.01] active:scale-[0.98] transition-all relative overflow-hidden"
              >
                {downloadProgress !== null && (
                  <div
                    className="absolute inset-0 opacity-50 transition-all duration-200 pointer-events-none"
                    style={{
                      width: `${downloadProgress}%`,
                      backgroundImage:
                        'repeating-linear-gradient(45deg, #fde047 0px, #fde047 8px, #ec4899 8px, #ec4899 16px)',
                    }}
                  />
                )}
                <div className="w-10 h-10 rounded-2xl bg-[#1e1b4b] text-lime-300 border-2 border-lime-300 flex items-center justify-center relative z-10">
                  <Download className="w-5 h-5 stroke-[2.6]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-3 relative z-10">
                  <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow">
                    Download
                  </span>
                  {downloadProgress !== null ? (
                    <span className="text-xs font-black bg-yellow-300 text-[#1e1b4b] px-2.5 py-0.5 rounded-full border border-[#1e1b4b]">
                      {downloadProgress}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-black bg-[#1e1b4b] text-lime-300 px-2 py-0.5 rounded-full border border-lime-300">
                      ZIP
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>


          {/* =========================================
              RIGHT SECTION (Widgets, Charts, Timeline)
             ========================================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* TOP ROW: 4 Expressive Multi-Color Patterned Squircle Nav Tiles */}
            <div className="flex items-center justify-start sm:justify-end gap-3.5 sm:gap-4 overflow-x-auto pb-2 scrollbar-hidden">
              
              {/* Home */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('home'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-2 relative ${
                  activeNav === 'home'
                    ? 'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-[#1e1b4b] border-white -translate-y-1 shadow-[6px_6px_0px_#ec4899]'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-cyan-300 shadow-[5px_5px_0px_#1e1b4b] hover:-translate-y-0.5'
                }`}
              >
                <Home className="w-6 h-6 stroke-[2.5]" />
                <span className="text-[11px] font-black uppercase tracking-tight">Home</span>
              </button>

              {/* Calender */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('calender'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-2 ${
                  activeNav === 'calender'
                    ? 'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-[#1e1b4b] border-white -translate-y-1 shadow-[6px_6px_0px_#ec4899]'
                    : 'bg-gradient-to-br from-pink-500 to-rose-600 text-white border-yellow-200 shadow-[5px_5px_0px_#1e1b4b] hover:-translate-y-0.5'
                }`}
              >
                <Calendar className="w-6 h-6 stroke-[2.3]" />
                <span className="text-[11px] font-black uppercase tracking-tight">Calender</span>
              </button>

              {/* Notification */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('notification'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-2 relative ${
                  activeNav === 'notification'
                    ? 'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-[#1e1b4b] border-white -translate-y-1 shadow-[6px_6px_0px_#ec4899]'
                    : 'bg-gradient-to-br from-violet-600 to-purple-800 text-white border-lime-300 shadow-[5px_5px_0px_#1e1b4b] hover:-translate-y-0.5'
                }`}
              >
                <div className="relative">
                  <Bell className="w-6 h-6 stroke-[2.3]" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lime-300 border-2 border-[#1e1b4b] animate-ping" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lime-300 border-2 border-[#1e1b4b]" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-tight">Notification</span>
              </button>

              {/* Setting */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('setting'))}
                className={`w-20 h-20 rounded-[26px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border-2 ${
                  activeNav === 'setting'
                    ? 'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-[#1e1b4b] border-white -translate-y-1 shadow-[6px_6px_0px_#ec4899]'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-cyan-200 shadow-[5px_5px_0px_#1e1b4b] hover:-translate-y-0.5'
                }`}
              >
                <Settings className="w-6 h-6 stroke-[2.3]" />
                <span className="text-[11px] font-black uppercase tracking-tight">Setting</span>
              </button>

            </div>

            {/* ROW 2: "Last 7 days" Mini Curve Card + Striped Toggle Switch */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* Mini Curve Chart Maximalist Card */}
              <div
                className="sm:col-span-9 rounded-[32px] p-5 border-[3px] border-cyan-300 shadow-[8px_8px_0px_#1e1b4b] flex items-center justify-between gap-4 relative overflow-hidden"
                style={{
                  backgroundColor: '#1e1b4b',
                  backgroundImage:
                    'radial-gradient(circle, rgba(34,211,238,0.22) 2px, transparent 2px), linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)',
                  backgroundSize: '14px 14px, 100% 100%',
                }}
              >
                <div className="flex-shrink-0 relative z-10">
                  <span className="text-[11px] font-black uppercase tracking-widest text-pink-300 block">
                    Last 7 days
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-6 h-6 rounded-full bg-lime-300 text-[#1e1b4b] flex items-center justify-center border-2 border-white">
                      <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-2xl font-black font-serif italic tracking-tight text-yellow-300">
                      +22,12
                    </span>
                  </div>
                </div>

                {/* Neon Multi-Color Wave Line & Starburst Peak */}
                <div className="flex-1 max-w-[280px] h-14 flex items-center relative z-10">
                  <svg viewBox="0 0 180 50" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="maxWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 5 35 Q 25 15, 50 32 T 95 24 T 140 10 T 175 30"
                      fill="none"
                      stroke="url(#maxWaveGrad)"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="140"
                      cy="10"
                      r="6.5"
                      fill="#a3e635"
                      stroke="#ec4899"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>

              {/* Striped Maximalist Toggle Switch Card */}
              <div
                className="sm:col-span-3 rounded-[32px] p-4 border-[3px] border-yellow-300 shadow-[8px_8px_0px_#1e1b4b] flex items-center justify-center"
                style={{
                  backgroundColor: '#701a75',
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(253,224,71,0.16) 0px, rgba(253,224,71,0.16) 8px, transparent 8px, transparent 16px)',
                }}
              >
                <div
                  onClick={() => {
                    handleAction('toggle', () => {
                      setIsSwitchOn(!isSwitchOn);
                      triggerToast(`Maximal switch ${!isSwitchOn ? 'ON' : 'OFF'}!`);
                    });
                  }}
                  className="w-[104px] h-14 rounded-full bg-[#1e1b4b] border-2 border-pink-400 p-1.5 flex items-center cursor-pointer transition-all relative shadow-inner"
                >
                  <div className="absolute left-3.5 flex items-center gap-1 opacity-85 pointer-events-none">
                    <span className="w-1 h-5 bg-yellow-300 rounded-full" />
                    <span className="w-1 h-5 bg-pink-400 rounded-full" />
                    <span className="w-1 h-5 bg-cyan-300 rounded-full" />
                  </div>

                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 transform border-2 border-white ${
                      isSwitchOn
                        ? 'translate-x-12 bg-gradient-to-br from-lime-300 to-emerald-500 text-[#064e3b] shadow-[0_0_12px_#84cc16]'
                        : 'translate-x-0 bg-gradient-to-br from-rose-500 to-orange-500 text-white'
                    }`}
                  >
                    {isSwitchOn ? 'ON' : 'OFF'}
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: Rainbow Maximalist Slider Card with Comic-Zine Speech Bubble */}
            <div className="rounded-full p-[3px] bg-gradient-to-r from-cyan-400 via-yellow-300 to-pink-500 shadow-[8px_8px_0px_#1e1b4b] relative">
              <div className="rounded-full bg-[#1e1b4b] py-4 px-6 sm:px-8 flex items-center gap-4 sm:gap-6">
                
                {/* Vibrant Track */}
                <div
                  ref={sliderRef}
                  onClick={handleSliderClick}
                  className="h-4 flex-1 rounded-full bg-[#312e81] border-2 border-pink-400/70 relative flex items-center cursor-pointer"
                >
                  {/* Rainbow Progress Bar */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 via-yellow-300 to-cyan-400 transition-all duration-75"
                    style={{ width: `${sliderValue}%` }}
                  />

                  {/* Starburst Knob Thumb */}
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 border-2 border-white flex items-center justify-center absolute -top-2 -ml-4 transition-all duration-75 cursor-grab active:cursor-grabbing hover:scale-110 shadow-lg"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <Star className="w-3.5 h-3.5 text-[#1e1b4b] fill-[#1e1b4b]" />
                  </div>

                  {/* Comic-Zine Editorial Speech Bubble Tooltip Underneath */}
                  <div
                    className="absolute top-9 -ml-28 hidden sm:block pointer-events-none transition-all duration-75 z-20"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <div className="relative rounded-2xl p-[3px] bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400 shadow-[6px_6px_0px_#1e1b4b] w-56">
                      <div className="relative bg-[#3b0764] rounded-[13px] p-2.5 text-[10px] text-yellow-100 font-bold leading-relaxed">
                        <div className="absolute -top-2 left-[104px] w-3.5 h-3.5 bg-[#3b0764] transform rotate-45 border-l-2 border-t-2 border-pink-400" />
                        <span className="relative z-10">
                          Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bold Sticker Percentage Readout */}
                <div className="flex-shrink-0 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-300 to-lime-300 text-[#1e1b4b] border-2 border-white rotate-2 shadow-[3px_3px_0px_#ec4899]">
                  <span className="text-sm sm:text-base font-black tracking-tight">{sliderValue}%</span>
                </div>

              </div>
            </div>

            {/* ROW 4: Radial Donut Metric Card ($4891.22) + Mountain Wave Card (2201) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Circular Gauge Maximalist Card (Left 7 cols) */}
              <div
                className="md:col-span-7 rounded-[36px] p-6 sm:p-7 border-[3px] border-yellow-300 shadow-[9px_9px_0px_#1e1b4b] flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #312e81 0%, #581c87 55%, #831843 100%)',
                }}
              >
                {/* Checkered accent strip on top */}
                <div
                  className="absolute top-0 left-0 right-0 h-3.5 opacity-90"
                  style={{
                    backgroundImage:
                      'conic-gradient(#fde047 90deg, #ec4899 90deg 180deg, #22d3ee 180deg 270deg, #1e1b4b 270deg)',
                    backgroundSize: '14px 14px',
                  }}
                />

                <div className="mt-2 relative z-10">
                  <span className="text-[10px] font-black tracking-[0.2em] text-cyan-300 uppercase block">
                    ★ Lorem Ipsum Dolor Sit
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <h3
                      className="text-3xl sm:text-[34px] font-black font-serif italic text-yellow-300 tracking-tight"
                      style={{ textShadow: '2px 3px 0px #db2777, 4px 5px 0px #1e1b4b' }}
                    >
                      $4891.22
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-black text-[#1e1b4b] bg-lime-300 px-3 py-0.5 rounded-full mt-1.5 border-2 border-white shadow-[2px_2px_0px_#1e1b4b]">
                    <ArrowUp className="w-3 h-3 stroke-[3]" />
                    <span>75%</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                  
                  {/* Vibrant Legend Pills */}
                  <div className="flex flex-col gap-3 text-xs order-2 sm:order-1">
                    <div className="flex items-center gap-2.5 bg-white/15 px-3 py-1.5 rounded-full border-2 border-pink-300/60">
                      <span className="w-3.5 h-3.5 rounded-full bg-pink-400 border-2 border-white flex-shrink-0" />
                      <span className="text-[11px] font-bold text-pink-100 leading-tight">
                        Lorem ipsum dolor sit amet
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/15 px-3 py-1.5 rounded-full border-2 border-cyan-300/70">
                      <span className="w-3.5 h-3.5 rounded-full bg-cyan-300 border-2 border-white flex-shrink-0" />
                      <span className="text-[11px] font-bold text-cyan-100 leading-tight">
                        Lorem ipsum dolor sit amet
                      </span>
                    </div>
                  </div>

                  {/* Multi-Stop Rainbow Radial Gauge with Sunburst Halo */}
                  <div className="relative w-36 h-36 flex items-center justify-center order-1 sm:order-2 flex-shrink-0">
                    {/* Rotating Sunburst Rays behind Gauge */}
                    <div
                      className="absolute -inset-2 rounded-full opacity-35 animate-spin-slow pointer-events-none"
                      style={{
                        background:
                          'repeating-conic-gradient(from 0deg, #fde047 0deg 12deg, transparent 12deg 24deg)',
                      }}
                    />

                    <svg className="w-full h-full transform -rotate-90 overflow-visible relative z-10" viewBox="0 0 120 120">
                      <defs>
                        <linearGradient id="maxRadialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fde047" />
                          <stop offset="50%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                      <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.22)" strokeWidth="10" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke="url(#maxRadialGrad)"
                        strokeWidth="11"
                        strokeDasharray="301.6"
                        strokeDashoffset="75.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>

                    <div className="absolute inset-5 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-pink-500 p-[3px] shadow-xl z-20">
                      <div className="w-full h-full rounded-full bg-[#1e1b4b] flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-yellow-300 tracking-tight">75%</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mountain Wave Maximalist Card (Right 5 cols) */}
              <div
                className="md:col-span-5 rounded-[36px] p-6 border-[3px] border-cyan-300 shadow-[9px_9px_0px_#1e1b4b] flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: 'linear-gradient(155deg, #1e1b4b 0%, #3730a3 55%, #be185d 100%)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-3xl font-black font-serif italic text-cyan-300 tracking-tight"
                      style={{ textShadow: '2px 2px 0px #ec4899, 4px 4px 0px #1e1b4b' }}
                    >
                      2201
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-white text-[10px] font-black uppercase border-2 border-white rotate-3 shadow-[2px_2px_0px_#1e1b4b]">
                      ★ Peak!
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-pink-100 line-clamp-2 mt-1 leading-snug">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                </div>

                {/* Retro-Arcade Grid + Vivid Neon Layered Mountain Chart */}
                <div
                  className="my-3 h-28 w-full flex items-end rounded-2xl bg-[#0f172a] p-2 border-2 border-pink-400 overflow-hidden relative"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(34,211,238,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,72,153,0.16) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                >
                  <svg viewBox="0 0 160 85" className="w-full h-full overflow-visible relative z-10">
                    <defs>
                      <linearGradient id="maxPeakFront" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                      <linearGradient id="maxPeakBack" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 5 80 L 15 55 Q 25 45, 35 60 Q 45 75, 55 50 Q 65 30, 75 55 Q 85 70, 95 40 Q 105 20, 115 55 L 125 80 Z"
                      fill="url(#maxPeakBack)"
                    />
                    <path
                      d="M 8 80 L 15 58 Q 20 52, 28 65 Q 40 78, 55 45 Q 65 25, 75 80 L 80 80 Q 90 25, 105 10 Q 112 5, 120 40 Q 128 70, 135 80 Z"
                      fill="url(#maxPeakFront)"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    <circle cx="107" cy="9" r="4.5" fill="#a3e635" stroke="#ec4899" strokeWidth="2" />
                    <line x1="107" y1="9" x2="155" y2="9" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3,3" />
                  </svg>
                </div>

                {/* Bottom Candy Slider */}
                <div className="pt-2">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percent = Math.round(Math.min(Math.max((x / rect.width) * 100, 10), 90));
                      setChartTimeline(percent);
                      playTactileClick('slider');
                    }}
                    className="h-3 rounded-full bg-[#0f172a] border-2 border-cyan-300/80 relative flex items-center cursor-pointer"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400"
                      style={{ width: `${chartTimeline}%` }}
                    />
                    <div
                      className="w-5 h-5 rounded-full bg-yellow-300 border-2 border-white flex items-center justify-center absolute -top-[5px] -ml-2.5 transition-all cursor-grab active:cursor-grabbing hover:scale-110 shadow"
                      style={{ left: `${chartTimeline}%` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 5: Bottom Timeline / Stepper Maximalist Card (2019, 2020, 2021, 2022) */}
            <div
              className="rounded-[34px] sm:rounded-full py-5 px-6 sm:px-10 border-[3px] border-pink-400 shadow-[9px_9px_0px_#1e1b4b]"
              style={{
                backgroundColor: '#1e1b4b',
                backgroundImage:
                  'repeating-linear-gradient(-45deg, rgba(253,224,71,0.08) 0px, rgba(253,224,71,0.08) 10px, transparent 10px, transparent 20px)',
              }}
            >
              <div className="relative flex flex-col gap-3.5">
                
                {/* Rainbow Track */}
                <div className="h-3.5 rounded-full bg-[#312e81] border-2 border-cyan-300/70 relative flex items-center mx-4 sm:mx-8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400 transition-all duration-300"
                    style={{
                      width:
                        activeYear === 2019
                          ? '12%'
                          : activeYear === 2020
                          ? '38%'
                          : activeYear === 2021
                          ? '66%'
                          : '96%',
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    {[2019, 2020, 2021, 2022].map((year) => {
                      const isReached = year <= activeYear;
                      return (
                        <div
                          key={year}
                          className={`w-4 h-4 rounded-full border-2 border-white transition-all flex items-center justify-center ${
                            isReached
                              ? 'bg-yellow-300 scale-110 shadow-[0_0_10px_#fde047]'
                              : 'bg-purple-800'
                          }`}
                        >
                          {year === activeYear && (
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Year Eclectic Pills */}
                <div className="flex items-center justify-between px-0 sm:px-4 pt-1">
                  {[2019, 2020, 2021, 2022].map((year, idx) => {
                    const isActive = activeYear === year;
                    const inactivePalettes = [
                      'bg-purple-800 text-pink-200 border-pink-400',
                      'bg-indigo-800 text-cyan-200 border-cyan-400',
                      'bg-fuchsia-800 text-yellow-200 border-yellow-300',
                      'bg-teal-800 text-lime-200 border-lime-300',
                    ];
                    return (
                      <div key={year} className="relative flex flex-col items-center">
                        {isActive && (
                          <div className="w-3 h-3 bg-yellow-300 transform rotate-45 -mb-1.5 border-l border-t border-white" />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            handleAction('click', () => {
                              setActiveYear(year as 2019 | 2020 | 2021 | 2022);
                              triggerToast(`Selected Era: ${year} ★`);
                            });
                          }}
                          className={`px-4 sm:px-6 py-2 rounded-full text-xs font-black tracking-wide transition-all cursor-pointer border-2 ${
                            isActive
                              ? 'bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400 text-white border-white scale-105 shadow-[4px_4px_0px_#fde047]'
                              : `${inactivePalettes[idx]} hover:scale-105 shadow-[3px_3px_0px_#0f172a]`
                          }`}
                        >
                          {year}
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Portfolio Footer Note */}
        <div className="mt-10 text-center text-xs text-yellow-200 border-t-2 border-yellow-300/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-extrabold">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>
              Maximalism Paradigm • Matching exact layout & content of{' '}
              <span className="underline decoration-wavy text-cyan-300">src/assets/sample.jpg</span>
            </span>
          </div>
          <div className="font-bold text-pink-100">
            Memphis Patterns • Kinetic Ticker • Sunburst Seals • Mixed Display Typography
          </div>
        </div>

      </div>
    </div>
  );
};

export default Maximalism;
