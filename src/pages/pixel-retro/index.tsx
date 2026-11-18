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
  Gamepad2,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const PixelRetro: React.FC = () => {
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
    triggerToast('LOADING CARTRIDGE: UI_KIT.ROM');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('1-UP! UI_KIT.ROM SAVED TO SRAM');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  // Stepped peak scale for crisp pixel mountain
  const peakHeightBoost = Math.round(((chartTimeline - 15) / 85) * 44);
  const tallPeakY = 76 - peakHeightBoost;

  // Segmented 16-block bar calculation for 71% slider & 75% ring
  const totalSliderBlocks = 20;
  const activeSliderBlocks = Math.round((sliderValue / 100) * totalSliderBlocks);

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden pixel-dither-bg font-mono text-[#181425]">
      {/* 8-Bit Starry Pixel Sky & Stepped Horizon Silhouette */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
        <svg viewBox="0 0 320 180" preserveAspectRatio="none" shapeRendering="crispEdges" className="w-full h-full">
          {/* Pixel Stars */}
          <rect x="28" y="20" width="2" height="2" fill="#FFCE00" />
          <rect x="74" y="34" width="2" height="2" fill="#2CE8F5" />
          <rect x="135" y="16" width="2" height="2" fill="#FFF4DC" />
          <rect x="208" y="28" width="2" height="2" fill="#FFCE00" />
          <rect x="278" y="18" width="2" height="2" fill="#63C74D" />
          <rect x="296" y="52" width="2" height="2" fill="#E43B44" />
          {/* 8-Bit Cloud Blocks */}
          <path d="M220 38 h16 v4 h6 v6 h-28 v-6 h6 z" fill="#3A4466" />
          <path d="M36 48 h14 v4 h6 v4 h-24 v-4 h4 z" fill="#3A4466" />
          {/* Stepped Bottom Pixel Terrain */}
          <path
            d="M0 156 h24 v-8 h20 v-8 h18 v8 h22 v8 h30 v-12 h24 v-8 h16 v8 h24 v12 h34 v-10 h26 v-10 h20 v10 h26 v10 h36 v24 H0 z"
            fill="#120E1D"
          />
        </svg>
      </div>

      {/* 8-Bit RPG Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 pixel-card-dark text-[#FFCE00]">
          <Gamepad2 className="w-5 h-5 text-[#63C74D] shrink-0" />
          <span className="text-xs font-bold tracking-wider uppercase">{toastMessage}</span>
        </div>
      )}

      {/* Pixel / 8-Bit Retro Paradigm Top Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 pixel-card-dark p-6 text-[#FFF4DC]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E43B44] border-2 border-[#0B0812] text-[#FFF4DC] text-[11px] font-black uppercase tracking-widest mb-2.5">
              <span>LVL 08 // BITMAP HUD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#FFCE00] drop-shadow-[3px_3px_0px_#0B0812]">
              Pixel / 8-Bit Retro UI
            </h1>
            <p className="text-xs sm:text-sm text-[#C0CBDC] mt-1.5 max-w-2xl leading-relaxed">
              Classic NES &amp; SNES bitmap interface: crisp 0px corners, chunky pixel shadows, stepped SVG sprite charts, RPG dialog frames, and 8-bit arcade color blocks.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 text-[11px] font-black uppercase">
            <span className="px-3 py-1.5 bg-[#0095E9] border-2 border-[#0B0812] text-white">
              0px Corners
            </span>
            <span className="px-3 py-1.5 bg-[#63C74D] border-2 border-[#0B0812] text-[#181425]">
              Crisp Sprites
            </span>
            <span className="px-3 py-1.5 bg-[#FFCE00] border-2 border-[#0B0812] text-[#181425]">
              8-Bit Palette
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (RPG Login Box + 4 Pixel Action Bars) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login RPG Frame */}
          <div className="relative pixel-card p-7 pb-12">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-4 border-[#181425]">
              <h2 className="text-2xl font-black uppercase tracking-wider text-[#181425]">
                Login
              </h2>
              <span className="px-2 py-0.5 bg-[#181425] text-[#63C74D] text-[10px] font-black uppercase">
                P1 READY
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center pixel-inset px-3.5 py-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-8 bg-transparent text-xs sm:text-sm font-bold text-[#2CE8F5] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#FFCE00] absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center pixel-inset px-3.5 py-2.5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-8 bg-transparent text-xs sm:text-sm font-bold tracking-wider text-[#FFF4DC] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-2.5 p-1 text-[#FFCE00] hover:text-[#E43B44]"
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
                  handleAction('click', () => triggerToast('CONTINUE CODE SENT!'))
                }
                className="text-xs font-black text-[#E43B44] underline underline-offset-4 hover:text-[#0095E9]"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Sign Up Pixel Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'GAME SAVED // LOGGED OUT' : `WELCOME HERO: ${email}`);
                  })
                }
                className={`min-w-[192px] px-7 py-3 pixel-btn font-black text-xs sm:text-sm uppercase tracking-wider ${
                  isSignedUp
                    ? 'bg-[#63C74D] text-[#181425]'
                    : 'bg-[#E43B44] text-[#FFF4DC]'
                }`}
              >
                {isSignedUp ? 'Signed Up *' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Pixel Action Buttons */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`PARTY MEMBER +1 (TOTAL ${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 pixel-btn bg-[#FFF4DC]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-[#63C74D] border-4 border-[#181425] text-[#181425] flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="text-sm font-black uppercase text-[#181425]">Add Friend</span>
              </div>
              <span className="px-2 py-0.5 bg-[#181425] text-[#FFCE00] text-xs font-black">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('LINK CABLE COPIED TO CLIPBOARD'))
              }
              className="w-full flex items-center gap-3.5 px-4 py-3 pixel-btn bg-[#FFF4DC]"
            >
              <div className="w-10 h-10 bg-[#0095E9] border-4 border-[#181425] text-[#FFF4DC] flex items-center justify-center">
                <Share2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-black uppercase text-[#181425]">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-5 py-3.5 pixel-btn bg-[#FFCE00]"
              >
                <span className="text-sm font-black uppercase text-[#181425]">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#181425] transition-transform ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 pixel-card p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`QUEST: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center justify-between ${
                        category === cat
                          ? 'bg-[#181425] text-[#FFCE00]'
                          : 'text-[#181425] hover:bg-[#E7D8BE]'
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
              className="relative overflow-hidden w-full flex items-center gap-3.5 px-4 py-3 pixel-btn bg-[#FFF4DC]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#63C74D]/55"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-10 h-10 bg-[#E43B44] border-4 border-[#181425] text-[#FFF4DC] flex items-center justify-center">
                <Download className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="relative z-10 text-sm font-black uppercase text-[#181425]">
                {downloadProgress !== null ? `DOWNLOADING ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Pixel Arcade Navigation Pads */}
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
                      triggerToast(`STAGE: ${item.label.toUpperCase()}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.88] pixel-btn flex flex-col items-center justify-center gap-2.5 ${
                    isActive
                      ? 'bg-[#FFCE00] text-[#181425]'
                      : 'bg-[#262B44] text-[#FFF4DC]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 border-4 border-[#0B0812] flex items-center justify-center ${
                      isActive ? 'bg-[#181425] text-[#63C74D]' : 'bg-[#181425] text-[#2CE8F5]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Pixel Staircase Sparkline + Arcade Toggle Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 pixel-card px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-black uppercase text-[#5A4E41]">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-[#63C74D] border-2 border-[#181425] text-[#181425]">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xl font-black text-[#181425]">+22,12</span>
                </div>
              </div>

              {/* Crisp Stepped Pixel Bar / Staircase Chart */}
              <div className="w-[210px] sm:w-[250px] h-[64px] pixel-inset p-2 shrink-0">
                <svg viewBox="0 0 120 32" shapeRendering="crispEdges" className="w-full h-full">
                  <rect x="4" y="22" width="10" height="8" fill="#0095E9" />
                  <rect x="18" y="12" width="10" height="18" fill="#2CE8F5" />
                  <rect x="32" y="16" width="10" height="14" fill="#63C74D" />
                  <rect x="46" y="20" width="10" height="10" fill="#63C74D" />
                  <rect x="60" y="14" width="10" height="16" fill="#FFCE00" />
                  <rect x="74" y="8" width="10" height="22" fill="#FFCE00" />
                  <rect x="88" y="4" width="10" height="26" fill="#E43B44" />
                  <rect x="102" y="14" width="10" height="16" fill="#FFCE00" />
                  {/* Highlight pixel dot */}
                  <rect x="91" y="1" width="4" height="4" fill="#FFF4DC" />
                </svg>
              </div>
            </div>

            {/* ON / OFF Chunky Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`TURBO MODE: ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] pixel-btn p-2 flex items-center justify-between ${
                isSwitchOn ? 'bg-[#63C74D]' : 'bg-[#5A6988]'
              }`}
            >
              <span
                className={`pl-2.5 text-xs font-black uppercase ${
                  isSwitchOn ? 'text-[#181425]' : 'text-[#262B44]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2.5 text-xs font-black uppercase ${
                  !isSwitchOn ? 'text-[#FFF4DC]' : 'text-[#181425]/40'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[58px] bg-[#FFF4DC] border-4 border-[#181425] transition-all flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-66px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3 h-3 border-2 border-[#181425] ${
                    isSwitchOn ? 'bg-[#FFCE00]' : 'bg-[#8B9BB4]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Segmented HP/EXP Slider + RPG Dialog Callout */}
          <div className="pixel-card p-6 pb-7">
            <div className="flex items-center gap-4">
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
                    setSliderValue((v) => Math.min(v + 5, 95));
                    playTactileClick('slider');
                  } else if (e.key === 'ArrowLeft') {
                    setSliderValue((v) => Math.max(v - 5, 5));
                    playTactileClick('slider');
                  }
                }}
                className="relative flex-1 h-7 pixel-inset p-1 cursor-pointer flex items-center gap-0.5"
              >
                {Array.from({ length: totalSliderBlocks }).map((_, idx) => {
                  const filled = idx < activeSliderBlocks;
                  return (
                    <span
                      key={idx}
                      className={`h-full flex-1 ${
                        filled
                          ? idx > 13
                            ? 'bg-[#FFCE00]'
                            : 'bg-[#63C74D]'
                          : 'bg-[#262B44]'
                      }`}
                    />
                  );
                })}
                {/* Thumb Square */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-9 bg-[#FFF4DC] border-4 border-[#181425] shadow-[3px_3px_0_#0B0812]"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="px-3 py-1 bg-[#181425] border-4 border-[#0B0812] text-[#FFCE00] text-lg font-black min-w-[70px] text-center">
                {sliderValue}%
              </div>
            </div>

            {/* RPG Dialog Tooltip */}
            <div className="mt-5 flex justify-center sm:justify-end sm:pr-16">
              <div className="relative max-w-[280px] pixel-card-dark px-4 py-3 text-[#FFF4DC]">
                <div className="w-3 h-3 bg-[#FFCE00] border-2 border-[#0B0812] absolute -top-2 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug font-bold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two 8-Bit Analytics Cards ($4891.22 Gold Counter + 2201 Pixel Mountain) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 pixel-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#5A4E41] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#181425] border-4 border-[#0B0812] text-2xl sm:text-3xl font-black text-[#FFCE00]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#63C74D] border-2 border-[#181425] text-[#181425]">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-black text-[#181425]">75%</span>
                  </div>
                </div>

                {/* Stepped Pixel Ring Gauge (75%) */}
                <div className="relative w-[132px] h-[132px] pixel-inset shrink-0 flex items-center justify-center p-2">
                  <svg viewBox="0 0 32 32" shapeRendering="crispEdges" className="w-full h-full">
                    {/* Outer 75% (top, right, bottom) Pixel Square Ring */}
                    <rect x="4" y="2" width="24" height="4" fill="#63C74D" />
                    <rect x="26" y="4" width="4" height="24" fill="#FFCE00" />
                    <rect x="4" y="26" width="24" height="4" fill="#0095E9" />
                    {/* Remaining 25% muted track */}
                    <rect x="2" y="4" width="4" height="24" fill="#3A4466" />
                    {/* Inner ring accent */}
                    <rect x="8" y="6" width="16" height="2" fill="#E43B44" />
                    <rect x="24" y="8" width="2" height="16" fill="#E43B44" />
                  </svg>
                  <div className="absolute px-2 py-1 bg-[#FFF4DC] border-2 border-[#181425] text-xs font-black text-[#181425]">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 bg-[#0095E9] border-2 border-[#181425] shrink-0" />
                  <span className="text-xs font-bold text-[#181425]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 bg-[#63C74D] border-2 border-[#181425] shrink-0" />
                  <span className="text-xs font-bold text-[#181425]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + 8-Bit Mountain Peaks) */}
            <div className="md:col-span-5 pixel-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-[#181425] text-[#2CE8F5] text-xl font-black">
                    2201
                  </span>
                  <div className="flex-1 h-1 bg-[#181425] relative">
                    <span className="w-3 h-3 bg-[#E43B44] border-2 border-[#181425] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#5A4E41] font-bold mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              {/* 8-Bit Stepped Mountain Landscape */}
              <div className="my-4 h-[132px] pixel-inset p-1.5">
                <svg viewBox="0 0 120 80" preserveAspectRatio="none" shapeRendering="crispEdges" className="w-full h-full">
                  {/* Sky Grid Accent */}
                  <rect x="14" y="10" width="4" height="4" fill="#FFCE00" />
                  <rect x="92" y="12" width="4" height="4" fill="#FFF4DC" />
                  {/* Far Mountain Layer */}
                  <polygon
                    points="4,76 16,52 28,52 36,64 48,40 62,40 74,58 88,36 102,36 116,76"
                    fill="#3A4466"
                  />
                  {/* Foreground Interactive Stepped Mountain */}
                  <polygon
                    points={`4,76 12,48 22,48 30,66 42,54 54,54 62,46 74,46 82,${tallPeakY} 96,${tallPeakY} 116,76`}
                    fill="#63C74D"
                  />
                  {/* Snow cap pixels */}
                  <rect x="82" y={tallPeakY} width="14" height="6" fill="#FFF4DC" />
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
                className="w-full accent-[#E43B44] cursor-pointer h-3 bg-[#181425]"
              />
            </div>
          </div>

          {/* ROW 5: 8-Bit Timeline Stepper (2019 - 2022) */}
          <div className="pixel-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-2 bg-[#181425]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`WORLD ${year - 2018}: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-7 h-7 border-4 border-[#181425] flex items-center justify-center ${
                      isSelected ? 'bg-[#E43B44] scale-125' : 'bg-[#FFF4DC]'
                    }`}
                  >
                    <span className={`w-2 h-2 ${isSelected ? 'bg-[#FFCE00]' : 'bg-[#181425]'}`} />
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
                        triggerToast(`WORLD ${year - 2018}: ${year}`);
                      })
                    }
                    className={`py-2.5 pixel-btn text-xs sm:text-sm font-black uppercase ${
                      isSelected
                        ? 'bg-[#FFCE00] text-[#181425]'
                        : 'bg-[#262B44] text-[#FFF4DC]'
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

export default PixelRetro;

