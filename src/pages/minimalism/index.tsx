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
  Minus,
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

export const Minimalism: React.FC = () => {
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
    triggerToast('Downloading package...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Complete — UI-Kit-Minimal.zip');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 select-none min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Minimal Hairline Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#111111] text-white border border-[#27272A] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Main Container matching sample.jpg layout */}
      <div className="max-w-[1140px] mx-auto">
        
        {/* Style Paradigm Banner */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-5 rounded-xl bg-white border border-[#E4E4E7]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-[0.14em] bg-[#111111] text-white">
              Style: Minimalism
            </span>
            <span className="text-xs text-[#71717A] font-normal">
              Radical functional clarity, generous whitespace, hairline geometry & strict monochrome discipline.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#52525B] flex-shrink-0">
            <Minus className="w-3.5 h-3.5 text-[#111111]" />
            <span>Same layout as sample.jpg</span>
          </div>
        </div>

        {/* Responsive Grid Layout matching sample.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* =========================================
              LEFT COLUMN (Login Card + 4 Action Pills)
             ========================================= */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* LOGIN MINIMAL CARD */}
            <div className="bg-white border border-[#E4E4E7] rounded-2xl p-8 sm:p-9">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#111111] tracking-tight">
                  Login
                </h2>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#A1A1AA]">
                  01
                </span>
              </div>

              {/* Username Input Field */}
              <div className="mb-6">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E4E7] focus-within:border-[#111111] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username@mail.com"
                    className="w-full bg-transparent text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none font-normal"
                  />
                  <Mail className="w-4 h-4 text-[#71717A] stroke-[1.5] flex-shrink-0" />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="mb-5">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E4E7] focus-within:border-[#111111] transition-colors">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent text-sm text-[#111111] placeholder-[#A1A1AA] focus:outline-none font-normal tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAction('click');
                      setShowPassword(!showPassword);
                    }}
                    className="text-[#71717A] hover:text-[#111111] transition-colors p-0.5 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forget Password Link */}
              <div className="mb-9">
                <button
                  type="button"
                  onClick={() => {
                    handleAction('click');
                    triggerToast('Reset link sent to ' + email);
                  }}
                  className="text-xs text-[#71717A] hover:text-[#111111] underline underline-offset-4 font-normal transition-colors cursor-pointer"
                >
                  Forget Password?
                </button>
              </div>

              {/* Solid Ink Minimal "Sign Up" Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    handleAction('success', () => {
                      setIsSignedUp(true);
                      triggerToast('Signed up successfully.');
                      setTimeout(() => setIsSignedUp(false), 2500);
                    });
                  }}
                  className="w-full h-12 rounded-full bg-[#111111] hover:bg-[#27272A] text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.99]"
                >
                  {isSignedUp ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2]" />
                      <span>Done</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </button>
              </div>
            </div>

            {/* VERTICAL BUTTON STACK (4 Hairline Action Pills) */}
            <div className="flex flex-col gap-3">
              
              {/* 1. Add Friend */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    setFriendCount((c) => c + 1);
                    triggerToast(`Friend added (${friendCount + 1})`);
                  });
                }}
                className="h-14 rounded-full bg-white border border-[#E4E4E7] hover:border-[#111111] flex items-center px-3 gap-3.5 cursor-pointer transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-2">
                  <span className="text-sm font-medium text-[#111111]">Add Friend</span>
                  <span className="text-xs font-medium text-[#71717A] tabular-nums">
                    {friendCount}
                  </span>
                </div>
              </div>

              {/* 2. Share */}
              <div
                onClick={() => {
                  handleAction('click', () => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    triggerToast('Link copied.');
                  });
                }}
                className="h-14 rounded-full bg-white border border-[#E4E4E7] hover:border-[#111111] flex items-center px-5 gap-3.5 cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#52525B] stroke-[1.6]" />
                <span className="text-sm font-medium text-[#111111]">Share</span>
              </div>

              {/* 3. Select Category */}
              <div className="relative">
                <div
                  onClick={() => {
                    handleAction('click', () => setIsCategoryOpen(!isCategoryOpen));
                  }}
                  className="h-14 rounded-full bg-white border border-[#E4E4E7] hover:border-[#111111] flex items-center justify-between px-5 cursor-pointer transition-colors"
                >
                  <span className="text-sm font-medium text-[#111111]">{category}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#71717A] stroke-[1.6] transition-transform duration-200 ${
                      isCategoryOpen ? 'rotate-180 text-[#111111]' : ''
                    }`}
                  />
                </div>

                {isCategoryOpen && (
                  <div className="absolute top-[62px] left-0 right-0 z-30 bg-white border border-[#E4E4E7] rounded-2xl p-1.5 animate-in fade-in zoom-in-95 duration-150">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => {
                          handleAction('click', () => {
                            setCategory(cat);
                            setIsCategoryOpen(false);
                            triggerToast(`Category: ${cat}`);
                          });
                        }}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          category === cat
                            ? 'bg-[#111111] text-white'
                            : 'text-[#3F3F46] hover:bg-[#F4F4F5]'
                        }`}
                      >
                        <span>{cat}</span>
                        {category === cat && <Check className="w-3.5 h-3.5" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Download */}
              <div
                onClick={handleDownload}
                className="h-14 rounded-full bg-white border border-[#E4E4E7] hover:border-[#111111] flex items-center px-3 gap-3.5 cursor-pointer transition-colors relative overflow-hidden"
              >
                {downloadProgress !== null && (
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-[#111111] transition-all duration-200 pointer-events-none"
                    style={{ width: `${downloadProgress}%` }}
                  />
                )}
                <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div className="flex items-center justify-between flex-1 pr-2">
                  <span className="text-sm font-medium text-[#111111]">Download</span>
                  {downloadProgress !== null && (
                    <span className="text-xs font-medium text-[#111111] tabular-nums">
                      {downloadProgress}%
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>


          {/* =========================================
              RIGHT SECTION (Widgets, Charts, Timeline)
             ========================================= */}
          <div className="lg:col-span-8 flex flex-col gap-5">

            {/* TOP ROW: 4 Minimal Square/Squircle Nav Tiles */}
            <div className="flex items-center justify-start sm:justify-end gap-3 overflow-x-auto pb-1 scrollbar-hidden">
              
              {/* Home */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('home'))}
                className={`w-[76px] h-[76px] rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                  activeNav === 'home'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                <Home className="w-5 h-5 stroke-[1.6]" />
                <span className="text-[11px] font-medium tracking-tight">Home</span>
              </button>

              {/* Calender */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('calender'))}
                className={`w-[76px] h-[76px] rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                  activeNav === 'calender'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                <Calendar className="w-5 h-5 stroke-[1.6]" />
                <span className="text-[11px] font-medium tracking-tight">Calender</span>
              </button>

              {/* Notification */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('notification'))}
                className={`w-[76px] h-[76px] rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                  activeNav === 'notification'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                <div className="relative">
                  <Bell className="w-5 h-5 stroke-[1.6]" />
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${
                      activeNav === 'notification' ? 'bg-white' : 'bg-[#111111]'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-medium tracking-tight">Notification</span>
              </button>

              {/* Setting */}
              <button
                type="button"
                onClick={() => handleAction('click', () => setActiveNav('setting'))}
                className={`w-[76px] h-[76px] rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                  activeNav === 'setting'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                <Settings className="w-5 h-5 stroke-[1.6]" />
                <span className="text-[11px] font-medium tracking-tight">Setting</span>
              </button>

            </div>

            {/* ROW 2: "Last 7 days" Mini Curve Card + Minimal Toggle Switch */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              {/* Mini Curve Chart Minimal Card */}
              <div className="sm:col-span-9 bg-white border border-[#E4E4E7] rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#71717A] block">
                    Last 7 days
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-[#111111]">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2]" />
                    <span className="text-lg font-semibold tracking-tight tabular-nums">+22,12</span>
                  </div>
                </div>

                {/* Ultra-clean monochrome line */}
                <div className="flex-1 max-w-[280px] h-12 flex items-center">
                  <svg viewBox="0 0 180 50" className="w-full h-full overflow-visible">
                    <path
                      d="M 5 35 Q 25 15, 50 32 T 95 24 T 140 10 T 175 30"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="140"
                      cy="10"
                      r="3.5"
                      fill="#111111"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Minimal Toggle Switch Card */}
              <div className="sm:col-span-3 bg-white border border-[#E4E4E7] rounded-2xl p-4 flex items-center justify-center">
                <div
                  onClick={() => {
                    handleAction('toggle', () => {
                      setIsSwitchOn(!isSwitchOn);
                      triggerToast(`Switch ${!isSwitchOn ? 'ON' : 'OFF'}`);
                    });
                  }}
                  className={`w-[96px] h-12 rounded-full p-1 flex items-center cursor-pointer transition-colors relative border ${
                    isSwitchOn
                      ? 'bg-[#111111] border-[#111111]'
                      : 'bg-[#F4F4F5] border-[#E4E4E7]'
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-[10px] font-semibold tracking-wider transition-all duration-200 transform ${
                      isSwitchOn
                        ? 'translate-x-12 bg-white text-[#111111]'
                        : 'translate-x-0 bg-white text-[#71717A] border border-[#E4E4E7]'
                    }`}
                  >
                    {isSwitchOn ? 'ON' : 'OFF'}
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: Minimal Slider Card with Clean Tooltip */}
            <div className="bg-white border border-[#E4E4E7] rounded-full py-4 px-6 sm:px-8 relative">
              <div className="flex items-center gap-5 sm:gap-6">
                
                {/* Thin 2px Minimal Track */}
                <div
                  ref={sliderRef}
                  onClick={handleSliderClick}
                  className="h-[2px] flex-1 bg-[#E4E4E7] relative flex items-center cursor-pointer"
                >
                  {/* Solid Ink Progress Line */}
                  <div
                    className="h-full bg-[#111111] transition-all duration-75"
                    style={{ width: `${sliderValue}%` }}
                  />

                  {/* Sharp Circular Thumb */}
                  <div
                    className="w-5 h-5 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center absolute -top-[9px] -ml-2.5 transition-all duration-75 cursor-grab active:cursor-grabbing hover:scale-110"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  </div>

                  {/* Minimal Hairline Speech Bubble Tooltip Underneath */}
                  <div
                    className="absolute top-6 -ml-28 hidden sm:block pointer-events-none transition-all duration-75 z-20"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <div className="relative bg-white border border-[#E4E4E7] rounded-xl p-3 w-56 text-[10px] text-[#52525B] leading-relaxed">
                      <div className="absolute -top-1.5 left-28 w-2.5 h-2.5 bg-white transform rotate-45 border-l border-t border-[#E4E4E7]" />
                      <span className="relative z-10">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabular Percentage Readout */}
                <div className="flex-shrink-0 text-right min-w-[44px]">
                  <span className="text-base font-semibold text-[#111111] tracking-tight tabular-nums">
                    {sliderValue}%
                  </span>
                </div>

              </div>
            </div>

            {/* ROW 4: Radial Donut Metric Card ($4891.22) + Mountain Wave Card (2201) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Circular Gauge Minimal Card (Left 7 cols) */}
              <div className="md:col-span-7 bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-medium tracking-[0.16em] text-[#71717A] uppercase block">
                    Lorem Ipsum Dolor Sit
                  </span>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <h3 className="text-2xl sm:text-[28px] font-semibold text-[#111111] tracking-tight tabular-nums">
                      $4891.22
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-[#52525B] mt-1 tabular-nums">
                    <ArrowUp className="w-3 h-3 stroke-[2]" />
                    <span>75%</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* Minimal Legend Dots */}
                  <div className="flex flex-col gap-3 text-xs text-[#52525B] order-2 sm:order-1">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4D4D8] flex-shrink-0" />
                      <span className="text-[11px] leading-tight">Lorem ipsum dolor sit amet</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#111111] flex-shrink-0" />
                      <span className="text-[11px] leading-tight text-[#111111]">Lorem ipsum dolor sit amet</span>
                    </div>
                  </div>

                  {/* Precision Thin-Stroke Radial Gauge */}
                  <div className="relative w-36 h-36 flex items-center justify-center order-1 sm:order-2 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="48" stroke="#F4F4F5" strokeWidth="4" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke="#111111"
                        strokeWidth="4.5"
                        strokeDasharray="301.6"
                        strokeDashoffset="75.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>

                    <div className="absolute inset-6 rounded-full bg-white border border-[#E4E4E7] flex flex-col items-center justify-center">
                      <span className="text-base font-semibold text-[#111111] tracking-tight tabular-nums">
                        75%
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mountain Wave Minimal Card (Right 5 cols) */}
              <div className="md:col-span-5 bg-white border border-[#E4E4E7] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-[#111111] tracking-tight tabular-nums">
                      2201
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#111111]" />
                  </div>
                  <p className="text-[11px] text-[#71717A] line-clamp-2 mt-1 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  </p>
                </div>

                {/* Clean Monochrome Layered Wave Chart */}
                <div className="my-4 h-28 w-full flex items-end border-b border-[#E4E4E7] pb-1">
                  <svg viewBox="0 0 160 85" className="w-full h-full overflow-visible">
                    <path
                      d="M 5 80 L 15 55 Q 25 45, 35 60 Q 45 75, 55 50 Q 65 30, 75 55 Q 85 70, 95 40 Q 105 20, 115 55 L 125 80 Z"
                      fill="#E4E4E7"
                    />
                    <path
                      d="M 8 80 L 15 58 Q 20 52, 28 65 Q 40 78, 55 45 Q 65 25, 75 80 L 80 80 Q 90 25, 105 10 Q 112 5, 120 40 Q 128 70, 135 80 Z"
                      fill="#18181B"
                    />
                    <circle cx="107" cy="9" r="3" fill="#111111" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="107" y1="9" x2="155" y2="9" stroke="#A1A1AA" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>

                {/* Minimal Bottom Slider */}
                <div className="pt-2">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percent = Math.round(Math.min(Math.max((x / rect.width) * 100, 10), 90));
                      setChartTimeline(percent);
                      playTactileClick('slider');
                    }}
                    className="h-[2px] bg-[#E4E4E7] relative flex items-center cursor-pointer"
                  >
                    <div
                      className="h-full bg-[#111111]"
                      style={{ width: `${chartTimeline}%` }}
                    />
                    <div
                      className="w-4 h-4 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center absolute -top-[7px] -ml-2 transition-all cursor-grab active:cursor-grabbing hover:scale-110"
                      style={{ left: `${chartTimeline}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 5: Bottom Timeline / Stepper Minimal Card (2019, 2020, 2021, 2022) */}
            <div className="bg-white border border-[#E4E4E7] rounded-2xl py-6 px-6 sm:px-10">
              <div className="relative flex flex-col gap-4">
                
                {/* Thin 1.5px Rule Track */}
                <div className="h-[2px] bg-[#E4E4E7] relative flex items-center mx-4 sm:mx-8">
                  <div
                    className="h-full bg-[#111111] transition-all duration-300"
                    style={{
                      width:
                        activeYear === 2019
                          ? '12%'
                          : activeYear === 2020
                          ? '38%'
                          : activeYear === 2021
                          ? '66%'
                          : '96%',
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    {[2019, 2020, 2021, 2022].map((year) => {
                      const isReached = year <= activeYear;
                      return (
                        <div
                          key={year}
                          className={`w-2.5 h-2.5 rounded-full transition-all flex items-center justify-center ${
                            isReached
                              ? 'bg-[#111111] ring-4 ring-white'
                              : 'bg-white border border-[#D4D4D8]'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Year Pills */}
                <div className="flex items-center justify-between px-0 sm:px-4 pt-1">
                  {[2019, 2020, 2021, 2022].map((year) => {
                    const isActive = activeYear === year;
                    return (
                      <div key={year} className="relative flex flex-col items-center">
                        {isActive && (
                          <div className="w-2 h-2 bg-[#111111] transform rotate-45 -mb-1" />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            handleAction('click', () => {
                              setActiveYear(year as 2019 | 2020 | 2021 | 2022);
                              triggerToast(`Selected Year: ${year}`);
                            });
                          }}
                          className={`px-4 sm:px-6 py-1.5 rounded-full text-xs font-medium tabular-nums transition-colors cursor-pointer border ${
                            isActive
                              ? 'bg-[#111111] text-white border-[#111111]'
                              : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#111111] hover:text-[#111111]'
                          }`}
                        >
                          {year}
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Portfolio Footer Note */}
        <div className="mt-12 text-center text-xs text-[#71717A] border-t border-[#E4E4E7] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-normal">
            <span>
              Minimalism Paradigm — Same layout & content as{' '}
              <span className="font-medium text-[#111111]">src/assets/sample.jpg</span>
            </span>
          </div>
          <div className="text-[#A1A1AA]">
            Swiss Monochrome • Hairline Borders & Editorial Whitespace
          </div>
        </div>

      </div>
    </div>
  );
};

export default Minimalism;

