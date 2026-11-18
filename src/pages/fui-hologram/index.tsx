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
  Orbit,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

const HologramBrackets: React.FC = () => (
  <>
    <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#38BDF8]" />
    <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#38BDF8]" />
    <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#38BDF8]" />
    <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#38BDF8]" />
  </>
);

export const FUIHologram: React.FC = () => {
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
    triggerToast('J.A.R.V.I.S // COMPILING HOLO-SCHEMATIC');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('SCHEMATIC PROJECTION ARCHIVED (100%)');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden fui-bg text-sky-100">
      {/* Rotating Volumetric Concentric Orbital Field Behind UI */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden opacity-25">
        <div className="relative w-[860px] h-[860px]">
          <svg viewBox="0 0 600 600" className="w-full h-full fui-spin-slow">
            <circle
              cx="300"
              cy="300"
              r="280"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.8"
              strokeDasharray="18 10 4 10"
            />
            <circle
              cx="300"
              cy="300"
              r="220"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="0.6"
              strokeDasharray="2 8"
            />
          </svg>
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full fui-spin-rev">
            <circle
              cx="300"
              cy="300"
              r="250"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="1"
              strokeDasharray="60 40 12 30"
            />
            <line x1="300" y1="20" x2="300" y2="580" stroke="rgba(56,189,248,0.22)" strokeWidth="0.6" />
            <line x1="20" y1="300" x2="580" y2="300" stroke="rgba(56,189,248,0.22)" strokeWidth="0.6" />
          </svg>
        </div>
      </div>

      {/* Holographic Voice/Telemetry Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl fui-panel border-[#38BDF8] shadow-[0_0_30px_rgba(56,189,248,0.3)]">
          <Orbit className="w-4 h-4 text-[#22D3EE] animate-spin shrink-0" />
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-sky-100">
            {toastMessage}
          </span>
        </div>
      )}

      {/* FUI Jarvis Hologram Header Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 rounded-2xl fui-panel p-6 sm:p-7">
        <HologramBrackets />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-[#38BDF8]/50 bg-[#0EA5E9]/15 text-[#7DD3FC] font-mono text-[11px] font-semibold uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              FUI // VOLUMETRIC HOLOGRAM MK-VII
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-white drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
              FUI <span className="font-bold text-[#38BDF8]">(Jarvis Hologram)</span>
            </h1>
            <p className="text-xs sm:text-sm text-sky-200/75 mt-1.5 max-w-2xl leading-relaxed">
              Aerospace Fantasy User Interface built from weightless translucent glass planes, rotating orbital arc gauges, degree tick-marks, and volumetric cyan light traces.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 font-mono text-[11px] font-semibold uppercase">
            <span className="px-3 py-1.5 rounded-lg border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#7DD3FC]">
              Orbital Rings
            </span>
            <span className="px-3 py-1.5 rounded-lg border border-[#22D3EE]/40 bg-[#22D3EE]/10 text-[#67E8F9]">
              L-Bracket HUD
            </span>
            <span className="px-3 py-1.5 rounded-lg border border-amber-400/45 bg-amber-400/10 text-amber-300">
              ARC::99.4%
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Hologram Auth Module + 4 Floating Pills) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Card */}
          <div className="relative rounded-2xl fui-panel p-7 pb-12">
            <HologramBrackets />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-light tracking-wide text-white">Login</h2>
              <span className="font-mono text-[10px] tracking-widest text-[#38BDF8] border border-[#38BDF8]/35 px-2 py-0.5 rounded">
                ID // BIOMETRIC
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-xl border border-[#38BDF8]/35 bg-[#020A18]/65 px-4 py-3 focus-within:border-[#22D3EE] focus-within:shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-9 bg-transparent font-mono text-sm text-sky-100 focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#38BDF8] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-xl border border-[#38BDF8]/35 bg-[#020A18]/65 px-4 py-3 focus-within:border-[#22D3EE] focus-within:shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-9 bg-transparent font-mono text-sm tracking-wider text-sky-200 focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 p-1 rounded-full hover:bg-sky-400/10 text-[#38BDF8] transition-colors"
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
                  handleAction('click', () => triggerToast('DISPATCHING RETINAL RECOVERY LINK'))
                }
                className="font-mono text-xs text-[#7DD3FC] underline underline-offset-4 hover:text-white transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Projected Button: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'PROJECTION STANDBY' : `SUIT TELEMETRY LINKED: ${email}`
                    );
                  })
                }
                className={`min-w-[192px] px-8 py-3.5 rounded-full font-mono text-sm font-bold tracking-widest uppercase transition-all active:scale-95 border ${
                  isSignedUp
                    ? 'bg-[#22D3EE] border-white text-[#020814] shadow-[0_0_26px_rgba(34,211,238,0.65)]'
                    : 'bg-[#0EA5E9]/25 backdrop-blur-md border-[#38BDF8] text-white shadow-[0_0_24px_rgba(56,189,248,0.4)] hover:bg-[#0EA5E9]/45'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Holographic Action Pills */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`ALLY NODE REGISTERED (#${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full fui-pill hover:border-[#22D3EE] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#38BDF8] bg-[#38BDF8]/15 text-[#7DD3FC] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="font-mono text-sm font-semibold text-sky-100">Add Friend</span>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#38BDF8]/40 bg-[#020A18]/60 text-[#22D3EE]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('HOLO-FEED BROADCAST SHARED'))
              }
              className="w-full flex items-center gap-4 px-4 py-2.5 rounded-full fui-pill hover:border-[#22D3EE] transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-full border border-[#38BDF8] bg-[#38BDF8]/15 text-[#7DD3FC] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                <Share2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-mono text-sm font-semibold text-sky-100">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-5 py-3.5 rounded-full fui-pill hover:border-[#22D3EE] transition-all active:scale-[0.98]"
              >
                <span className="font-mono text-sm font-semibold text-sky-100">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#38BDF8] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl fui-panel p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`VECTOR LAYER: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#38BDF8]/25 border border-[#38BDF8]/60 text-white'
                          : 'text-sky-200 hover:bg-sky-400/10'
                      }`}
                    >
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4 text-[#22D3EE]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="relative overflow-hidden w-full flex items-center gap-4 px-4 py-2.5 rounded-full fui-pill hover:border-[#22D3EE] transition-all active:scale-[0.98]"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#38BDF8]/30 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-10 h-10 rounded-full border border-[#38BDF8] bg-[#38BDF8]/15 text-[#7DD3FC] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                <Download className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="relative z-10 font-mono text-sm font-semibold text-sky-100">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Nav Pads, Sparkline+Switch, Slider, Arc Gauge, Topo, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Hologram Nav Modules */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', deg: '000°', icon: Home },
                { id: 'calender', label: 'Calender', deg: '090°', icon: Calendar },
                { id: 'notification', label: 'Notification', deg: '180°', icon: Bell },
                { id: 'setting', label: 'Setting', deg: '270°', icon: Settings },
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
                      triggerToast(`HUD FOCUS // ${item.label.toUpperCase()}`);
                    })
                  }
                  className={`relative aspect-square sm:aspect-[1/0.88] rounded-2xl fui-panel flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isActive
                      ? 'border-[#38BDF8] shadow-[0_0_26px_rgba(56,189,248,0.32)]'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <HologramBrackets />
                  <span className="absolute top-2 right-2.5 font-mono text-[9px] text-[#38BDF8]/75">
                    {item.deg}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-full border flex items-center justify-center ${
                      isActive
                        ? 'border-[#22D3EE] bg-[#22D3EE]/20 text-white shadow-[0_0_14px_rgba(34,211,238,0.4)]'
                        : 'border-[#38BDF8]/35 bg-[#020A18]/50 text-[#7DD3FC]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wide text-sky-100">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Hologram Trace + Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="relative flex-1 rounded-2xl fui-panel px-6 py-4 flex items-center justify-between gap-4">
              <HologramBrackets />
              <div>
                <div className="font-mono text-xs text-[#7DD3FC]/80">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#22D3EE]/60 bg-[#22D3EE]/15 text-[#22D3EE]">
                    <ArrowUp className="w-3 h-3 stroke-[2.8]" />
                  </span>
                  <span className="font-mono text-xl font-bold text-white">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] rounded-xl border border-[#38BDF8]/25 bg-[#020A18]/65 p-2 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="fuiWaveGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="65%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="url(#fuiWaveGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="5.5" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Holographic Toggle Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`THRUSTERS: ${next ? 'ONLINE' : 'OFFLINE'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full border p-2.5 flex items-center justify-between transition-all ${
                isSwitchOn
                  ? 'border-[#38BDF8] bg-[#0EA5E9]/20 shadow-[0_0_20px_rgba(56,189,248,0.28)]'
                  : 'border-[#38BDF8]/30 bg-[#020A18]/75'
              }`}
            >
              <span
                className={`pl-2.5 font-mono text-xs font-bold ${
                  isSwitchOn ? 'text-[#22D3EE]' : 'text-sky-900'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2.5 font-mono text-xs font-bold ${
                  !isSwitchOn ? 'text-sky-300' : 'text-sky-900'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[60px] rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isSwitchOn
                    ? 'left-[calc(100%-68px)] border-white bg-[#22D3EE]/35 shadow-[0_0_16px_rgba(34,211,238,0.55)]'
                    : 'left-2 border-[#38BDF8]/40 bg-[#081A33]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSwitchOn ? 'bg-white shadow-[0_0_8px_#FFFFFF]' : 'bg-[#38BDF8]/40'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Beam Slider (71%) + Projected Callout Bubble */}
          <div className="relative rounded-2xl fui-panel p-6 pb-7">
            <HologramBrackets />
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
                className="relative flex-1 h-2.5 rounded-full border border-[#38BDF8]/35 bg-[#020A18]/80 cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#22D3EE] shadow-[0_0_14px_rgba(34,211,238,0.5)] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full border-2 border-[#22D3EE] bg-[#041226] shadow-[0_0_16px_rgba(34,211,238,0.65)] flex items-center justify-center"
                  style={{ left: `${sliderValue}%` }}
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              <div className="font-mono text-lg font-bold text-[#7DD3FC] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[265px] rounded-xl border border-[#38BDF8]/40 bg-[#041428]/85 px-4 py-2.5">
                <div className="w-2.5 h-2.5 bg-[#041428] border-l border-t border-[#38BDF8]/40 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="font-mono text-[10px] leading-snug text-sky-200/80">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Volumetric Modules ($4891.22 Arc-Reactor Gauge + 2201 Topo Wave) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="relative md:col-span-7 rounded-2xl fui-panel p-6 flex flex-col justify-between gap-4">
              <HologramBrackets />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-[#38BDF8] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#22D3EE] text-[#22D3EE]">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[2.8]" />
                    </span>
                    <span className="font-mono text-xs font-bold text-[#7DD3FC]">75%</span>
                  </div>
                </div>

                {/* Multi-Ring Jarvis Gyroscopic Gauge (75%) */}
                <div className="relative w-[138px] h-[138px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full fui-spin-rev">
                    <circle
                      cx="60"
                      cy="60"
                      r="55"
                      fill="none"
                      stroke="rgba(56,189,248,0.32)"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />
                  </svg>
                  <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="rgba(56,189,248,0.16)"
                      strokeWidth="9"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="32"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeDasharray="201"
                      strokeDashoffset="72"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="9"
                      strokeDasharray="276"
                      strokeDashoffset={276 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute font-mono text-sm font-bold text-white">75%</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 font-mono text-xs text-sky-200/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Holographic Terrain Scan) */}
            <div className="relative md:col-span-5 rounded-2xl fui-panel p-6 flex flex-col justify-between">
              <HologramBrackets />
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-white">2201</span>
                  <div className="flex-1 h-[1px] bg-[#38BDF8]/40 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="font-mono text-[10px] text-sky-200/65 mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] rounded-xl border border-[#38BDF8]/25 bg-[#020A18]/70 p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="fuiTopoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.06" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="rgba(56,189,248,0.16)"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="url(#fuiTopoGrad)"
                    stroke="#7DD3FC"
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
                className="w-full accent-[#22D3EE] cursor-pointer h-1.5 rounded-full bg-sky-950"
              />
            </div>
          </div>

          {/* ROW 5: Hologram Chronology Stepper (2019 - 2022) */}
          <div className="relative rounded-2xl fui-panel px-6 py-6">
            <HologramBrackets />
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#38BDF8]/30" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`CHRONO INDEX // ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full border flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'border-white bg-[#22D3EE] scale-125 shadow-[0_0_16px_rgba(34,211,238,0.8)]'
                        : 'border-[#38BDF8]/60 bg-[#041226]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#020814]' : 'bg-[#38BDF8]'
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
                        triggerToast(`CHRONO INDEX // ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold border transition-all ${
                      isSelected
                        ? 'border-[#22D3EE] bg-[#22D3EE]/25 text-white shadow-[0_0_16px_rgba(34,211,238,0.35)]'
                        : 'border-[#38BDF8]/30 bg-[#020A18]/60 text-sky-200/75 hover:border-[#38BDF8]'
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

export default FUIHologram;

