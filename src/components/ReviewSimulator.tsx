import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Smartphone, 
  Bell, 
  Receipt, 
  MessageSquare, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRight, 
  Smartphone as PhoneIcon, 
  AlertTriangle, 
  User, 
  Clock, 
  Check, 
  Undo2,
  ThumbsUp,
  MessageCircleOff
} from 'lucide-react';
import { SimulatorAlert } from '../types';

export default function ReviewSimulator() {
  const [activeTab, setActiveTab] = useState<'customer' | 'owner'>('customer');
  
  // Customer Side Simulator States
  const [step, setStep] = useState<'home' | 'rating' | 'happy' | 'unhappy' | 'submitting_unhappy' | 'success'>('home');
  const [tempRating, setTempRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('');
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [phoneNotification, setPhoneNotification] = useState<string | null>(null);

  // Owner Dashboard Alert States
  const [alerts, setAlerts] = useState<SimulatorAlert[]>([
    {
      id: '1',
      time: 'Hace 5 min',
      table: 'Mesa 12',
      rating: 5,
      tags: ['Excelente Servicio', 'Comida Excepcional'],
      comment: '¡El mejor sushi que he probado en mi vida! El servicio fue impecable.',
      type: 'positive',
      status: 'resolved'
    },
    {
      id: '2',
      time: 'Hace 12 min',
      table: 'Mesa 8',
      rating: 4,
      tags: ['Ambiente Agradable'],
      type: 'positive',
      status: 'resolved'
    }
  ]);

  const triggerPhoneNotification = (msg: string) => {
    setPhoneNotification(msg);
    setTimeout(() => setPhoneNotification(null), 4000);
  };

  const addAlert = (newAlert: Omit<SimulatorAlert, 'id' | 'time' | 'status'>) => {
    const alertItem: SimulatorAlert = {
      ...newAlert,
      id: Date.now().toString(),
      time: 'Ahora mismo',
      status: 'active'
    };
    setAlerts(prev => [alertItem, ...prev]);
  };

  const handleCallWaiter = () => {
    triggerPhoneNotification('🛎️ Solicitud de Mesero enviada. Un mesero está en camino.');
    addAlert({
      table: 'Mesa 4',
      rating: 0,
      tags: ['Llamado de Mesero'],
      type: 'negative',
      comment: 'Solicitó asistencia del mesero inmediatamente.'
    });
  };

  const handleRequestBill = () => {
    triggerPhoneNotification('💵 Cuenta solicitada. Preparando el ticket para tu mesa.');
    addAlert({
      table: 'Mesa 4',
      rating: 0,
      tags: ['Solicitó la Cuenta'],
      type: 'positive',
      comment: 'Cliente solicita cobrar la cuenta en mesa.'
    });
  };

  const handleRatingClick = (rate: number) => {
    setTempRating(rate);
    if (rate >= 4) {
      setStep('happy');
      triggerPhoneNotification('🎉 ¡Excelente! Filtro inteligente activo.');
    } else {
      setStep('unhappy');
      triggerPhoneNotification('⚠️ Alerta de insatisfacción privada detectada.');
    }
  };

  const handleUnhappySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    addAlert({
      table: 'Mesa 4',
      rating: tempRating,
      tags: feedbackCategory ? [feedbackCategory] : ['Servicio lento'],
      comment: feedbackComment || 'El cliente se queja de la atención privada para evitar reseña pública.',
      type: 'negative'
    });
    setFeedbackComment('');
    setFeedbackCategory('');
  };

  const simulateOwnerAction = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const resetCustomerSimulator = () => {
    setStep('home');
    setTempRating(0);
    setFeedbackComment('');
    setFeedbackCategory('');
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <span className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Simulador de Experiencia Real
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-3 sm:mt-4">
            Prepara una prueba en vivo
          </h3>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-lg mx-auto">
            Haz clic e interactúa como si fueras el cliente de la mesa en tu restaurante y observa cómo responde el sistema en tiempo real.
          </p>
        </div>

        {/* Mobile Navigation for Small screens instead of side by side */}
        <div className="flex md:hidden bg-slate-950 p-1.5 rounded-xl border border-slate-800 mb-6">
          <button 
            onClick={() => setActiveTab('customer')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'customer' 
                ? 'bg-slate-850 text-[#facc15] shadow-md border border-yellow-500/20' 
                : 'text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            1. Vista del Cliente
          </button>
          <button 
            onClick={() => setActiveTab('owner')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 relative ${
              activeTab === 'owner' 
                ? 'bg-slate-850 text-[#facc15] shadow-md border border-yellow-500/20' 
                : 'text-slate-400'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            2. Vista de Dueño
            {alerts.some(a => a.status === 'active') && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT COLUMN: Customer Phone View */}
          <div className={`col-span-1 md:col-span-5 flex flex-col items-center justify-center ${activeTab !== 'customer' ? 'hidden md:flex' : ''}`}>
            <h4 className="text-sm font-bold text-slate-400 mb-3 hidden md:block flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#facc15]" /> 1. Celular Inteligente (Mesa 4)
            </h4>

            {/* Simulated Phone Frame */}
            <div className="w-full max-w-[290px] aspect-[9/18.5] bg-slate-950 border-[6px] border-slate-800 rounded-[36px] shadow-3xl p-3 flex flex-col relative overflow-hidden ring-1 ring-slate-800/50">
              {/* Speaker & Camera top notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-850 rounded-full flex justify-center items-center gap-2">
                <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
              </div>

              {/* Live phone notification popover inside frame */}
              <AnimatePresence>
                {phoneNotification && (
                  <motion.div 
                    initial={{ opacity: 0, y: -40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="absolute top-8 left-2 right-2 bg-slate-900 border border-yellow-500/30 rounded-xl p-2 shadow-lg z-30 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#facc15] shrink-0" />
                    <p className="text-[10px] font-medium text-emerald-200 leading-tight">
                      {phoneNotification}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

               {/* Inner phone screen content */}
              <div className="flex-1 mt-5 rounded-[24px] bg-slate-900 border border-slate-800 p-3.5 flex flex-col justify-between overflow-y-auto no-scrollbar pt-5">
                
                {/* Header branding on phone */}
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-[#facc15] px-2 py-0.5 rounded-full text-[10px] font-bold border border-yellow-500/20">
                    <Sparkles className="w-2.5 h-2.5 text-[#facc15]" /> RADAR 360
                  </div>
                  <h5 className="text-xs font-black tracking-wider text-slate-100 uppercase mt-1">Caffe & Trattoria</h5>
                  <p className="text-[9px] text-slate-400 font-medium">Mesa 4 • Atendido por mesero</p>
                </div>

                {/* Submitting Screens */}
                <div className="flex-1 flex flex-col justify-center py-2">
                  <AnimatePresence mode="wait">
                    {/* HOME OPTIONS SCREEN */}
                    {step === 'home' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-2"
                      >
                        <div className="bg-slate-850 border border-slate-800/80 rounded-xl p-2.5 text-center shadow-inner">
                          <p className="text-[10px] text-slate-300 font-medium leading-relaxed">
                            ¿Cómo estás disfrutando tu visita? Escoge una acción o danos tu opinión:
                          </p>
                        </div>

                        <button 
                          id="btn-call-waiter"
                          onClick={handleCallWaiter}
                          className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left px-3 py-2 rounded-xl flex items-center justify-between text-slate-200 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-slate-900 p-1.5 rounded-lg">🛎️</span>
                            <span className="text-[11px] font-semibold">Llamar Mesero</span>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button 
                          id="btn-req-bill"
                          onClick={handleRequestBill}
                          className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left px-3 py-2 rounded-xl flex items-center justify-between text-slate-200 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-slate-900 p-1.5 rounded-lg">💵</span>
                            <span className="text-[11px] font-semibold">Pedir la Cuenta</span>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button 
                          id="btn-start-rate"
                          onClick={() => setStep('rating')}
                          className="w-full bg-[#facc15] hover:bg-yellow-450 text-[#0f172a] shadow-lg shadow-yellow-500/20 text-center py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 font-bold text-[11px] transition-all cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          Calificar Mi Visita
                        </button>
                      </motion.div>
                    )}

                    {/* SELECT STAR RATE SCREEN */}
                    {step === 'rating' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-3"
                      >
                        <p className="text-[11px] font-bold text-slate-300">
                          ¿Cómo fue tu experiencia el día de hoy?
                        </p>
                        
                        <div className="flex items-center justify-center gap-1.5 py-2">
                          {[1, 2, 3, 4, 5].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => handleRatingClick(rate)}
                              onMouseEnter={() => setHoverRating(rate)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none transition-transform active:scale-125 cursor-pointer p-0.5"
                            >
                              <Star 
                                className={`w-7 h-7 transition-all ${
                                  rate <= (hoverRating || tempRating) 
                                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]' 
                                    : 'text-slate-600'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>

                        <p className="text-[9px] text-slate-400 font-medium">
                          Toca una estrella para calificar. El sistema filtrará instantáneamente.
                        </p>

                        <button 
                          onClick={() => setStep('home')}
                          className="text-[10px] text-slate-500 hover:text-white flex items-center justify-center gap-1 mx-auto mt-2 font-medium cursor-pointer"
                        >
                          <Undo2 className="w-3 h-3" /> Regresar
                        </button>
                      </motion.div>
                    )}

                    {/* HAPPY PATH: ⭐⭐⭐⭐⭐ CLIENT SENT TO GOOGLE */}
                    {step === 'happy' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-3 py-1"
                      >
                        <div className="w-10 h-10 bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto text-lg">
                          🎉
                        </div>
                        <h6 className="text-[11px] font-bold text-[#facc15]">
                          Filtro Inteligente: Activo
                        </h6>
                        <p className="text-[10px] text-slate-300 leading-normal font-light">
                          Vimos que te encanta nuestro servicio. Te redirigiremos en 1 segundo a nuestro perfil de Google para consolidar tu opinión frente a miles de nuevos comensales.
                        </p>

                        <div className="bg-slate-850 p-2 rounded-xl border border-slate-800 text-[9px] text-slate-400 font-medium text-left">
                          💡 <span className="font-bold text-[#facc15]">¿Qué pasó tras bambalinas?</span> Tu negocio acaba de ganar una reseña de 5 estrellas de manera garantizada y totalmente orgánica.
                        </div>

                        <a 
                          href="https://google.com" 
                          target="_blank" 
                          rel="noreferrer"
                          className="block w-full bg-[#facc15] hover:bg-yellow-450 text-[#0f172a] text-center py-2 px-3 rounded-full font-bold text-[11px] shadow-lg shadow-yellow-500/20 transition-all font-extrabold"
                        >
                          Confirmar Calificación en Google
                        </a>

                        <button 
                          onClick={resetCustomerSimulator}
                          className="text-[9px] text-slate-500 hover:text-white flex items-center justify-center gap-1 mx-auto cursor-pointer"
                        >
                          <Undo2 className="w-2.5 h-2.5" /> Probar de nuevo
                        </button>
                      </motion.div>
                    )}

                    {/* UNHAPPY PATH: ⭐/⭐⭐/⭐⭐⭐ CLIENT FILTERED PRIVATELY */}
                    {step === 'unhappy' && (
                      <motion.form 
                        onSubmit={handleUnhappySubmit}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2.5"
                      >
                        <div className="text-center">
                          <span className="inline-flex bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full text-[9px] font-extrabold border border-amber-500/20">
                            🛡️ CANAL PRIVADO COMPENSATORIO
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-normal text-center">
                          Lamentamos profundamente tu valoración de <span className="font-bold text-yellow-400">{tempRating} ⭐</span>. Por favor infórmanos qué falló para solucionarlo urgentemente:
                        </p>

                        <div className="grid grid-cols-2 gap-1.5">
                          {['Sabor Comida', 'Atención Mesero', 'Higiene', 'Demora en Cocina'].map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() => setFeedbackCategory(item)}
                              className={`py-1 px-1.5 rounded-lg border text-[9px] font-bold text-center transition-all cursor-pointer ${
                                feedbackCategory === item 
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-400' 
                                  : 'bg-slate-850 text-slate-400 border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>

                        <textarea
                          placeholder="Escribe brevemente tu comentario privado..."
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-[10px] text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 resize-hidden h-14"
                          required
                        />

                        <button 
                          type="submit"
                          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-center py-2 px-3 rounded-xl font-bold text-[10px] border border-amber-400 shadow-md transition-all cursor-pointer"
                        >
                          Enviar Comentario a Gerencia
                        </button>

                        <div className="text-[9px] text-slate-400 text-center italic">
                          🔒 Se guardará a nivel corporativo, evitando ir a Google.
                        </div>
                      </motion.form>
                    )}

                    {/* SUCCESS PRIVATE TICKET SUBMISSION */}
                    {step === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-3 py-2"
                      >
                        <div className="w-10 h-10 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto text-lg">
                          🤝
                        </div>
                        <h6 className="text-[11px] font-bold text-amber-400">
                          Comentario Enviado en Privado
                        </h6>
                        <p className="text-[10px] text-slate-300 leading-normal">
                          ¡Muchas gracias por tu reporte! Tu cometario fue transmitido inmediatamente y de forma interna a la gerencia del restaurante.
                        </p>

                        <div className="bg-rose-950/20 p-2.5 rounded-xl border border-rose-900/35 text-[9px] text-slate-400 text-left">
                          🛡️ <span className="font-semibold text-rose-400">Filtro Exitoso:</span> El cliente ha desahogado su molestia aquí. El sistema <span className="font-bold underline text-rose-300">bloqueó</span> su paso hacia Google Reviews y envió una alerta roja al dueño.
                        </div>

                        <button 
                          onClick={resetCustomerSimulator}
                          className="w-full bg-slate-800 hover:bg-slate-750 text-white text-center py-2 px-3 rounded-xl font-bold text-[10px] transition-all cursor-pointer"
                        >
                          Volver al Inicio
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated Home Screen Indicator */}
                <div className="w-16 h-1 bg-slate-800 rounded-full mx-auto mt-2 shrink-0"></div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Business Owner Dashboard Frame */}
          <div className={`col-span-1 md:col-span-7 flex flex-col ${activeTab !== 'owner' ? 'hidden md:flex' : ''}`}>
            <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#facc15]" />
                2. Panel de Control RADAR 360 (Dueño de Restaurante)
              </span>
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#facc15]"></span>
              </span>
            </h4>

            {/* Simulated Desktop Dashboard */}
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-start min-h-[420px] shadow-3xl text-sm justify-between">
              
              {/* Dashboard Topbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-3 gap-2 shrink-0">
                <div>
                  <h5 className="font-extrabold text-white text-[13px] tracking-wide uppercase flex items-center gap-1.5">
                    RADAR 360 • MONITOR MONTAJE
                  </h5>
                  <p className="text-[10px] text-slate-400">Sucursal: Trattoria Central</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-850">
                  <Clock className="w-3.5 h-3.5 text-[#facc15]" />
                  <span className="font-bold text-white text-[10px]">MONITOR EN TIEMPO REAL: ACTIVO</span>
                </div>
              </div>

              {/* Mini Charts & Stats block */}
              <div className="grid grid-cols-3 gap-2.5 my-3 shrink-0">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Reseñas Evitadas</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-extrabold text-amber-500">24</span>
                    <span className="text-[9px] font-black text-[#facc15]">100%</span>
                  </div>
                  <p className="text-[8px] text-slate-400 leading-tight mt-0.5">Quejas resueltas en privado</p>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Rating Promedio</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-extrabold text-[#facc15]">4.9</span>
                    <span className="text-[9px] text-slate-500">★</span>
                  </div>
                  <p className="text-[8px] text-slate-400 leading-tight mt-0.5">Google My Business</p>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Nuevas Reseñas</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-extrabold text-[#facc15]">+112</span>
                    <span className="text-[8px] font-bold text-[#facc15]">Este mes</span>
                  </div>
                  <p className="text-[8px] text-slate-400 leading-tight mt-0.5">Captura orgánica de clientes</p>
                </div>
              </div>

              {/* Active alerts stream */}
              <div className="flex-1 overflow-y-auto max-h-[220px] space-y-2.5 pr-1 md:pr-2 py-1 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`rounded-xl p-3 border text-left transition-all leading-relaxed ${
                        alert.status === 'active' 
                          ? alert.type === 'negative'
                            ? 'bg-rose-950/20 border-rose-800/80 animate-pulse-glow shadow-md shadow-rose-950/10'
                            : 'bg-blue-950/20 border-blue-900'
                          : 'bg-slate-900/40 border-slate-850'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            alert.status === 'active' 
                              ? alert.type === 'negative' ? 'bg-rose-500' : 'bg-[#facc15]'
                              : 'bg-slate-600'
                          }`}></span>
                          <span className="font-bold text-[11px] text-white">{alert.table}</span>
                          <span className="text-[9px] text-slate-500">• {alert.time}</span>
                        </div>

                        {alert.rating > 0 && (
                          <div className="flex items-center gap-0.5 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star 
                                key={i} 
                                className={`w-2.5 h-2.5 ${i <= alert.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} 
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {alert.comment && (
                        <p className="text-[11px] text-slate-300 mt-1.5 bg-slate-950/40 p-2 rounded-lg border border-slate-900 italic">
                          " {alert.comment} "
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1 mt-2">
                        {alert.tags.map((tg, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[8.5px] px-2 py-0.5 rounded font-semibold border ${
                              alert.type === 'negative'
                                ? 'bg-rose-950/50 text-rose-300 border-rose-900/30'
                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}
                          >
                            {tg}
                          </span>
                        ))}
                      </div>

                      {alert.status === 'active' && (
                        <div className="mt-3 pt-2 border-t border-slate-900/60 flex items-center justify-between">
                          <span className="text-[9.5px] text-rose-300 font-extrabold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-400 animate-bounce" />
                            ALERTA CRÍTICA ACTIVA
                          </span>
                          <button
                            onClick={() => simulateOwnerAction(alert.id)}
                            className="bg-[#facc15] hover:bg-yellow-450 text-[#0f172a] text-[9.5px] font-bold px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Resolver en Mesa
                          </button>
                        </div>
                      )}

                      {alert.status === 'resolved' && (
                        <div className="mt-2.5 pt-1.5 border-t border-slate-900/30 flex justify-end">
                          <span className="text-[9px] text-slate-500 font-bold flex items-center gap-1 uppercase">
                            <CheckCircle className="w-3 h-3 text-[#facc15]" />
                            Resuelto y Mitigado en mesa
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {alerts.length === 0 && (
                  <div className="h-28 flex flex-col items-center justify-center text-slate-500">
                    <p className="text-[11px]">No hay transacciones guardadas en esta sesión.</p>
                  </div>
                )}
              </div>

              {/* Bottom explanatory footer in Dashboard */}
              <div className="mt-2 bg-slate-900 p-2 rounded-xl border border-slate-850 flex items-center justify-between text-[11px] shrink-0">
                <span className="text-slate-400 font-medium leading-normal">
                  💡 <span className="text-[#facc15] font-bold">¡Imagina esto en tu celular!</span> RADAR 360 te notifica al instante vía WhatsApp de forma que puedas disculparte con el cliente cara a cara antes de que pague la cuenta.
                </span>
                <button 
                  onClick={() => {
                    setAlerts([
                      {
                        id: '1',
                        time: 'Hace 5 min',
                        table: 'Mesa 12',
                        rating: 5,
                        tags: ['Excelente Servicio'],
                        comment: '¡El mejor sushi que he probado en mi vida! El servicio fue impecable.',
                        type: 'positive',
                        status: 'resolved'
                      }
                    ]);
                    resetCustomerSimulator();
                  }}
                  className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
                  title="Reiniciar Simulación"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
