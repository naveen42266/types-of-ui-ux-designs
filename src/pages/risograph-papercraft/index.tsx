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
  Printer,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const RisographPaperCraft: React.FC = () => {
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
    triggerToast('PRINTING DRUM // 2-COLOR ZINE EDITION');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('RISO PROOF PRINTED (100% DRY)');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden riso-paper-bg text-[#262322]">
      {/* Misregistered Halftone Cut-Paper Collage Shapes in Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-35">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          {/* Spot Pink Blob + Offset Teal Overprint */}
          <circle cx="130" cy="180" r="115" fill="#FF48B0" style={{ mixBlendMode: 'multiply' }} />
          <circle cx="146" cy="192" r="115" fill="#0078BF" opacity="0.55" style={{ mixBlendMode: 'multiply' }} />
          {/* Sunflower Yellow Torn Polygon Bottom Right */}
          <polygon
            points="1160,640 1380,610 1420,860 1130,870"
            fill="#FFE800"
            style={{ mixBlendMode: 'multiply' }}
          />
          <circle cx="1290" cy="700" r="90" fill="#00A95C" opacity="0.55" style={{ mixBlendMode: 'multiply' }} />
        </svg>
      </div>

      {/* Print-Shop Notification Card */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl riso-card bg-[#FFE800] text-[#262322]">
          <Printer className="w-4 h-4 text-[#FF48B0] shrink-0" />
          <span className="text-xs font-black tracking-wide uppercase">{toastMessage}</span>
        </div>
      )}

      {/* Risograph / Paper Craft Top Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-2xl riso-card p-6 sm:p-7">
        {/* Decorative Washi Masking Tape on Corner */}
        <span className="riso-washi-tape w-20 h-6 absolute -top-3 left-8 -rotate-3 shadow-sm" />
        <span className="riso-washi-tape w-16 h-5 absolute -top-2.5 right-10 rotate-6 shadow-sm" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF48B0] border-2 border-[#262322] text-white text-[11px] font-black uppercase tracking-widest mb-2.5">
              <span>SOY INK EDITION // 300 DPI PROOF</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#262322]">
              Risograph <span className="text-[#0078BF]">&amp;</span>{' '}
              <span className="text-[#FF48B0]">Paper Craft</span> UI
            </h1>
            <p className="text-xs sm:text-sm text-[#4A443F] mt-1.5 max-w-2xl leading-relaxed font-medium">
              Tactile indie printmaking aesthetic blending warm uncoated cotton cardstock, intentionally offset soy-ink overprints (Fluo Pink, Teal, Blue, Sunflower), halftone dots, and paper-cut layers.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-black uppercase">
            <span className="px-3 py-1.5 rounded-lg bg-[#FFE800] border-2 border-[#262322] text-[#262322]">
              Overprint Ink
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#0078BF] border-2 border-[#262322] text-white">
              Cut Paper
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#00A95C] border-2 border-[#262322] text-white">
              Halftone
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Cardstock Login Sheet + 4 Paper Cutout Strips) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-3xl riso-card p-7 pb-12">
            {/* Registration Crop Mark */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-black tracking-tight text-[#262322]">Login</h2>
              <span className="font-mono text-xs font-bold text-[#0078BF]">⊕ REG::A4</span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-xl border-2 border-[#262322] bg-[#FAF4E8] px-4 py-3 shadow-[2px_2px_0_#0078BF] focus-within:bg-white transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-bold text-[#262322] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#0078BF] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-xl border-2 border-[#262322] bg-[#FAF4E8] px-4 py-3 shadow-[2px_2px_0_#FF48B0] focus-within:bg-white transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-bold tracking-wider text-[#262322] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-[#FFE800]/50 text-[#FF48B0] transition-colors"
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
                  handleAction('click', () => triggerToast('STAMPING REPLACEMENT PASS'))
                }
                className="text-xs font-extrabold text-[#0078BF] underline decoration-2 underline-offset-4 hover:text-[#FF48B0] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Spot-Ink Capsule: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'PROOF ARCHIVED' : `EDITION STAMPED FOR ${email}`
                    );
                  })
                }
                className={`min-w-[192px] px-8 py-3.5 rounded-full border-2 border-[#262322] text-sm font-black tracking-wide transition-transform active:translate-y-0.5 shadow-[4px_4px_0_#262322] ${
                  isSignedUp
                    ? 'bg-[#00A95C] text-white'
                    : 'bg-[#FF48B0] text-white hover:bg-[#0078BF]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Cut-Paper Action Strips */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`ZINE SUBSCRIBER +1 (#${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl riso-cutout hover:bg-[#FFF9E6]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#00A95C] border-2 border-[#262322] text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.8]" />
                </div>
                <span className="text-[15px] font-black text-[#262322]">Add Friend</span>
              </div>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FFE800] border-2 border-[#262322] text-[#262322]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('POSTCARD URL COPIED'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl riso-cutout hover:bg-[#FFF9E6]"
            >
              <div className="w-11 h-11 rounded-full bg-[#0078BF] border-2 border-[#262322] text-white flex items-center justify-center">
                <Share2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[15px] font-black text-[#262322]">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl riso-cutout bg-[#FFE800] hover:brightness-105"
              >
                <span className="text-[15px] font-black text-[#262322]">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#262322] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl riso-card p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`FOLIO STOCK: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#FF48B0] text-white'
                          : 'text-[#262322] hover:bg-[#FAF4E8]'
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl riso-cutout hover:bg-[#FFF9E6]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#FF48B0]/30 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#FF48B0] border-2 border-[#262322] text-white flex items-center justify-center">
                <Download className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="relative z-10 text-[15px] font-black text-[#262322]">
                {downloadProgress !== null ? `Printing ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Overprint Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Stamp-Card Navigation Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', ink: 'bg-[#FF48B0] text-white', icon: Home },
                { id: 'calender', label: 'Calender', ink: 'bg-[#0078BF] text-white', icon: Calendar },
                { id: 'notification', label: 'Notification', ink: 'bg-[#FFE800] text-[#262322]', icon: Bell },
                { id: 'setting', label: 'Setting', ink: 'bg-[#00A95C] text-white', icon: Settings },
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
                      triggerToast(`PLATE SELECTED: ${item.label.toUpperCase()}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.88] rounded-3xl riso-cutout flex flex-col items-center justify-center gap-2.5 ${
                    isActive ? 'bg-[#FFE800] -translate-y-0.5' : 'bg-[#FFFDF8]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl border-2 border-[#262322] flex items-center justify-center ${
                      isActive ? item.ink : 'bg-[#FAF4E8] text-[#262322]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black tracking-tight text-[#262322]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Overprint Wave + Paper Toggle */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-3xl riso-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#6B645D]">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00A95C] border border-[#262322] text-white">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xl font-black text-[#262322]">+22,12</span>
                </div>
              </div>

              {/* Intentional Two-Ink Misregistration Curve */}
              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-2xl border-2 border-[#262322] bg-[#FAF4E8] p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  {/* Offset Cyan/Blue ink pass */}
                  <path
                    d="M11,53 C31,53 35,23 58,25 C79,27 83,47 105,41 C125,35 135,51 157,35 C175,21 185,15 197,19 C213,25 225,51 237,51"
                    fill="none"
                    stroke="#0078BF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                  {/* Primary Pink ink pass */}
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#FF48B0"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill="#FFE800" stroke="#262322" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Paper Craft ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`INK DRUM: ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border-2 border-[#262322] shadow-[4px_4px_0_#262322] p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn ? 'bg-[#00A95C]' : 'bg-[#E8E0D0]'
              }`}
            >
              <span
                className={`pl-2.5 text-xs font-black ${
                  isSwitchOn ? 'text-[#FFE800]' : 'text-[#8C8378]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2.5 text-xs font-black ${
                  !isSwitchOn ? 'text-[#262322]' : 'text-white/55'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[60px] rounded-full bg-[#FFFDF8] border-2 border-[#262322] transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-68px)]' : 'left-2'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border border-[#262322] ${
                    isSwitchOn ? 'bg-[#FF48B0]' : 'bg-[#8C8378]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Soy-Ink Slider (71%) + Washi-Taped Tooltip Card */}
          <div className="rounded-3xl riso-card p-6 pb-7">
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
                className="relative flex-1 h-4 rounded-full border-2 border-[#262322] bg-[#FAF4E8] cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-[#0078BF] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFE800] border-2 border-[#262322] shadow-[2px_2px_0_#FF48B0] flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#262322]" />
                </div>
              </div>

              <div className="text-xl font-black text-[#FF48B0] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[270px] rounded-2xl border-2 border-[#262322] bg-[#FAF4E8] px-4 py-3 shadow-[3px_3px_0_#00A95C]">
                <span className="riso-washi-tape w-10 h-3 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-[#262322] font-bold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Riso Overprint Analytics Cards ($4891.22 + 2201 Cut-Paper Mountains) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-3xl riso-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#0078BF] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#262322]">$4891.22</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#FF48B0] text-white">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-black text-[#FF48B0]">75%</span>
                  </div>
                </div>

                {/* Misregistered Two-Ink Overprint Ring Gauge */}
                <div className="relative w-[134px] h-[134px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#EFE7D6"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#FFE800"
                      strokeWidth="6"
                      strokeDasharray="207"
                      strokeDashoffset="72"
                      strokeLinecap="round"
                    />
                    {/* Offset pink under-layer */}
                    <circle
                      cx="62"
                      cy="58"
                      r="46"
                      fill="none"
                      stroke="#FF48B0"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                      opacity="0.55"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#0078BF"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-sm font-black text-[#262322]">75%</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs font-bold text-[#262322]">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#0078BF] border border-[#262322] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FF48B0] border border-[#262322] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Cut-Paper Layered Mountains) */}
            <div className="md:col-span-5 rounded-3xl riso-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-[#262322]">2201</span>
                  <div className="flex-1 h-[2px] bg-[#262322] relative">
                    <span className="w-3 h-3 rounded-full bg-[#FF48B0] border border-[#262322] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#5E574F] font-semibold mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-2xl border-2 border-[#262322] bg-[#FAF4E8] p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="#FFE800"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="#FF48B0"
                    opacity="0.82"
                    style={{ mixBlendMode: 'multiply' }}
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
                className="w-full accent-[#0078BF] cursor-pointer h-2 rounded-full bg-[#E5DEC9]"
              />
            </div>
          </div>

          {/* ROW 5: Print Edition Stepper (2019 - 2022) */}
          <div className="rounded-3xl riso-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#262322]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`PRINT EDITION: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full border-2 border-[#262322] flex items-center justify-center transition-transform ${
                      isSelected ? 'bg-[#FF48B0] scale-125' : 'bg-[#FFFDF8]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#FFE800]' : 'bg-[#262322]'
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
                        triggerToast(`PRINT EDITION: ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full riso-cutout text-xs sm:text-sm font-black ${
                      isSelected
                        ? 'bg-[#0078BF] text-white'
                        : 'bg-[#FAF4E8] text-[#262322] hover:bg-[#FFE800]'
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

export default RisographPaperCraft;

