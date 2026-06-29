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
  lang?: 'es' | 'en';
}

export default function LeadModal({ isOpen, onClose, defaultPlan, onEnterDashboard, lang = 'es' }: LeadModalProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
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

    // Send lead details to server to trigger the Resend email notification
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName,
          ownerName,
          email,
          phone,
          plan
        }),
      });
    } catch (err) {
      console.error('Error submitting lead to server for Resend notification:', err);
    }

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const planPriceDisplay = plan === 'monthly' 
    ? (lang === 'en' ? '$19.99 USD / month' : '$19,99 USD / mes') 
    : (lang === 'en' ? '$199.99 USD / year' : '$199,99 USD / año');
    
  const planDiscountDisplay = plan === 'yearly' 
    ? (lang === 'en' ? 'Save $39.89 USD per year' : 'Ahorras $39,89 USD al año') 
    : (lang === 'en' ? 'Cancel anytime' : 'Cancela cuando quieras');

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
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-3xl overflow-hidden font-sans z-10 text-left"
          >
            {/* Top close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              aria-label={lang === 'en' ? 'Close modal' : 'Cerrar modal'}
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="p-6 md:p-8">
                {/* Header tag */}
                <div className="inline-flex items-center gap-1 bg-yellow-500/10 text-[#facc15] text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3 text-[#facc15]" /> {lang === 'en' ? 'SPECIAL LAUNCH OFFER' : 'OFERTA ESPECIAL DE LANZAMIENTO'}
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {lang === 'en' ? "Protect your restaurant's reputation today" : 'Protege la reputación de tu restaurante hoy mismo'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {lang === 'en' 
                    ? 'Complete your details below. You will get system access via email in less than 3 hours. If you do not receive it, contact our email or WhatsApp support.' 
                    : 'Completa tus datos debajo. En menos de 3 horas se te dará acceso a la plataforma vía email. Si no te llega, por favor contacta a nuestro correo o WhatsApp de soporte.'}
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
                    {lang === 'en' ? 'Monthly ($19.99/mo)' : 'Mensual ($19,99/mes)'}
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
                    {lang === 'en' ? 'Annual ($199.99/yr)' : 'Anual ($199,99/año)'}
                    <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-950 font-black text-[7.5px] uppercase tracking-normal px-1 py-0.5 rounded shadow">
                      {lang === 'en' ? 'Save Big' : 'Super Ahorro'}
                    </span>
                  </button>
                </div>

                {/* Selected Plan Summary Banner */}
                <div className="mt-4 p-3.5 bg-slate-850/80 rounded-2xl border border-slate-800 text-left flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">{lang === 'en' ? 'Selected Plan' : 'Plan Seleccionado'}</span>
                    <span className="text-sm font-black text-white">
                      {plan === 'monthly' 
                        ? (lang === 'en' ? 'RADAR 360 Monthly' : 'RADAR 360 Mensual') 
                        : (lang === 'en' ? 'RADAR 360 Annual Membership' : 'RADAR 360 Membresía Anual')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#facc15] font-mono block">{planPriceDisplay}</span>
                    <span className="text-[9px] text-[#facc15] font-semibold">{planDiscountDisplay}</span>
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-yellow-450 bg-yellow-400/5 border border-yellow-400/10 p-2.5 rounded-xl flex items-center gap-2">
                  <span className="shrink-0">🔒</span>
                  <span>
                    {lang === 'en' 
                      ? <>Your payment is processed 100% securely through <strong>Hotmart</strong>.</> 
                      : <>El pago de tu plan {plan === 'yearly' ? 'anual' : 'mensual'} se realiza de forma 100% segura mediante <strong>Hotmart</strong>.</>}
                  </span>
                </div>

                {/* Lead Submission Form */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {lang === 'en' ? 'Owner or Manager Name *' : 'Nombre del Dueño o Gerente *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder={lang === 'en' ? 'e.g. John Doe' : 'Ej. Carlos Mendoza'}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {lang === 'en' ? 'Restaurant or Culinary Brand *' : 'Nombre de la Marca Gastronómica *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={lang === 'en' ? 'e.g. Bella Italia Bistro' : 'Ej. Burguesía Trattoria, Cafetal 80'}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {lang === 'en' ? 'Your Business Email *' : 'Tu Correo Corporativo *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={lang === 'en' ? 'example@restaurant.com' : 'ejemplo@restaurante.com'}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {lang === 'en' ? 'Contact WhatsApp *' : 'WhatsApp de Contacto *'}
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
                      <CheckCircle className="w-3.5 h-3.5 text-[#facc15] shrink-0" /> {lang === 'en' ? '30-Day Total Satisfaction Guarantee.' : 'Garantía de Satisfacción Total de 30 días.'}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-350">
                      <CheckCircle className="w-3.5 h-3.5 text-[#facc15] shrink-0" /> {lang === 'en' ? 'Instant secure access to Dashboard & Bonuses.' : 'Acceso seguro e inmediato al Dashboard y Bonos.'}
                    </span>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#facc15] hover:bg-yellow-455 text-[#0f172a] font-black tracking-wider text-xs py-4 px-4 rounded-full shadow-lg shadow-yellow-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 uppercase"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        {lang === 'en' ? 'Processing secure order...' : 'Procesando suscripción segura...'}
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        {lang === 'en' ? 'I WANT TO PROTECT MY REPUTATION NOW' : 'QUIERO PROTEGER MI REPUTACIÓN AHORA'}
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
                  {lang === 'en' ? 'Reputation Successfully Shielded!' : '¡Reputación Blindada Exitosamente!'}
                </h3>
                
                <div className="space-y-2 bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left leading-relaxed">
                  <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#facc15] shrink-0" /> 
                    {lang === 'en' ? 'Registered Subscription:' : 'Suscripción Registrada:'} <span className="text-[#facc15] font-mono">{plan === 'monthly' ? (lang === 'en' ? 'Monthly' : 'Mensual') : (lang === 'en' ? 'Annual Membership' : 'Membresía Anual')}</span>
                  </p>
                  <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#facc15] shrink-0" /> 
                    {lang === 'en' ? 'Food Business:' : 'Negocio Gastronómico:'} <span className="text-white">{businessName}</span>
                  </p>
                  <p className="text-xs text-slate-450 leading-relaxed font-light mt-2 pt-2 border-t border-slate-900">
                    {lang === 'en'
                      ? <>Your RADAR 360 account is being configured on our servers. We have sent a validation email to <span className="text-slate-200 font-medium underline">{email}</span> and we will contact you via WhatsApp ({phone}) to review and approve your physical QR stand sticker designs.</>
                      : <>Tu cuenta RADAR 360 se está configurando de manera exclusiva en nuestros servidores. Hemos enviado un correo de validación a <span className="text-slate-200 font-medium underline">{email}</span> y nos pondremos en contacto contigo a través de WhatsApp ({phone}) para validar el diseño físico de tus stickers QR.</>}
                  </p>
                  <p className="text-xs text-slate-450 leading-relaxed font-normal mt-2 pt-2 border-t border-slate-900/60 flex items-start gap-2">
                    <span className="text-[#facc15] text-sm shrink-0">📂</span>
                    <span><strong>{lang === 'en' ? 'Included Access:' : 'Acceso Incluido:'}</strong> {lang === 'en' ? 'You will get immediate access to a shared onboarding library with video tutorials on setting up the app, canceling your subscription in one click, and quickly training your service team.' : 'Recibirás acceso a una carpeta compartida con videos de capacitación para enseñarte a comenzar y qué configurar, cómo cancelar tu suscripción de forma rápida y resolución de dudas comunes para capacitar a tu personal.'}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-850 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left leading-snug">
                  <Clock className="w-4 h-4 text-[#facc15] shrink-0" />
                  <span>{lang === 'en' ? 'A dedicated technical manager will review your maps and menus in less than 12 business hours.' : 'Un consultor asignado validará tus menús e integrará tu ficha de Google Maps en un máximo de 12 horas hábiles.'}</span>
                </div>

                {/* IMPORTANT ACCOUNT ACTIVATION ANNOUNCEMENT */}
                <div className="bg-amber-500/10 border-2 border-amber-500/30 p-4.5 rounded-2xl text-left space-y-2.5 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-[#facc15] font-black text-xs uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block"></span>
                    📢 {lang === 'en' ? 'CRITICAL REQUIREMENT' : 'PASO CRUCIAL PARA LA ACTIVACIÓN'}
                  </div>
                  <p className="text-xs text-slate-100 font-bold leading-normal">
                    {lang === 'en' 
                      ? 'Once you complete your subscription on Hotmart, please send an email to'
                      : 'Una vez realizada la suscripción en Hotmart, es imprescindible que envíes un correo a:'}{' '}
                    <a href="mailto:radar360negociosgastronomicos@gmail.com" className="text-[#facc15] underline font-mono select-all">
                      radar360negociosgastronomicos@gmail.com
                    </a>{' '}
                    {lang === 'en' 
                      ? 'indicating the name of your restaurant so we can activate your account and give you access to the training videos immediately.'
                      : 'con el nombre de tu restaurante para dar de alta tu cuenta inmediatamente y darte acceso exclusivo a los videos con las capacitaciones.'}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-snug pt-1.5 border-t border-slate-800/80">
                    {lang === 'en'
                      ? '🔒 Remember: Our support team is here for you 24/7 via email and WhatsApp/mobile (+54 9 261 360-1613) to guide you through this process.'
                      : '📞 Recuerda: Nuestro centro de soporte técnico y atención al comensal se encuentra disponible las 24 horas, los 7 días de la semana vía email (radar360negociosgastronomicos@gmail.com) y celular/WhatsApp (+54 9 261 360-1613) para guiarte en todo momento.'}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={plan === 'monthly' ? "https://pay.hotmart.com/S106453876T?sck=HOTMART_PRODUCT_PAGE&off=tkqqz1lm&hotfeature=32" : "https://pay.hotmart.com/X106454109S?sck=HOTMART_PRODUCT_PAGE&off=9p39kiwk&hotfeature=32"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-black text-xs py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    💳 {lang === 'en' ? 'COMPLETE PAYMENT ON HOTMART NOW' : 'COMPLETAR PAGO EN HOTMART AHORA'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-755 text-slate-300 font-bold text-xs py-2.5 rounded-md transition-all cursor-pointer"
                  >
                    {lang === 'en' ? 'Go Back to Landing Page' : 'Volver a la Landing Page'}
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
