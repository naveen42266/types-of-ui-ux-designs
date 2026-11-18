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
  Radio,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const SynthwaveVaporwave: React.FC = () => {
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
    triggerToast('CASSETTE DECK // RECORDING SIDE A');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('OUTRUN TAPE COMPLETE (100%)');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  const peakScale = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTipY = Math.round(135 - 115 * peakScale);

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden synth-bg text-pink-50">
      {/* Outrun Sliced Sunset Sun & 3D Laser Horizon Backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Striped Retro Sun */}
        <svg
          viewBox="0 0 360 360"
          className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] absolute left-1/2 -translate-x-1/2 top-[18%] opacity-45"
        >
          <defs>
            <linearGradient id="outrunSunGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFB96" />
              <stop offset="48%" stopColor="#FF71CE" />
              <stop offset="100%" stopColor="#B967FF" />
            </linearGradient>
            <mask id="outrunSunMask">
              <rect x="0" y="0" width="360" height="360" fill="white" />
              <rect x="0" y="195" width="360" height="8" fill="black" />
              <rect x="0" y="218" width="360" height="12" fill="black" />
              <rect x="0" y="246" width="360" height="16" fill="black" />
              <rect x="0" y="278" width="360" height="20" fill="black" />
            </mask>
          </defs>
          <circle cx="180" cy="180" r="165" fill="url(#outrunSunGrad)" mask="url(#outrunSunMask)" />
        </svg>

        {/* Horizon Glow Line & Perspective Grid Floor */}
        <div className="absolute left-0 right-0 top-[56%] h-[2px] bg-[#01CDFE] shadow-[0_0_24px_4px_#01CDFE]" />
        <div className="absolute left-0 right-0 top-[56%] h-[65vh] overflow-hidden opacity-65">
          <div className="w-[160%] -ml-[30%] h-[500px] synth-grid-floor" />
        </div>
      </div>

      {/* VHS Broadcast Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl synth-card border-[#05FFA1] shadow-[0_0_24px_rgba(5,255,161,0.3)]">
          <Radio className="w-4 h-4 text-[#05FFA1] shrink-0" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#FFFB96]">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Synthwave / Vaporwave Top Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-3xl synth-card p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FF71CE]/20 border border-[#FF71CE] text-[#FFFB96] font-mono text-[11px] font-bold uppercase tracking-widest mb-2.5">
              <span>PLAY ▶ // VHS 1986</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFB96] via-[#FF71CE] to-[#01CDFE] drop-shadow-[0_2px_10px_rgba(255,113,206,0.4)]">
              Synthwave / Vaporwave UI
            </h1>
            <p className="text-xs sm:text-sm text-pink-100/80 mt-1.5 max-w-2xl leading-relaxed">
              Retro-futuristic Outrun &amp; Vaporwave interface pairing twilight plum gradients, sliced sunset orbs, laser horizon grids, neon magenta rims, and electric cyan highlights.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 font-mono text-[11px] font-bold uppercase">
            <span className="px-3 py-1.5 rounded-full border border-[#FF71CE]/70 bg-[#FF71CE]/15 text-[#FF71CE]">
              Outrun Grid
            </span>
            <span className="px-3 py-1.5 rounded-full border border-[#01CDFE]/70 bg-[#01CDFE]/15 text-[#01CDFE]">
              Neon Sunset
            </span>
            <span className="px-3 py-1.5 rounded-full border border-[#05FFA1]/70 bg-[#05FFA1]/15 text-[#05FFA1]">
              STEREO::HI-FI
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Synth Login Card + 4 Action Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-[28px] synth-card p-7 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFB96] to-[#FF71CE]">
                Login
              </h2>
              <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#01CDFE]/60 text-[#01CDFE]">
                REC ●
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-xl border border-[#01CDFE]/45 bg-[#0E0320]/80 px-4 py-3 focus-within:border-[#FF71CE] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-semibold text-cyan-100 focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#01CDFE] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-xl border border-[#01CDFE]/45 bg-[#0E0320]/80 px-4 py-3 focus-within:border-[#FF71CE] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-semibold tracking-wider text-[#FF71CE] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-white/10 text-[#FFFB96] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forget Password? */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('REWINDING ACCESS CREDENTIALS'))
                }
                className="text-xs font-bold text-[#01CDFE] underline underline-offset-4 hover:text-[#FF71CE] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Sunset Capsule: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'EJECTED SYNTH TAPE' : `TUNED IN TO SUNSET FM: ${email}`
                    );
                  })
                }
                className={`min-w-[192px] px-8 py-3.5 rounded-full font-black italic uppercase tracking-wider text-sm transition-transform active:scale-95 ${
                  isSignedUp
                    ? 'bg-[#05FFA1] text-[#140328] border border-white shadow-[0_0_24px_rgba(5,255,161,0.55)]'
                    : 'synth-sunset-btn text-[#140328]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Vaporwave Action Pills */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`CREW NIGHTRIDE +1 (#${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full synth-pill hover:border-[#FF71CE] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF71CE] to-[#B967FF] text-white flex items-center justify-center shadow-[0_0_14px_rgba(255,113,206,0.5)]">
                  <Plus className="w-5 h-5 stroke-[2.8]" />
                </div>
                <span className="text-[15px] font-bold text-pink-50">Add Friend</span>
              </div>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FF71CE]/20 border border-[#FF71CE] text-[#FFFB96]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('FM BROADCAST LINK COPIED'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full synth-pill hover:border-[#05FFA1] transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#01CDFE] to-[#05FFA1] text-[#140328] flex items-center justify-center shadow-[0_0_14px_rgba(1,205,254,0.45)]">
                <Share2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[15px] font-bold text-pink-50">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full synth-pill hover:border-[#FFFB96] transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] font-bold text-[#FFFB96]">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FF71CE] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl synth-card p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`SIDE A TRACK: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-gradient-to-r from-[#FF71CE] to-[#B967FF] text-white'
                          : 'text-pink-100 hover:bg-white/10'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-full synth-pill hover:border-[#05FFA1] transition-all active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF71CE]/35 to-[#01CDFE]/35 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#FF9E00] to-[#FF71CE] text-[#140328] flex items-center justify-center shadow-[0_0_14px_rgba(255,158,0,0.45)]">
                <Download className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="relative z-10 text-[15px] font-bold text-pink-50">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Neon Twilight Navigation Tiles */}
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
                      triggerToast(`CHANNEL: ${item.label.toUpperCase()}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.9] rounded-3xl synth-card flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isActive
                      ? 'border-[#01CDFE] shadow-[0_0_26px_rgba(1,205,254,0.38)]'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      isActive
                        ? 'bg-gradient-to-br from-[#FFFB96] via-[#FF71CE] to-[#B967FF] text-[#140328] shadow-[0_0_16px_rgba(255,113,206,0.55)]'
                        : 'bg-[#0E0320] border border-[#01CDFE]/40 text-[#01CDFE]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-bold tracking-wide ${
                      isActive ? 'text-[#FFFB96]' : 'text-pink-100/80'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Neon Wave + Outrun Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-3xl synth-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-pink-200/75">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#05FFA1] text-[#140328]">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-mono text-xl font-black text-[#FFFB96]">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-2xl bg-[#0D021E] border border-[#FF71CE]/30 p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="synthWaveGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#01CDFE" />
                      <stop offset="50%" stopColor="#FF71CE" />
                      <stop offset="100%" stopColor="#FFFB96" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#synthWaveGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="5.5" fill="#05FFA1" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`SYNTH ARPEGGIO: ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border-2 p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn
                  ? 'border-[#FF71CE] bg-[#FF71CE]/20 shadow-[0_0_24px_rgba(255,113,206,0.35)]'
                  : 'border-[#01CDFE]/35 bg-[#0E0320]'
              }`}
            >
              <span
                className={`pl-2.5 font-mono text-xs font-black ${
                  isSwitchOn ? 'text-[#05FFA1]' : 'text-purple-700'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2.5 font-mono text-xs font-black ${
                  !isSwitchOn ? 'text-[#01CDFE]' : 'text-purple-700'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[60px] rounded-full transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn
                    ? 'left-[calc(100%-68px)] bg-gradient-to-br from-[#FFFB96] to-[#FF71CE] shadow-[0_0_16px_rgba(255,113,206,0.65)]'
                    : 'left-2 bg-[#1F0B3D] border border-[#01CDFE]/50'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isSwitchOn ? 'bg-[#140328]' : 'bg-[#01CDFE]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Neon Horizon Slider (71%) + Vaporwave Tooltip */}
          <div className="rounded-3xl synth-card p-6 pb-7">
            <div className="flex items-center gap-5">
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
                className="relative flex-1 h-3 rounded-full bg-[#0D021E] border border-[#01CDFE]/40 cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#01CDFE] via-[#FF71CE] to-[#FFFB96] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-[#FFFB96] to-[#FF71CE] border-2 border-white shadow-[0_0_16px_rgba(255,113,206,0.8)]"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="font-mono text-lg font-black text-[#01CDFE] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-2xl border border-[#01CDFE]/55 bg-[#12042B]/90 px-4 py-2.5">
                <div className="w-3 h-3 bg-[#12042B] border-l border-t border-[#01CDFE]/55 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-pink-100/85">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Outrun Analytics Cards ($4891.22 + 2201 Neon MountainHorizon) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-3xl synth-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF71CE] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#FFFB96]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#05FFA1] text-[#140328]">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="font-mono text-xs font-black text-[#05FFA1]">75%</span>
                  </div>
                </div>

                {/* Sunset Ring Gauge */}
                <div className="relative w-[134px] h-[134px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="synthRingGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#01CDFE" />
                        <stop offset="50%" stopColor="#FF71CE" />
                        <stop offset="100%" stopColor="#FFFB96" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="rgba(255,113,206,0.16)"
                      strokeWidth="11"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#B967FF"
                      strokeWidth="5"
                      strokeDasharray="207"
                      strokeDashoffset="76"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="url(#synthRingGrad)"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute font-mono text-sm font-black text-white">75%</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs text-pink-100/80">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#01CDFE] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FF71CE] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Twilight Mountains) */}
            <div className="md:col-span-5 rounded-3xl synth-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-black text-[#01CDFE]">2201</span>
                  <div className="flex-1 h-[1.5px] bg-[#FF71CE]/45 relative">
                    <span className="w-3 h-3 rounded-full bg-[#FFFB96] shadow-[0_0_10px_#FFFB96] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-pink-100/65 mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl bg-[#0D021E] border border-[#01CDFE]/30 p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="synthMountainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF71CE" />
                      <stop offset="65%" stopColor="#B967FF" />
                      <stop offset="100%" stopColor="#120428" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(1,205,254,0.28)"
                    stroke="#01CDFE"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#synthMountainGrad)"
                    stroke="#FFFB96"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

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
                className="w-full accent-[#FF71CE] cursor-pointer h-1.5 rounded-full bg-[#240B47]"
              />
            </div>
          </div>

          {/* ROW 5: Synthwave Timeline Stepper (2019 - 2022) */}
          <div className="rounded-3xl synth-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#FF71CE]/35" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`OUTRUN MIXTAPE: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FFFB96] to-[#FF71CE] scale-125 shadow-[0_0_16px_rgba(255,113,206,0.85)]'
                        : 'bg-[#12042B] border border-[#01CDFE]/60'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#140328]' : 'bg-[#01CDFE]'
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
                        triggerToast(`OUTRUN MIXTAPE: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full font-mono text-xs sm:text-sm font-black transition-all ${
                      isSelected
                        ? 'synth-sunset-btn text-[#140328]'
                        : 'synth-pill text-pink-100/80 hover:border-[#FF71CE]'
                    }`}
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

export default SynthwaveVaporwave;

