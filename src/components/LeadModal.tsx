import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  CheckCircle,
  Clock,
  ExternalLink,
  Users
} from 'lucide-react';
import { Lead } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan: 'monthly' | 'yearly';
  onEnterDashboard?: () => void;
}

export default function LeadModal({ isOpen, onClose, defaultPlan, onEnterDashboard }: LeadModalProps) {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>(defaultPlan);
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync prop changes
  useEffect(() => {
    if (isOpen) {
      setPlan(defaultPlan);
      setIsSubmitted(false);
    }
  }, [isOpen, defaultPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newLead: Lead = {
        id: Math.random().toString(36).substring(2, 9),
        businessName,
        ownerName,
        email,
        phone,
        plan,
        timestamp: new Date().toLocaleString('es-ES', { timeZone: 'America/New_York' }),
        status: 'PENDING_CONTACT'
      };

      // Store in localStorage for demo review
      const existing = localStorage.getItem('radar_leads');
      const leads = existing ? JSON.parse(existing) : [];
      leads.unshift(newLead);
      localStorage.setItem('radar_leads', JSON.stringify(leads));

      // Trigger standard event to refresh lead counts if any other component is watching
      window.dispatchEvent(new Event('radar_lead_added'));

      setLoading(false);
      setIsSubmitted(true);

      // Programmatic redirect based on plan choice
      const redirectUrl = plan === 'monthly' ? "https://go.hotmart.com/S106453876T" : "https://go.hotmart.com/X106454109S";
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
    }, 1200);
  };

  const planPriceDisplay = plan === 'monthly' ? '$19,99 USD / mes' : '$199,99 USD / año';
  const planDiscountDisplay = plan === 'yearly' ? 'Ahorras $39,89 USD al año' : 'Cancela cuando quieras';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-3xl overflow-hidden font-sans z-10"
          >
            {/* Top close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="p-6 md:p-8">
                {/* Header tag */}
                <div className="inline-flex items-center gap-1 bg-yellow-500/10 text-[#facc15] text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3 text-[#facc15]" /> OFERTA ESPECIAL DE LANZAMIENTO
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  Protege la reputación de tu restaurante hoy mismo
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Completa tus datos debajo. En menos de 3 horas se te dará acceso a la plataforma vía email. Si no te llega, por favor contacta a nuestro correo o WhatsApp de soporte.
                </p>

                {/* Plan Toggle Selector inside Modal */}
                <div className="mt-5 grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-slate-850">
                  <button
                    type="button"
                    onClick={() => setPlan('monthly')}
                    className={`py-2 px-3 text-xs font-black rounded-lg transition-all text-center ${
                      plan === 'monthly'
                        ? 'bg-[#facc15] text-[#0f172a] shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Mensual ($19,99/mes)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan('yearly')}
                    className={`py-2 px-3 text-xs font-black rounded-lg transition-all text-center relative ${
                      plan === 'yearly'
                        ? 'bg-[#facc15] text-[#0f172a] shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Anual ($199,99/año)
                    <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-950 font-black text-[7.5px] uppercase tracking-normal px-1 py-0.5 rounded shadow">
                      Super Ahorro
                    </span>
                  </button>
                </div>

                {/* Selected Plan Summary Banner */}
                <div className="mt-4 p-3.5 bg-slate-850/80 rounded-2xl border border-slate-800 text-left flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Plan Seleccionado</span>
                    <span className="text-sm font-black text-white">{plan === 'monthly' ? 'RADAR 360 Mensual' : 'RADAR 360 Membresía Anual'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#facc15] font-mono block">{planPriceDisplay}</span>
                    <span className="text-[9px] text-[#facc15] font-semibold">{planDiscountDisplay}</span>
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-yellow-450 bg-yellow-400/5 border border-yellow-400/10 p-2.5 rounded-xl flex items-center gap-2">
                  <span className="shrink-0">🔒</span>
                  <span>El pago de tu plan {plan === 'yearly' ? 'anual' : 'mensual'} se realiza de forma 100% segura mediante <strong>Hotmart</strong>.</span>
                </div>

                {/* Lead Submission Form */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Nombre del Dueño o Gerente *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Nombre de la Marca Gastronómica *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ej. Burguesía Trattoria, Cafetal 80"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Tu Correo Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@restaurante.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        WhatsApp de Contacto *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej. +34 600 000 000"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submission Bullet Indicators */}
                  <div className="py-2.5 flex flex-col gap-1.5 text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 text-slate-350">
                      <CheckCircle className="w-3.5 h-3.5 text-[#facc15] shrink-0" /> Garantía de Satisfacción Total de 30 días.
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-350">
                      <CheckCircle className="w-3.5 h-3.5 text-[#facc15] shrink-0" /> Acceso seguro e inmediato al Dashboard y Bonos.
                    </span>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#facc15] hover:bg-yellow-450 text-[#0f172a] font-extrabold tracking-tight text-xs py-4 px-4 rounded-full shadow-lg shadow-yellow-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        Procesando suscripción segura...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        QUIERO PROTEGER MI REPUTACIÓN AHORA
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* GRAND SUCCESS SCREEN AFTER SUBMISSION */
              <div className="p-8 text-center space-y-5">
                <div className="w-16 h-16 bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
                  🎉
                </div>
                
                <h3 className="text-2xl font-black text-white tracking-tight">
                  ¡Reputación Blindada Exitosamente!
                </h3>
                
                <div className="space-y-2 bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left leading-relaxed">
                  <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#facc15] shrink-0" /> 
                    Suscripción Registrada: <span className="text-[#facc15] font-mono">{plan === 'monthly' ? 'Mensual' : 'Membresía Anual'}</span>
                  </p>
                  <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#facc15] shrink-0" /> 
                    Negocio Gastronómico: <span className="text-white">{businessName}</span>
                  </p>
                  <p className="text-xs text-slate-450 leading-relaxed font-light mt-2 pt-2 border-t border-slate-900">
                    Tu cuenta RADAR 360 se está configurando de manera exclusiva en nuestros servidores. Hemos enviado un correo de validación a <span className="text-slate-200 font-medium underline">{email}</span> y nos pondremos en contacto contigo a través de WhatsApp ({phone}) para validar el diseño físico de tus stickers QR.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal mt-2 pt-2 border-t border-slate-900/60 flex items-start gap-2">
                    <span className="text-[#facc15] text-sm shrink-0">📂</span>
                    <span><strong>Acceso Incluido:</strong> Recibirás acceso a una carpeta compartida con videos de capacitación para enseñarte a comenzar y qué configurar, cómo cancelar tu suscripción sin complicaciones si lo deseas, y videos rápidos para resolver cualquier tipo de duda.</span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-850 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left leading-snug">
                  <Clock className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>Un consultor asignado validará tus menús e integrará tu ficha de Google Maps en un máximo de 12 horas hábiles.</span>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={plan === 'monthly' ? "https://go.hotmart.com/S106453876T" : "https://go.hotmart.com/X106454109S"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-black text-xs py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    💳 COMPLETAR PAGO EN HOTMART AHORA
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-755 text-slate-300 font-bold text-xs py-2.5 rounded-md transition-all cursor-pointer"
                  >
                    Volver a la Landing Page
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
