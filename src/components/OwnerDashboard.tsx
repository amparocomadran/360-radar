import React, { useState, useEffect } from 'react';
import { 
  Star, 
  QrCode, 
  Users, 
  Bell, 
  Settings, 
  Download, 
  Plus, 
  Trash2, 
  Phone, 
  ExternalLink, 
  Check, 
  Info, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Copy
} from 'lucide-react';

interface OwnerDashboardProps {
  onBackToLanding: () => void;
  registeredBusinessName?: string;
  registeredOwnerEmail?: string;
}

interface TableConfig {
  id: string;
  number: number;
  qrUrl: string;
  totalScans: number;
  avgRating: number;
}

interface SimulatedScan {
  id: string;
  timestamp: string;
  tableNumber: number;
  rating: number;
  clientFeedback?: string;
  actionTaken: 'REDIRECT_GOOGLE' | 'WHATS_ALERT_SENT' | 'INTERNAL_FEEDBACK';
  clientPhone?: string;
}

export default function OwnerDashboard({ onBackToLanding, registeredBusinessName, registeredOwnerEmail }: OwnerDashboardProps) {
  // Config state
  const [businessName, setBusinessName] = useState<string>('Mi Restaurante Bistro');
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>('https://maps.google.com/?cid=1234567890');
  const [whatsappPhone, setWhatsappPhone] = useState<string>('+52 1 55 1234 5678');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'settings'>('overview');

  // Load existing registrations or setup defaults
  useEffect(() => {
    const stored = localStorage.getItem('radar_leads');
    if (stored) {
      try {
        const leads = JSON.parse(stored);
        if (leads.length > 0) {
          const latest = leads[0];
          setBusinessName(latest.businessName || 'Mi Restaurante Bistro');
          if (latest.phone) setWhatsappPhone(latest.phone);
        }
      } catch (e) {
        console.error(e);
      }
    } else if (registeredBusinessName) {
      setBusinessName(registeredBusinessName);
    }
  }, [registeredBusinessName]);

  // Tables state
  const [tables, setTables] = useState<TableConfig[]>([
    { id: '1', number: 1, qrUrl: '', totalScans: 42, avgRating: 4.8 },
    { id: '2', number: 2, qrUrl: '', totalScans: 35, avgRating: 4.9 },
    { id: '3', number: 3, qrUrl: '', totalScans: 28, avgRating: 4.2 },
    { id: '4', number: 4, qrUrl: '', totalScans: 51, avgRating: 4.7 },
    { id: '5', number: 5, qrUrl: '', totalScans: 19, avgRating: 2.1 }, // Mesa problematica
  ]);

  // Scans log state - simulated
  const [scans, setScans] = useState<SimulatedScan[]>([
    {
      id: 's1',
      timestamp: 'Hace 3 minutos',
      tableNumber: 2,
      rating: 5,
      clientFeedback: '¡La atención y las pastas estuvieron excelentes, volveremos!',
      actionTaken: 'REDIRECT_GOOGLE'
    },
    {
      id: 's2',
      timestamp: 'Hace 11 minutos',
      tableNumber: 5,
      rating: 2,
      clientFeedback: 'La carne llegó fría y el mesero tardó mucho en traer la cuenta.',
      actionTaken: 'WHATS_ALERT_SENT',
      clientPhone: '+52 559 876 5432'
    },
    {
      id: 's3',
      timestamp: 'Hace 45 minutos',
      tableNumber: 1,
      rating: 5,
      actionTaken: 'REDIRECT_GOOGLE'
    },
    {
      id: 's4',
      timestamp: 'Hace 1 hora',
      tableNumber: 4,
      rating: 4,
      clientFeedback: 'Buena comida, el postre de tres leches delicioso.',
      actionTaken: 'REDIRECT_GOOGLE'
    },
    {
      id: 's5',
      timestamp: 'Hace 2 horas',
      tableNumber: 3,
      rating: 3,
      clientFeedback: 'La música estaba un poco fuerte, pero el servicio estuvo bien.',
      actionTaken: 'INTERNAL_FEEDBACK'
    }
  ]);

  const [newTableNum, setNewTableNum] = useState<string>('');
  const [showCopied, setShowCopied] = useState<string | null>(null);

  // Add custom table
  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(newTableNum);
    if (isNaN(num)) return;
    
    // Check duplication
    if (tables.some(t => t.number === num)) {
      alert(`La mesa ${num} ya existe.`);
      return;
    }

    const newTable: TableConfig = {
      id: Date.now().toString(),
      number: num,
      qrUrl: '',
      totalScans: 0,
      avgRating: 5.0
    };

    setTables([...tables, newTable].sort((a,b) => a.number - b.number));
    setNewTableNum('');
  };

  // Remove table
  const handleRemoveTable = (id: string) => {
    if (confirm('¿Seguro que deseas desvincular esta mesa y eliminar su código QR?')) {
      setTables(tables.filter(t => t.id !== id));
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Copy scan link
  const copyScanLink = (tableNum: number) => {
    const simulateUrl = `${window.location.origin}/?simulate_table=${tableNum}&biz=${encodeURIComponent(businessName)}`;
    navigator.clipboard.writeText(simulateUrl);
    setShowCopied(`table-${tableNum}`);
    setTimeout(() => setShowCopied(null), 2000);
  };

  // Metrics helper
  const totalScans = tables.reduce((acc, t) => acc + t.totalScans, 0);
  const avgRating = parseFloat((tables.reduce((acc, t) => acc + t.avgRating, 0) / tables.length).toFixed(1));
  const googleRedirects = scans.filter(s => s.actionTaken === 'REDIRECT_GOOGLE').length + 89; // plus baseline
  const privateAlerts = scans.filter(s => s.actionTaken === 'WHATS_ALERT_SENT').length + 14; // plus baseline

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans pb-16">
      
      {/* GLOW TOP */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />

      {/* DASHBOARD NAVBAR */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#facc15] text-[#0f172a] rounded-xl flex items-center justify-center font-black text-lg shadow-lg">
              R360
            </div>
            <div>
              <span className="text-[10px] bg-yellow-500/10 text-[#facc15] border border-yellow-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                PANEL DEL DUEÑO
              </span>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5 leading-tight">
                {businessName} <span className="text-xs font-normal text-slate-400">({registeredOwnerEmail || 'Demo Activa'})</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToLanding}
              className="text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              ← Volver a la Landing Page
            </button>
            <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-bold border border-emerald-500/15">
              <span className="h-2 w-2 bg-emerald-400 rounded-full animate-ping" />
              SISTEMA INTEGRADO ONLINE
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10 space-y-8">
        
        {/* EDUCATIONAL BOARD BANNER */}
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border-2 border-[#facc15]/30 p-6 rounded-3xl text-left space-y-3.5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-8 text-6xl text-[#facc15]/5 pointer-events-none select-none font-bold">
            💡
          </div>
          <div className="flex items-center gap-2 text-xs font-black text-[#facc15] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 shrink-0" />
            ¿CÓMO FUNCIONA TU PORTAL DE PROPIETARIO REAL? (GUÍA DE USO)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Así es como controlas tu reputación y enlazas tus mesas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs leading-relaxed text-slate-300">
            <div className="space-y-1.5">
              <p className="font-bold text-[#facc15]">1. El Cliente Escanea la Mesa</p>
              <p>Cada mesa física tiene un sticker con un código QR único. Al escanearlo desde su celular, la plataforma detecta exactamente qué mesa está evaluando instantáneamente sin requerir que el cliente descargue apps.</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-bold text-[#facc15]">2. Filtro Automático Inteligente</p>
              <p>Si el software detecta una calificación excelente de 4 o 5 estrellas, redirige al comensal de inmediato a tu ficha real de Google Maps. Si califica mal (1, 2 o 3 estrellas), detiene la queja y te alerta.</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-bold text-[#facc15]">3. Alertas Al Instante en Tu WhatsApp</p>
              <p>La queja se canaliza de forma privada y el sistema te manda una alerta automática de WhatsApp para que el gerente se mueva a resolver el problema del platillo en mesa antes de que el cliente se marche molesto.</p>
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold">Escaneos Totales</span>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-black text-white font-mono">{totalScans}</span>
              <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">+12% este mes</span>
            </div>
            <p className="text-[10px] text-slate-500">Número acumulado de lecturas de códigos QR.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold">Calificación Promedio</span>
            <div className="flex justify-between items-baseline">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-black text-white font-mono">{avgRating}</span>
                <Star className="w-5 h-5 text-[#facc15] fill-[#facc15] shrink-0" />
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">Excelente (4.5+)</span>
            </div>
            <p className="text-[10px] text-slate-500">Promedio de encuestas filtradas en mesa.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold">Calificaciones de 5★ en Google</span>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-black text-emerald-400 font-mono">+{googleRedirects}</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">100% de éxito</span>
            </div>
            <p className="text-[10px] text-slate-500">Estimación de clientes redirigidos exitosamente.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold">Alertas de Quejas Detenidas</span>
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-black text-amber-500 font-mono">{privateAlerts}</span>
              <span className="text-xs text-amber-500 bg-amber-505/10 px-2 py-0.5 rounded font-bold">Blindados</span>
            </div>
            <p className="text-[10px] text-slate-500">Quejas de 1-3★ resueltas de forma privada.</p>
          </div>

        </div>

        {/* TABS SELECTOR */}
        <div className="flex border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-6 text-xs font-black tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === 'overview' 
                ? 'border-[#facc15] text-[#facc15]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📊 Monitoreo y Clientes Recientes
          </button>
          <button 
            onClick={() => setActiveTab('tables')}
            className={`py-3 px-6 text-xs font-black tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === 'tables' 
                ? 'border-[#facc15] text-[#facc15]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📱 Enlazar Mesas y Códigos QR
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-6 text-xs font-black tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${
              activeTab === 'settings' 
                ? 'border-[#facc15] text-[#facc15]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            ⚙️ Enlaces de Google y WhatsApp
          </button>
        </div>

        {/* TAB 1: OVERVIEW & LIVE SCAN LOG */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Recent Scans Log */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white">Consola de Evaluación en Tiempo Real</h3>
                    <p className="text-xs text-slate-400">Monitoreo de satisfacción activa en cada mesa.</p>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-3.5 pt-2">
                  {scans.map((scan) => (
                    <div key={scan.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-4">
                      
                      {/* Left Badge: Rating */}
                      <div className={`p-2.5 rounded-xl shrink-0 text-center flex flex-col justify-center items-center h-12 w-12 ${
                        scan.rating >= 4 ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                      }`}>
                        <span className="text-lg font-black leading-none">{scan.rating}</span>
                        <span className="text-[7px] uppercase font-bold tracking-tight">Estrellas</span>
                      </div>

                      {/* Middle Details */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-white">
                            Escaneo en Mesa #{scan.tableNumber}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {scan.timestamp}
                          </span>
                        </div>
                        
                        {scan.clientFeedback ? (
                          <p className="text-xs text-slate-300 italic">
                            "{scan.clientFeedback}"
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-500 italic">
                            El comensal no envió comentarios escritos, solo calificó.
                          </p>
                        )}

                        {/* Action Taken Badge */}
                        <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
                          {scan.actionTaken === 'REDIRECT_GOOGLE' && (
                            <span className="text-[9.5px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                              ✔ Redirigido de inmediato a Google Maps real
                            </span>
                          )}
                          {scan.actionTaken === 'WHATS_ALERT_SENT' && (
                            <span className="text-[9.5px] bg-amber-500/10 border border-amber-500/25 text-amber-300 font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                              🚨 Alerta de Queja enviada por WhatsApp al Administrador ({scan.clientPhone || 'Registrado'})
                            </span>
                          )}
                          {scan.actionTaken === 'INTERNAL_FEEDBACK' && (
                            <span className="text-[9.5px] bg-slate-800 border border-slate-750 text-slate-300 font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                              📥 Guardado como nota interna (Calificación neutra)
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar quick tips */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Table activity index */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#facc15]">Ficha Operativa de Mesas</h4>
                
                <div className="space-y-3 divide-y divide-slate-800">
                  {tables.map(t => (
                    <div key={t.id} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
                      <span className="text-xs font-black text-white">Mesa #{t.number}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-mono">{t.totalScans} lecturas</span>
                        <span className={`text-[10.5px] font-black px-1.5 py-0.5 rounded font-mono ${
                          t.avgRating >= 4.5 ? 'text-emerald-400 bg-emerald-500/10' : t.avgRating >= 4 ? 'text-yellow-400 bg-yellow-500/10' : 'text-rose-400 bg-rose-500/10'
                        }`}>
                          {t.avgRating} ★
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Alerts panel list */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-350">
                <p className="font-extrabold text-[#facc15] flex items-center gap-1.5">
                  <Bell className="w-4 h-4" /> NOTIFICACIÓN ACTIVADA
                </p>
                <p>
                  Las alertas se despachan automáticamente a través de la integración de webhook conectada al número asignado de WhatsApp.
                </p>
                <p className="font-mono text-[10px] text-amber-500 uppercase bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  Última alerta: Mesa #5 - Platillo frío
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TABLES & QR CODE GENERATION */}
        {activeTab === 'tables' && (
          <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-left">
            <div>
              <h3 className="text-lg font-black text-white">Vinculador y Generador de Códigos QR para Mesas</h3>
              <p className="text-xs text-slate-400 mt-1">Sube la cantidad de mesas de tu local gastronomico. Cada mesa tiene un código de barra / QR único para que la consola sepa exactamente de dónde provienen el servicio y la queja.</p>
            </div>

            {/* Form to add table */}
            <form onSubmit={handleAddTable} className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 max-w-xl">
              <div className="flex-1">
                <input 
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={newTableNum}
                  onChange={(e) => setNewTableNum(e.target.value)}
                  placeholder="Número de mesa nueva (Ej. 6)"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-yellow-500"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#facc15] hover:bg-yellow-405 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Agregar Mesa
              </button>
            </form>

            {/* QR Code tables list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map((table) => {
                // Generate QR string representing evaluator URL for specific table
                const dynamicUrl = `${window.location.origin}/?simulate_table=${table.number}&biz=${encodeURIComponent(businessName)}`;
                // Use a real-life public QR code generator API
                const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(dynamicUrl)}&color=070b13&bgcolor=ffffff`;

                return (
                  <div key={table.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-white text-base">MESA #{table.number}</h4>
                        <p className="text-[10px] text-indigo-400 font-mono mt-0.5 uppercase tracking-wider font-extrabold">QR DISPONIBLE Y ASIGNADO</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveTable(table.id)}
                        className="text-slate-500 hover:text-rose-500 p-1.5 hover:bg-slate-950 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar mesa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* QR Code Graphic Area */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center mx-auto w-36 h-36">
                      <img 
                        src={qrImgSrc} 
                        alt={`QR Mesa ${table.number}`}
                        className="w-28 h-28 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex text-[10px] justify-between text-slate-400 border-b border-slate-800 pb-1">
                        <span>Lector de quejas</span>
                        <span className="font-bold text-white">Mesa #{table.number}</span>
                      </div>
                      <div className="flex text-[10px] justify-between text-slate-400">
                        <span>Despacho</span>
                        <span className="font-bold text-emerald-400">Listo</span>
                      </div>
                    </div>

                    {/* QR action buttons */}
                    <div className="grid grid-cols-2 gap-2 text-center pt-2">
                      <a 
                        href={qrImgSrc} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-slate-950 border border-slate-800 hover:text-[#facc15] hover:border-yellow-500/20 text-slate-300 font-bold py-2 px-2.5 rounded-lg text-[10px] transition-colors leading-none flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar QR
                      </a>
                      <button 
                        onClick={() => copyScanLink(table.number)}
                        className="bg-slate-950 border border-slate-800 hover:text-[#facc15] hover:border-yellow-500/20 text-slate-300 font-bold py-2 px-2.5 rounded-lg text-[10px] transition-colors leading-none flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {showCopied === `table-${table.number}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Copiar Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Simulation Access Point */}
                    <a 
                      href={`/?simulate_table=${table.number}&biz=${encodeURIComponent(businessName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#facc15]/10 hover:bg-[#facc15] text-[#facc15] hover:text-slate-950 font-black py-2 rounded-xl text-[10px] text-center transition-all uppercase tracking-wider block"
                    >
                      🌐 Probar Simulación Cliente en Mesa #{table.number}
                    </a>

                  </div>
                );
              })}
            </div>

            <div className="bg-slate-905 border border-slate-850 p-4 rounded-2xl text-xs text-slate-400 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#facc15] shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-white">¿Cómo pruebo el enlace dinámico de mesa?</p>
                <p className="mt-1">Haz clic en <strong>"Probar Simulación Cliente"</strong> en cualquiera de tus mesas. Esto abrirá otra pestaña o sección de evaluación representando a un cliente real sentado en esa mesa gastronómica específica. ¡Cualquier reseña mala generará de inmediato una alerta privada en la pestaña "Monitoreo y Clientes Recientes"!</p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SETTINGS & TARGET URLS */}
        {activeTab === 'settings' && (
          <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-left max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Enlaces Estratégicos de Integración</h3>
              <p className="text-xs text-slate-400 mt-1">Conecta el software a tus activos reales para activar el blindaje reputacional al 100%.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Nombre del Negocio / Restaurante
                </label>
                <input 
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej. Burguer & Shakes Bistro"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
                <p className="text-[10px] text-slate-500">Este nombre aparecerá en la pantalla del celular cuando tus clientes escaneen el QR.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Enlace de tu ficha de Google Maps
                  </label>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 rounded-full uppercase font-bold tracking-widest">
                    REDIRECCIÓN 5★
                  </span>
                </div>
                <input 
                  type="url"
                  required
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/?cid=..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-yellow-500"
                />
                <p className="text-[10px] text-slate-500">Aquí es donde los clientes contentos con opiniones de 4 o 5 estrellas serán dirigidos de manera inmediata para escribirte las reseñas oficiales.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Número de WhatsApp para Alertas
                  </label>
                  <span className="text-[9px] bg-red-500/10 text-red-400 px-2 rounded-full uppercase font-bold tracking-widest">
                    ALERTAS BAJAS QUEJAS
                  </span>
                </div>
                <input 
                  type="text"
                  required
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="+52 1 55 ..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-yellow-500"
                />
                <p className="text-[10px] text-slate-500">El número móvil (con prefijo internacional) al que el servicio de Radar 360 notificará con una alerta instantánea en caso de una calificación menor a 4 estrellas.</p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Conexiones encriptadas SSL activas.
                </div>
                
                <button 
                  type="submit"
                  className="bg-[#facc15] hover:bg-yellow-450 text-[#0f172a] font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-all w-full sm:w-auto text-center"
                >
                  Guardar Conexiones y Enlaces
                </button>
              </div>

            </form>

            {isSaved && (
              <div className="bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-xs font-bold p-3 rounded-xl text-center">
                ✔ Conexiones actualizadas exitosamente en el módulo de enrutamiento Radar 360.
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}
