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
} from 'lucide-react';
import { playTactileClick } from '../../utils/sound';

// Realistic Skeuomorphic Brass / Steel Screw Component
const Screw: React.FC<{ size?: number; angle?: number; className?: string }> = ({
  size = 14,
  angle = 35,
  className = '',
}) => (
  <div
    style={{ width: size, height: size }}
    className={`rounded-full bg-gradient-to-br from-[#e2e8f0] via-[#94a3b8] to-[#475569] p-[1.5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center relative flex-shrink-0 ${className}`}
  >
    {/* Inner screw slot with angle */}
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className="w-full h-full rounded-full bg-gradient-to-br from-[#cbd5e1] to-[#64748b] flex items-center justify-center shadow-inner"
    >
      <div className="w-[70%] h-[1.5px] bg-[#1e293b] shadow-[0_1px_0_rgba(255,255,255,0.4)]" />
      <div className="h-[70%] w-[1.5px] bg-[#1e293b] shadow-[0_1px_0_rgba(255,255,255,0.4)] absolute" />
    </div>
  </div>
);

export const Skeuomorphism: React.FC = () => {
  // Login Form States
  const [email, setEmail] = useState('username@mail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Quick Navigation Active Tab
  const [activeNav, setActiveNav] = useState<'home' | 'calender' | 'notification' | 'setting'>('home');

  // Toggle Switch State
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  // Main Slider Value (71% default as in sample)
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
    triggerToast('Mechanical disk write initiated...');
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          playTactileClick('success');
          triggerToast('Data packet recorded: SKEUO_CORE.ROM');
          setTimeout(() => setDownloadProgress(null), 1500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const categories = ['Dashboard Design', 'Mobile Components', 'Tactile UI Kits', 'Design Tokens'];

  return (
    <div
      className="w-full py-10 px-3 sm:px-6 lg:px-8 select-none min-h-screen"
      style={{
        // Rich Mahogany Wood Grain Desk Texture
        backgroundColor: '#1c130d',
        backgroundImage: `
          radial-gradient(ellipse at 50% 20%, rgba(217, 119, 6, 0.15) 0%, rgba(0,0,0,0.85) 80%),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 8px),
          linear-gradient(to right, #24160d 0%, #3a2213 25%, #2a190e 50%, #3e2617 75%, #1f120a 100%)
        `,
      }}
    >
      {/* Toast Notification (Physical Paper Memo Tag with Pin) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#fffbeb] text-[#78350f] shadow-[0_12px_24px_rgba(0,0,0,0.7),_inset_0_1px_1px_#ffffff] border border-[#fef3c7] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-ping" />
          <span className="text-xs font-bold font-mono tracking-tight">{toastMessage}</span>
        </div>
      )}

      {/* Main Skeuomorphic Apparatus (Anodized Brushed Aluminum & Stitched Leather Chassis) */}
      <div className="max-w-[1160px] mx-auto">
        
        {/* Style Paradigm Indicator Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-b from-[#2b221a] to-[#1a120c] border border-[#523722] shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 shadow-[0_2px_4px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.3)] border border-amber-500/40">
              Style: Pure Skeuomorphism
            </span>
            <span className="text-xs text-[#d5bba2] font-medium">
              Real-world physical materials: brushed aluminum chassis, stitched leather, machine screws, glass glare & tactile spring buttons.
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Exact same layout & content as sample.jpg</span>
          </div>
        </div>

        {/* THE MAIN HARDWARE CHASSIS (Brushed Aluminum Enclosure) */}
        <div
          className="rounded-[40px] p-6 sm:p-10 relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_0_1px_rgba(255,255,255,0.15)] border-4 border-[#8e9aaf]/70"
          style={{
            // Authentic Brushed Anodized Metal Faceplate
            background: `
              repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px),
              linear-gradient(135deg, #cbd5e1 0%, #94a3b8 20%, #e2e8f0 40%, #64748b 60%, #cbd5e1 80%, #94a3b8 100%)
            `,
          }}
        >
          {/* 4 Corner Machine Screws */}
          <Screw size={18} angle={25} className="absolute top-4 left-4" />
          <Screw size={18} angle={115} className="absolute top-4 right-4" />
          <Screw size={18} angle={210} className="absolute bottom-4 left-4" />
          <Screw size={18} angle={305} className="absolute bottom-4 right-4" />

          {/* Chamfered Inner Bevel & Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
            
            {/* =========================================
                LEFT COLUMN (Login Module & 4 Action Controls)
               ========================================= */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* LOGIN MODULE (Handcrafted Leather Inlay with Brushed Chrome Frame) */}
              <div
                className="rounded-[36px] p-7 sm:p-8 relative shadow-[0_12px_28px_rgba(0,0,0,0.45),_inset_0_2px_3px_rgba(255,255,255,0.7)] border-2 border-[#cbd5e1]"
                style={{
                  // Luxury Suede Leather Texture
                  backgroundColor: '#3b2f27',
                  backgroundImage: `
                    radial-gradient(circle at 50% 30%, #4a3b31 0%, #291f1a 100%),
                    repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px, transparent 2px, transparent 4px)
                  `,
                }}
              >
                {/* Stitched Leather Perimeter (Double-Stitch Effect) */}
                <div className="absolute inset-2.5 rounded-[30px] border-2 border-dashed border-[#b45309]/50 pointer-events-none shadow-[inset_0_0_4px_rgba(0,0,0,0.6)]" />

                {/* Stamped Brass Heading Plate */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="px-4 py-1.5 rounded-lg bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] shadow-[0_3px_6px_rgba(0,0,0,0.5),_inset_0_1px_1px_#ffffff] border border-white/60">
                    <h2
                      className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-wider uppercase font-mono"
                      style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8), 0 -1px 0 rgba(0,0,0,0.4)' }}
                    >
                      Login
                    </h2>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] border border-emerald-300" title="System Online" />
                </div>

                {/* Username Input Field (Sunken Acrylic Screen Well) */}
                <div className="mb-6">
                  <div className="rounded-xl bg-[#14181f] p-3 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),_0_1px_1px_rgba(255,255,255,0.2)] border border-[#334155] flex items-center justify-between relative overflow-hidden">
                    {/* Glass glare sweep */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="username@mail.com"
                      className="w-full bg-transparent text-sm text-[#38bdf8] placeholder-[#0284c7]/60 focus:outline-none font-mono tracking-wide relative z-10"
                    />
                    <Mail className="w-4 h-4 text-[#38bdf8]/70 flex-shrink-0 relative z-10" />
                  </div>
                  {/* Physical Brass Wire Divider */}
                  <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mt-1 shadow-[0_1px_2px_rgba(0,0,0,0.8)] opacity-60" />
                </div>

                {/* Password Input Field (Sunken Acrylic Screen Well) */}
                <div className="mb-5">
                  <div className="rounded-xl bg-[#14181f] p-3 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),_0_1px_1px_rgba(255,255,255,0.2)] border border-[#334155] flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent text-sm text-[#38bdf8] placeholder-[#0284c7]/60 focus:outline-none font-mono tracking-widest relative z-10"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleAction('click');
                        setShowPassword(!showPassword);
                      }}
                      className="text-[#38bdf8]/70 hover:text-[#38bdf8] transition-colors p-1 relative z-10"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mt-1 shadow-[0_1px_2px_rgba(0,0,0,0.8)] opacity-60" />
                </div>

                {/* Forget Password Link */}
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      handleAction('click');
                      triggerToast('Reset signal dispatched to ' + email);
                    }}
                    className="text-xs text-[#fed7aa] hover:text-white underline underline-offset-4 font-mono transition-colors cursor-pointer"
                  >
                    Forget Password?
                  </button>
                </div>

                {/* Sign Up Button (Heavy Physical Spring-Loaded Industrial Push Button) */}
                <div className="flex justify-center -mb-2">
                  <div className="p-1 rounded-full bg-gradient-to-b from-[#64748b] to-[#0f172a] shadow-[0_6px_12px_rgba(0,0,0,0.7)] border border-white/30">
                    <button
                      type="button"
                      onClick={() => {
                        handleAction('success', () => {
                          setIsSignedUp(true);
                          triggerToast('Tactile Ignition: Signed Up!');
                          setTimeout(() => setIsSignedUp(false), 2500);
                        });
                      }}
                      className="w-44 h-13 rounded-full text-white font-extrabold text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-75 relative overflow-hidden"
                      style={{
                        // 3D Domed Convex Glossy Cap with Deep Press Physics
                        background: 'radial-gradient(ellipse at 50% 30%, #3b82f6 0%, #1d4ed8 60%, #172554 100%)',
                        boxShadow: isSignedUp
                          ? 'inset 0 4px 8px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.4)'
                          : 'inset 0 2px 2px rgba(255,255,255,0.7), 0 5px 0 #1e3a8a, 0 8px 16px rgba(0,0,0,0.6)',
                        transform: isSignedUp ? 'translateY(4px)' : 'translateY(0)',
                      }}
                    >
                      {/* Glass Lens Curved Specular Glare */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

                      {isSignedUp ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                          <span className="text-emerald-200">Engaged</span>
                        </>
                      ) : (
                        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Sign Up</span>
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {/* VERTICAL BUTTON STACK (4 Physical Machined Controls) */}
              <div className="flex flex-col gap-3.5">
                
                {/* 1. Add Friend (Machined Aluminum Pill with Mechanical Push Button) */}
                <div
                  onClick={() => {
                    handleAction('click', () => {
                      setFriendCount((c) => c + 1);
                      triggerToast(`Contact incremented: ${friendCount + 1}`);
                    });
                  }}
                  className="h-16 rounded-full bg-gradient-to-b from-[#f1f5f9] via-[#cbd5e1] to-[#94a3b8] shadow-[0_5px_12px_rgba(0,0,0,0.4),_inset_0_1px_1px_#ffffff] border-2 border-white/60 flex items-center px-3.5 gap-4 cursor-pointer active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-all group"
                >
                  {/* Heavy knurled blue push button */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#3b82f6] to-[#1e3a8a] p-1 shadow-[0_3px_6px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.8)] border border-[#60a5fa] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5 text-white stroke-[3] drop-shadow" />
                  </div>
                  <div className="flex items-center justify-between flex-1 pr-3">
                    <span className="text-sm font-black text-[#1e293b] uppercase tracking-wide font-mono" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                      Add Friend
                    </span>
                    {/* Stamped Brass Counter Plaque */}
                    <div className="px-2.5 py-0.5 rounded bg-gradient-to-b from-[#fef3c7] to-[#d97706] text-[#78350f] text-xs font-black font-mono shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),_0_1px_0_#ffffff] border border-amber-600/40">
                      {friendCount}
                    </div>
                  </div>
                </div>

                {/* 2. Share (Brushed Metal Rocker Plate) */}
                <div
                  onClick={() => {
                    handleAction('click', () => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                      }
                      triggerToast('Share bus frequency broadcasted!');
                    });
                  }}
                  className="h-16 rounded-full bg-gradient-to-b from-[#f1f5f9] via-[#cbd5e1] to-[#94a3b8] shadow-[0_5px_12px_rgba(0,0,0,0.4),_inset_0_1px_1px_#ffffff] border-2 border-white/60 flex items-center px-6 gap-4 cursor-pointer active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-all group"
                >
                  <div className="p-2 rounded-full bg-gradient-to-b from-[#e2e8f0] to-[#64748b] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),_0_1px_0_#ffffff]">
                    <Share2 className="w-4 h-4 text-[#1e293b] stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-black text-[#1e293b] uppercase tracking-wide font-mono" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                    Share
                  </span>
                </div>

                {/* 3. Select Category (Rotary Selector Switch Pill) */}
                <div className="relative">
                  <div
                    onClick={() => {
                      handleAction('click', () => setIsCategoryOpen(!isCategoryOpen));
                    }}
                    className="h-16 rounded-full bg-gradient-to-b from-[#f1f5f9] via-[#cbd5e1] to-[#94a3b8] shadow-[0_5px_12px_rgba(0,0,0,0.4),_inset_0_1px_1px_#ffffff] border-2 border-white/60 flex items-center justify-between px-6 cursor-pointer active:translate-y-0.5 transition-all"
                  >
                    <span className="text-sm font-black text-[#1e293b] uppercase tracking-wide font-mono" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                      {category}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#e2e8f0] to-[#64748b] shadow-[0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
                      <ChevronDown className={`w-4 h-4 text-[#1e293b] transition-transform duration-200 stroke-[3] ${isCategoryOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Textured Cardboard Options Drawer */}
                  {isCategoryOpen && (
                    <div className="absolute top-18 left-0 right-0 z-30 bg-[#2b221a] rounded-2xl p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.8)] border-2 border-[#523722] animate-in fade-in zoom-in-95 duration-150">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          onClick={() => {
                            handleAction('click', () => {
                              setCategory(cat);
                              setIsCategoryOpen(false);
                              triggerToast(`Selected: ${cat}`);
                            });
                          }}
                          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all flex items-center justify-between ${
                            category === cat
                              ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                              : 'text-[#fed7aa] hover:bg-[#3f2e22]'
                          }`}
                        >
                          <span>{cat}</span>
                          {category === cat && <Check className="w-3.5 h-3.5" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Download (Leather & Steel Latch with Pilot Lamp) */}
                <div
                  onClick={handleDownload}
                  className="h-16 rounded-full bg-gradient-to-b from-[#f1f5f9] via-[#cbd5e1] to-[#94a3b8] shadow-[0_5px_12px_rgba(0,0,0,0.4),_inset_0_1px_1px_#ffffff] border-2 border-white/60 flex items-center px-3.5 gap-4 cursor-pointer active:translate-y-0.5 transition-all group relative overflow-hidden"
                >
                  {downloadProgress !== null && (
                    <div
                      className="absolute inset-0 bg-blue-500/20 transition-all duration-200 pointer-events-none"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  )}
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-[#2563eb] to-[#1e3a8a] p-1 shadow-[0_3px_6px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.8)] border border-[#60a5fa] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Download className="w-5 h-5 text-white stroke-[2.5]" />
                  </div>
                  <div className="flex items-center justify-between flex-1 pr-3 relative z-10">
                    <span className="text-sm font-black text-[#1e293b] uppercase tracking-wide font-mono" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                      Download
                    </span>
                    {downloadProgress !== null ? (
                      <span className="text-xs font-mono font-black text-[#1d4ed8]">{downloadProgress}%</span>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    )}
                  </div>
                </div>

              </div>

            </div>


            {/* =========================================
                RIGHT SECTION (Gauges, Switches, Mixing Fader, Oscilloscope)
               ========================================= */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {/* TOP ROW: 4 Heavy Mechanical Console Push-Keys (Braun / Revox Style) */}
              <div className="flex items-center justify-start sm:justify-end gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-hidden">
                
                {/* 1. HOME KEY */}
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setActiveNav('home'))}
                  className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-75 relative ${
                    activeNav === 'home'
                      ? 'bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),_0_1px_0_rgba(255,255,255,0.3)] border-2 border-[#0284c7] translate-y-1'
                      : 'bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#94a3b8] shadow-[0_6px_0_#475569,_0_10px_16px_rgba(0,0,0,0.4),_inset_0_1px_2px_#ffffff] border-2 border-white'
                  }`}
                >
                  <Home className={`w-6 h-6 stroke-[2.5] ${activeNav === 'home' ? 'text-[#38bdf8] drop-shadow-[0_0_8px_#38bdf8]' : 'text-[#334155]'}`} />
                  <span className={`text-[10px] font-black uppercase font-mono tracking-wider ${activeNav === 'home' ? 'text-[#38bdf8]' : 'text-[#334155]'}`}>
                    Home
                  </span>
                  {activeNav === 'home' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8] absolute top-2 right-2" />
                  )}
                </button>

                {/* 2. CALENDAR KEY */}
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setActiveNav('calender'))}
                  className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-75 relative ${
                    activeNav === 'calender'
                      ? 'bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),_0_1px_0_rgba(255,255,255,0.3)] border-2 border-[#0284c7] translate-y-1'
                      : 'bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#94a3b8] shadow-[0_6px_0_#475569,_0_10px_16px_rgba(0,0,0,0.4),_inset_0_1px_2px_#ffffff] border-2 border-white'
                  }`}
                >
                  <Calendar className={`w-6 h-6 stroke-[2.2] ${activeNav === 'calender' ? 'text-[#38bdf8] drop-shadow-[0_0_8px_#38bdf8]' : 'text-[#334155]'}`} />
                  <span className={`text-[10px] font-black uppercase font-mono tracking-wider ${activeNav === 'calender' ? 'text-[#38bdf8]' : 'text-[#334155]'}`}>
                    Calender
                  </span>
                </button>

                {/* 3. NOTIFICATION KEY */}
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setActiveNav('notification'))}
                  className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-75 relative ${
                    activeNav === 'notification'
                      ? 'bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),_0_1px_0_rgba(255,255,255,0.3)] border-2 border-[#0284c7] translate-y-1'
                      : 'bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#94a3b8] shadow-[0_6px_0_#475569,_0_10px_16px_rgba(0,0,0,0.4),_inset_0_1px_2px_#ffffff] border-2 border-white'
                  }`}
                >
                  <Bell className={`w-6 h-6 stroke-[2.2] ${activeNav === 'notification' ? 'text-[#38bdf8] drop-shadow-[0_0_8px_#38bdf8]' : 'text-[#334155]'}`} />
                  <span className={`text-[10px] font-black uppercase font-mono tracking-wider ${activeNav === 'notification' ? 'text-[#38bdf8]' : 'text-[#334155]'}`}>
                    Notification
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] absolute top-2 right-2 border border-amber-300" />
                </button>

                {/* 4. SETTING KEY */}
                <button
                  type="button"
                  onClick={() => handleAction('click', () => setActiveNav('setting'))}
                  className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-75 relative ${
                    activeNav === 'setting'
                      ? 'bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),_0_1px_0_rgba(255,255,255,0.3)] border-2 border-[#0284c7] translate-y-1'
                      : 'bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#94a3b8] shadow-[0_6px_0_#475569,_0_10px_16px_rgba(0,0,0,0.4),_inset_0_1px_2px_#ffffff] border-2 border-white'
                  }`}
                >
                  <Settings className={`w-6 h-6 stroke-[2.2] ${activeNav === 'setting' ? 'text-[#38bdf8] drop-shadow-[0_0_8px_#38bdf8]' : 'text-[#334155]'}`} />
                  <span className={`text-[10px] font-black uppercase font-mono tracking-wider ${activeNav === 'setting' ? 'text-[#38bdf8]' : 'text-[#334155]'}`}>
                    Setting
                  </span>
                </button>

              </div>

              {/* ROW 2: CRT Oscilloscope Card ("Last 7 days") & Industrial Rocker Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                
                {/* CRT OSCILLOSCOPE SCREEN (Left 8 cols) */}
                <div className="sm:col-span-9 rounded-[28px] p-5 bg-[#0b1016] shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),_0_4px_8px_rgba(255,255,255,0.2)] border-3 border-[#334155] flex items-center justify-between gap-4 relative overflow-hidden">
                  {/* CRT Screen Scanlines & Glass Lens Glare */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                      backgroundSize: '100% 3px, 4px 100%',
                    }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Left Label Plaque */}
                  <div className="flex-shrink-0 relative z-10">
                    <span className="text-[10px] font-mono font-bold text-[#94a3b8] uppercase tracking-wider block">
                      Last 7 days
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 text-[#38bdf8]">
                      <ArrowUp className="w-4 h-4 stroke-[3] text-emerald-400 drop-shadow-[0_0_6px_#10b981]" />
                      <span className="text-lg font-mono font-black tracking-tight drop-shadow-[0_0_8px_#38bdf8]">
                        +22,12
                      </span>
                    </div>
                  </div>

                  {/* Oscilloscope Curved Waveform with Glowing Phosphor Beam */}
                  <div className="flex-1 max-w-[280px] h-12 flex items-center relative z-10">
                    <svg viewBox="0 0 180 50" className="w-full h-full overflow-visible">
                      <defs>
                        <filter id="crtBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.9" />
                        </filter>
                      </defs>
                      <path
                        d="M 5 35 Q 25 15, 50 32 T 95 24 T 140 10 T 175 30"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        filter="url(#crtBeamGlow)"
                      />
                      <circle
                        cx="140"
                        cy="10"
                        r="5"
                        fill="#ffffff"
                        stroke="#0284c7"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>

                {/* HEAVY CHROME INDUSTRIAL TOGGLE SWITCH (Right 3 cols) */}
                <div className="sm:col-span-3 rounded-[28px] p-4 bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] shadow-[0_6px_14px_rgba(0,0,0,0.5),_inset_0_1px_2px_#ffffff] border-2 border-white flex items-center justify-center">
                  <div
                    onClick={() => {
                      handleAction('toggle', () => {
                        setIsSwitchOn(!isSwitchOn);
                        triggerToast(`Rocker switch clicked: ${!isSwitchOn ? 'ON' : 'OFF'}`);
                      });
                    }}
                    className="w-24 h-14 rounded-full bg-[#0f172a] shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] p-1.5 flex items-center cursor-pointer transition-all relative border border-[#334155]"
                  >
                    {/* Left tactile ridges */}
                    <div className="absolute left-3 flex items-center gap-1 opacity-70 pointer-events-none">
                      <span className="w-0.5 h-6 bg-[#64748b] rounded-full shadow-inner" />
                      <span className="w-0.5 h-6 bg-[#64748b] rounded-full shadow-inner" />
                      <span className="w-0.5 h-6 bg-[#64748b] rounded-full shadow-inner" />
                    </div>

                    {/* Heavy Chrome Rocker Knob with Snap Animation */}
                    <div
                      className={`h-11 w-11 rounded-full flex items-center justify-center text-xs font-black font-mono uppercase tracking-wider transition-all duration-200 transform ${
                        isSwitchOn
                          ? 'translate-x-10 bg-gradient-to-b from-[#38bdf8] via-[#2563eb] to-[#1e3a8a] text-white shadow-[0_0_12px_#38bdf8,_inset_0_2px_2px_#ffffff]'
                          : 'translate-x-0 bg-gradient-to-b from-[#94a3b8] to-[#475569] text-[#e2e8f0] shadow-[0_3px_6px_rgba(0,0,0,0.6),_inset_0_1px_1px_#ffffff]'
                      }`}
                    >
                      {isSwitchOn ? 'ON' : 'OFF'}
                    </div>
                  </div>
                </div>

              </div>

              {/* ROW 3: Professional Studio Audio Fader (Linear Potentiometer) */}
              <div className="rounded-full py-4.5 px-6 sm:px-8 bg-gradient-to-b from-[#f1f5f9] via-[#cbd5e1] to-[#94a3b8] shadow-[0_8px_18px_rgba(0,0,0,0.4),_inset_0_1px_2px_#ffffff] border-2 border-white relative">
                <div className="flex items-center gap-4 sm:gap-6">
                  
                  {/* Recessed Fader Track (Black Felt Liner) */}
                  <div
                    ref={sliderRef}
                    onClick={handleSliderClick}
                    className="h-4 flex-1 rounded-full bg-[#0b0f17] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),_0_1px_1px_rgba(255,255,255,0.4)] relative flex items-center cursor-pointer border border-[#334155]"
                  >
                    {/* Illuminated Potentiometer Fill Tube */}
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#60a5fa] shadow-[0_0_8px_#38bdf8] transition-all duration-75"
                      style={{ width: `${sliderValue}%` }}
                    />

                    {/* Knurled Aluminum Fader Handle Knob */}
                    <div
                      className="w-8 h-8 rounded-full bg-gradient-to-b from-[#ffffff] via-[#cbd5e1] to-[#64748b] shadow-[0_4px_8px_rgba(0,0,0,0.6),_inset_0_1px_1px_#ffffff] border-2 border-[#475569] flex items-center justify-center absolute -top-2 -ml-4 transition-all duration-75 cursor-grab active:cursor-grabbing hover:scale-110"
                      style={{ left: `${sliderValue}%` }}
                    >
                      {/* Center Indicator Notch */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] shadow-[0_0_4px_#38bdf8]" />
                    </div>

                    {/* Physical Paper Note Label with Brass Pin Holding it */}
                    <div
                      className="absolute top-8 -ml-28 hidden sm:block pointer-events-none transition-all duration-75 z-20"
                      style={{ left: `${sliderValue}%` }}
                    >
                      <div className="relative bg-[#fffbeb] rounded-xl p-2.5 shadow-[0_8px_16px_rgba(0,0,0,0.6),_inset_0_1px_1px_#ffffff] border border-[#fef3c7] w-56 text-[10px] text-[#78350f] font-mono leading-relaxed">
                        {/* Brass Pushpin */}
                        <div className="absolute -top-2 left-27 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                        <span>Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor...</span>
                      </div>
                    </div>
                  </div>

                  {/* Fader Readout Display */}
                  <div className="flex-shrink-0 text-right min-w-[55px] px-2.5 py-1 rounded bg-[#0f172a] border border-[#334155] shadow-inner">
                    <span className="text-base sm:text-lg font-black font-mono text-[#38bdf8] tracking-tight drop-shadow-[0_0_6px_#38bdf8]">
                      {sliderValue}%
                    </span>
                  </div>

                </div>
              </div>

              {/* ROW 4: Vintage Swiss VU Meter / Radial Chronometer & Peak Mountain Gauge */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* RADIAL VU METER GAUGE (Left 7 cols) */}
                <div className="md:col-span-7 rounded-[36px] p-6 sm:p-7 bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] shadow-[0_12px_24px_rgba(0,0,0,0.4),_inset_0_2px_2px_#ffffff] border-3 border-white flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Top Stats & Stamped Plaque */}
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#64748b] uppercase font-mono block">
                      Lorem Ipsum Dolor Sit
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-mono tracking-tight" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                        $4891.22
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 mt-0.5">
                      <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                      <span>75% PEAK</span>
                    </div>
                  </div>

                  {/* Gauge Dial & Pilot Lamp Legends */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    {/* Pilot Lamps */}
                    <div className="flex flex-col gap-3.5 text-xs font-mono font-bold text-[#334155] order-2 sm:order-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-400 p-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.4)] border border-white">
                          <div className="w-full h-full rounded-full bg-slate-600 shadow-inner" />
                        </div>
                        <span className="text-[11px] leading-tight">Lorem ipsum dolor sit amet</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-blue-400 p-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.4)] border border-white">
                          <div className="w-full h-full rounded-full bg-[#2563eb] shadow-[0_0_8px_#3b82f6]" />
                        </div>
                        <span className="text-[11px] leading-tight text-[#1d4ed8]">Lorem ipsum dolor sit amet</span>
                      </div>
                    </div>

                    {/* Heavy Circular Chrome Bezel Gauge */}
                    <div className="relative w-38 h-38 rounded-full bg-gradient-to-br from-[#ffffff] via-[#cbd5e1] to-[#475569] p-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.5),_inset_0_2px_2px_#ffffff] flex items-center justify-center order-1 sm:order-2 flex-shrink-0">
                      
                      {/* Recessed Dial Face with Glass Glare */}
                      <div className="w-full h-full rounded-full bg-[#0b1016] shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] relative flex items-center justify-center overflow-hidden border border-[#334155]">
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

                        {/* Radial SVG Arc */}
                        <svg className="w-full h-full transform -rotate-90 overflow-visible p-2" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="46" stroke="#1e293b" strokeWidth="8" fill="none" />
                          <circle
                            cx="60"
                            cy="60"
                            r="46"
                            stroke="#38bdf8"
                            strokeWidth="8.5"
                            strokeDasharray="289"
                            strokeDashoffset="72.25"
                            strokeLinecap="round"
                            fill="none"
                            filter="drop-shadow(0 0 6px #0284c7)"
                          />
                        </svg>

                        {/* 3D Knurled Center Dial Knob */}
                        <div className="absolute inset-7 rounded-full bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#64748b] shadow-[0_4px_10px_rgba(0,0,0,0.7),_inset_0_1px_1px_#ffffff] border border-white flex flex-col items-center justify-center">
                          <span className="text-lg font-black font-mono text-[#0f172a] tracking-tight">75%</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* 2201 MOUNTAIN CHART INSTRUMENT (Right 5 cols) */}
                <div className="md:col-span-5 rounded-[36px] p-6 bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] shadow-[0_12px_24px_rgba(0,0,0,0.4),_inset_0_2px_2px_#ffffff] border-3 border-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black font-mono text-[#0f172a] tracking-tight" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>
                        2201
                      </h3>
                      <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] border border-blue-200" />
                    </div>
                    <p className="text-[11px] font-mono text-[#475569] line-clamp-2 mt-1 leading-snug">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit.
                    </p>
                  </div>

                  {/* Dark Acrylic Recessed Mountain Display */}
                  <div className="my-3 h-28 w-full rounded-2xl bg-[#0b1016] p-2 shadow-inner border border-[#334155] relative flex items-end overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                    <svg viewBox="0 0 160 85" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="skeuoBluePeak" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="skeuoGrayPeak" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#64748b" />
                          <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                      </defs>

                      {/* Gray Mountain Peak */}
                      <path
                        d="M 5 80 L 15 55 Q 25 45, 35 60 Q 45 75, 55 50 Q 65 30, 75 55 Q 85 70, 95 40 Q 105 20, 115 55 L 125 80 Z"
                        fill="url(#skeuoGrayPeak)"
                      />

                      {/* Foreground Glowing Sapphire Peak */}
                      <path
                        d="M 8 80 L 15 58 Q 20 52, 28 65 Q 40 78, 55 45 Q 65 25, 75 80 L 80 80 Q 90 25, 105 10 Q 112 5, 120 40 Q 128 70, 135 80 Z"
                        fill="url(#skeuoBluePeak)"
                        filter="drop-shadow(0 0 4px #0284c7)"
                      />

                      {/* Brass Needle Pointer at Peak 2201 */}
                      <circle cx="107" cy="9" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                      <line x1="107" y1="9" x2="155" y2="9" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                    </svg>
                  </div>

                  {/* Horizontal Thumbwheel Potentiometer */}
                  <div className="pt-2">
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percent = Math.round(Math.min(Math.max((x / rect.width) * 100, 10), 90));
                        setChartTimeline(percent);
                        playTactileClick('slider');
                      }}
                      className="h-3 rounded-full bg-[#0b0f17] shadow-inner relative flex items-center cursor-pointer border border-[#334155]"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8] shadow-[0_0_6px_#38bdf8]"
                        style={{ width: `${chartTimeline}%` }}
                      />
                      <div
                        className="w-5 h-5 rounded-full bg-gradient-to-b from-white to-[#64748b] shadow-[0_2px_4px_rgba(0,0,0,0.6)] border border-white flex items-center justify-center absolute -top-1 -ml-2.5 transition-all cursor-grab active:cursor-grabbing hover:scale-110"
                        style={{ left: `${chartTimeline}%` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* ROW 5: Mechanical Bus-Bar Timeline Stepper (2019, 2020, 2021, 2022) */}
              <div className="rounded-[34px] sm:rounded-full py-5 px-6 sm:px-10 bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] shadow-[0_12px_24px_rgba(0,0,0,0.4),_inset_0_2px_2px_#ffffff] border-3 border-white">
                <div className="relative flex flex-col gap-3">
                  
                  {/* Heavy Recessed Copper Bus Bar */}
                  <div className="h-3 rounded-full bg-[#0b0f17] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] relative flex items-center mx-4 sm:mx-8 border border-[#334155]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#60a5fa] shadow-[0_0_8px_#38bdf8] transition-all duration-300"
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

                    {/* 4 Illuminated Contact Terminals */}
                    <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                      {[2019, 2020, 2021, 2022].map((year) => {
                        const isReached = year <= activeYear;
                        return (
                          <div
                            key={year}
                            className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                              isReached
                                ? 'bg-[#38bdf8] border-white shadow-[0_0_8px_#38bdf8] scale-110'
                                : 'bg-[#334155] border-[#64748b] shadow-inner'
                            }`}
                          >
                            {year === activeYear && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4 Mechanical Selector Pushbuttons */}
                  <div className="flex items-center justify-between px-0 sm:px-4 pt-1">
                    {[2019, 2020, 2021, 2022].map((year) => {
                      const isActive = activeYear === year;
                      return (
                        <div key={year} className="relative flex flex-col items-center">
                          {isActive && (
                            <div className="w-2.5 h-2.5 bg-[#2563eb] transform rotate-45 -mb-1 shadow-[0_0_6px_#38bdf8]" />
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              handleAction('click', () => {
                                setActiveYear(year as 2019 | 2020 | 2021 | 2022);
                                triggerToast(`Engaged Relay Year: ${year}`);
                              });
                            }}
                            className={`px-4 sm:px-6 py-2 rounded-2xl sm:rounded-full text-xs font-mono font-black transition-all cursor-pointer ${
                              isActive
                                ? 'bg-gradient-to-b from-[#38bdf8] to-[#1e3a8a] text-white shadow-[0_0_12px_#38bdf8,_inset_0_1px_2px_#ffffff] scale-105 border border-white'
                                : 'bg-gradient-to-b from-[#f8fafc] to-[#94a3b8] text-[#1e293b] shadow-[0_3px_6px_rgba(0,0,0,0.4),_inset_0_1px_1px_#ffffff] hover:brightness-105 active:translate-y-0.5 border border-white'
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

        </div>

        {/* Portfolio Footer Note */}
        <div className="mt-8 text-center text-xs text-[#a89078] border-t border-[#523722] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Pure Skeuomorphism Paradigm • Built for portfolio showcasing identical content & layout as <span className="text-amber-300 font-mono">sample.jpg</span></span>
          </div>
          <div className="font-mono text-[11px] text-[#a89078]">
            React + TypeScript + Tailwind CSS • Pure CSS Textures (Wood, Leather, Aluminum, Glass)
          </div>
        </div>

      </div>
    </div>
  );
};

export default Skeuomorphism;
