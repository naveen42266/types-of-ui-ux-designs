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
  Disc3,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Y2KCyberPop: React.FC = () => {
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
    triggerToast('RIPPING WINAMP SKIN: UI-KIT-2000.ZIP');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('SAVED TO MINIDISC: UI-KIT-Y2K.ZIP');
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
    <div
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden text-slate-900"
      style={{
        backgroundColor: '#0A081C',
        backgroundImage: `
          radial-gradient(circle at 16% 18%, rgba(255, 42, 157, 0.34) 0%, transparent 42%),
          radial-gradient(circle at 84% 22%, rgba(0, 212, 255, 0.34) 0%, transparent 45%),
          radial-gradient(circle at 52% 86%, rgba(184, 255, 0, 0.16) 0%, transparent 42%),
          repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 4px)
        `,
      }}
    >
      {/* Y2K Wireframe Orbital Rings, Chrome Starbursts & Cyber Scan Horizon */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full opacity-35">
          {/* Y2K Perspective Cybergird Rings */}
          <ellipse
            cx="230"
            cy="200"
            rx="280"
            ry="95"
            transform="rotate(-18 230 200)"
            fill="none"
            stroke="#00D4FF"
            strokeWidth="2"
          />
          <ellipse
            cx="1210"
            cy="680"
            rx="320"
            ry="105"
            transform="rotate(22 1210 680)"
            fill="none"
            stroke="#FF2A9D"
            strokeWidth="2"
          />
          {/* Y2K 4-Point Chrome Sparkle Stars */}
          <path d="M1260 110 L1272 150 L1312 162 L1272 174 L1260 214 L1248 174 L1208 162 L1248 150 Z" fill="#FFFFFF" />
          <path d="M140 720 L149 748 L178 757 L149 766 L140 794 L131 766 L102 757 L131 748 Z" fill="#B8FF00" />
        </svg>
      </div>

      {/* Y2K MiniDisc LCD Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full y2k-lcd shadow-2xl border-2 border-cyan-300">
          <Disc3 className="w-4 h-4 text-[#00E5FF] animate-spin shrink-0" />
          <span className="font-mono text-xs font-bold tracking-wider text-[#B8FF00]">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Y2K Cyber-Pop Liquid Chrome Top Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-[30px] y2k-chrome-card p-6 sm:p-7">
        {/* Metallic Corner Rivets */}
        <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-white absolute top-3 left-3 shadow-inner" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-white absolute top-3 right-3 shadow-inner" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-white absolute bottom-3 left-3 shadow-inner" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-white absolute bottom-3 right-3 shadow-inner" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full y2k-jelly-pink text-white text-[11px] font-black uppercase tracking-widest mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              1998–2003 ERA // Y2K CYBER-POP
            </div>
            <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight text-slate-900 drop-shadow-[0_1px_0_#FFFFFF]">
              Y2K Cyber-Pop UI System
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1.5 max-w-2xl leading-relaxed">
              Millennium Futurism inspired by iMac G3 translucency, Sony MiniDisc LCD readouts, brushed liquid-chrome bevels, wireframe orbitals, and hot-magenta/cyan jelly buttons.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-black uppercase">
            <span className="px-3.5 py-1.5 rounded-full y2k-chrome-pill text-slate-800">
              Chrome Bevel
            </span>
            <span className="px-3.5 py-1.5 rounded-full y2k-jelly-cyan text-slate-950">
              Bondi Jelly
            </span>
            <span className="px-3.5 py-1.5 rounded-full y2k-lcd text-[#B8FF00] font-mono">
              LCD::2000
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Chrome Login Plate + 4 Cyber Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Chrome Housing */}
          <div className="relative rounded-[34px] y2k-chrome-card p-7 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-black italic tracking-tight text-slate-900 drop-shadow-[0_1px_0_#FFFFFF]">
                Login
              </h2>
              <div className="px-2.5 py-1 rounded-lg y2k-lcd font-mono text-[10px] font-bold text-[#00E5FF]">
                ID::2K
              </div>
            </div>

            {/* Email MiniDisc LCD Well */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-2xl y2k-lcd px-4 py-3 focus-within:border-[#00D4FF] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent font-mono text-sm font-bold text-[#B8FF00] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#00D4FF] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password MiniDisc LCD Well */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-2xl y2k-lcd px-4 py-3 focus-within:border-[#FF2A9D] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent font-mono text-sm font-bold tracking-wider text-[#00E5FF] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-white/10 text-[#FF2A9D] transition-colors"
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
                  handleAction('click', () => triggerToast('PAGER DISPATCHED: RESET PIN'))
                }
                className="text-xs font-black italic text-[#C9006B] underline underline-offset-4 hover:text-[#008CB8] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Hot-Pink Jelly Capsule: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'DISC EJECTED' : `CYBER ID LINKED: ${email}`);
                  })
                }
                className={`min-w-[188px] px-8 py-3.5 rounded-full font-black italic text-sm text-white tracking-wide transition-transform active:scale-95 ${
                  isSignedUp ? 'y2k-jelly-cyan text-slate-950' : 'y2k-jelly-pink'
                }`}
              >
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
                </span>
              </button>
            </div>
          </div>

          {/* 4 Stacked Liquid Chrome Action Pills */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`AIM BUDDY ADDED (#${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full y2k-chrome-pill hover:brightness-105 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full y2k-jelly-pink text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="text-[15px] font-black italic text-slate-900">Add Friend</span>
              </div>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full y2k-lcd text-[#B8FF00]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('COPIED IR BEAM HYPERLINK'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full y2k-chrome-pill hover:brightness-105 transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-full y2k-jelly-cyan text-slate-950 flex items-center justify-center">
                <Share2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[15px] font-black italic text-slate-900">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full y2k-chrome-pill hover:brightness-105 transition-all active:scale-[0.98]"
              >
                <span className="text-[15px] font-black italic text-slate-900">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-700 transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl y2k-chrome-card p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`TRACK SELECTED: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'y2k-jelly-pink text-white'
                          : 'text-slate-800 hover:bg-white/60'
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-full y2k-chrome-pill hover:brightness-105 transition-all active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF2A9D]/45 to-[#00D4FF]/45 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full y2k-jelly-cyan text-slate-950 flex items-center justify-center">
                <Download className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="relative z-10 text-[15px] font-black italic text-slate-900">
                {downloadProgress !== null ? `RIPPING ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Metallic Chrome Navigation Pads */}
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
                      triggerToast(`MODE::${item.label.toUpperCase()}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.9] rounded-[26px] flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isActive ? 'y2k-jelly-cyan text-slate-950' : 'y2k-chrome-card text-slate-800'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      isActive
                        ? 'y2k-lcd text-[#B8FF00]'
                        : 'y2k-chrome-pill text-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black italic tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 MiniDisc LCD Card + Jelly Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-[26px] y2k-chrome-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  Last 7 days
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full y2k-jelly-pink text-white">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="font-mono text-xl font-black text-slate-900">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-2xl y2k-lcd p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="y2kWaveGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="50%" stopColor="#B8FF00" />
                      <stop offset="100%" stopColor="#FF2A9D" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#y2kWaveGrad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill="#B8FF00" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Chrome + Hot-Pink ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`BASS BOOST: ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn ? 'y2k-jelly-pink' : 'y2k-chrome-pill'
              }`}
            >
              <span
                className={`pl-3 font-mono text-xs font-black tracking-widest ${
                  isSwitchOn ? 'text-white' : 'text-slate-400'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 font-mono text-xs font-black tracking-widest ${
                  !isSwitchOn ? 'text-slate-700' : 'text-white/45'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[62px] rounded-full y2k-chrome-pill transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-70px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full ${
                    isSwitchOn ? 'bg-[#00D4FF]' : 'bg-slate-400'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Y2K Equalizer Slider + Callout Bubble */}
          <div className="rounded-[28px] y2k-chrome-card p-6 pb-7">
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
                className="relative flex-1 h-4 rounded-full y2k-lcd cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#B8FF00] to-[#FF2A9D] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full y2k-chrome-pill flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#FF2A9D]" />
                </div>
              </div>

              <div className="font-mono text-lg font-black px-3 py-1 rounded-xl y2k-lcd text-[#B8FF00] min-w-[66px] text-center">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-2xl y2k-chrome-pill px-4 py-2.5">
                <div className="w-3 h-3 bg-white border-l border-t border-white rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-slate-800 font-bold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Cyber-Chrome Analytics Cards ($4891.22 + 2201 MiniDisc Mountain Wave) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-[30px] y2k-chrome-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-2">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="inline-block px-3 py-1 rounded-xl y2k-lcd font-mono text-2xl sm:text-3xl font-black text-[#00E5FF]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full y2k-jelly-pink text-white">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-black text-[#C9006B]">75%</span>
                  </div>
                </div>

                {/* Chrome CD-Disc 75% Gauge */}
                <div className="relative w-[138px] h-[138px] rounded-full y2k-lcd shrink-0 flex items-center justify-center p-2">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="y2kRingGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="50%" stopColor="#B8FF00" />
                        <stop offset="100%" stopColor="#FF2A9D" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="11"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#64748B"
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
                      stroke="url(#y2kRingGrad)"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute w-[60px] h-[60px] rounded-full y2k-chrome-pill flex items-center justify-center font-mono text-sm font-black text-slate-900">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-500 border border-white shrink-0" />
                  <span className="text-xs font-bold text-slate-700">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full y2k-jelly-pink shrink-0" />
                  <span className="text-xs font-bold text-slate-700">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Phosphor Mountain Peaks) */}
            <div className="md:col-span-5 rounded-[30px] y2k-chrome-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-lg y2k-lcd font-mono text-xl font-black text-[#B8FF00]">
                    2201
                  </span>
                  <div className="flex-1 h-[2px] bg-slate-500 relative">
                    <span className="w-3 h-3 rounded-full y2k-jelly-pink absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-700 font-semibold mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl y2k-lcd p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="y2kPeakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF2A9D" />
                      <stop offset="55%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#061318" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(148,163,184,0.35)"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#y2kPeakGrad)"
                    stroke="#FFFFFF"
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
                className="w-full accent-[#FF2A9D] cursor-pointer h-2 rounded-full bg-slate-400"
              />
            </div>
          </div>

          {/* ROW 5: Y2K Chrome Timeline Stepper (2019 - 2022) */}
          <div className="rounded-[28px] y2k-chrome-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full y2k-lcd" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`YEAR::${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                      isSelected ? 'y2k-jelly-pink scale-125' : 'y2k-chrome-pill'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-[#00D4FF]'
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
                        triggerToast(`YEAR::${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full font-mono text-xs sm:text-sm font-black transition-all active:scale-95 ${
                      isSelected ? 'y2k-jelly-pink text-white' : 'y2k-chrome-pill text-slate-800'
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

export default Y2KCyberPop;

