import React from 'react';
import { Lock } from 'lucide-react';

interface ReviewSimulatorProps {
  onLaunchDemo?: (email: string, businessName: string) => void;
}

export default function ReviewSimulator({ onLaunchDemo }: ReviewSimulatorProps) {
  const clientUrl = `https://360-radar-2-0.vercel.app/?simulate_table=4&biz=${encodeURIComponent('Otra Vuelta Mza')}`;
  const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(clientUrl)}&color=070b13&bgcolor=ffffff`;

  const handleLaunchAdmin = () => {
    if (onLaunchDemo) {
      onLaunchDemo('otravueltamza@gmail.com', 'Otra Vuelta Mza');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-3xl mx-auto py-4">
      
      {/* Visual representation of an acrylic stand with the actual QR code of Mesa 4 */}
      <div className="w-full max-w-[280px] bg-white rounded-3xl p-5 shadow-2xl border-4 border-slate-800 relative flex flex-col items-center text-center shrink-0">
        
        <div className="bg-slate-950 text-[#facc15] font-black text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
          MESA #4 • ESCANEAR QR REAL
        </div>

        {/* QR Image containing the dynamic client link */}
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-center relative group">
          <img 
            src={qrImgSrc} 
            alt="Código QR de Prueba" 
            className="w-32 h-32 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mt-3.5 space-y-1">
          <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Otra Vuelta Mza</p>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-normal">Abre la cámara de tu móvil para opinar</p>
        </div>

        {/* Wooden stand base visual */}
        <div className="absolute -bottom-1.5 w-[104%] h-3.5 bg-amber-800 rounded-md border-b-2 border-amber-950 shadow-md"></div>
      </div>

      {/* Real Demo Credentials Guide Box */}
      <div className="w-full max-w-[320px] bg-slate-900/95 border border-slate-800 rounded-2xl p-5 text-left space-y-4">
        <div className="space-y-1.5">
          <p className="text-[11px] font-black text-[#facc15] uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#facc15]" /> Datos de acceso para la demo
          </p>
          <p className="text-[10px] text-slate-400 leading-normal">
            Usa estas credenciales para iniciar sesión en el panel de administración:
          </p>
        </div>

        <div className="bg-slate-950 p-3 border border-slate-850 rounded-xl space-y-2 font-mono text-[10px]">
          <div className="flex justify-between items-center gap-1">
            <span className="text-slate-500">Usuario:</span>
            <span className="text-white font-extrabold select-all truncate">otravueltamza@gmail.com</span>
          </div>
          <div className="flex justify-between items-center gap-1">
            <span className="text-slate-500">Contraseña:</span>
            <span className="text-[#facc15] font-extrabold select-all">otravuelta123</span>
          </div>
        </div>
      </div>

    </div>
  );
}
