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
  AppWindow,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const FluentDesign: React.FC = () => {
  // Pointer Reveal Highlight tracking
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

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
    triggerToast('Microsoft Store // Fetching WinUI package');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Package installed successfully (100%)');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  const peakScale = 0.72 + (chartTimeline / 100) * 0.42;
  const peakTipY = Math.round(135 - 115 * peakScale);

  return (
    <div
      ref={canvasRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setPointer(null)}
      className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden fluent-bloom-bg text-[#1A1A1A]"
    >
      {/* Windows 11 Bloom Abstract Silk Petals + Reveal Light Field */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full opacity-45">
          <defs>
            <radialGradient id="fluentBloomPetal1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0078D4" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#60CDFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fluentBloomPetal2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0099BC" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#0067C0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="260" cy="240" rx="340" ry="220" transform="rotate(-22 260 240)" fill="url(#fluentBloomPetal1)" />
          <ellipse cx="1140" cy="640" rx="380" ry="240" transform="rotate(18 1140 640)" fill="url(#fluentBloomPetal2)" />
        </svg>
        {pointer && (
          <div
            className="absolute w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200"
            style={{
              left: pointer.x,
              top: pointer.y,
              background:
                'radial-gradient(circle, rgba(0, 103, 192, 0.14) 0%, rgba(96, 205, 255, 0.05) 45%, transparent 70%)',
            }}
          />
        )}
      </div>

      {/* WinUI TeachingTip / InfoBar Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl fluent-acrylic border-[#0067C0]/30 shadow-xl">
          <span className="w-5 h-5 rounded-full bg-[#0067C0] text-white flex items-center justify-center shrink-0">
            <AppWindow className="w-3 h-3" />
          </span>
          <span className="text-xs font-semibold text-[#1A1A1A]">{toastMessage}</span>
        </div>
      )}

      {/* Fluent Design Windows 11 Mica Top Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-2xl fluent-mica p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0067C0]/10 border border-[#0067C0]/20 text-[#005A9E] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0067C0]" />
              FLUENT 2 // WINDOWS 11 MICA SYSTEM
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
              Fluent Design <span className="text-[#0067C0]">(Microsoft)</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#495057] mt-1.5 max-w-2xl leading-relaxed">
              Microsoft&apos;s cross-platform UI system uniting layered Mica wallpaper tinting, frosted Acrylic menus, pointer-tracking Reveal glow, and WinUI 3 bottom-accent controls.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-white/85 border border-black/10 text-[#1A1A1A]">
              Mica Backdrop
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#0067C0] text-white">
              WinUI Accent
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/85 border border-black/10 text-[#005A9E]">
              Reveal Glow
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Mica Login Surface + 4 Acrylic Action Controls) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-2xl fluent-mica p-7 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-semibold tracking-tight text-[#1A1A1A]">Login</h2>
              <span className="px-2.5 py-0.5 rounded-md bg-[#0067C0]/10 text-[#0067C0] text-[11px] font-semibold">
                Windows Hello
              </span>
            </div>

            {/* Email Input (WinUI TextBox) */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-md fluent-textbox px-3.5 py-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-medium text-[#1A1A1A] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#605E5C] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input (WinUI PasswordBox) */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-md fluent-textbox px-3.5 py-2.5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent text-sm font-medium tracking-wider text-[#1A1A1A] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-2.5 p-1 rounded hover:bg-black/5 text-[#605E5C] transition-colors"
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
                  handleAction('click', () => triggerToast('Microsoft Account recovery prompt sent'))
                }
                className="text-xs font-semibold text-[#0067C0] hover:underline underline-offset-4 transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Fluent Accent Button: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'Signed out of Mica workspace' : `Signed in as ${email}`
                    );
                  })
                }
                className={`min-w-[188px] px-8 py-3 rounded-lg text-sm font-semibold text-white shadow-[0_8px_20px_-4px_rgba(0,103,192,0.5)] border border-white/25 transition-all active:scale-95 ${
                  isSignedUp
                    ? 'bg-[#0F7B0F] hover:bg-[#0D6A0D]'
                    : 'bg-[#0067C0] hover:bg-[#005A9E]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Fluent Acrylic Action Rows */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Contact added (${friendCount + 1} total)`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl fluent-acrylic hover:bg-white transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#0067C0]/10 text-[#0067C0] flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[14px] font-semibold text-[#1A1A1A]">Add Friend</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0067C0] text-white">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Share charm copied link'))
              }
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl fluent-acrylic hover:bg-white transition-all active:scale-[0.99]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0099BC]/10 text-[#0078D4] flex items-center justify-center">
                <Share2 className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[14px] font-semibold text-[#1A1A1A]">Share</span>
            </button>

            {/* 3. Select Category (WinUI ComboBox) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl fluent-acrylic hover:bg-white transition-all active:scale-[0.99]"
              >
                <span className="text-[14px] font-semibold text-[#1A1A1A]">{category}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#605E5C] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-xl fluent-acrylic p-1.5 shadow-xl">
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
                      className={`relative w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#0067C0]/10 text-[#005A9E]'
                          : 'text-[#1A1A1A] hover:bg-black/5'
                      }`}
                    >
                      {category === cat && (
                        <span className="w-[3px] h-4 rounded-full bg-[#0067C0] absolute left-1" />
                      )}
                      <span className="pl-2">{cat}</span>
                      {category === cat && <Check className="w-4 h-4 text-[#0067C0]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl fluent-acrylic hover:bg-white transition-all active:scale-[0.99]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-[#0067C0] transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="w-10 h-10 rounded-lg bg-[#0067C0]/10 text-[#0067C0] flex items-center justify-center">
                <Download className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[14px] font-semibold text-[#1A1A1A]">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (NavView, Sparkline+Switch, Slider, Analytics, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 WinUI NavigationView Cards with Pill Indicator */}
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
                      triggerToast(`NavigationView -> ${item.label}`);
                    })
                  }
                  className={`relative aspect-square sm:aspect-[1/0.88] rounded-2xl flex flex-col items-center justify-center gap-2.5 transition-all active:scale-[0.98] ${
                    isActive
                      ? 'fluent-acrylic bg-white border-[#0067C0]/30'
                      : 'fluent-mica hover:bg-white/90'
                  }`}
                >
                  {/* Signature Windows 11 3px Blue Active Indicator Pill */}
                  {isActive && (
                    <span className="w-6 h-[3px] rounded-full bg-[#0067C0] absolute bottom-2.5" />
                  )}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isActive
                        ? 'bg-[#0067C0] text-white'
                        : 'bg-[#0067C0]/10 text-[#0067C0]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#1A1A1A]">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Spline Card + WinUI ToggleSwitch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-2xl fluent-mica px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#605E5C]">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0F7B0F]/15 text-[#0F7B0F]">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-xl font-bold text-[#1A1A1A]">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-xl bg-white/75 border border-black/5 p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="fluentLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0099BC" />
                      <stop offset="100%" stopColor="#0067C0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#fluentLineGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="5.5" fill="#0067C0" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* WinUI ToggleSwitch (ON / OFF) */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Fluent Switch: ${next ? 'On' : 'Off'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn
                  ? 'bg-[#0067C0] border-[#005A9E] shadow-[0_6px_18px_-4px_rgba(0,103,192,0.45)]'
                  : 'fluent-acrylic border-[#8A8886]'
              }`}
            >
              <span
                className={`pl-3 text-xs font-bold ${
                  isSwitchOn ? 'text-white' : 'text-[#8A8886]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-bold ${
                  !isSwitchOn ? 'text-[#605E5C]' : 'text-white/50'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2.5 bottom-2.5 w-[56px] rounded-full transition-all duration-300 flex items-center justify-center shadow ${
                  isSwitchOn
                    ? 'left-[calc(100%-66px)] bg-white'
                    : 'left-2.5 bg-[#605E5C]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSwitchOn ? 'bg-[#0067C0]' : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: WinUI Slider (71%) + TeachingTip Callout */}
          <div className="rounded-2xl fluent-mica p-6 pb-7">
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
                className="relative flex-1 h-2 rounded-full bg-black/15 cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-[#0067C0] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                {/* Classic WinUI concentric circle thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-black/15 shadow-md flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#0067C0]" />
                </div>
              </div>

              <div className="text-lg font-bold text-[#0067C0] min-w-[52px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-xl fluent-acrylic px-4 py-2.5">
                <div className="w-3 h-3 bg-white/90 border-l border-t border-black/10 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-[#495057] font-medium">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Fluent Analytics Cards ($4891.22 ProgressRing + 2201 Area Spline) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 rounded-2xl fluent-mica p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#605E5C] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">$4891.22</div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#0F7B0F]/15 text-[#0F7B0F]">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[2.8]" />
                    </span>
                    <span className="text-xs font-bold text-[#0F7B0F]">75%</span>
                  </div>
                </div>

                {/* Fluent ProgressRing (75%) */}
                <div className="relative w-[132px] h-[132px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="rgba(0,0,0,0.08)"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#0099BC"
                      strokeWidth="5"
                      strokeDasharray="207"
                      strokeDashoffset="72"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#0067C0"
                      strokeWidth="10"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-sm font-bold text-[#1A1A1A]">75%</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-xs font-medium text-[#495057]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#0067C0] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#0099BC] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Mountain Peaks) */}
            <div className="md:col-span-5 rounded-2xl fluent-mica p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#1A1A1A]">2201</span>
                  <div className="flex-1 h-[1.5px] bg-black/15 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0067C0] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#605E5C] mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-xl bg-white/75 border border-black/5 p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="fluentMountainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0067C0" stopOpacity="0.82" />
                      <stop offset="100%" stopColor="#60CDFF" stopOpacity="0.22" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(0, 153, 188, 0.25)"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#fluentMountainGrad)"
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
                className="w-full accent-[#0067C0] cursor-pointer h-1.5 rounded-full bg-black/15"
              />
            </div>
          </div>

          {/* ROW 5: Fluent Stepper (2019 - 2022) */}
          <div className="rounded-2xl fluent-mica px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-black/15" />
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
                    className={`relative z-10 w-6 h-6 rounded-full border flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-[#0067C0] border-white scale-125 shadow-md'
                        : 'bg-white border-[#8A8886]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-[#605E5C]'
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
                    className={`py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#0067C0] text-white shadow-md'
                        : 'fluent-acrylic text-[#1A1A1A] hover:bg-white'
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

export default FluentDesign;

