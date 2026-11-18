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
  Grid,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const SwissInternational: React.FC = () => {
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
    triggerToast('ARCHIVE // SPEC-SHEET.PDF (SYNCING)');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('SPEC-SHEET.PDF EXPORTED (100%)');
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen relative overflow-hidden swiss-paper-bg text-[#111111]">
      {/* Archival Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-[#111111] text-white border-l-4 border-[#E1251B]">
          <Grid className="w-4 h-4 text-[#E1251B] shrink-0" />
          <span className="text-xs font-bold tracking-wider uppercase">{toastMessage}</span>
        </div>
      )}

      {/* Swiss / International Typographic Header Banner */}
      <div className="relative z-10 max-w-[1060px] mx-auto mb-9 swiss-card">
        <div className="h-2 w-full bg-[#E1251B]" />
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E1251B] mb-2">
              ZÜRICH GRID SYSTEM — 01 / INTERNATIONAL STYLE
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-[#111111] leading-none">
              Swiss / International Style
            </h1>
            <p className="text-xs sm:text-sm text-[#3F3F46] mt-3 max-w-2xl leading-relaxed font-medium">
              Disciplined modernist hierarchy anchored by exposed mathematical grid rules, flush-left grotesque typography, stark zero-radius geometry, and signal-red contrast.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-wrap md:justify-end gap-2 text-[11px] font-bold uppercase tracking-wider">
            <span className="px-3 py-1.5 border border-[#111111] bg-[#F4F2ED] text-[#111111]">
              Strict Grid
            </span>
            <span className="px-3 py-1.5 bg-[#E1251B] text-white">
              Signal Red
            </span>
            <span className="px-3 py-1.5 bg-[#111111] text-white">
              0px Rules
            </span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="relative z-10 max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN (Swiss Auth Block + 4 Ruled Action Bars) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-9">
          {/* Login Block */}
          <div className="relative swiss-card p-7 pb-12">
            <div className="flex items-baseline justify-between pb-4 mb-6 border-b border-[#111111]">
              <h2 className="text-[28px] font-black tracking-tighter text-[#111111]">Login</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E1251B]">
                FIG. 01
              </span>
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#52525B] mb-1.5">
                01 / IDENTIFIER
              </div>
              <div className="relative flex items-center border-b-2 border-[#111111] bg-[#F9F8F6] px-3 py-2.5 focus-within:border-[#E1251B] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-8 bg-transparent text-sm font-semibold text-[#111111] focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#111111] absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#52525B] mb-1.5">
                02 / CREDENTIAL
              </div>
              <div className="relative flex items-center border-b-2 border-[#111111] bg-[#F9F8F6] px-3 py-2.5 focus-within:border-[#E1251B] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-8 bg-transparent text-sm font-semibold tracking-wider text-[#111111] focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-2.5 p-1 text-[#111111] hover:text-[#E1251B] transition-colors"
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
                  handleAction('click', () => triggerToast('RECOVERY FORM DISPATCHED'))
                }
                className="text-xs font-bold text-[#E1251B] underline underline-offset-4 hover:text-[#111111] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Overhanging Geometric Action Bar: Sign Up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(
                      isSignedUp ? 'SESSION CLOSED' : `REGISTERED PROFILE: ${email}`
                    );
                  })
                }
                className={`min-w-[196px] px-8 py-3.5 text-sm font-black uppercase tracking-wider border-2 border-[#111111] transition-colors ${
                  isSignedUp
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#E1251B] text-white hover:bg-[#111111]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Swiss Action Modules */}
          <div className="flex flex-col gap-3.5 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`CONTACT ADDED — INDEX ${friendCount + 1}`);
                })
              }
              className="w-full flex items-center justify-between px-4 py-3 swiss-card hover:border-[#E1251B] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#E1251B] text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-[#111111]">
                  Add Friend
                </span>
              </div>
              <span className="text-xs font-black px-2 py-0.5 border border-[#111111] text-[#111111]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('REFERENCE LINK COPIED'))
              }
              className="w-full flex items-center justify-between px-4 py-3 swiss-card hover:border-[#E1251B] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center">
                  <Share2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-[#111111]">Share</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#71717A]">
                02
              </span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-5 py-4 swiss-card hover:border-[#E1251B] transition-colors"
              >
                <span className="text-[15px] font-bold tracking-tight text-[#111111]">
                  {category}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#E1251B] transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 swiss-card p-1.5">
                  {categories.map((cat, idx) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleAction('click', () => {
                          setCategory(cat);
                          setIsCategoryOpen(false);
                          triggerToast(`CLASSIFICATION: ${cat.toUpperCase()}`);
                        })
                      }
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#E1251B] text-white'
                          : 'text-[#111111] hover:bg-[#F4F2ED]'
                      }`}
                    >
                      <span>
                        0{idx + 1} / {cat}
                      </span>
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
              className="relative overflow-hidden w-full flex items-center justify-between px-4 py-3 swiss-card hover:border-[#E1251B] transition-colors"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#E1251B]/20 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0057B8] text-white flex items-center justify-center">
                  <Download className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="relative z-10 text-[15px] font-bold tracking-tight text-[#111111]">
                  {downloadProgress !== null ? `Exporting ${downloadProgress}%` : 'Download'}
                </span>
              </div>
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-[#71717A]">
                PDF
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Grid Nav, Sparkline+Switch, Slider, Infographics, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Numbered Swiss Grid Navigation Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {(
              [
                { id: 'home', label: 'Home', num: '01', icon: Home },
                { id: 'calender', label: 'Calender', num: '02', icon: Calendar },
                { id: 'notification', label: 'Notification', num: '03', icon: Bell },
                { id: 'setting', label: 'Setting', num: '04', icon: Settings },
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
                      triggerToast(`SECTION ${item.num}: ${item.label.toUpperCase()}`);
                    })
                  }
                  className={`relative aspect-square sm:aspect-[1/0.88] border-[1.5px] border-[#111111] p-4 flex flex-col justify-between text-left transition-colors ${
                    isActive
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#111111] hover:bg-[#F9F8F6]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[10px] font-black tracking-widest ${
                        isActive ? 'text-[#E1251B]' : 'text-[#71717A]'
                      }`}
                    >
                      {item.num}
                    </span>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Infographic + Ruled Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 swiss-card px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#71717A]">
                  Last 7 days
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-[#E1251B] text-white">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.8]" />
                  </span>
                  <span className="text-2xl font-black tracking-tighter text-[#111111]">
                    +22,12
                  </span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] border-l border-[#111111]/20 pl-4 p-1 shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <line x1="0" y1="54" x2="240" y2="54" stroke="#E4E4E7" strokeWidth="1" />
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="3"
                    strokeLinecap="butt"
                  />
                  <circle cx="192" cy="15" r="5" fill="#E1251B" stroke="#111111" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Minimal Swiss ON / OFF Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`STATE: ${next ? 'ACTIVE [ON]' : 'INACTIVE [OFF]'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] border-2 border-[#111111] p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn ? 'bg-[#E1251B] text-white' : 'bg-white text-[#111111]'
              }`}
            >
              <span
                className={`pl-2 text-xs font-black tracking-widest ${
                  isSwitchOn ? 'text-white' : 'text-[#A1A1AA]'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-2 text-xs font-black tracking-widest ${
                  !isSwitchOn ? 'text-[#111111]' : 'text-white/55'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-1.5 bottom-1.5 w-[60px] border border-[#111111] transition-all duration-200 flex items-center justify-center ${
                  isSwitchOn ? 'left-[calc(100%-66px)] bg-white' : 'left-1.5 bg-[#111111]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 ${isSwitchOn ? 'bg-[#111111]' : 'bg-[#E1251B]'}`}
                />
              </div>
            </button>
          </div>

          {/* ROW 3: Swiss Geometric Slider (71%) + Editorial Callout Note */}
          <div className="swiss-card p-6 pb-7">
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
                className="relative flex-1 h-3 bg-[#E4E4E7] border border-[#111111] cursor-pointer"
              >
                <div
                  className="h-full bg-[#111111] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-8 bg-[#E1251B] border-2 border-[#111111]"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="text-xl font-black tracking-tighter text-[#111111] min-w-[54px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[270px] border-[1.5px] border-[#111111] bg-[#F4F2ED] px-4 py-2.5">
                <div className="w-2.5 h-2.5 bg-[#F4F2ED] border-l-[1.5px] border-t-[1.5px] border-[#111111] rotate-45 absolute -top-[6px] left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug text-[#111111] font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Swiss Poster Infographics ($4891.22 Donut + 2201 Elevation Peaks) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Card */}
            <div className="md:col-span-7 swiss-card p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E1251B] mb-1.5">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-black tracking-tighter text-[#111111]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-[#0057B8] text-white">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-black text-[#111111]">75%</span>
                  </div>
                </div>

                {/* Swiss Geometric Ring Gauge */}
                <div className="relative w-[134px] h-[134px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#E4E4E7"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="32"
                      fill="none"
                      stroke="#0057B8"
                      strokeWidth="6"
                      strokeDasharray="201"
                      strokeDashoffset="74"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#E1251B"
                      strokeWidth="12"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                    />
                  </svg>
                  <div className="absolute text-sm font-black tracking-tighter text-[#111111]">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-[#111111]/15 text-xs font-bold text-[#111111]">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 bg-[#E1251B] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 bg-[#0057B8] shrink-0" />
                  <span>Lorem ipsum dolor sit amet</span>
                </div>
              </div>
            </div>

            {/* Right Card (2201 + Architectural Peaks) */}
            <div className="md:col-span-5 swiss-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black tracking-tighter text-[#111111]">2201</span>
                  <div className="flex-1 h-[2px] bg-[#111111] relative">
                    <span className="w-3 h-3 bg-[#E1251B] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#52525B] font-semibold mt-2 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px] border border-[#111111]/20 bg-[#F9F8F6] p-2">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="#D4D4D8"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="#111111"
                  />
                  <circle cx="188" cy={peakTipY} r="4" fill="#E1251B" />
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
                className="w-full accent-[#E1251B] cursor-pointer h-1.5 bg-[#D4D4D8]"
              />
            </div>
          </div>

          {/* ROW 5: Ruled Chronological Timeline Stepper (2019 - 2022) */}
          <div className="swiss-card px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#111111]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`YEAR INDEX: ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 border-2 border-[#111111] flex items-center justify-center transition-transform ${
                      isSelected ? 'bg-[#E1251B] scale-125' : 'bg-white'
                    }`}
                  >
                    <span className={`w-2 h-2 ${isSelected ? 'bg-white' : 'bg-[#111111]'}`} />
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
                        triggerToast(`YEAR INDEX: ${year}`);
                      })
                    }
                    className={`py-2.5 border-[1.5px] border-[#111111] text-xs sm:text-sm font-black tracking-tight transition-colors ${
                      isSelected
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F4F2ED] text-[#111111] hover:bg-[#E1251B] hover:text-white'
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

export default SwissInternational;

