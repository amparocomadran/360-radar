import React, { useState } from 'react';
import { 
  Star, 
  Check, 
  AlertTriangle, 
  Send, 
  Flame, 
  Bell, 
  Smartphone,
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface DinerScreenProps {
  tableNumber: string;
  businessName: string;
}

export default function DinerScreen({ tableNumber, businessName }: DinerScreenProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [complaintCategory, setComplaintCategory] = useState<string>('Demora en plato');
  const [comment, setComment] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [step, setStep] = useState<'rating' | 'complaint' | 'google' | 'thanks'>('rating');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const tableNum = parseInt(tableNumber) || 4;
  const ownerEmail = 'otravueltamza@gmail.com';

  // Helpers to push new event to the dashboard
  const pushDashboardLog = (newLog: any) => {
    const key = `radar_scans_${ownerEmail}`;
    const stored = localStorage.getItem(key);
    let logs = [];
    if (stored) {
      try {
        logs = JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    
    // Prepend new action log
    const updated = [newLog, ...logs];
    localStorage.setItem(key, JSON.stringify(updated));

    // Also update total scans and avg rating of that table in tables
    const tablesKey = `radar_tables_${ownerEmail}`;
    const storedTables = localStorage.getItem(tablesKey);
    if (storedTables) {
      try {
        const tables = JSON.parse(storedTables);
        const updatedTables = tables.map((t: any) => {
          if (t.number === tableNum) {
            const newTotal = t.totalScans + 1;
            const newRating = parseFloat(((t.avgRating * t.totalScans + (newLog.rating || 5)) / newTotal).toFixed(1));
            return {
              ...t,
              totalScans: newTotal,
              avgRating: newRating > 5 ? 5 : newRating
            };
          }
          return t;
        });
        localStorage.setItem(tablesKey, JSON.stringify(updatedTables));
      } catch (e) {
        console.error(e);
      }
    }

    // Trigger storage event for other tabs to update live
    window.dispatchEvent(new Event('storage'));

    // Real-time backend API synchronization
    fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ownerEmail,
        tableNumber: tableNum,
        rating: newLog.rating,
        clientFeedback: newLog.clientFeedback,
        actionTaken: newLog.actionTaken,
        clientPhone: newLog.clientPhone
      })
    }).catch(err => console.error("Error syncing to server:", err));
  };

  const handleRatingSelect = (selected: number) => {
    setRating(selected);
    if (selected >= 4) {
      setStep('google');

      // Register high rating scan
      const newScan = {
        id: `s-live-${Date.now()}`,
        timestamp: 'Ahora mismo (Móvil)',
        tableNumber: tableNum,
        rating: selected,
        clientFeedback: 'Excelente atención de mesa en vivo.',
        actionTaken: 'REDIRECT_GOOGLE'
      };
      pushDashboardLog(newScan);

      // Auto redirect simulate
      setTimeout(() => {
        setStep('thanks');
      }, 3000);
    } else {
      setStep('complaint');
    }
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('thanks');

    const feedbackText = comment.trim() || `Problema: ${complaintCategory}`;

    // Register complaint scan
    const newScan = {
      id: `s-live-${Date.now()}`,
      timestamp: 'Ahora mismo (Móvil)',
      tableNumber: tableNum,
      rating: rating || 2,
      clientFeedback: feedbackText,
      actionTaken: 'WHATS_ALERT_SENT',
      clientPhone: clientPhone || '+54 261 456-7890'
    };
    pushDashboardLog(newScan);
  };

  const triggerInstantAction = (type: 'mozo' | 'cuenta') => {
    const isMozo = type === 'mozo';
    setStatusMessage(isMozo ? '🛎️ Solicitando mozo...' : '💵 Solicitando la cuenta...');

    // Push action log (acts as special 0-rating scan or note)
    const newScan = {
      id: `s-action-${Date.now()}`,
      timestamp: 'Ahora mismo (Móvil)',
      tableNumber: tableNum,
      rating: isMozo ? 5 : 5, // Neutral rating but triggers action
      clientFeedback: isMozo 
        ? '🛎️ ¡El cliente presionó el botón de asistencia en mesa para llamar al mozo!' 
        : '💵 ¡El cliente solicitó la cuenta física de la mesa!',
      actionTaken: 'INTERNAL_FEEDBACK'
    };
    pushDashboardLog(newScan);

    setTimeout(() => {
      setStatusMessage(isMozo ? '✓ Mozo notificado de inmediato' : '✓ Cuenta solicitada con éxito');
      setTimeout(() => setStatusMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start p-4 text-slate-100 font-sans">
      
      {/* Branded Diner Header */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 mt-6 relative overflow-hidden">
        
        {/* Background ambient blush */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#facc15]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#facc15]/10 border border-[#facc15]/20 text-[#facc15] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <span>🔴 Mesa {tableNum}</span>
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mt-1">
            {businessName}
          </h2>
          <p className="text-xs text-slate-400">
            ¿Cómo calificarías tu experiencia en este momento?
          </p>
        </div>

        {/* Dynamic step view */}
        <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-850">
          
          {step === 'rating' && (
            <div className="space-y-6 text-center">
              {/* Stars container */}
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingSelect(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="text-slate-700 hover:text-yellow-400 hover:scale-125 transition-all p-1 cursor-pointer"
                  >
                    <Star 
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoverRating || rating || 0) 
                          ? 'fill-current text-yellow-400' 
                          : 'text-slate-700'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                Tu valoración ayuda a mejorar nuestro servicio gastronómico
              </p>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-850"></div>
                <span className="flex-shrink mx-3 text-[9px] text-slate-500 font-bold uppercase tracking-widest">¿Necesitas algo más?</span>
                <div className="flex-grow border-t border-slate-850"></div>
              </div>

              {/* Instant Actions (Llamar al mozo / Pedir la cuenta) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => triggerInstantAction('mozo')}
                  className="bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-xs py-4 px-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 hover:border-yellow-500/20"
                >
                  <span className="text-2xl">🛎️</span>
                  <span className="uppercase tracking-wider text-[10px]">Llamar al Mozo</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerInstantAction('cuenta')}
                  className="bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-xs py-4 px-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 hover:border-yellow-500/20"
                >
                  <span className="text-2xl">💵</span>
                  <span className="uppercase tracking-wider text-[10px]">Pedir Cuenta</span>
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-[#facc15] font-extrabold text-[11px] p-3 rounded-xl text-center animate-pulse flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>
          )}

          {step === 'complaint' && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl flex items-start gap-2.5 text-left">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-300 leading-normal font-medium">
                  <strong>Canal Directo Privado:</strong> Tu reclamo será enviado de inmediato al encargado de turno vía WhatsApp para resolverlo ahora.
                </p>
              </div>

              {/* Tag Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  ¿Cuál es el inconveniente?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Comida fría', 'Demora en plato', 'Mesa desordenada', 'Mala atención', 'Otro'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setComplaintCategory(cat);
                        setComment(cat);
                      }}
                      className={`text-[10px] px-3 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                        complaintCategory === cat 
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleComplaintSubmit} className="space-y-3 pt-1">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Mensaje de Alerta
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe aquí tu observación para resolverla..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Nombre (Opcional)
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      WhatsApp (Opcional)
                    </label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+54 261..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('rating')}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 text-slate-400 font-bold text-[10px] py-3 rounded-xl border border-slate-800 cursor-pointer uppercase tracking-wider"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-450 text-slate-950 font-black text-[10px] py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Enviar Alerta
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'google' && (
            <div className="text-center space-y-4 py-3">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center rounded-full mx-auto">
                <CheckCircle className="w-8 h-8 animate-bounce" />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-white">¡Muchas gracias por valorarnos!</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed px-2">
                  Como nos calificaste con <span className="text-yellow-400 font-bold">{rating} estrellas</span>, te redirigimos automáticamente a nuestro perfil de Google Maps para que nos compartas tu opinión de forma pública.
                </p>
              </div>

              {/* Simulated Google Card */}
              <div className="bg-white text-slate-950 rounded-2xl p-4 text-left shadow-lg border border-slate-200 max-w-xs mx-auto space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-black font-serif">G</div>
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Google Maps</span>
                </div>
                <h4 className="font-extrabold text-xs">{businessName}</h4>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[9px] text-slate-500 font-medium">Estás compartiendo tu valoración públicamente.</p>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 font-mono pt-1">
                <span className="w-2.5 h-2.5 border-2 border-[#facc15] border-t-transparent rounded-full animate-spin"></span>
                <span>Abriendo Google Maps real en segundos...</span>
              </div>
            </div>
          )}

          {step === 'thanks' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 bg-yellow-500/10 border border-yellow-500/20 text-[#facc15] flex items-center justify-center rounded-full mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">¡Opinión Procesada!</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed px-4">
                  Tu valoración ha sido recibida de forma segura. ¡Agradecemos tu tiempo para ayudarnos a mejorar cada día!
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setRating(null);
                  setStep('rating');
                  setComment('');
                }}
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-[10px] font-black uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer"
              >
                Simular otro comensal
              </button>
            </div>
          )}

        </div>

        {/* Footer branding */}
        <div className="text-center border-t border-slate-850/80 pt-4 pb-1">
          <p className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">
            BLINDAJE REPUTACIONAL POR RADAR 360
          </p>
        </div>

      </div>
    </div>
  );
}
