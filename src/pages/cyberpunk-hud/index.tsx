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
  Crosshair,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

interface CyberFrameProps {
  children: React.ReactNode;
  accent?: 'cyan' | 'yellow' | 'crimson';
  className?: string;
}

const CyberFrame: React.FC<CyberFrameProps> = ({
  children,
  accent = 'cyan',
  className = '',
}) => {
  const borderClass =
    accent === 'yellow'
      ? 'bg-[#FCEE0A]/65'
      : accent === 'crimson'
        ? 'bg-[#FF003C]/70'
        : 'bg-[#00F0FF]/55';

  return (
    <div className={`relative ${className}`}>
      {/* Chamfered outer border & inner surface layer (kept separate so overhangs never clip) */}
      <div className={`absolute inset-0 cyber-chamfer p-[1.5px] ${borderClass}`}>
        <div className="w-full h-full cyber-chamfer bg-[#090D1A]/95" />
      </div>
      {/* Tactical Corner Crosshairs */}
      <span className="pointer-events-none absolute -top-1.5 -left-1.5 text-[10px] font-mono text-[#00F0FF]/80">
        +
      </span>
      <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 text-[10px] font-mono text-[#FF003C]/80">
        +
      </span>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export const CyberpunkHUD: React.FC = () => {
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
    triggerToast('BREACH PROTOCOL // SYNCING PAYLOAD');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('CYBERWARE SHARD INSTALLED (100%)');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden cyber-bg text-slate-100">
      {/* Visor Sightlines & Horizon Crosshairs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-25">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          <line x1="0" y1="120" x2="1440" y2="120" stroke="#00F0FF" strokeWidth="0.7" strokeDasharray="6 10" />
          <line x1="0" y1="780" x2="1440" y2="780" stroke="#FF003C" strokeWidth="0.7" strokeDasharray="6 10" />
          <circle cx="1290" cy="180" r="95" fill="none" stroke="#FCEE0A" strokeWidth="0.9" strokeDasharray="10 6" />
          <circle cx="140" cy="700" r="110" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Tactical Visor Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 cyber-chamfer-sm bg-[#FF003C] p-[1.5px] shadow-[0_0_25px_rgba(255,0,60,0.45)]">
          <div className="cyber-chamfer-sm bg-[#090D1A] px-5 py-3 flex items-center gap-3">
            <Crosshair className="w-4 h-4 text-[#FCEE0A] shrink-0" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#00F0FF]">
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      {/* Cyberpunk HUD Header Banner */}
      <CyberFrame accent="yellow" className="max-w-[1060px] mx-auto mb-9">
        <div className="h-1.5 w-full cyber-hazard opacity-90" />
        <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-[#FF003C] text-white font-mono text-[11px] font-bold uppercase tracking-widest mb-2.5 cyber-chamfer-sm">
              <span>SYS.2077 // TACTICAL VISOR HUD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#FCEE0A] drop-shadow-[0_0_12px_rgba(252,238,10,0.3)]">
              Cyberpunk / Sci-Fi HUD
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100/75 mt-1.5 max-w-2xl leading-relaxed">
              High-contrast dystopian visor telemetry featuring 45-degree chamfered frames, laser-cyan &amp; hazard-yellow highlights, targeting reticles, and tactical readouts.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 font-mono text-[11px] font-bold uppercase">
            <span className="px-3 py-1.5 border border-[#00F0FF]/50 bg-[#00F0FF]/10 text-[#00F0FF]">
              45° Chamfer
            </span>
            <span className="px-3 py-1.5 border border-[#FCEE0A]/60 bg-[#FCEE0A]/10 text-[#FCEE0A]">
              Visor Telemetry
            </span>
            <span className="px-3 py-1.5 border border-[#FF003C]/60 bg-[#FF003C]/15 text-[#FF4D79]">
              SEC::09
            </span>
          </div>
        </div>
      </CyberFrame>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Tactical Login Module + 4 Action Modules) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <CyberFrame accent="cyan" className="p-7 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-black uppercase tracking-tight text-[#00F0FF]">
                Login
              </h2>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 border border-[#FCEE0A]/60 text-[#FCEE0A]">
                NET::AUTH
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center cyber-chamfer-sm border border-[#00F0FF]/40 bg-[#050811] px-4 py-3 focus-within:border-[#FCEE0A] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent font-mono text-sm font-medium text-cyan-50 focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#00F0FF] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center cyber-chamfer-sm border border-[#00F0FF]/40 bg-[#050811] px-4 py-3 focus-within:border-[#FF003C] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent font-mono text-sm font-medium tracking-wider text-[#FCEE0A] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 text-[#FF003C] hover:text-[#00F0FF] transition-colors"
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
                  handleAction('click', () => triggerToast('ENCRYPTED KEY RESET REQUESTED'))
                }
                className="font-mono text-xs font-bold text-[#00F0FF] underline underline-offset-4 hover:text-[#FCEE0A] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Chamfered Action Trigger: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-20">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'ICE WALL DISCONNECTED' : `UPLINK ACTIVE: ${email}`
                    );
                  })
                }
                className={`min-w-[196px] px-8 py-3.5 cyber-chamfer-sm font-mono text-sm font-black uppercase tracking-wider transition-all active:scale-95 ${
                  isSignedUp
                    ? 'bg-[#00F0FF] text-[#050811] shadow-[0_0_24px_rgba(0,240,255,0.45)]'
                    : 'bg-[#FCEE0A] text-[#050811] shadow-[0_0_24px_rgba(252,238,10,0.4)] hover:bg-[#FF003C] hover:text-white'
                }`}
              >
                {isSignedUp ? 'Signed Up //' : 'Sign Up'}
              </button>
            </div>
          </CyberFrame>

          {/* 4 Stacked Chamfered Action Modules */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`CREW SLOT LINKED (#${friendCount + 1})`);
                })
              }
              className="w-full text-left transition-transform active:scale-[0.98]"
            >
              <CyberFrame accent="cyan" className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 cyber-chamfer-sm bg-[#00F0FF] text-[#050811] flex items-center justify-center">
                      <Plus className="w-5 h-5 stroke-[2.8]" />
                    </div>
                    <span className="font-mono text-sm font-bold uppercase text-cyan-50">
                      Add Friend
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF]">
                    {friendCount}
                  </span>
                </div>
              </CyberFrame>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('DATA SHARD BROADCAST COPIED'))
              }
              className="w-full text-left transition-transform active:scale-[0.98]"
            >
              <CyberFrame accent="crimson" className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 cyber-chamfer-sm bg-[#FF003C] text-white flex items-center justify-center">
                      <Share2 className="w-4 h-4 stroke-[2.4]" />
                    </div>
                    <span className="font-mono text-sm font-bold uppercase text-cyan-50">
                      Share
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#FF003C]">TX//02</span>
                </div>
              </CyberFrame>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full text-left transition-transform active:scale-[0.98]"
              >
                <CyberFrame accent="yellow" className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold uppercase text-[#FCEE0A]">
                      {category}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FCEE0A] transition-transform duration-200 ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CyberFrame>
              </button>

              {isCategoryOpen && (
                <CyberFrame
                  accent="yellow"
                  className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 p-2"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`MODULE LOCKED: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-3.5 py-2.5 font-mono text-xs font-bold uppercase flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#FCEE0A] text-[#050811]'
                          : 'text-cyan-100 hover:bg-[#00F0FF]/15'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </CyberFrame>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="w-full text-left transition-transform active:scale-[0.98]"
            >
              <CyberFrame accent="cyan" className="relative overflow-hidden px-4 py-3">
                {downloadProgress !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#00F0FF]/25 transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 cyber-chamfer-sm bg-[#00F0FF] text-[#050811] flex items-center justify-center">
                      <Download className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="font-mono text-sm font-bold uppercase text-cyan-50">
                      {downloadProgress !== null
                        ? `DOWNLOADING ${downloadProgress}%`
                        : 'Download'}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#00F0FF]">SHARD</span>
                </div>
              </CyberFrame>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Tactical Visor Navigation Pads */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', code: '01', icon: Home },
                { id: 'calender', label: 'Calender', code: '02', icon: Calendar },
                { id: 'notification', label: 'Notification', code: '03', icon: Bell },
                { id: 'setting', label: 'Setting', code: '04', icon: Settings },
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
                      triggerToast(`VISOR SUBSYSTEM: ${item.label.toUpperCase()}`);
                    })
                  }
                  className="text-left transition-transform active:scale-95"
                >
                  <CyberFrame
                    accent={isActive ? 'yellow' : 'cyan'}
                    className="aspect-square sm:aspect-[1/0.88] p-3 flex flex-col items-center justify-center"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative">
                      <span className="absolute top-0 right-1 font-mono text-[9px] text-[#FCEE0A]/80">
                        //{item.code}
                      </span>
                      <div
                        className={`w-11 h-11 cyber-chamfer-sm flex items-center justify-center ${
                          isActive
                            ? 'bg-[#FCEE0A] text-[#050811]'
                            : 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-wider ${
                          isActive ? 'text-[#FCEE0A]' : 'text-cyan-100'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </CyberFrame>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Waveform + Cybernetic Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <CyberFrame accent="cyan" className="flex-1 px-6 py-4">
              <div className="flex items-center justify-between gap-4 h-full">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-cyan-200/70">
                    Last 7 days
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 cyber-chamfer-sm bg-[#00F0FF] text-[#050811]">
                      <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="font-mono text-xl font-black text-[#FCEE0A]">+22,12</span>
                  </div>
                </div>

                <div className="w-[210px] sm:w-[250px] h-[64px] border border-[#00F0FF]/30 bg-[#050811] p-2 shrink-0">
                  <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="cyberLineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="65%" stopColor="#FCEE0A" />
                        <stop offset="100%" stopColor="#FF003C" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                      fill="none"
                      stroke="url(#cyberLineGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="192" cy="15" r="5.5" fill="#FF003C" stroke="#FCEE0A" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </CyberFrame>

            {/* Tactical ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`OVERCLOCK: ${next ? 'ENGAGED' : 'STANDBY'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] cyber-chamfer-sm border-2 p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn
                  ? 'border-[#00F0FF] bg-[#071B26]'
                  : 'border-[#FF003C]/70 bg-[#14070D]'
              }`}
            >
              <span
                className={`pl-2 font-mono text-xs font-black ${
                  isSwitchOn ? 'text-[#00F0FF]' : 'text-slate-600'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2 font-mono text-xs font-black ${
                  !isSwitchOn ? 'text-[#FF003C]' : 'text-slate-600'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[58px] cyber-chamfer-sm transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn
                    ? 'left-[calc(100%-66px)] bg-[#FCEE0A] text-[#050811]'
                    : 'left-2 bg-[#FF003C] text-white'
                }`}
              >
                <span className="font-mono text-[10px] font-black">
                  {isSwitchOn ? 'MAX' : 'OFF'}
                </span>
              </div>
            </button>
          </div>

          {/* ROW 3: Tactical Neural Load Slider (71%) + Callout */}
          <CyberFrame accent="cyan" className="p-6 pb-7">
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
                className="relative flex-1 h-4 bg-[#050811] border border-[#00F0FF]/40 cursor-pointer"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#00F0FF] via-[#FCEE0A] to-[#FF003C] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 cyber-chamfer-sm bg-[#FCEE0A] border border-[#050811] flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-2 h-2 bg-[#FF003C]" />
                </div>
              </div>

              <div className="font-mono text-lg font-black text-[#FCEE0A] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[270px] border border-[#FCEE0A]/60 bg-[#050811] px-4 py-2.5">
                <div className="w-2.5 h-2.5 bg-[#050811] border-l border-t border-[#FCEE0A]/60 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="font-mono text-[10px] leading-snug text-cyan-100/85">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </CyberFrame>

          {/* ROW 4: Two HUD Telemetry Modules ($4891.22 Reticle + 2201 Topo Map) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <CyberFrame accent="crimson" className="md:col-span-7 p-6">
              <div className="flex flex-col justify-between h-full gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF4D79] mb-1.5">
                      LOREM IPSUM DOLOR SIT
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-black text-[#00F0FF]">
                      $4891.22
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-[#FCEE0A] text-[#050811]">
                        <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="font-mono text-xs font-black text-[#FCEE0A]">75%</span>
                    </div>
                  </div>

                  {/* Tactical Reticle Ring Gauge */}
                  <div className="relative w-[136px] h-[136px] shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        stroke="rgba(0,240,255,0.12)"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="34"
                        fill="none"
                        stroke="#FF003C"
                        strokeWidth="3.5"
                        strokeDasharray="8 6"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="10"
                        strokeDasharray="302"
                        strokeDashoffset={302 * 0.25}
                      />
                    </svg>
                    <div className="absolute font-mono text-sm font-black text-[#FCEE0A]">75%</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 font-mono text-xs text-cyan-100/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 bg-[#00F0FF] shrink-0" />
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 bg-[#FF003C] shrink-0" />
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
            </CyberFrame>

            {/* Right Card (2201 + Wireframe Terrain Wave) */}
            <CyberFrame accent="cyan" className="md:col-span-5 p-6">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-black text-[#FCEE0A]">2201</span>
                    <div className="flex-1 h-[1.5px] bg-[#00F0FF]/40 relative">
                      <span className="w-3 h-3 bg-[#FF003C] absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <p className="font-mono text-[10px] text-cyan-100/65 mt-2 leading-snug">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit...
                  </p>
                </div>

                <div className="my-4 h-[132px] border border-[#00F0FF]/25 bg-[#050811] p-2">
                  <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="cyberTopoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#FF003C" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                      fill="rgba(255,0,60,0.22)"
                      stroke="#FF003C"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                      fill="url(#cyberTopoGrad)"
                      stroke="#00F0FF"
                      strokeWidth="2"
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
                  className="w-full accent-[#FCEE0A] cursor-pointer h-1.5 bg-[#102033]"
                />
              </div>
            </CyberFrame>
          </div>

          {/* ROW 5: Cyber Timeline Stepper (2019 - 2022) */}
          <CyberFrame accent="yellow" className="px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#00F0FF]/30" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`ARCHIVE SECTOR: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 cyber-chamfer-sm flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-[#FCEE0A] text-[#050811] scale-125'
                        : 'bg-[#090D1A] border border-[#00F0FF]/60 text-[#00F0FF]'
                    }`}
                  >
                    <span className="w-2 h-2 bg-current" />
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
                        triggerToast(`ARCHIVE SECTOR: ${year}`);
                      })
                    }
                    className={`py-2.5 cyber-chamfer-sm font-mono text-xs sm:text-sm font-black uppercase transition-colors ${
                      isSelected
                        ? 'bg-[#FCEE0A] text-[#050811]'
                        : 'bg-[#050811] border border-[#00F0FF]/35 text-[#00F0FF] hover:border-[#FCEE0A]'
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </CyberFrame>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkHUD;

