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
  Trash2 
} from 'lucide-react';
import { Lead } from './types';

// Importing our high-fidelity modular components
import ReviewSimulator from './components/ReviewSimulator';
import RoiCalculator from './components/RoiCalculator';
import FaqSection from './components/FaqSection';
import LeadModal from './components/LeadModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDefaultPlan, setModalDefaultPlan] = useState<'monthly' | 'yearly'>('yearly');
  
  // Leads list for demo visibility
  const [localLeads, setLocalLeads] = useState<Lead[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased selection:bg-[#facc15] selection:text-[#0f172a]">
      
      {/* TOP DECORATIVE GLOBAL FLOATING STATUS BAR */}
      <div className="bg-[#0f172a] text-[#facc15] text-center py-2 px-4 text-[11px] sm:text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-md">
        <Flame className="w-4 h-4 fill-[#facc15] animate-bounce" />
        <span>OFERTA DE LANZAMIENTO EXCLUSIVA: Descuento del 40% activo por tiempo limitado</span>
      </div>

      {/* FIXED FLOATING NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800/60 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#facc15] text-[#0f172a] p-1.5 rounded-lg font-black text-xs sm:text-sm tracking-tighter flex items-center justify-center gap-1 shadow-lg shadow-yellow-500/10">
              <span className="text-sm font-extrabold rotate-12">🧭</span>
              <span>RADAR 360</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] sm:text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md">
              Edición Gastronómica
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="#calculadora" 
              className="hidden md:inline-block text-xs font-bold text-slate-300 hover:text-[#facc15] transition-colors"
            >
              Calcular Pérdidas
            </a>
            <a 
              href="#bonos" 
              className="hidden lg:inline-block text-xs font-bold text-slate-300 hover:text-[#facc15] transition-colors"
            >
              Bonos Incluidos
            </a>
            <a 
              href="#faq-section" 
              className="text-xs font-normal text-slate-300 hover:text-[#facc15] transition-colors mr-1 sm:mr-2"
            >
              Preguntas
            </a>
            <button
              onClick={() => openCheckout('yearly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold text-[10px] sm:text-xs px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-md shadow-yellow-500/15 active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              Garantizar Acceso
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - AMBIENT DARK BACKGROUND */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 px-4 bg-[#0f172a]" id="hero">
        {/* Neon Light Flares */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-[#facc15] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border border-yellow-500/20">
            <Sparkles className="w-3.5 h-3.5" /> RADAR 360 Negocios Gastronómicos
          </div>

          {/* Core Title (Supplied Copy with theme styling) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Convierte clientes felices en <span className="text-[#facc15]">reseñas de Google</span> y detecta quejas antes de que destruyan tu reputación en 7 días
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-350 font-medium max-w-3xl mx-auto leading-relaxed">
            Sin perseguir clientes para que opinen, sin revisar plataformas una por una, sin descubrir problemas cuando ya es demasiado tarde. Solo un sistema inteligente que captura la experiencia real del cliente — <span className="font-extrabold text-[#facc15]">incluso si no estás en el restaurante.</span>
          </p>

          {/* Additional Positioning Statement */}
          <p className="text-xs sm:text-sm text-slate-400 font-semibold italic border-y border-white/10 py-3.5 max-w-2xl mx-auto">
            "El primer sistema que convierte la experiencia de cada mesa en datos, alertas y reseñas que aumentan tus ingresos."
          </p>

          {/* Key Quick Benefit Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-4 max-w-3xl mx-auto">
            {[
              { text: 'Instalación en 5 Minutos', icon: '⚡' },
              { text: 'Filtro Anti-Reseñas 1★', icon: '🛡️' },
              { text: 'Alertas por WhatsApp', icon: '📱' },
              { text: '100% Sin Hardware Extra', icon: '🔌' },
            ].map((badge, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl flex items-center justify-center gap-2 text-white">
                <span className="text-sm">{badge.icon}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-200">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Immediate CTA triggers */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openCheckout('yearly')}
              className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-8 py-4 rounded-full shadow-lg shadow-yellow-500/15 hover:shadow-yellow-500/20 hover:scale-[1.02] transition-all text-xs sm:text-sm tracking-widest cursor-pointer uppercase flex items-center justify-center gap-2 active:scale-98"
            >
              <span>QUIERO PROTEGER MI REPUTACIÓN AHORA</span>
              <ArrowRight className="w-4 h-4 shrink-0 font-bold" />
            </button>
            <a
              href="#calculadora"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 font-bold px-8 py-4 rounded-full transition-all text-xs sm:text-sm cursor-pointer text-center block"
            >
              Calcular Pérdida en Mi Restaurante
            </a>
          </div>

          {/* High Context Trust Ticker */}
          <div className="pt-4 flex items-center justify-center gap-6 text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-slate-350">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              En 7 días o menos
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-350">
              <ShieldCheck className="w-4 h-4 text-[#facc15]" />
              Garantía total de satisfacción
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 2: WHAT WILL YOU UNLOCK? (¿QUÉ DESBLOQUEARÁS?) - CONTRAST LIGHT BACKGROUND */}
      <section className="py-20 sm:py-28 bg-slate-50 text-slate-900 border-y border-slate-200 relative overflow-hidden" id="beneficios">
        
        {/* Soft background pattern for light contrast focus */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-extrabold uppercase tracking-widest inline-block">
              Funcionalidades Clave
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight mt-4">
              ¿Qué desbloquearás con Radar 360?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
              La artillería digital más completa del mercado gastronómico para blindar tu negocio las 24 horas.
            </p>
          </div>

          {/* 5 Blocks of Copy Organised Dynamically */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Block 1 */}
            <div className="bg-white border border-slate-200 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-yellow-100 text-yellow-800 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  📱
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                  Sistema QR Inteligente de Atención Instantánea
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal leading-relaxed">
                  Tus clientes pueden llamar al mesero, pedir la cuenta, solicitar ayuda o reportar problemas en segundos desde su celular. Menos espera. Más satisfacción para la clientela.
                </p>
              </div>
              <div className="text-[11px] font-bold text-yellow-700 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Cero Esperas</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 2 */}
            <div className="bg-white border border-slate-200 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-100 text-blue-700/90 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  ⭐
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                  Filtro de Reputación Automático
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal leading-relaxed">
                  Los clientes felices son enviados a Google para dejar reseñas. Los clientes insatisfechos son dirigidos a un canal privado para resolver el problema antes de que se vuelva público en internet.
                </p>
              </div>
              <div className="text-[11px] font-bold text-blue-700 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Tu Escudo My Business</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 3 */}
            <div className="bg-white border border-slate-200 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-700/90 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  🖥️
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                  Panel Unificado de Experiencia
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal leading-relaxed">
                  Todas las solicitudes, comentarios privados y calificaciones de mesas organizadas por fecha en un solo lugar. Sin caos de libretas ni pérdida de información crucial para el negocio.
                </p>
              </div>
              <div className="text-[11px] font-bold text-indigo-700 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Centralización Total</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 4 */}
            <div className="bg-white border border-slate-200 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between md:col-span-1 lg:col-span-1">
              <div>
                <div className="w-12 h-12 bg-rose-100 text-rose-700/90 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  🚨
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                  Monitor de Quejas en Tiempo Real
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal leading-relaxed">
                  Detecta disgustos de tus comensales en el instante en que ocurren. Actúa de forma física antes de perder comensales y que paguen molestos.
                </p>
              </div>
              <div className="text-[11px] font-bold text-rose-700 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Prevención de deserciones</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Block 5 */}
            <div className="bg-white border border-slate-200 hover:border-yellow-500/40 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-12 h-12 bg-amber-100 text-amber-700/90 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 shadow-inner">
                  📊
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                  Análisis Inteligente de Tendencias Gastronómicas
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 font-normal leading-relaxed">
                  Descubre exactamente qué platillo o bebida está generando malas experiencias, qué números de mesas tienen más problemas y qué horarios están afectando el servicio mensual de tus ventas de manera invisible.
                </p>
              </div>
              <div className="text-[11px] font-bold text-amber-800 mt-4 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Optimización de Operaciones</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

          </div>

          {/* Small Intermediary Call-to-action under features */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => openCheckout('yearly')}
              className="bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>ADQUIRIR MI ACCESO SEGURO</span>
              <ArrowRight className="w-4 h-4 text-[#facc15]" />
            </button>
          </div>

        </div>
      </section>

      {/* INTERACTIVE DEMO SANDBOX AREA (Diferente background: slate-900) */}
      <section className="py-20 sm:py-28 bg-slate-900 px-4" id="simulador-en-vivo">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
                Prueba Interactiva
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Filtra las quejas en privado y eleva tus estrellas en Google automáticamente o en un clic
              </h2>
              <p className="text-sm text-slate-350 leading-relaxed font-light">
                No tienes que adivinar qué es lo que tus comensales opinan. Haz la simulación a la derecha: califica alto o reporta un problema común y observa la rapidez técnica con la que Radar 360 se acciona para blindarte.
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#facc15] font-black">✓</span> Los clientes contentos van directos a tu enlace Maps
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#facc15] font-black">✓</span> Alertas instantáneas en mesa protegen el servicio
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#facc15] font-black">✓</span> Evita que comensales molestos escriban en TripAdvisor o Google
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              {/* Loaded simulator */}
              <ReviewSimulator />
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
              LA CRUDA REALIDAD DE LA INDUSTRIA
            </p>

            {/* Primary Headline (Supplied Copy) */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              La mayoría de los restaurantes descubre sus problemas cuando ya perdieron al cliente
            </h2>

            {/* Core Emotional Text provided */}
            <div className="text-sm sm:text-lg text-slate-300 space-y-4 font-light leading-relaxed">
              <p className="font-semibold text-white">Un cliente molesto rara vez se queja.</p>
              <p>Simplemente se va.</p>
              <p className="text-rose-400 font-bold">Y después aparece una estrella en Google.</p>
              <p className="font-bold text-white uppercase text-xl">Una.</p>
              <p>Destruyendo semanas enteros de esfuerzo de todo tu equipo de cocina y sala.</p>
              <p className="italic bg-rose-955/20 border border-rose-900/25 p-3 rounded-xl text-slate-300">
                Mientras tú sigues creyendo que todo está funcionando bien en tu negocio gastronómico.
              </p>
              <p>Porque nadie te avisó.</p>
              <p>Porque nadie levantó la mano a tiempo.</p>
              <p className="text-rose-400 font-semibold">Porque cuando finalmente viste el problema en redes, ya estaba publicado frente a miles de nuevos comensales potenciales.</p>
              <p>Entonces empiezas a hacer lo que hacen todos los gerentes agobiados...</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-400 font-medium pl-4 list-disc">
                <li>Preguntar a ciegas</li>
                <li>Investigar qué pasó</li>
                <li>Revisar reseñas antiguas</li>
                <li>Hablar con empleados tensos</li>
                <li>Intentar adivinar qué mesa fue</li>
              </ul>

              <p className="font-bold text-rose-400 pt-1">Demasiado tarde. El daño ya está hecho.</p>
              <p className="text-white text-base font-semibold">La reputación de tu marca gastronómica ya recibió un golpe que ahuyentará reservas.</p>
              
              {/* Resolution copy */}
              <div className="mt-8 bg-slate-900 p-5 rounded-2xl border border-slate-850/80 space-y-3.5 text-slate-200">
                <p className="font-extrabold text-[#facc15] text-base sm:text-lg">
                  Radar 360 Restaurante existe para cambiar eso estructuralmente de raíz.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Porque si puedes detectar el problema <span className="font-bold text-[#facc15] underline">antes</span> de que llegue a Google, puedes solucionarlo con tu personal de sala antes de que se convierta en una pérdida permanente de ventas.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  Y cuando puedes convertir automáticamente a los clientes felices en excelentes comentarios y reseñas positivas, tu reputación online empieza a acumularse y crecer absolutamente sola sin rogar opiniones.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center text-[10px] sm:text-xs font-black text-white uppercase pt-4 w-full">
                <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-xl">🚫 No más adivinanzas</div>
                <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-xl">🚫 No más sorpresas</div>
                <div className="bg-[#0f172a] border border-slate-800 p-3 rounded-xl">🎯 Solo control absoluto</div>
              </div>

            </div>

          </div>

          <div className="mt-12 text-center sm:text-left">
            <button
              onClick={() => openCheckout('yearly')}
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-8 py-4 rounded-full shadow-lg shadow-yellow-500/15 transition-all text-xs sm:text-sm uppercase cursor-pointer"
            >
              PROTEGER LA REPUTACIÓN DE MI MESA HOY
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: TARGET AUDIENCE (¿PARA QUIÉN ES ESTO?) - CONTRAST LIGHT BG */}
      <section className="py-20 sm:py-28 bg-slate-100 text-slate-900 px-4" id="audiencia">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="bg-yellow-500/10 text-yellow-800 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
              Público Objetivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              ¿Para quién es esto exactamente?
            </h2>
          </div>

          {/* Persona Targets provided in copy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="text-2xl">🏨</div>
              <h3 className="font-extrabold text-slate-950 text-base">Negocios Gastronómicos</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Restaurantes, cafeterías, bistrós, bares, comedores y hoteles que dependen enteramente de su calificación en estrellas digitales para atraer turismo y nuevos comensales diariamente.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="text-2xl">🧑‍💼</div>
              <h3 className="font-extrabold text-slate-950 text-base">Dueños de Negocios</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Empresarios enfocados que están cansándose de enterarse de los problemas de cocina o servicio cuando ya es demasiado tarde para disculparse con el cliente.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="text-2xl">👔</div>
              <h3 className="font-extrabold text-slate-950 text-base">Gerentes y Administradores</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Gerentes proactivos que quieren controlar de veras la experiencia de cada mesa sin andar persiguiendo clientes ni depender de reportes orales incompletos de los meseros.
              </p>
            </div>

          </div>

          {/* Section Refuerzo Copy provided */}
          <div className="bg-[#0f172a] text-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-800 text-left relative overflow-hidden shadow-xl mt-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider block w-max">
              REFUERZO ESTRATÉGICO
            </span>
            <blockquote className="mt-4 text-[#facc15] font-black text-base sm:text-lg leading-relaxed">
              "Lo que realmente estás comprando no es un simple sistema QR. Estás comprando visibilidad total sobre lo que ocurre en tu negocio antes de que afecte tus ingresos."
            </blockquote>
          </div>

        </div>
      </section>

      {/* ROI CALCULATOR WIDGET SECTION */}
      <section className="py-20 bg-slate-900 px-4 scroll-mt-20" id="calculadora">
        <RoiCalculator />
      </section>

      {/* SECTION 6: WHAT TO EXPECT (¿QUÉ PUEDES ESPERAR?) - CONTRAST LIGHT BG */}
      <section className="py-20 sm:py-28 bg-white text-slate-900 px-4" id="expectativa">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="bg-yellow-500/10 text-yellow-850 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-extrabold uppercase tracking-widest inline-block">
              Garantía y Resultados
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              ¿Qué puedes esperar desde los primeros días?
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Retornos reales medidos de manera directa sobre la reputación online de tu sucursal gastronómica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Expectation 1 */}
            <div className="text-left space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-lg bg-[#facc15] text-[#0f172a] w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">
                1
              </div>
              <h3 className="font-extrabold text-slate-950 text-[15px] sm:text-base leading-snug">
                Más reseñas positivas en Google
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                Transforma clientes de manera real y satisfecha en promotores activos de tu restaurante sin perseguirlos ni rogarles su opinión al pagar.
              </p>
            </div>

            {/* Expectation 2 */}
            <div className="text-left space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-lg bg-[#facc15] text-[#0f172a] w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">
                2
              </div>
              <h3 className="font-extrabold text-slate-950 text-[15px] sm:text-base leading-snug">
                Menos reseñas negativas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                Detecta la frustración y quejas de tus clientes inmediatamente en el canal privado de forma que actúes antes de que se convierta en una reseña de 1 estrella.
              </p>
            </div>

            {/* Expectation 3 */}
            <div className="text-left space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="text-lg bg-[#facc15] text-[#0f172a] w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">
                3
              </div>
              <h3 className="font-extrabold text-slate-950 text-[15px] sm:text-base leading-snug">
                Control total de tu negocio
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-normal">
                Sabrás exactamente qué ocurre en tus mesas, cuándo ocurre y qué comidas o meseros presentan mayor número de incidencias o halagos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: BONOS EXCLUSIVOS - PREMIUM DARK GRADIENT BACKGROUND */}
      <section className="py-20 sm:py-32 bg-slate-900 text-white border-y border-slate-800 px-4 relative overflow-hidden" id="bonos">
        
        {/* Soft yellow light blur to frame the bonuses premium look */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest">
              PAQUETE ADICIONAL ACELERADO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
              Bonos Exclusivos Incluidos
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Si registras tu restaurante hoy en nuestra oferta de lanzamiento, te llevas todos estos complementos optimizados sin pagar un solo dólar adicional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Bono 1 */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400/10 text-yellow-400 px-3.5 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider">
                Bono #1 Incluido
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-yellow-400/10 text-yellow-400 rounded-xl flex items-center justify-center text-lg shrink-0">
                  <Gift className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  CENTRO DE REPUTACIÓN GOOGLE
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Todas tus reseñas de Google organizadas por fecha dentro de la misma pantalla del panel. No más entrar y salir de plataformas ni perder tiempo valioso buscando comentarios. Todo centralizado y visible en tiempo real.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center text-[11px] font-bold text-yellow-400 uppercase tracking-widest">
                <span>Valor: $99/mes</span>
                <span className="text-slate-500 font-extrabold text-[#facc15]">GRATIS HOY</span>
              </div>
            </div>

            {/* Bono 2 */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400/10 text-yellow-400 px-3.5 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider">
                Bono #2 Incluido
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-yellow-400/10 text-yellow-400 rounded-xl flex items-center justify-center text-lg shrink-0">
                  <Flame className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  ALERTAS INTELIGENTES DE RIESGO
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Cuando un cliente selecciona una experiencia de pocas estrellas, el sistema genera de inmediato una alerta inmediata de WhatsApp o correo electrónico. Actúa al instante, no horas después, para evitar que la molestia explote públicamente.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center text-[11px] font-bold text-yellow-400 uppercase tracking-widest">
                <span>Valor: $149/mes</span>
                <span className="text-slate-500 font-extrabold text-[#facc15]">GRATIS HOY</span>
              </div>
            </div>

            {/* Bono 3 */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400/10 text-yellow-400 px-3.5 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider">
                Bono #3 Incluido
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-yellow-400/10 text-yellow-400 rounded-xl flex items-center justify-center text-lg shrink-0">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  INFORME EJECUTIVO AI
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Cada semana recibirás un análisis automático de inteligencia artificial que identifica las principales causas de insatisfacción, horarios problemáticos, mesas más conflictivas y oportunidades doradas de servicio. Sin interpretar datos complejos ni consultorías caras.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center text-[11px] font-bold text-yellow-400 uppercase tracking-widest">
                <span>Valor: $199/mes</span>
                <span className="text-slate-500 font-extrabold text-[#facc15]">GRATIS HOY</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: PRICING COMPARISON & GRAND SUMMARY TABLE (White contrast background) */}
      <section className="py-20 sm:py-32 bg-white text-slate-900 px-4" id="precios">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Headline "HAZ CUENTAS..." as provided */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="bg-yellow-500/10 text-yellow-880 border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
              Análisis de Tarifas Comparativo
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Haz cuentas... ¿Cuánto puedes ahorrar hoy?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-normal">
              Contratar personal de Mystery Shopper o software de reputación inestable te cuesta miles al año. Mira y compara la diferencia:
            </p>
          </div>

          {/* Pricing grid table provided */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Alt 1: Consultoria */}
            <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left">
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-slate-550">ALTERNATIVA TRADICIONAL</dt>
                <dd className="font-extrabold text-slate-950 text-xl mt-2">Consultoría de Experiencia</dd>
                <p className="text-xs text-slate-500 mt-1 font-mono">Costo estimado de mercado</p>
                
                <div className="py-4 my-4 border-y border-slate-200 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800">$500</span>
                  <span className="text-base text-slate-500">a</span>
                  <span className="text-2xl font-black text-slate-800">$3,000</span>
                  <span className="text-xs text-slate-500 font-medium">/ mes</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• Reportes manuales tardados</li>
                  <li>• No actúan en tiempo real</li>
                  <li>• No evitan la queja en Google</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-400 font-medium pt-4 mt-6 border-t border-slate-200">
                Poco práctico para la operación diaria.
              </p>
            </div>

            {/* Alt 2: Software convencional */}
            <div className="border border-slate-200 bg-slate-50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left">
              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-slate-550">SOFTWARE TRADICIONAL</dt>
                <dd className="font-extrabold text-slate-950 text-xl mt-2">Software de Reputación</dd>
                <p className="text-xs text-slate-500 mt-1 font-mono">Plataformas generales</p>
                
                <div className="py-4 my-4 border-y border-slate-200 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800">$100</span>
                  <span className="text-base text-slate-500">a</span>
                  <span className="text-2xl font-black text-slate-800">$500</span>
                  <span className="text-xs text-slate-500 font-medium">/ mes</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• No enfocados a restaurantes</li>
                  <li>• Sin integración física inteligente</li>
                  <li>• Complicada configuración inicial</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-400 font-medium pt-4 mt-6 border-t border-slate-200">
                Requiere que el dueño extraiga reportes a mano.
              </p>
            </div>

            {/* Alt 3: Our offer (GRAND HIGHLIGHT CARD) */}
            <div className="border-4 border-[#facc15] bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-2xl relative -translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#facc15] text-[#0f172a] text-[10px] sm:text-xs font-black tracking-widest px-4 py-1 rounded-full uppercase">
                OFERTA IRREPETIBLE ACTIVADA
              </div>

              <div>
                <dt className="text-xs font-black uppercase tracking-wider text-[#facc15]">LA MEJOR OPCIÓN CON LAUNCH PROMO</dt>
                <dd className="font-black text-white text-2xl sm:text-3xl mt-2">RADAR 360 COMPLETO</dd>
                <p className="text-xs text-slate-400 mt-1">Con bonos especiales de por vida</p>
                
                <div className="py-4 my-4 border-y border-slate-900 flex items-baseline gap-1">
                  <span className="text-xs text-slate-400 line-through mr-1 font-mono">$199 USD</span>
                  <span className="text-3xl sm:text-4xl font-black text-[#facc15] font-mono">$29</span>
                  <span className="text-xs text-yellow-500/90 font-medium">USD / mes</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-350 leading-normal">
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> Sistema QR de atención instantánea</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> Filtro de reseñas seguro de Google</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> Bono Centro de Reputación My Business</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> Bono Alertas de Riesgo Inmediatas</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#facc15]">✓</span> Bono Reporte AI semanal en correo</li>
                </ul>
              </div>

              <div className="pt-6 mt-6">
                <button
                  onClick={() => openCheckout('yearly')}
                  className="w-full bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-black text-xs py-3.5 px-4 rounded-full shadow-lg transition-all text-center uppercase tracking-tight cursor-pointer"
                >
                  Me Llevo la Oferta Ahora
                </button>
                <p className="text-center text-[9px] text-slate-400 mt-2 font-medium">
                  30 días de garantía • Cancela en un clic
                </p>
              </div>
            </div>

          </div>

          {/* GRAND SUMMARY OF WHAT THEY TAKE (RESUMEN DE LO QUE TE LLEVAS) as requested */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-850/80 shadow-2xl mt-12 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl sm:text-2xl font-black text-[#facc15] uppercase tracking-tight">
                  Resumen de lo que te llevas hoy
                </h3>
                
                <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#facc15] font-extrabold shrink-0 mt-0.5">✔</span>
                    <div>
                      <p className="font-extrabold text-white">Radar 360 Restaurante (Membresía Completa)</p>
                      <p className="text-slate-400 text-xs">Atención instantánea mediante código QR de vanguardia en mesa.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-[#facc15] font-extrabold shrink-0 mt-0.5">✔</span>
                    <div>
                      <p className="font-extrabold text-white">Llamador de Mesero, Cuenta y Asistencia Física</p>
                      <p className="text-slate-400 text-xs">Tus clientes piden auxilio o ticket sin andarse levantando.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-[#facc15] font-extrabold shrink-0 mt-0.5">✔</span>
                    <div>
                      <p className="font-extrabold text-white">Captura y Filtro de Satisfacción en Tiempo Real</p>
                      <p className="text-slate-400 text-xs">Conversión automática instantánea de clientes felices directamente en reseñas de Google.</p>
                    </div>
                  </div>

                  {/* Included Bonuses list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-900 text-xs text-slate-400">
                    <span className="flex items-center gap-2">🎁 <span className="text-white font-bold">Bono #1:</span> Centro de Reputación Google</span>
                    <span className="flex items-center gap-2">🎁 <span className="text-white font-bold">Bono #2:</span> Alertas Inteligentes de Riesgo</span>
                    <span className="flex items-center gap-2 sm:col-span-2">🎁 <span className="text-white font-bold">Bono #3:</span> Informe Mensual AI de Desempeño</span>
                  </div>
                </div>
              </div>

              {/* Conversion Box with direct button */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-850 p-6 rounded-2xl text-center space-y-4">
                <p className="text-xs sm:text-sm text-slate-350">
                  Garantiza este precio de lanzamiento de por vida y blinda la recomendación de tu sucursal.
                </p>
                <div className="space-y-1">
                  <p className="text-[11px] text-slate-450 uppercase tracking-widest block font-bold">Todo Incluido hoy por solo</p>
                  <p className="text-2xl sm:text-4xl font-black text-[#facc15] font-mono tracking-tight">$29 USD / mes</p>
                  <p className="text-[10px] text-yellow-450 font-medium">O elige plan anual para ahorrar más de $100 adicionales</p>
                </div>

                <button
                  onClick={() => openCheckout('yearly')}
                  className="w-full bg-[#facc15] hover:bg-yellow-450 text-[#0f172a] font-extrabold py-4 rounded-full text-xs sm:text-sm shadow-xl transition-all uppercase tracking-tight cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>QUIERO PROTEGER MI REPUTACIÓN AHORA</span>
                  <ArrowRight className="w-4 h-4 shrink-0 font-extrabold text-slate-900" />
                </button>

                <p className="text-[9.5px] text-slate-400">
                  * Sin contratos de permanencia obligatorios. Setup asistido llave en mano.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: QUESTIONS & ANSWERS (Deep dark background: FAQ) */}
      <FaqSection />

      {/* SECTION 10: CLOSING ARGUMENT & AHORA O NUNCA (Contrast layout block) */}
      <section className="py-20 sm:py-32 bg-slate-900 border-t border-slate-850 text-white text-center px-4 relative overflow-hidden" id="cierre">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          
          <span className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block">
            ÚLTIMA OPORTUNIDAD
          </span>

          {/* Closing statements as supplied in copy */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            No se trata de comprar otro software para tu negocio gastronomico... Se trata de decidir si vas a seguir descubriendo los problemas cuando ya están publicados de forma pública en Google.
          </h2>

          <p className="text-base sm:text-xl text-slate-350 font-light max-w-2xl mx-auto">
            O si vas a detectarlos <span className="font-bold text-[#facc15] underline decoration-yellow-500/30">antes</span>.
          </p>

          <div className="max-w-xl mx-auto rounded-2xl bg-slate-950 border border-slate-850 p-5 space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
            <p>
              Cada cliente insatisfecho que no logras identificar en mesa es una <span className="font-semibold text-rose-400 underline">reseña negativa</span> esperando suceder frente a tus ingresos del mes que viene.
            </p>
            <p>
              Y cada cliente feliz que no aprovechas es una valiosa <span className="font-semibold text-[#facc15] underline">recomendación perdida</span> que pudo haber traído a diez nuevos grupos. Es hora de blindar tu labor en cocina.
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <span className="block text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] to-amber-500 tracking-widest uppercase">
              AHORA O NUNCA
            </span>

            <button
              onClick={() => openCheckout('yearly')}
              className="w-full sm:w-auto bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-extrabold px-10 py-5 rounded-full shadow-2xl hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase cursor-pointer"
            >
              EMPEZAR A PROTEGER MI REPUTACIÓN AHORA
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Únete a cientos de marcas gastronómicas inteligentes. Paga en pesos o dólares de forma segura de por vida.
          </p>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-10 px-4 border-t border-slate-900 text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <p className="font-bold text-[11px] text-slate-400 uppercase tracking-widest">
            RADAR 360 NEGOCIOS GASTRONÓMICOS © 2026
          </p>
          <p className="max-w-md mx-auto text-[10px] text-slate-600 leading-relaxed">
            Diseñamos soluciones tecnológicas con enfoque garantizado de conversión directa para restaurantes, cafeterías, bares e imperios gastronómicos. El uso de marcas de terceros (como Google My Business o WhatsApp) es con fines informativos de compatibilidad técnica.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] text-[#facc15] font-semibold pt-2">
            <a href="#hero" className="hover:underline">Inicio</a>
            <span>•</span>
            <a href="#beneficios" className="hover:underline">Beneficios</a>
            <span>•</span>
            <a href="#calculadora" className="hover:underline">Cálculo ROI</a>
            <span>•</span>
            <a href="#cierre" className="hover:underline">Soporte</a>
          </div>
        </div>
      </footer>

      {/* LEADS DEMO VIEW COLLAPSIBLE DRAWER (Highly practical for review and validation in AI Studio) */}
      <div className="fixed bottom-4 right-4 z-40 font-sans">
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-3xl overflow-hidden transition-all duration-350 text-left ${
          showAdminPanel ? 'w-80 h-96' : 'w-12 h-12 rounded-full'
        }`}>
          {showAdminPanel ? (
            <div className="h-full flex flex-col justify-between p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-black text-[#facc15] uppercase tracking-widest flex items-center gap-1.5">
                  🛡️ PANEL DEMO: LEADS ({localLeads.length})
                </span>
                <button 
                  onClick={() => setShowAdminPanel(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold bg-slate-950 px-2 py-1 rounded cursor-pointer"
                >
                  Cerrar
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
                    <p>No hay registros de leads localmente todavía.</p>
                    <p className="text-slate-600 mt-1">Somete datos en cualquier botón de CTA de la página para simular la captura.</p>
                  </div>
                )}
              </div>

              {/* Clear button */}
              {localLeads.length > 0 && (
                <button 
                  onClick={clearLeads}
                  className="w-full bg-rose-600/15 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-rose-300 text-[10px] py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 leading-none uppercase font-extrabold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Limpiar Leads Guardados
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAdminPanel(true)}
              className="w-full h-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#facc15] hover:border-yellow-500/35 rounded-full flex items-center justify-center transition-colors cursor-pointer relative"
              title="Ver Leads de prueba guardados"
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
      />

    </div>
  );
}
