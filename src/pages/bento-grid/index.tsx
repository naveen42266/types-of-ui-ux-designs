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
  LayoutGrid,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const BentoGrid: React.FC = () => {
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
    triggerToast('Packing Bento modules...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Exported UI-Kit-Bento.zip');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen bg-[#ECEEF2] text-[#111827]">
      {/* Compact Bento Cell Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#111827] text-white border border-white/10 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Bento Overview Header */}
      <div className="max-w-[1080px] mx-auto mb-6 grid grid-cols-1 md:grid-cols-12 gap-3.5">
        <div className="md:col-span-8 bg-white rounded-[24px] p-6 border border-black/[0.06] shadow-[0_2px_10px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-700 mb-2">
            <LayoutGrid className="w-3.5 h-3.5" />
            Structured Layout // Modular Grid
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Bento Box / Grid UI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-2xl">
            Every control lives inside a self-contained, evenly gapped compartment cell with crisp radii, intentional tonal contrast across modules, and localized micro-interactions.
          </p>
        </div>

        <div className="md:col-span-4 bg-[#111827] text-white rounded-[24px] p-6 border border-black/10 shadow-[0_2px_10px_rgba(15,23,42,0.08)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Grid Spec
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              12-COL TRAY
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-white/[0.06] rounded-xl p-2.5">
              <div className="text-[10px] text-slate-400">Cell Gap</div>
              <div className="text-sm font-bold text-white">14px</div>
            </div>
            <div className="bg-white/[0.06] rounded-xl p-2.5">
              <div className="text-[10px] text-slate-400">Radius</div>
              <div className="text-sm font-bold text-white">24px</div>
            </div>
          </div>
        </div>
      </div>

      {/* Outer Bento Tray Frame */}
      <div className="max-w-[1080px] mx-auto bg-[#E2E5EB] p-3.5 rounded-[32px] border border-black/[0.06] shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* ================= LEFT COLUMN (Login Compartment + 4 Bento Action Cells) ================= */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {/* Login Bento Cell with internal compartmentalization */}
            <div className="bg-white rounded-[24px] p-6 border border-black/[0.05] shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[26px] font-extrabold tracking-tight text-slate-900">
                    Login
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                    Auth Cell
                  </span>
                </div>

                {/* Email Input Compartment */}
                <div className="mb-3.5 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 px-4 py-2.5 flex items-center gap-2 focus-within:border-emerald-500 focus-within:bg-white transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none"
                    aria-label="Email address"
                  />
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Password Input Compartment */}
                <div className="mb-4 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 px-4 py-2.5 flex items-center gap-2 focus-within:border-emerald-500 focus-within:bg-white transition-colors">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 tracking-wider focus:outline-none"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                    className="text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mb-5">
                  <button
                    type="button"
                    onClick={() =>
                      handleAction('click', () => triggerToast('Reset request queued'))
                    }
                    className="text-xs font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-900 transition-colors"
                  >
                    Forget Password?
                  </button>
                </div>
              </div>

              {/* Dedicated Lower CTA Bento Sub-Compartment */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    handleAction(isSignedUp ? 'click' : 'success', () => {
                      setIsSignedUp(!isSignedUp);
                      triggerToast(isSignedUp ? 'Signed out' : `Signed up as ${email}`);
                    })
                  }
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-[0.98] ${
                    isSignedUp
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm'
                  }`}
                >
                  {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
                </button>
              </div>
            </div>

            {/* 4 Modular Action Bento Cells */}
            <div className="grid grid-cols-1 gap-3 flex-1">
              {/* 1. Add Friend Cell */}
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => {
                    setFriendCount((c) => c + 1);
                    triggerToast(`Added connection (${friendCount + 1})`);
                  })
                }
                className="group bg-white hover:bg-[#EEF2FF] rounded-[20px] p-3.5 border border-black/[0.05] flex items-center justify-between transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Add Friend</span>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-slate-100 group-hover:bg-white text-slate-700">
                  {friendCount}
                </span>
              </button>

              {/* 2. Share Cell */}
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('Share link copied from cell'))
                }
                className="group bg-white hover:bg-slate-50 rounded-[20px] p-3.5 border border-black/[0.05] flex items-center justify-between transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Share</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Link
                </span>
              </button>

              {/* 3. Select Category Cell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                  className="w-full bg-white hover:bg-slate-50 rounded-[20px] px-4 py-4 border border-black/[0.05] flex items-center justify-between transition-all active:scale-[0.99]"
                >
                  <span className="text-sm font-bold text-slate-800">{category}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      isCategoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-2xl border border-black/[0.08] shadow-xl p-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() =>
                          handleAction('click', () => {
                            setCategory(cat);
                            setIsCategoryOpen(false);
                            triggerToast(`Selected: ${cat}`);
                          })
                        }
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                          category === cat
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Download Cell */}
              <button
                type="button"
                onClick={handleDownload}
                className="relative overflow-hidden bg-[#ECFDF5] hover:bg-[#D1FAE5] rounded-[20px] p-3.5 border border-emerald-500/20 flex items-center justify-between transition-all active:scale-[0.99]"
              >
                {downloadProgress !== null && (
                  <div
                    className="absolute inset-y-0 left-0 bg-emerald-400/25 transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-emerald-950">
                    {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
                  </span>
                </div>
                <span className="relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/80 text-emerald-700">
                  ZIP
                </span>
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Modular Bento Sub-Grid) ================= */}
          <div className="lg:col-span-8 flex flex-col gap-3.5">
            {/* ROW 1: 4 Quick Nav Bento Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
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
                        triggerToast(`Cell active: ${item.label}`);
                      })
                    }
                    className={`rounded-[22px] p-4 border flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 ${
                      isActive
                        ? 'bg-[#111827] text-white border-[#111827] shadow-md'
                        : 'bg-white text-slate-700 border-black/[0.05] hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ROW 2: "Last 7 days" Wide Bento Cell + ON/OFF Switch Compartment */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
              <div className="sm:col-span-9 bg-white rounded-[24px] px-6 py-4 border border-black/[0.05] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Last 7 days
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-emerald-100 text-emerald-700">
                      <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-xl font-extrabold text-slate-900">+22,12</span>
                  </div>
                </div>

                <div className="w-[200px] sm:w-[240px] h-[60px] bg-[#F8FAFC] rounded-2xl border border-slate-100 p-1.5 shrink-0">
                  <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                    <path
                      d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="192" cy="15" r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* ON / OFF Switch Cell */}
              <div className="sm:col-span-3 bg-white rounded-[24px] p-3.5 border border-black/[0.05] flex items-center justify-center">
                <button
                  type="button"
                  onClick={() =>
                    handleAction('toggle', () => {
                      const next = !isSwitchOn;
                      setIsSwitchOn(next);
                      triggerToast(`Module switch ${next ? 'ON' : 'OFF'}`);
                    })
                  }
                  aria-pressed={isSwitchOn}
                  className={`relative w-full h-14 rounded-2xl p-1.5 flex items-center justify-between transition-colors ${
                    isSwitchOn ? 'bg-[#2563EB]' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pl-3 text-xs font-extrabold ${
                      isSwitchOn ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    ON
                  </span>
                  <span
                    className={`pr-2.5 text-xs font-extrabold ${
                      !isSwitchOn ? 'text-slate-700' : 'text-white/45'
                    }`}
                  >
                    OFF
                  </span>
                  <div
                    className={`absolute top-1.5 bottom-1.5 w-[48%] rounded-xl bg-white shadow-sm transition-all duration-200 ${
                      isSwitchOn ? 'left-[50%]' : 'left-1.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ROW 3: Slider + Callout Compartment */}
            <div className="bg-white rounded-[24px] p-5 border border-black/[0.05] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-8 flex items-center gap-4">
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
                  className="relative flex-1 h-3.5 rounded-full bg-slate-100 border border-slate-200 cursor-pointer"
                >
                  <div
                    className="h-full rounded-full bg-[#2563EB] transition-all duration-150"
                    style={{ width: `${sliderValue}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-[3px] border-[#2563EB] shadow-md"
                    style={{ left: `${sliderValue}%` }}
                  />
                </div>
                <span className="text-lg font-extrabold text-slate-900 min-w-[48px] text-right">
                  {sliderValue}%
                </span>
              </div>

              <div className="sm:col-span-4 bg-[#F8FAFC] rounded-2xl p-3 border border-slate-200/70">
                <p className="text-[10px] leading-snug text-slate-600 font-medium">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>

            {/* ROW 4: Two High-Contrast Analytics Bento Compartments */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
              {/* Left Spotlight Dark Bento Cell ($4891.22 + 75% Gauge) */}
              <div className="md:col-span-7 bg-[#111827] text-white rounded-[24px] p-6 border border-black/10 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      LOREM IPSUM DOLOR SIT
                    </div>
                    <div className="text-3xl font-extrabold tracking-tight text-white">
                      $4891.22
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      <ArrowUp className="w-3 h-3 stroke-[3]" />
                      <span className="text-xs font-bold">75%</span>
                    </div>
                  </div>

                  <div className="relative w-[134px] h-[134px] shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
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
                        stroke="#38BDF8"
                        strokeWidth="11"
                        strokeDasharray="289"
                        strokeDashoffset={289 * 0.25}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-base font-extrabold text-white">75%</div>
                  </div>
                </div>

                {/* Inner Legend Sub-Cells */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="bg-white/[0.06] rounded-xl px-3 py-2 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                    <span className="text-[11px] font-medium text-slate-300 truncate">
                      Lorem ipsum dolor sit amet
                    </span>
                  </div>
                  <div className="bg-white/[0.06] rounded-xl px-3 py-2 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                    <span className="text-[11px] font-medium text-slate-300 truncate">
                      Lorem ipsum dolor sit amet
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Light Bento Cell (2201 + Mountain Peaks) */}
              <div className="md:col-span-5 bg-white rounded-[24px] p-6 border border-black/[0.05] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                      2201
                    </span>
                    <div className="flex-1 h-[2px] bg-slate-200 relative">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-1.5 leading-snug">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit...
                  </p>
                </div>

                <div className="my-3 h-[126px] bg-[#F8FAFC] rounded-2xl p-2 border border-slate-100">
                  <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="bentoPeakGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#60A5FA" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                      fill="#CBD5E1"
                    />
                    <path
                      d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                      fill="url(#bentoPeakGrad)"
                      fillOpacity="0.92"
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
                  className="w-full accent-[#2563EB] cursor-pointer h-1.5 rounded-full bg-slate-200"
                />
              </div>
            </div>

            {/* ROW 5: Timeline Stepper Bento Cell (2019 - 2022) */}
            <div className="bg-white rounded-[24px] p-5 border border-black/[0.05]">
              <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 rounded-full bg-slate-100" />
                {([2019, 2020, 2021, 2022] as const).map((year) => {
                  const isSelected = activeYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setActiveYear(year);
                          triggerToast(`Quarter snapshot: ${year}`);
                        })
                      }
                      aria-label={`Select year ${year}`}
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                        isSelected
                          ? 'bg-[#2563EB] ring-4 ring-blue-100 scale-110'
                          : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-slate-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-4 gap-3">
                {([2019, 2020, 2021, 2022] as const).map((year) => {
                  const isSelected = activeYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setActiveYear(year);
                          triggerToast(`Quarter snapshot: ${year}`);
                        })
                      }
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'bg-[#F5F7FA] text-slate-600 hover:bg-slate-200/70'
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
    </div>
  );
};

export default BentoGrid;
