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
  Layers,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const FlatDesign: React.FC = () => {
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
    triggerToast('Downloading flat 2D asset kit...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Complete: UI-Kit-Flat.zip');
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

  const navTiles = [
    { id: 'home', label: 'Home', icon: Home, activeBg: 'bg-[#3498DB]', badgeBg: 'bg-[#3498DB]' },
    { id: 'calender', label: 'Calender', icon: Calendar, activeBg: 'bg-[#1ABC9C]', badgeBg: 'bg-[#1ABC9C]' },
    { id: 'notification', label: 'Notification', icon: Bell, activeBg: 'bg-[#F39C12]', badgeBg: 'bg-[#F39C12]' },
    { id: 'setting', label: 'Setting', icon: Settings, activeBg: 'bg-[#9B59B6]', badgeBg: 'bg-[#9B59B6]' },
  ] as const;

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen bg-[#ECF0F1] text-[#2C3E50]">
      {/* Pure 2D Flat Toast (Zero Shadow, Zero Gradient) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-lg bg-[#2C3E50] text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1ABC9C]" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Flat Design Header Banner */}
      <div className="max-w-[1060px] mx-auto mb-8 rounded-xl bg-white overflow-hidden">
        <div className="h-2 w-full grid grid-cols-5">
          <div className="bg-[#3498DB]" />
          <div className="bg-[#1ABC9C]" />
          <div className="bg-[#F39C12]" />
          <div className="bg-[#E74C3C]" />
          <div className="bg-[#9B59B6]" />
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FEF3C7] text-[#B45309] text-[11px] font-bold uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              2D Digital // Pure Flat Design
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2C3E50]">
              Flat Design UI System
            </h1>
            <p className="text-xs sm:text-sm text-[#7F8C8D] mt-1.5 max-w-2xl leading-relaxed">
              Zero drop shadows, zero gradients, and zero skeuomorphic depth — relying exclusively on bold solid color blocks, clean 2D geometry, and clear iconography.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 text-[11px] font-bold text-white">
            <span className="px-3 py-1.5 rounded bg-[#3498DB]">0 SHADOWS</span>
            <span className="px-3 py-1.5 rounded bg-[#1ABC9C]">0 GRADIENTS</span>
            <span className="px-3 py-1.5 rounded bg-[#F39C12]">2D PLANES</span>
          </div>
        </div>
      </div>

      {/* Main Showcase Canvas matching exact sample.jpg layout */}
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* ================= LEFT COLUMN (Login Card + 4 Flat Action Buttons) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Login Card */}
          <div className="relative rounded-xl bg-white p-7 pb-12">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#2C3E50] mb-7">
              Login
            </h2>

            {/* Email Input */}
            <div className="mb-5">
              <div className="relative flex items-center rounded-lg bg-[#ECF0F1] border-2 border-transparent focus-within:border-[#3498DB] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-transparent text-[#2C3E50] font-semibold text-sm focus:outline-none"
                  aria-label="Email address"
                />
                <Mail className="w-4 h-4 text-[#7F8C8D] absolute right-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative flex items-center rounded-lg bg-[#ECF0F1] border-2 border-transparent focus-within:border-[#3498DB] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-transparent text-[#2C3E50] font-semibold text-sm tracking-wider focus:outline-none"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setShowPassword(!showPassword))}
                  className="absolute right-3 text-[#7F8C8D] hover:text-[#2C3E50] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() =>
                  handleAction('click', () => triggerToast('Password recovery link sent'))
                }
                className="text-xs font-bold text-[#3498DB] underline underline-offset-4 hover:text-[#2980B9] transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Flat Solid Overhanging Sign Up CTA */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <button
                type="button"
                onClick={() =>
                  handleAction(isSignedUp ? 'click' : 'success', () => {
                    setIsSignedUp(!isSignedUp);
                    triggerToast(isSignedUp ? 'Signed out' : `Signed up as ${email}`);
                  })
                }
                className={`min-w-[184px] px-8 py-3.5 rounded-full font-bold text-sm text-white transition-colors ${
                  isSignedUp
                    ? 'bg-[#1ABC9C] hover:bg-[#16A085]'
                    : 'bg-[#3498DB] hover:bg-[#2980B9]'
                }`}
              >
                {isSignedUp ? 'Signed Up ✓' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* 4 Stacked Flat 2D Action Pills */}
          <div className="flex flex-col gap-4 pt-2">
            {/* 1. Add Friend */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => {
                  setFriendCount((c) => c + 1);
                  triggerToast(`Added friend (${friendCount + 1})`);
                })
              }
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-full bg-white hover:bg-[#D6EAF8] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#3498DB] text-white flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-sm font-bold text-[#2C3E50]">Add Friend</span>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#ECF0F1] text-[#2C3E50]">
                {friendCount}
              </span>
            </button>

            {/* 2. Share */}
            <button
              type="button"
              onClick={() =>
                handleAction('click', () => triggerToast('Share link copied to clipboard'))
              }
              className="w-full flex items-center gap-4 px-3 py-2.5 rounded-full bg-white hover:bg-[#D5F5E3] transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-[#95A5A6] text-white flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-[#2C3E50]">Share</span>
            </button>

            {/* 3. Select Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => handleAction('click', () => setIsCategoryOpen(!isCategoryOpen))}
                className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-white hover:bg-[#FCF3CF] transition-colors"
              >
                <span className="text-sm font-bold text-[#2C3E50]">{category}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#7F8C8D] transition-transform duration-150 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-xl bg-white border-2 border-[#BDC3C7] p-1.5">
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
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'bg-[#3498DB] text-white'
                          : 'text-[#2C3E50] hover:bg-[#ECF0F1]'
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
              className="relative overflow-hidden w-full flex items-center gap-4 px-3 py-2.5 rounded-full bg-white hover:bg-[#D1F2EB] transition-colors"
            >
              {downloadProgress !== null && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#1ABC9C]/25 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[#1ABC9C] text-white flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <span className="relative z-10 text-sm font-bold text-[#2C3E50]">
                {downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Download'}
              </span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Quick Nav, Sparkline+Switch, Slider, Charts, Stepper) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ROW 1: 4 Flat Quick Navigation Color Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {navTiles.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleAction('click', () => {
                      setActiveNav(item.id);
                      triggerToast(`Switched to ${item.label}`);
                    })
                  }
                  className={`aspect-square sm:aspect-[1/0.9] rounded-xl flex flex-col items-center justify-center gap-2.5 transition-colors ${
                    isActive
                      ? `${item.activeBg} text-white`
                      : 'bg-white text-[#2C3E50] hover:bg-[#DFE6E9]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : `${item.badgeBg} text-white`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ROW 2: "Last 7 days" +22,12 Flat Chart + Flat ON/OFF Switch */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch">
            <div className="flex-1 rounded-xl bg-white px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#7F8C8D]">Last 7 days</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#1ABC9C] text-white">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-xl font-extrabold text-[#2C3E50]">+22,12</span>
                </div>
              </div>

              <div className="w-[210px] sm:w-[250px] h-[64px] shrink-0">
                <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible">
                  <path
                    d="M8,50 C28,50 32,20 55,22 C76,24 80,44 102,38 C122,32 132,48 154,32 C172,18 182,12 194,16 C210,22 222,48 234,48"
                    fill="none"
                    stroke="#3498DB"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="192" cy="15" r="6" fill="#E74C3C" />
                </svg>
              </div>
            </div>

            {/* Flat 2D Toggle Switch */}
            <button
              type="button"
              onClick={() =>
                handleAction('toggle', () => {
                  const next = !isSwitchOn;
                  setIsSwitchOn(next);
                  triggerToast(`Switch ${next ? 'ON' : 'OFF'}`);
                })
              }
              aria-pressed={isSwitchOn}
              className={`relative w-full sm:w-[144px] min-h-[82px] rounded-full p-2.5 flex items-center justify-between transition-colors ${
                isSwitchOn ? 'bg-[#1ABC9C]' : 'bg-[#BDC3C7]'
              }`}
            >
              <span
                className={`pl-3 text-xs font-extrabold tracking-widest ${
                  isSwitchOn ? 'text-white' : 'text-white/50'
                }`}
              >
                ON
              </span>
              <span
                className={`pr-3 text-xs font-extrabold tracking-widest ${
                  !isSwitchOn ? 'text-[#2C3E50]' : 'text-white/50'
                }`}
              >
                OFF
              </span>
              <div
                className={`absolute top-2 bottom-2 w-[62px] rounded-full bg-white transition-all duration-200 ${
                  isSwitchOn ? 'left-[calc(100%-70px)]' : 'left-2'
                }`}
              />
            </button>
          </div>

          {/* ROW 3: Flat Progress Slider + Callout Bubble */}
          <div className="rounded-xl bg-white p-6 pb-7">
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
                className="relative flex-1 h-4 rounded-full bg-[#ECF0F1] cursor-pointer"
              >
                <div
                  className="h-full rounded-full bg-[#3498DB] transition-all duration-150"
                  style={{ width: `${sliderValue}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#F39C12] border-4 border-white"
                  style={{ left: `${sliderValue}%` }}
                />
              </div>

              <div className="text-xl font-extrabold text-[#2C3E50] min-w-[56px] text-right">
                {sliderValue}%
              </div>
            </div>

            <div className="mt-5 flex justify-center sm:justify-end sm:pr-20">
              <div className="relative max-w-[260px] rounded-lg bg-[#2C3E50] text-white px-4 py-2.5">
                <div className="w-3 h-3 bg-[#2C3E50] rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <p className="text-[10px] leading-snug font-medium">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                </p>
              </div>
            </div>
          </div>

          {/* ROW 4: Two Flat 2D Analytics Cards ($4891.22 + 2201 Solid Mountain Chart) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left Flat Card */}
            <div className="md:col-span-7 rounded-xl bg-white p-6 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#7F8C8D] mb-2">
                    LOREM IPSUM DOLOR SIT
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight text-[#2C3E50]">
                    $4891.22
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#1ABC9C] text-white">
                      <ArrowUp className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="text-xs font-bold text-[#1ABC9C]">75%</span>
                  </div>
                </div>

                {/* Pure 2D Solid Flat Radial Gauge */}
                <div className="relative w-[138px] h-[138px] shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="46" fill="none" stroke="#ECF0F1" strokeWidth="11" />
                    <circle
                      cx="60"
                      cy="60"
                      r="33"
                      fill="none"
                      stroke="#95A5A6"
                      strokeWidth="6"
                      strokeDasharray="207"
                      strokeDashoffset="78"
                      strokeLinecap="butt"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="46"
                      fill="none"
                      stroke="#3498DB"
                      strokeWidth="11"
                      strokeDasharray="289"
                      strokeDashoffset={289 * 0.25}
                      strokeLinecap="butt"
                    />
                  </svg>
                  <div className="absolute w-[58px] h-[58px] rounded-full bg-[#ECF0F1] flex items-center justify-center text-sm font-extrabold text-[#2C3E50]">
                    75%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#95A5A6] shrink-0" />
                  <span className="text-xs font-semibold text-[#7F8C8D]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#3498DB] shrink-0" />
                  <span className="text-xs font-semibold text-[#7F8C8D]">
                    Lorem ipsum dolor sit amet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Flat Card (2201 + Zero-Gradient Solid Mountain Peaks) */}
            <div className="md:col-span-5 rounded-xl bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold tracking-tight text-[#2C3E50]">
                    2201
                  </span>
                  <div className="flex-1 h-[2px] bg-[#ECF0F1] relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E74C3C] absolute right-0 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <p className="text-[10px] text-[#7F8C8D] font-medium mt-1.5 leading-snug">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit...
                </p>
              </div>

              <div className="my-4 h-[132px]">
                <svg viewBox="0 0 220 140" preserveAspectRatio="none" className="w-full h-full">
                  <path
                    d="M8,136 C25,136 30,84 44,84 C58,84 62,118 76,118 C90,118 96,60 110,60 C124,60 132,96 146,96 C160,96 168,68 182,68 C196,68 202,136 212,136 Z"
                    fill="#BDC3C7"
                  />
                  <path
                    d={`M8,136 C22,136 26,72 38,72 C50,72 56,120 68,120 C80,120 86,90 98,90 C112,90 116,66 130,66 C144,66 148,108 160,108 C172,108 176,${peakTipY} 188,${peakTipY} C200,${peakTipY} 204,136 212,136 Z`}
                    fill="#3498DB"
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
                className="w-full accent-[#3498DB] cursor-pointer h-2 rounded-full bg-[#ECF0F1]"
              />
            </div>
          </div>

          {/* ROW 5: Flat 2D Timeline Stepper (2019 - 2022) */}
          <div className="rounded-xl bg-white px-6 py-6">
            <div className="relative flex items-center justify-between px-4 sm:px-8 mb-4">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-[#ECF0F1]" />
              {([2019, 2020, 2021, 2022] as const).map((year) => {
                const isSelected = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      handleAction('click', () => {
                        setActiveYear(year);
                        triggerToast(`Milestone ${year}`);
                      })
                    }
                    aria-label={`Select year ${year}`}
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-[#3498DB] scale-125'
                        : 'bg-[#BDC3C7] hover:bg-[#95A5A6]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
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
                        triggerToast(`Milestone ${year}`);
                      })
                    }
                    className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                      isSelected
                        ? 'bg-[#3498DB] text-white'
                        : 'bg-[#ECF0F1] text-[#7F8C8D] hover:bg-[#D5DBDB] hover:text-[#2C3E50]'
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

export default FlatDesign;

