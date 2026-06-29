import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Check, 
  ArrowRight, 
  Flame, 
  BadgeHelp, 
  Briefcase, 
  MessageSquare, 
  Smartphone, 
  Gift, 
  Compass, 
  ChevronRight, 
  Building2, 
  HeartHandshake, 
  Share2, 
  ThumbsUp, 
  Trash2,
  Globe
} from 'lucide-react';
import { Lead } from './types';
import { translations } from './translations';

// Importing our high-fidelity modular components
import ReviewSimulator from './components/ReviewSimulator';
import FaqSection from './components/FaqSection';
import LeadModal from './components/LeadModal';
import OwnerDashboard from './components/OwnerDashboard';
import LoginModal from './components/LoginModal';
import DinerScreen from './components/DinerScreen';
import LandingEn from './components/LandingEn';

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored === 'es' || stored === 'en') return stored;
    }
    return 'en';
  });

  const handleSetLang = (newLang: 'es' | 'en') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const simulateTable = params.get('simulate_table');
  const bizName = params.get('biz');

  if (simulateTable) {
    return (
      <DinerScreen 
        tableNumber={simulateTable} 
        businessName={bizName || 'Otra Vuelta Mza'} 
        lang={lang}
      />
    );
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [modalDefaultPlan, setModalDefaultPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [demoEmail, setDemoEmail] = useState<string>('');
  const [demoBusinessName, setDemoBusinessName] = useState<string>('');
  
  // Leads list for demo visibility
  const [localLeads, setLocalLeads] = useState<Lead[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [showOwnerDashboard, setShowOwnerDashboard] = useState<boolean>(false);

  // Load leads from localStorage for presentation
  const loadLeads = () => {
    const stored = localStorage.getItem('radar_leads');
    if (stored) {
      try {
        setLocalLeads(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadLeads();
    // Watch for the custom notification trigger event from the modal
    const handleLeadAdded = () => {
      loadLeads();
    };
    window.addEventListener('radar_lead_added', handleLeadAdded);
    return () => {
      window.removeEventListener('radar_lead_added', handleLeadAdded);
    };
  }, []);

  const clearLeads = () => {
    localStorage.removeItem('radar_leads');
    setLocalLeads([]);
  };

  const openCheckout = (preferredPlan: 'monthly' | 'yearly') => {
    setModalDefaultPlan(preferredPlan);
    setIsModalOpen(true);
  };

  if (showOwnerDashboard) {
    return (
      <OwnerDashboard 
        onBackToLanding={() => setShowOwnerDashboard(false)}
        registeredBusinessName={demoBusinessName || localLeads[0]?.businessName || 'Otra Vuelta Mza'}
        registeredOwnerEmail={demoEmail || localLeads[0]?.email || 'otravueltamza@gmail.com'}
      />
    );
  }

  if (lang === 'en') {
    return (
      <>
        <LandingEn 
          openCheckout={openCheckout}
          setIsLoginOpen={setIsLoginOpen}
          handleSetLang={handleSetLang}
          localLeads={localLeads}
          showAdminPanel={showAdminPanel}
          setShowAdminPanel={setShowAdminPanel}
          clearLeads={clearLeads}
          demoBusinessName={demoBusinessName}
          demoEmail={demoEmail}
          onLaunchDemo={(email, businessName) => {
            setDemoEmail(email);
            setDemoBusinessName(businessName);
            setShowOwnerDashboard(true);
          }}
        />
        <LeadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          defaultPlan={modalDefaultPlan} 
          onEnterDashboard={() => setShowOwnerDashboard(true)}
          lang={lang}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(email, businessName) => {
            setDemoEmail(email);
            setDemoBusinessName(businessName);
            setShowOwnerDashboard(true);
          }}
          lang={lang}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b13] text-[#f8fafc] font-sans antialiased selection:bg-[#facc15] selection:text-[#0f172a]">
      
      {/* TOP DECORATIVE GLOBAL FLOATING STATUS BAR */}
      <div className="bg-[#0f172a] text-[#facc15] text-center py-2 px-4 text-[11px] sm:text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-md">
        <Flame className="w-4 h-4 fill-[#facc15] animate-bounce shrink-0" />
        <span>{t.promoBanner}</span>
      </div>

      {/* FIXED FLOATING NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/43cbHpBH/logo-sin-fondo.png" 
              alt="RADAR 360 Logo" 
              className="h-10 sm:h-12 w-auto object-contain shrink-0 filter drop-shadow-sm cursor-pointer" 
              style={{ imageRendering: 'auto' }}
              referrerPolicy="no-referrer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="#simulador-en-vivo" 
              className="hidden md:inline-block text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t.headerDemoLink}
            </a>

            <a 
              href="#faq-section" 
              className="hidden sm:inline-block text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t.headerFaqLink}
            </a>

            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-2 py-1 cursor-pointer"
            >
              {t.headerLogin}
            </button>

            {/* Language logo & switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-[10px] font-black shrink-0 shadow-sm">
              <button
                onClick={() => handleSetLang('es')}
                className={`px-2 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'es'
                    ? 'bg-[#facc15] text-[#0f172a] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Español"
              >
                <span>🇪🇸</span>
                <span className="hidden xs:inline">ES</span>
              </button>
              <button
                onClick={() => handleSetLang('en')}
                className={`px-2 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#facc15] text-[#0f172a] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="English"
              >
                <span>🇺🇸</span>
                <span className="hidden xs:inline">EN</span>
              </button>
            </div>

            <button
              onClick={() => openCheckout('monthly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-full transition-all shadow-md shadow-yellow-500/15 active:scale-95 cursor-pointer uppercase tracking-wider shrink-0"
            >
              {t.headerCta}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - LIGHT PREMIUM BACKGROUND FOR HIGH VISIBILITY */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 px-4 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200" id="hero">
        {/* Soft elegant warm glow decorations */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          
          {/* Main App Logo */}
          <div className="flex justify-center -mb-2 sm:mb-2 motion-safe:animate-fade-in">
            <img 
              src="https://i.postimg.cc/43cbHpBH/logo-sin-fondo.png" 
              alt="RADAR 360 Logo" 
              className="h-28 sm:h-36 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] transform hover:scale-[1.03] transition-transform duration-300" 
              style={{ imageRendering: 'auto' }}
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-800 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border border-yellow-500/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-700" /> {t.heroTagline}
          </div>

          {/* Core Title (Supplied Copy with theme styling) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto font-sans">
            {t.heroHeadingStart}<span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/40">{t.heroHeadingHighlight}</span>{t.heroHeadingEnd}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-700 font-medium max-w-3xl mx-auto leading-relaxed">
            {t.heroSubheading}
          </p>

          {/* Additional Positioning Statement */}
          <p className="text-xs sm:text-sm text-slate-500 font-semibold italic border-y border-slate-200 py-3.5 max-w-2xl mx-auto">
            {t.heroQuote}
          </p>

          {/* Key Quick Benefit Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-4 max-w-3xl mx-auto">
            {[
              { text: t.heroBadge1, icon: '⚡' },
              { text: t.heroBadge2, icon: '🛡️' },
              { text: t.heroBadge3, icon: '📱' },
              { text: t.heroBadge4, icon: '🔌' },
            ].map((badge, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm border border-slate-200/80 p-3 rounded-2xl flex items-center justify-center gap-2 text-slate-800 shadow-sm hover:shadow transition-shadow">
                <span className="text-sm">{badge.icon}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Immediate CTA triggers */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openCheckout('yearly')}
              className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm tracking-widest cursor-pointer uppercase flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <span>{t.heroCtaPrimary}</span>
              <ArrowRight className="w-4 h-4 shrink-0 font-bold" />
            </button>
            <a
              href="#simulador-en-vivo"
              className="w-full sm:w-auto bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-8 py-4 rounded-full transition-all text-xs sm:text-sm cursor-pointer text-center block shadow-sm hover:shadow"
            >
              {t.heroCtaDemo}
            </a>
          </div>

          {/* High Context Trust Ticker */}
          <div className="pt-4 flex items-center justify-center gap-6 text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              {t.heroTrustAlerts}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {t.heroTrustSatisfaction}
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 2: WHAT WILL YOU UNLOCK? - PREMIUM DARK SLATE LAYOUT */}
      <section className="py-20 sm:py-28 bg-[#0b0f19] text-white border-y border-slate-900 relative overflow-hidden" id="beneficios">
        
        {/* Soft background pattern for dark contrast focus */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-extrabold uppercase tracking-widest inline-block">
              {t.unlockTagline}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-4">
              {t.unlockHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
              {t.unlockSubheading}
            </p>
          </div>

          {/* 5 Blocks of Copy Organised Dynamically */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Block 1 */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-yellow-500/10 text-[#facc15] rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  📱
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                  {t.feature1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
                  {t.feature1Desc}
                </p>
              </div>
              <div className="text-[11px] font-bold text-[#facc15] mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.feature1Badge}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 2 */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  ⭐
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                  {t.feature2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
                  {t.feature2Desc}
                </p>
              </div>
              <div className="text-[11px] font-bold text-blue-400 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.feature2Badge}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 3 */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  🖥️
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                  {t.feature3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
                  {t.feature3Desc}
                </p>
              </div>
              <div className="text-[11px] font-bold text-indigo-400 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.feature3Badge}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 4 */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between md:col-span-1 lg:col-span-1">
              <div>
                <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  🚨
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                  {t.feature4Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
                  {t.feature4Desc}
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-400 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.feature4Badge}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 5 */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  📊
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                  {t.feature5Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
                  {t.feature5Desc}
                </p>
              </div>
              <div className="text-[11px] font-bold text-amber-400 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>{t.feature5Badge}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

          </div>

          {/* Small Intermediary Call-to-action under features */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => openCheckout('yearly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t.unlockCta}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>
      </section>

      {/* INTERACTIVE DEMO SANDBOX AREA (Alternating Light background) */}
      <section className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200 px-4" id="simulador-en-vivo">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
                {t.demoTagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t.demoHeading}
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed font-normal">
                {t.demoDesc}
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-amber-655 font-black">✓</span> {t.demoCheck1}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-655 font-black">✓</span> {t.demoCheck2}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-655 font-black">✓</span> {t.demoCheck3}
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              {/* Loaded simulator */}
              <ReviewSimulator 
                lang={lang}
                onLaunchDemo={(email, businessName) => {
                  setDemoEmail(email);
                  setDemoBusinessName(businessName);
                  setShowOwnerDashboard(true);
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: THE DEEP PAIN OF GASTRONOMY (Fondo oscuro Slate-950) */}
      <section className="py-20 sm:py-32 bg-slate-950 text-slate-100 border-t border-slate-900 px-4" id="la-realidad">
        <div className="max-w-4xl mx-auto text-left relative">
          
          {/* Aesthetic background accent */}
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 sm:space-y-8 relative z-10 border-l-4 border-rose-600 pl-6 sm:pl-10">
            
            <p className="text-xs sm:text-sm font-black text-rose-500 uppercase tracking-widest leading-none">
              {t.realityTagline}
            </p>

            {/* Primary Headline (Supplied Copy) */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              {t.realityHeading}
            </h2>

            {/* Core Emotional Text provided */}
            <div className="text-sm sm:text-lg text-slate-300 space-y-4 font-light leading-relaxed">
              <p className="font-semibold text-white">{t.realityQuote}</p>
              <p>{t.realityLine1}</p>
              <p className="text-rose-400 font-bold">{t.realityLine2}</p>
              <p className="font-bold text-white uppercase text-xl">{t.realityLine3}</p>
              <p>{t.realityLine4}</p>
              <p className="italic bg-rose-955/20 border border-rose-900/25 p-3 rounded-xl text-slate-300">
                {t.realityQuoteBox}
              </p>
              <p>{t.realityLine5}</p>
              <p>{t.realityLine6}</p>
              <p className="text-rose-400 font-semibold">{t.realityLine7}</p>
              <p>{t.realityLine8}</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-400 font-medium pl-4 list-disc">
                {t.realityList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <p className="font-bold text-rose-400 pt-1">{t.realityLine9}</p>
              <p className="text-white text-base font-semibold">{t.realityLine10}</p>
              
              {/* Resolution copy */}
              <div className="mt-8 bg-slate-900 p-5 rounded-2xl border border-slate-850/80 space-y-3.5 text-slate-200">
                <p className="font-extrabold text-[#facc15] text-base sm:text-lg">
                  {t.realityBoxHeading}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {t.realityBoxDesc1}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {t.realityBoxDesc2}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center text-[10px] sm:text-xs font-black text-white uppercase pt-4 w-full">
                <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-xl">{t.realityBadge1}</div>
                <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-xl">{t.realityBadge2}</div>
                <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-xl">{t.realityBadge3}</div>
              </div>

            </div>

          </div>

          <div className="mt-12 text-center sm:text-left">
            <button
              onClick={() => openCheckout('yearly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-8 py-4 rounded-full shadow-lg shadow-yellow-500/15 transition-all text-xs sm:text-sm uppercase cursor-pointer"
            >
              {t.realityCta}
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: TARGET AUDIENCE (¿PARA QUIÉN ES ESTO?) - LIGHT COHESIVE THEME */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 px-4 border-t border-slate-200/80" id="audiencia">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
              {t.audienceTagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.audienceHeading}
            </h2>
          </div>

          {/* Persona Targets provided in copy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <div className="text-2xl">🏨</div>
              <h3 className="font-extrabold text-slate-900 text-base">{t.audienceTitle1}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {t.audienceDesc1}
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <div className="text-2xl">🧑‍💼</div>
              <h3 className="font-extrabold text-slate-900 text-base">{t.audienceTitle2}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {t.audienceDesc2}
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <div className="text-2xl">👔</div>
              <h3 className="font-extrabold text-slate-900 text-base">{t.audienceTitle3}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {t.audienceDesc3}
              </p>
            </div>

          </div>

          {/* Section Refuerzo Copy provided */}
          <div className="bg-white text-slate-900 p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 text-left relative overflow-hidden shadow-md mt-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] bg-yellow-500/10 text-yellow-850 border border-yellow-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider block w-max">
              {t.audienceQuoteTag}
            </span>
            <blockquote className="mt-4 text-amber-900 font-black text-base sm:text-lg leading-relaxed">
              {t.audienceQuote}
            </blockquote>
          </div>

        </div>
      </section>

      {/* SECTION 6: WHAT TO EXPECT (¿QUÉ PUEDES ESPERAR?) - LIGHT THEMATIC */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 px-4 border-t border-slate-200/80" id="expectativa">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-extrabold uppercase tracking-widest inline-block">
              {t.expectTagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.expectHeading}
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              {t.expectDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Expectation 1 */}
            <div className="text-left space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-lg bg-[#facc15] text-[#0f172a] w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">
                1
              </div>
              <h3 className="font-extrabold text-slate-1000 text-[15px] sm:text-base leading-snug">
                {t.expectTitle1}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                {t.expectDesc1}
              </p>
            </div>

            {/* Expectation 2 */}
            <div className="text-left space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-lg bg-[#facc15] text-[#0f172a] w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">
                2
              </div>
              <h3 className="font-extrabold text-slate-1000 text-[15px] sm:text-base leading-snug">
                {t.expectTitle2}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                {t.expectDesc2}
              </p>
            </div>

            {/* Expectation 3 */}
            <div className="text-left space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-lg bg-[#facc15] text-[#0f172a] w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">
                3
              </div>
              <h3 className="font-extrabold text-slate-1000 text-[15px] sm:text-base leading-snug">
                {t.expectTitle3}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                {t.expectDesc3}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: PRICING COMPARISON & GRAND SUMMARY TABLE */}
      <section className="py-20 sm:py-32 bg-slate-50 text-slate-900 px-4 border-t border-slate-200/80" id="precios">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Headline "HAZ CUENTAS..." as provided */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
              {t.pricingTagline}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {t.pricingHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-650 font-normal">
              {t.pricingSubheading}
            </p>
          </div>

          {/* Pricing grid table provided */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Alt 1: Consultoria */}
            <div className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-sm">
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-amber-700">{t.pricingAlt1Tag}</dt>
                <dd className="font-extrabold text-slate-900 text-xl mt-2">{t.pricingAlt1Title}</dd>
                <p className="text-xs text-slate-500 mt-1 font-mono">{t.pricingAlt1CostLabel}</p>
                
                <div className="py-4 my-4 border-y border-slate-100 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{t.pricingAlt1Price}</span>
                  <span className="text-base text-slate-400">{t.pricingAlt1Range}</span>
                  <span className="text-2xl font-black text-slate-900">$3,000</span>
                  <span className="text-xs text-slate-500 font-medium">{t.pricingAlt1Unit}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {t.pricingAlt1Bullet1}</li>
                  <li>• {t.pricingAlt1Bullet2}</li>
                  <li>• {t.pricingAlt1Bullet3}</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-500 font-medium pt-4 mt-6 border-t border-slate-100">
                {t.pricingAlt1Footer}
              </p>
            </div>

            {/* Alt 2: Software convencional */}
            <div className="border border-slate-200 bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-sm">
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-amber-700">{t.pricingAlt2Tag}</dt>
                <dd className="font-extrabold text-slate-900 text-xl mt-2">{t.pricingAlt2Title}</dd>
                <p className="text-xs text-slate-500 mt-1 font-mono">{t.pricingAlt2CostLabel}</p>
                
                <div className="py-4 my-4 border-y border-slate-100 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{t.pricingAlt2Price}</span>
                  <span className="text-base text-slate-400">{t.pricingAlt2Range}</span>
                  <span className="text-2xl font-black text-slate-900">$500</span>
                  <span className="text-xs text-slate-500 font-medium">{t.pricingAlt2Unit}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {t.pricingAlt2Bullet1}</li>
                  <li>• {t.pricingAlt2Bullet2}</li>
                  <li>• {t.pricingAlt2Bullet3}</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-500 font-medium pt-4 mt-6 border-t border-slate-100">
                {t.pricingAlt2Footer}
              </p>
            </div>

            {/* Alt 3: Our offer (GRAND HIGHLIGHT CARD) */}
            <div className="border-4 border-[#facc15] bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xl relative -translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#facc15] text-[#0f172a] text-[10px] sm:text-xs font-black tracking-widest px-4 py-1 rounded-full uppercase shrink-0">
                {t.pricingAlt3Badge}
              </div>

              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-[#facc15]">{t.pricingAlt3Tag}</dt>
                <dd className="font-black text-white text-2xl sm:text-3xl mt-2">{t.pricingAlt3Title}</dd>
                <p className="text-xs text-slate-400 mt-1">{t.pricingAlt3CostLabel}</p>
                
                <div className="py-4 my-4 border-y border-slate-900 flex items-baseline gap-1">
                  <span className="text-xs text-slate-400 line-through mr-1 font-mono">{t.pricingAlt3PriceOld}</span>
                  <span className="text-3xl sm:text-4xl font-black text-[#facc15] font-mono">{t.pricingAlt3Price}</span>
                  <span className="text-xs text-yellow-500/90 font-medium">{t.pricingAlt3Unit}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-350 leading-normal">
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> {t.pricingAlt3Bullet1}</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> {t.pricingAlt3Bullet2}</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> {t.pricingAlt3Bullet3}</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> {t.pricingAlt3Bullet4}</li>
                  <li className="flex items-center gap-1.5 text-yellow-300 font-medium"><span className="text-[#facc15]">✓</span> {t.pricingAlt3Bullet5}</li>
                </ul>
              </div>

              <div className="pt-6 mt-6 space-y-3">
                <button
                  onClick={() => openCheckout('monthly')}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-[#facc15] border-2 border-[#facc15] font-black text-xs py-3.5 px-4 rounded-full transition-all text-center uppercase tracking-tight cursor-pointer shadow-md"
                >
                  {t.pricingAlt3CtaMonthly}
                </button>
                <button
                  onClick={() => openCheckout('yearly')}
                  className="w-full bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-black text-xs py-3.5 px-4 rounded-full shadow-lg transition-all text-center uppercase tracking-tight cursor-pointer"
                >
                  {t.pricingAlt3CtaYearly}
                </button>
                <p className="text-center text-[9px] text-slate-400 mt-2 font-medium">
                  {t.pricingAlt3Footer}
                </p>
              </div>
            </div>

          </div>

          {/* GRAND SUMMARY OF WHAT THEY TAKE */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-200 shadow-xl mt-12 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl sm:text-2xl font-black text-amber-800 uppercase tracking-tight">
                  {t.summaryHeading}
                </h3>
                
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-extrabold shrink-0 mt-0.5">✔</span>
                    <div>
                      <p className="font-extrabold text-slate-900">{t.summaryCheck1Title}</p>
                      <p className="text-slate-500 text-xs">{t.summaryCheck1Desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-extrabold shrink-0 mt-0.5">✔</span>
                    <div>
                      <p className="font-extrabold text-slate-900">{t.summaryCheck2Title}</p>
                      <p className="text-slate-500 text-xs">{t.summaryCheck2Desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-extrabold shrink-0 mt-0.5">✔</span>
                    <div>
                      <p className="font-extrabold text-slate-900">{t.summaryCheck3Title}</p>
                      <p className="text-slate-500 text-xs">{t.summaryCheck3Desc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-extrabold shrink-0 mt-0.5">🎁</span>
                    <div>
                      <p className="font-extrabold text-slate-900">{t.summaryCheck4Title}</p>
                      <p className="text-slate-500 text-xs">{t.summaryCheck4Desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Box with direct buttons */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-4">
                <p className="text-xs sm:text-sm text-slate-300">
                  {t.summaryBoxText}
                </p>
                <div className="space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest block font-bold">{t.summaryBoxTitle}</p>
                  <p className="text-[10px] text-yellow-500 font-medium">{t.summaryBoxSub}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => openCheckout('monthly')}
                    className="w-full bg-slate-950 hover:bg-slate-900 text-[#facc15] border border-slate-880 font-extrabold py-3.5 rounded-full text-xs shadow-md transition-all uppercase tracking-tight cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>{t.summaryBoxMonthly}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#facc15]" />
                  </button>

                  <button
                    onClick={() => openCheckout('yearly')}
                    className="w-full bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold py-4 rounded-full text-xs sm:text-sm shadow-xl transition-all uppercase tracking-tight cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>{t.summaryBoxYearly}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 font-extrabold text-slate-900" />
                  </button>
                </div>

                <p className="text-[9.5px] text-slate-400">
                  {t.summaryBoxFooter}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: QUESTIONS & ANSWERS (Deep dark background: FAQ) */}
      <FaqSection lang={lang} />

      {/* SECTION 10: CLOSING ARGUMENT */}
      <section className="py-20 sm:py-32 bg-slate-50 border-t border-slate-200 text-slate-900 text-center px-4 relative overflow-hidden" id="cierre">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          
          <span className="bg-yellow-500/10 text-yellow-850 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
            {t.closingTagline}
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.closingHeading}
          </h2>

          <p className="text-base sm:text-xl text-slate-650 font-normal max-w-2xl mx-auto">
            {t.closingSubheading}
          </p>

          <div className="max-w-xl mx-auto rounded-2xl bg-white border border-slate-200 p-5 space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed text-left shadow-sm">
            <p>
              {t.closingCardLine1}
            </p>
            <p>
              {t.closingCardLine2}
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <span className="block text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900 tracking-widest uppercase">
              {t.closingBtnLabel}
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => openCheckout('monthly')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-[#facc15] border-2 border-[#facc15] font-black text-xs px-8 py-4.5 rounded-full shadow-lg transition-all uppercase tracking-tight cursor-pointer"
              >
                {t.closingBtnMonthly}
              </button>
              <button
                onClick={() => openCheckout('yearly')}
                className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-10 py-5 rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase cursor-pointer"
              >
                {t.closingBtnYearly}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            {t.closingFooter}
          </p>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-10 px-4 border-t border-slate-900 text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="font-bold text-[11px] text-slate-400 uppercase tracking-widest">
            {t.footerText}
          </p>
          <p className="max-w-md mx-auto text-[10px] text-slate-600 leading-relaxed">
            Diseñamos soluciones tecnológicas con enfoque garantizado de conversión directa para restaurantes, cafeterías, bares e imperios gastronómicos. El uso de marcas de terceros (como Google My Business o WhatsApp) es con fines informativos de compatibilidad técnica.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] text-[#facc15] font-semibold pt-2">
            <a href="#hero" className="hover:underline">{t.footerMenuHome}</a>
            <span>•</span>
            <a href="#beneficios" className="hover:underline">{t.footerMenuBenefits}</a>
            <span>•</span>
            <a href="#cierre" className="hover:underline">{t.footerMenuSupport}</a>
          </div>
        </div>
      </footer>

      {/* LEADS DEMO VIEW COLLAPSIBLE DRAWER */}
      <div className="fixed bottom-4 right-4 z-40 font-sans">
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-3xl overflow-hidden transition-all duration-350 text-left ${
          showAdminPanel ? 'w-80 h-96' : 'w-12 h-12 rounded-full'
        }`}>
          {showAdminPanel ? (
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-black text-[#facc15] uppercase tracking-widest flex items-center gap-1.5">
                  {t.demoPanelTitle} ({localLeads.length})
                </span>
                <button 
                  onClick={() => setShowAdminPanel(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded cursor-pointer"
                >
                  {t.demoPanelClose}
                </button>
              </div>

              {/* Leads List */}
              <div className="flex-1 overflow-y-auto py-2.5 space-y-2 pr-1 text-xs">
                {localLeads.length > 0 ? (
                  localLeads.map((ld) => (
                    <div key={ld.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <p className="font-extrabold text-white flex justify-between">
                        <span>{ld.businessName}</span>
                        <span className="text-[9px] text-slate-950 bg-[#facc15] px-1 rounded uppercase font-bold">{ld.plan}</span>
                      </p>
                      <p className="text-[10px] text-slate-350">Por: {ld.ownerName}</p>
                      <p className="text-[9.5px] text-slate-405 font-mono">Mail: {ld.email}</p>
                      <p className="text-[9.5px] text-slate-405 font-mono">Tel: {ld.phone}</p>
                      <p className="text-[8px] text-slate-500 leading-none text-right pt-1">{ld.timestamp}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-550 text-center text-[11px] leading-relaxed py-10">
                    <p>{t.demoPanelNoLeads}</p>
                    <p className="text-slate-600 mt-1">{t.demoPanelHelper}</p>
                  </div>
                )}
              </div>

              {/* Clear button */}
              {localLeads.length > 0 && (
                <button 
                  onClick={clearLeads}
                  className="w-full bg-rose-600/15 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-rose-300 text-[10px] py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 leading-none uppercase font-extrabold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> {t.demoPanelClear}
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAdminPanel(true)}
              className="w-full h-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#facc15] hover:border-yellow-500/35 rounded-full flex items-center justify-center transition-colors cursor-pointer relative"
              title="Ver Leads de prueba"
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

      {/* CORE CAPTURE OVERLAY MODAL */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultPlan={modalDefaultPlan} 
        onEnterDashboard={() => setShowOwnerDashboard(true)}
        lang={lang}
      />

      {/* LOGIN OVERLAY MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email, businessName) => {
          setDemoEmail(email);
          setDemoBusinessName(businessName);
          setShowOwnerDashboard(true);
        }}
        lang={lang}
      />

    </div>
  );
}
