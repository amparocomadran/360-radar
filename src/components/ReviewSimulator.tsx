import React from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Info,
  QrCode,
  Globe
} from 'lucide-react';

export default function ReviewSimulator() {
  const vercelUrl = 'https://360-radar-2-0.vercel.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(vercelUrl)}&color=0f172a&bgcolor=facc15`;

  return (
    <div className="w-full bg-slate-905 border border-slate-800 rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden font-sans relative">
      {/* Subtle geometric light beam */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-8 md:mb-12">
          <span className="bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Aplicación Real en Funcionamiento
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mt-4 uppercase">
            Prueba la Versión Interactiva 2.0
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-2.5 max-w-2xl mx-auto">
            Hemos integrado la aplicación móvil real de <strong>Radar 360</strong> que ya está operativa en los restaurantes para que experimentes su diseño y flujo de filtro exacto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT CONTAINER: Premium QR presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center self-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Premium QR Poster Board */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-center shadow-xl w-full max-w-[315px] space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-bl-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                  <QrCode className="w-2.5 h-2.5" /> Prueba en Vivo
                </div>
                
                <div>
                  <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Escanear el Menú</h4>
                  <p className="text-slate-400 text-[11px] mt-1 font-medium leading-relaxed">Simula ser un cliente de verdad escaneando este QR desde tu teléfono personal móvil.</p>
                </div>

                <div className="bg-[#facc15] p-4 rounded-2xl inline-block shadow-lg mx-auto ring-4 ring-[#facc15]/15">
                  <img 
                    src={qrCodeUrl} 
                    alt="Escanear QR Radar 360" 
                    className="w-48 h-48 block rounded-lg select-none hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-[10px] text-slate-400 font-semibold bg-slate-900 border border-slate-850 p-2.5 rounded-xl leading-snug">
                  📱 ¡Escanea con la cámara de tu iPhone o Android y califica la mesa de inmediato!
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT CONTAINER: Value Proposition & Instruction Log */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-[#facc15] text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                <ShieldCheck className="w-4 h-4 text-[#facc15]" /> TECNOLOGÍA EN MESA GARANTIZADA
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug uppercase">
                Sencillez Brutal, <br />
                Cero Fricción al Cliente
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Nuestra aplicación <strong>Radar 360</strong> no requiere que el comensal descargue absolutamente nada. Se ejecuta instantáneamente escaneando un código QR en su mesa, cargando a la velocidad del rayo (menos de 0.8 segundos).
              </p>
            </div>

            {/* Step-by-step Interactive Checklist */}
            <div className="space-y-3 bg-slate-950/60 border border-slate-800/80 p-5 rounded-2xl">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" /> ¿Cómo realizar la prueba interactiva?
              </h5>

              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[#facc15] font-black text-[10px] flex items-center justify-center mt-0.5">
                    1
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Selecciona tu nota:</strong> Prueba calificando con <strong>1, 2 o 3 estrellas</strong> para simular un cliente inconforme, o con <strong>4 - 5 estrellas</strong> si el servicio fue óptimo.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[#facc15] font-black text-[10px] flex items-center justify-center mt-0.5">
                    2
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Observa el Filtro (Menos de 4★):</strong> El sistema abre inmediatamente un desahogo privado, recabando su número celular y quejas en la cocina o atención de forma segura y controlada para evitar que la crítica migre a redes públicas o Google Maps.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[#facc15] font-black text-[10px] flex items-center justify-center mt-0.5">
                    3
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <strong className="text-white">Observa la Recompensa (4 o 5★):</strong> Redirige al cliente instantáneamente a la ficha oficial de Google Maps para solidificar tu reputación frente a miles de nuevos usuarios.
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick action buttons block */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href={vercelUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-[#facc15] hover:bg-yellow-400 text-slate-950 font-black text-xs py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/25 active:scale-95 uppercase tracking-wider text-center"
              >
                <Globe className="w-4 h-4" />
                Abrir versión móvil completa
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-[10px] text-slate-500 flex items-center gap-1.5 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-850/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#facc15] shrink-0" />
              <span>La versión 2.0 incluye integración de APIs avanzada, carga asíncrona optimizada, cifrado SSL completo y diseño eye-safe premium para ambientes de nocturnidad gastronómica.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
