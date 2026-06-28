import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Check, 
  ArrowRight, 
  Flame, 
  Users, 
  Trash2,
  ChevronRight,
  ArrowDown,
  HelpCircle,
  Smartphone,
  ShieldAlert,
  MessageSquare,
  QrCode,
  DollarSign,
  Mail
} from 'lucide-react';
import { Lead } from '../types';
import OwnerDashboard from './OwnerDashboard';
import ReviewSimulator from './ReviewSimulator';

interface LandingEnProps {
  openCheckout: (preferredPlan: 'monthly' | 'yearly') => void;
  setIsLoginOpen: (val: boolean) => void;
  handleSetLang: (lang: 'es' | 'en') => void;
  localLeads: Lead[];
  showAdminPanel: boolean;
  setShowAdminPanel: (val: boolean) => void;
  clearLeads: () => void;
  demoBusinessName: string;
  demoEmail: string;
  onLaunchDemo?: (email: string, businessName: string) => void;
}

export default function LandingEn({
  openCheckout,
  setIsLoginOpen,
  handleSetLang,
  localLeads,
  showAdminPanel,
  setShowAdminPanel,
  clearLeads,
  demoBusinessName,
  demoEmail,
  onLaunchDemo
}: LandingEnProps) {
  
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Does it work with Google Reviews?",
      a: "Yes. RADAR 360 links directly with your Google Business Profile, allowing happy customers to leave authentic public reviews instantly."
    },
    {
      q: "How long does setup take?",
      a: "Less than five minutes. Simply enter your business details, print your automatically generated high-resolution QR codes, and place them on your tables."
    },
    {
      q: "Do guests need an app?",
      a: "No. Guests simply scan the table QR code with their default smartphone camera. No app downloads, no registration, and no friction."
    },
    {
      q: "Can I use it in multiple locations?",
      a: "Absolutely. You can manage multiple locations, shifts, and table layouts from a single owner account with dedicated reports."
    },
    {
      q: "Is there a contract?",
      a: "No. Cancel whenever you want. We charge a flat, predictable monthly fee with zero setup costs and no hidden strings."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b13] text-[#f8fafc] font-sans antialiased selection:bg-[#facc15] selection:text-[#0f172a]">
      
      {/* TOP DECORATIVE GLOBAL FLOATING STATUS BAR */}
      <div className="bg-[#0f172a] text-[#facc15] text-center py-2 px-4 text-[11px] sm:text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-md">
        <Flame className="w-4 h-4 fill-[#facc15] animate-bounce shrink-0" />
        <span>LIMITED TIME OFFER: GET A 7-DAY RISK-FREE TRIAL. NO CREDIT CARD REQUIRED.</span>
      </div>

      {/* FIXED FLOATING NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/43cbHpBH/logo-sin-fondo.png" 
              alt="RADAR 360 Logo" 
              className="h-10 sm:h-12 w-auto object-contain shrink-0 filter drop-shadow-sm cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="#dashboard-section" 
              className="hidden md:inline-block text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Live Dashboard
            </a>

            <a 
              href="#features-section" 
              className="hidden sm:inline-block text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Features
            </a>

            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-2 py-1 cursor-pointer"
            >
              Sign In
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-[10px] font-black shrink-0 shadow-sm">
              <button
                onClick={() => handleSetLang('es')}
                className="px-2 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-800"
                title="Español"
              >
                <span>🇪🇸</span>
                <span className="hidden xs:inline">ES</span>
              </button>
              <button
                onClick={() => handleSetLang('en')}
                className="px-2 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer bg-[#facc15] text-[#0f172a] shadow-xs"
                title="English"
              >
                <span>🇺🇸</span>
                <span className="hidden xs:inline">EN</span>
              </button>
            </div>

            <button
              onClick={() => openCheckout('yearly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-full transition-all shadow-md shadow-yellow-500/15 active:scale-95 cursor-pointer uppercase tracking-wider shrink-0"
            >
              Start Trial
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20 px-4 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200" id="hero">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          
          <div className="flex justify-center -mb-2 sm:mb-2">
            <img 
              src="https://i.postimg.cc/43cbHpBH/logo-sin-fondo.png" 
              alt="RADAR 360 Logo" 
              className="h-24 sm:h-32 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]" 
            />
          </div>

          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-800 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border border-yellow-500/20">
            ⭐⭐⭐⭐⭐ Trusted by restaurants
          </div>

          {/* Headline & Subhead */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto font-sans">
            Never Lose Another Customer to a <span className="text-amber-655 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/40">Bad Experience</span> You Didn't Know About.
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-750 font-medium max-w-3xl mx-auto leading-relaxed">
            Turn happy guests into 5-star Google reviews. Catch unhappy guests before they leave. Improve your restaurant's online reputation with one simple QR code.
          </p>

          {/* Direct positioning statement (80/20 Customer Focus) */}
          <p className="text-xs sm:text-sm text-slate-500 font-semibold italic border-y border-slate-200 py-3.5 max-w-2xl mx-auto">
            Know exactly what's happening in your restaurant—even when you're not on the floor.
          </p>

          {/* Immediate CTA triggers */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openCheckout('yearly')}
              className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm tracking-widest cursor-pointer uppercase flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 shrink-0 font-bold" />
            </button>
            <a
              href="#dashboard-section"
              className="w-full sm:w-auto bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-8 py-4 rounded-full transition-all text-xs sm:text-sm cursor-pointer text-center block shadow-sm hover:shadow"
            >
              Watch 2-Minute Demo
            </a>
          </div>

        </div>
      </section>

      {/* IMMEDIATE INTERACTIVE DASHBOARD SECTION WITH QR CODE SIMULATOR */}
      <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200 px-4" id="dashboard-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
                Interactive Demo
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Filter complaints privately and raise your Google stars automatically
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                You don't have to guess how it works. Scan the table QR code on the right with your mobile phone to experience a real diner's flow, or enter directly into the live admin dashboard to see how alerts are captured.
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-black">✓</span> Happy customers go directly to your Maps link
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-black">✓</span> Instant tableside alerts protect the service
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-600 font-black">✓</span> Stop upset diners from writing on TripAdvisor or Google
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              {/* Loaded simulator */}
              <ReviewSimulator 
                lang="en"
                onLaunchDemo={onLaunchDemo}
              />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION (One QR. Four Powerful Features) */}
      <section className="py-20 sm:py-28 bg-[#0b0f19] text-white border-b border-slate-900" id="features-section">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-extrabold uppercase tracking-widest inline-block">
              One QR. Four Powerful Features.
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4">
              Everything Your Tables Need to Work Smarter
            </h2>
          </div>

          {/* 4 Cards - Simple & High Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-yellow-500/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-yellow-500/10 text-[#facc15] rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                  ⭐
                </div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Get More Google Reviews
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  Help satisfied guests leave authentic Google reviews in seconds.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-yellow-500/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                  🚨
                </div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Private Guest Feedback
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  Give unhappy guests a simple way to tell you what went wrong while they're still in your restaurant.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-yellow-500/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                  💳
                </div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Request the Check
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  Guests can ask for the bill instantly without waiting.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-yellow-500/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                  🙋
                </div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Call a Server
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
                  Guests can discreetly request assistance with one tap.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => openCheckout('yearly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-2 uppercase tracking-wider"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="py-20 sm:py-28 bg-slate-950 text-slate-100 px-4 border-b border-slate-900" id="problem">
        <div className="max-w-4xl mx-auto">
          
          <div className="border-l-4 border-rose-600 pl-6 space-y-6">
            <p className="text-xs font-black text-rose-500 uppercase tracking-widest leading-none">
              THE HARD REALITY
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Every Bad Review Starts With One Unhappy Guest.
            </h2>

            <div className="text-sm sm:text-lg text-slate-300 space-y-4 font-light leading-relaxed">
              <p className="font-semibold text-white">Most guests won't complain.</p>
              <p className="text-rose-400 font-bold">They'll simply leave.</p>
              <p className="font-bold text-white uppercase text-xl">Then they'll write a negative review later.</p>
              <p className="text-slate-400 font-semibold">By then... it's too late.</p>
              
              <p className="border-y border-slate-800 py-4 text-slate-300 font-medium">
                RADAR 360 helps your team identify unhappy guests while they're still dining—giving you a chance to respond before the experience is over.
              </p>
            </div>
          </div>

          {/* VISUAL TIMELINE GRAPHIC */}
          <div className="mt-12 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">
              THE SERVICE RECOVERY TIMELINE
            </h4>

            {/* Responsive Flex timeline */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              
              <div className="flex-1 text-center bg-slate-950 p-4 rounded-xl border border-slate-800 w-full">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">1. Arrive</span>
                <p className="text-[11px] text-slate-500 mt-1">Guest arrives</p>
              </div>

              <div className="text-slate-600 font-bold hidden md:block">→</div>

              <div className="flex-1 text-center bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 w-full">
                <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider block">2. Friction</span>
                <p className="text-[11px] text-rose-300 mt-1">Bad experience</p>
              </div>

              <div className="text-slate-600 font-bold hidden md:block">→</div>

              <div className="flex-1 text-center bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 w-full">
                <span className="text-xs font-extrabold text-[#facc15] uppercase tracking-wider block">3. Intercept</span>
                <p className="text-[11px] text-[#facc15]/80 mt-1">Private feedback</p>
              </div>

              <div className="text-slate-600 font-bold hidden md:block">→</div>

              <div className="flex-1 text-center bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 w-full">
                <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider block">4. Recover</span>
                <p className="text-[11px] text-indigo-300 mt-1">Staff responds</p>
              </div>

              <div className="text-slate-600 font-bold hidden md:block">→</div>

              <div className="flex-1 text-center bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 w-full">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block">5. Happy</span>
                <p className="text-[11px] text-emerald-300 mt-1">Happier guest</p>
              </div>

              <div className="text-slate-600 font-bold hidden md:block">→</div>

              <div className="flex-1 text-center bg-slate-950 p-4 rounded-xl border border-slate-800 w-full">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">6. Promote</span>
                <p className="text-[11px] text-slate-500 mt-1">Optional public review</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200" id="how-it-works">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
            Set Up in Under 5 Minutes
          </h2>

          {/* Stepper with down arrows */}
          <div className="mt-12 space-y-6 max-w-xl mx-auto text-left">
            
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-[#facc15] font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Print your QR code</h4>
                <p className="text-xs text-slate-500 mt-1">Instantly generate high-resolution print-ready materials from your dashboard.</p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-[#facc15] font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Place it on every table</h4>
                <p className="text-xs text-slate-500 mt-1">Elegant, minimalist layout cards that fit naturally onto tables, bar tops, or checkout registers.</p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-[#facc15] font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Guests scan it</h4>
                <p className="text-xs text-slate-500 mt-1">No app needed. Guests scan with any default smartphone camera to unlock fast assistance.</p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-[#facc15] font-bold flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">You receive real-time notifications</h4>
                <p className="text-xs text-slate-500 mt-1">Instant server notifications and manager dashboard logs highlight exact table needs.</p>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#facc15] text-[#0f172a] font-bold flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900">Satisfied guests choice</h4>
                <p className="text-xs text-slate-500 mt-1">Happy guests are guided dynamically to leave an official 5-star Google review.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 sm:py-28 bg-white text-slate-900 border-b border-slate-200" id="benefits">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
              BENEFITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Why Restaurant Owners Choose RADAR 360
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "More 5-Star Reviews",
              "Better Guest Experience",
              "Faster Service",
              "Happier Customers",
              "More Returning Guests",
              "Protect Your Online Reputation",
              "Instant Manager Alerts",
              "Works With Every Restaurant"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                  ✔
                </div>
                <span className="text-sm font-bold text-slate-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECONDARY DASHBOARD SECTION WITH BULLETS ONLY */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white border-b border-slate-950" id="dashboard-detail">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs text-[#facc15] font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full">
                DASHBOARD
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Everything You Need in One Dashboard.
              </h2>
              
              <ul className="space-y-4 text-slate-300 text-sm sm:text-base font-medium pt-4">
                <li className="flex items-center gap-3">
                  <span className="text-[#facc15] text-lg">•</span> Live table notifications
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#facc15] text-lg">•</span> Guest feedback
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#facc15] text-lg">•</span> Google review tracking
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#facc15] text-lg">•</span> Restaurant analytics
                </li>
              </ul>
            </div>

            {/* Simulated HUGE dashboard visual */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#facc15]" />
                  <span className="text-xs font-black tracking-wider uppercase text-slate-400">SHIFTS STATUS</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold uppercase">LIVE FEED ACTIVE</span>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Mesa 4</span>
                    <p className="font-extrabold text-[#facc15] mt-0.5">Rating: ⭐⭐⭐⭐⭐</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Redirecting to Google</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Mesa 2</span>
                    <p className="font-extrabold text-rose-400 mt-0.5">Alert: Unhappy Guest (Meat Cold)</p>
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono bg-rose-500/10 px-1.5 py-0.5 rounded font-bold">SMS Sent</span>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Mesa 1</span>
                    <p className="font-extrabold text-blue-400 mt-0.5">Request: Bill / Check requested</p>
                  </div>
                  <span className="text-[10px] text-blue-400 font-mono">Pending response</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE QR CODE SECTION WITH DIAGRAM / ARROWS */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200" id="qr-diagram">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
            THE QR CODE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3">
            One QR. Multiple Ways to Improve the Guest Experience.
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-16">
            A single physical code, custom-printed for every table, opens four responsive channels designed for fast action.
          </p>

          {/* Interactive or Beautiful Layout with a central QR and four branches */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-3xl mx-auto">
            
            {/* Left branch */}
            <div className="space-y-6 text-center lg:text-right">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow transition-shadow">
                <span className="text-lg">⭐</span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-2">Leave a Review</h4>
                <p className="text-[11px] text-slate-500 mt-1">Direct link to Google Reviews for your highly satisfied tables.</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow transition-shadow">
                <span className="text-lg">💬</span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-2">Private Feedback</h4>
                <p className="text-[11px] text-slate-500 mt-1">Privately route complaints to managers before they write a review.</p>
              </div>
            </div>

            {/* Central QR display */}
            <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-slate-300 rounded-3xl shadow-inner relative">
              <div className="bg-slate-900 p-4 rounded-2xl">
                <QrCode className="w-24 h-24 text-[#facc15]" />
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-3.5 font-bold font-mono">SCAN MESA 12</span>
            </div>

            {/* Right branch */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow transition-shadow">
                <span className="text-lg">💳</span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-2">Request Check</h4>
                <p className="text-[11px] text-slate-500 mt-1">Allows guests to notify server that they wish to pay their bill immediately.</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow transition-shadow">
                <span className="text-lg">🙋</span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-2">Call Server</h4>
                <p className="text-[11px] text-slate-500 mt-1">Discreetly alerts waiter that the table requires custom attention.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHO IS IT FOR SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200" id="para-quien">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
            WHO IS IT FOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-8">
            Built for Restaurants That Care About Guest Experience
          </h2>

          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            PERFECT FOR
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 max-w-4xl mx-auto text-center font-bold text-xs uppercase text-slate-800">
            {[
              "Restaurants", "Pizzerias", "Steakhouses", "Sushi Bars", "Cafés", "Coffee Shops", "Bars", "Food Trucks", "Hotels"
            ].map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 py-4 px-2 rounded-xl text-[10px] tracking-tight truncate shadow-sm">
                {v}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200" id="resultados">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
            RESULTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-8">
            What Can You Expect?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            {[
              { t: "More Google Reviews", d: "Instantly grow authentic 5-star digital listings with easy customer guides." },
              { t: "Better Online Reputation", d: "Protect local search visibility and catch potential bad ratings at source." },
              { t: "Faster Staff Response", d: "Alert servers directly with precise live table request notifications." },
              { t: "Higher Customer Satisfaction", d: "Provide tables with flexible channels to request checks or servers." },
              { t: "More Repeat Guests", d: "Improve overall customer loyalty by treating dining friction on the floor." },
              { t: "Less Guesswork", d: "Analyze exact server speeds, ratings, and shifts using robust reports." }
            ].map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <span className="text-[#facc15] text-lg font-black mr-1.5">✓</span>
                <span className="font-extrabold text-slate-900 text-sm">{v.t}</span>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{v.d}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200" id="pricing">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
            PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 mb-10">
            Simple Pricing
          </h2>

          {/* Predictable USA subscription card */}
          <div className="max-w-md mx-auto border-4 border-[#facc15] bg-slate-950 text-white rounded-3xl p-8 text-left shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#facc15] text-[#0f172a] text-xs font-black tracking-widest px-4 py-1 rounded-full uppercase">
              POPULAR
            </div>

            <span className="text-xs font-black uppercase tracking-wider text-[#facc15] block">RADAR 360 PRO PLAN</span>
            <h3 className="font-black text-white text-3xl mt-1">Everything Included</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">Predictable subscription plan with all features enabled.</p>
            
            <div className="py-6 my-6 border-y border-slate-900 flex flex-col gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-[#facc15] font-mono">$19.99</span>
                <span className="text-xs text-yellow-500/90 font-medium">USD / month (Monthly Plan)</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-[#facc15] font-mono">$199.99</span>
                <span className="text-xs text-yellow-500/90 font-medium">USD / year (Annual Plan - Save $39.89!)</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300 leading-normal mb-8">
              <li className="flex items-center gap-2"><span className="text-[#facc15] font-black">✓</span> Unlimited Tables</li>
              <li className="flex items-center gap-2"><span className="text-[#facc15] font-black">✓</span> Unlimited QR Codes</li>
              <li className="flex items-center gap-2"><span className="text-[#facc15] font-black">✓</span> Unlimited Reviews</li>
              <li className="flex items-center gap-2"><span className="text-[#facc15] font-black">✓</span> Unlimited Guest Feedback</li>
              <li className="flex items-center gap-2"><span className="text-[#facc15] font-black">✓</span> Unlimited Notifications</li>
              <li className="flex items-center gap-2"><span className="text-[#facc15] font-black">✓</span> Restaurant Dashboard</li>
            </ul>

            <div className="space-y-3">
              <button
                onClick={() => openCheckout('monthly')}
                className="w-full bg-slate-900 hover:bg-slate-850 text-[#facc15] border-2 border-[#facc15] font-black text-xs py-3.5 px-4 rounded-full transition-all text-center uppercase tracking-tight cursor-pointer shadow-md"
              >
                Monthly Subscription ($19.99 USD)
              </button>
              <button
                onClick={() => openCheckout('yearly')}
                className="w-full bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold py-4 rounded-full text-xs uppercase tracking-wider transition-all text-center cursor-pointer shadow-lg active:scale-95"
              >
                Annual Subscription ($199.99 USD)
              </button>
              <p className="text-center text-[10px] text-slate-500 font-medium mt-2">
                30-day money-back guarantee • Cancel anytime
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* GUARANTEE SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-b border-slate-200" id="garantia">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
            GUARANTEE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
            Try RADAR 360 Risk-Free
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed">
            Start using RADAR 360 today. If it's not a good fit, cancel anytime.
          </p>

          <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              { t: "No contracts", d: "Cancel at any point." },
              { t: "No installation fees", d: "Standard cloud web setup." },
              { t: "No hidden costs", d: "Flat monthly billing plan." }
            ].map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm col-span-2 sm:col-span-1">
                <span className="text-[#facc15] text-xs font-black mr-1">✓</span>
                <span className="font-extrabold text-slate-800 text-xs">{v.t}</span>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{v.d}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 sm:py-28 bg-slate-950 text-white border-b border-slate-900" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base cursor-pointer hover:bg-slate-850/50"
                >
                  <span>{item.q}</span>
                  <ChevronRight className={`w-4 h-4 text-[#facc15] transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-5 pt-0 border-t border-slate-800 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technical Support and Contact Information */}
          <div className="text-center mt-12 bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Guaranteed 24/7 Technical Support
            </div>
            <p className="text-slate-300 text-xs sm:text-sm font-semibold max-w-md mx-auto">
              Have any questions or issues? Contact us immediately at any time:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Direct Email */}
              <a
                href="mailto:radar360negociosgastronomicos@gmail.com"
                className="flex flex-col items-center justify-center p-5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-2xl transition-all hover:border-slate-700 hover:scale-[1.02] group"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2 text-[#facc15] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Direct Email</span>
                <span className="text-xs text-[#facc15] font-mono mt-1 select-all break-all text-center">
                  radar360negociosgastronomicos@gmail.com
                </span>
              </a>

              {/* WhatsApp Contact */}
              <a
                href="https://wa.me/5492613601613"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-2xl transition-all hover:border-green-500/30 hover:scale-[1.02] group"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-2 text-green-400 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.486 0 9.95-4.46 9.954-9.952 0-2.659-1.034-5.159-2.912-7.038C16.538 1.737 14.043.743 11.383.743c-5.491 0-9.957 4.464-9.96 9.957-.001 1.614.425 3.19 1.233 4.595L1.58 20.694l5.067-1.33c1.397.763 2.946 1.168 4.514 1.168h.001zm11.353-7.054c-.302-.15-1.78-.879-2.056-.979-.275-.1-.476-.15-.676.15-.2.3-.777.979-.952 1.178-.175.2-.351.224-.653.075-.302-.15-1.274-.469-2.427-1.496-.897-.8-1.502-1.787-1.678-2.087-.175-.3-.019-.461.13-.611.135-.134.302-.35.453-.524.151-.175.201-.3.302-.5.101-.2.05-.376-.025-.526-.075-.15-.676-1.629-.926-2.228-.244-.588-.492-.507-.676-.516-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.801.376-.275.3-1.053 1.028-1.053 2.507s1.077 2.903 1.228 3.102c.15.2 2.119 3.235 5.132 4.534.717.31 1.275.494 1.71.633.721.23 1.377.198 1.896.12.578-.088 1.78-.728 2.03-1.429.25-.7.25-1.3.175-1.43-.075-.13-.275-.205-.577-.355z" />
                  </svg>
                </div>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp Support</span>
                <span className="text-xs text-green-400 font-mono mt-1 whitespace-nowrap select-all text-center">
                  +54 9 261 360-1613
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LAST SECTION */}
      <section className="py-20 sm:py-32 bg-slate-50 text-slate-900 text-center px-4 relative overflow-hidden" id="cierre">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          
          <span className="bg-yellow-500/10 text-yellow-855 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
            TAKE ACTION
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Every Guest Interaction Matters.
          </h2>

          <p className="text-base sm:text-xl text-slate-650 font-normal max-w-2xl mx-auto leading-relaxed">
            Every satisfied guest can become a loyal customer. Every unhappy guest is an opportunity to improve. Don't wait until a bad review tells you something went wrong.
          </p>

          <div className="pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => openCheckout('monthly')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-[#facc15] border-2 border-[#facc15] font-black text-xs px-8 py-4.5 rounded-full shadow-lg transition-all uppercase tracking-tight cursor-pointer"
              >
                Monthly Plan ($19.99 USD)
              </button>
              <button
                onClick={() => openCheckout('yearly')}
                className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-10 py-5 rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase cursor-pointer"
              >
                Annual Plan ($199.99 USD)
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-10 px-4 border-t border-slate-900 text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="font-bold text-[11px] text-slate-400 uppercase tracking-widest">
            RADAR 360 USA
          </p>
          <p className="max-w-md mx-auto text-[10px] text-slate-600 leading-relaxed">
            We build high-converting customer relationship and review-capture solutions for restaurants, cafés, and food trucks across the USA.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] text-[#facc15] font-semibold pt-2">
            <a href="#hero" className="hover:underline">Home</a>
            <span>•</span>
            <a href="#features-section" className="hover:underline">Features</a>
            <span>•</span>
            <a href="#pricing" className="hover:underline">Pricing</a>
          </div>
        </div>
      </footer>

      {/* LEADS DEMO DRAWER */}
      <div className="fixed bottom-4 right-4 z-40 font-sans">
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-3xl overflow-hidden transition-all duration-350 text-left ${
          showAdminPanel ? 'w-80 h-96' : 'w-12 h-12 rounded-full'
        }`}>
          {showAdminPanel ? (
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-black text-[#facc15] uppercase tracking-widest flex items-center gap-1.5">
                  DEMO LEADS PANEL ({localLeads.length})
                </span>
                <button 
                  onClick={() => setShowAdminPanel(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Leads List */}
              <div className="flex-1 overflow-y-auto py-2.5 space-y-2 pr-1 text-xs text-slate-300">
                {localLeads.length > 0 ? (
                  localLeads.map((ld) => (
                    <div key={ld.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <p className="font-extrabold text-white flex justify-between">
                        <span>{ld.businessName}</span>
                        <span className="text-[9px] text-slate-950 bg-[#facc15] px-1 rounded uppercase font-bold">{ld.plan}</span>
                      </p>
                      <p className="text-[10px] text-slate-350">By: {ld.ownerName}</p>
                      <p className="text-[9.5px] font-mono">Email: {ld.email}</p>
                      <p className="text-[9.5px] font-mono">Phone: {ld.phone}</p>
                      <p className="text-[8px] text-slate-500 text-right pt-1">{ld.timestamp}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center text-[11px] leading-relaxed py-10">
                    <p>No test registrations yet.</p>
                    <p className="text-slate-600 mt-1">Submit the Start Free Trial form to see demo logs here.</p>
                  </div>
                )}
              </div>

              {/* Clear button */}
              {localLeads.length > 0 && (
                <button 
                  onClick={clearLeads}
                  className="w-full bg-rose-600/15 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-rose-300 text-[10px] py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 leading-none uppercase font-extrabold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Logs
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAdminPanel(true)}
              className="w-full h-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#facc15] hover:border-yellow-500/35 rounded-full flex items-center justify-center transition-colors cursor-pointer relative"
              title="View demo leads"
            >
              <Users className="w-5 h-5" />
              {localLeads.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#facc15] text-[8.5px] font-black text-slate-950 flex items-center justify-center leading-none">
                    {localLeads.length}
                  </span>
                </span>
              )}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
