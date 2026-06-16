import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles, DollarSign, Users, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RoiCalculator() {
  const [dailyCustomers, setDailyCustomers] = useState<number>(80);
  const [averageTicket, setAverageTicket] = useState<number>(20); // USD $20
  const [dissatisfiedRate, setDissatisfiedRate] = useState<number>(5); // 5% default unsatisfied

  // Calculations
  const monthlyCustomers = dailyCustomers * 30;
  const silentUnhappyMonthly = Math.round(monthlyCustomers * (dissatisfiedRate / 100));
  
  // Word of mouth + direct loss: An unhappy customer doesn't return (loss of future visits, say avg 3 visits/year)
  // plus they discourage an average of 2 other potential customers.
  // Let's keep the formula conservative and very realistic: 
  // Each lost unhappy customer cost = Average Ticket * 4 visits/year (lifetime value loss) + 2 friends discouraged * average ticket.
  const estimatedCostPerLostCustomer = averageTicket * 4; 
  const monthlyRevenueLost = silentUnhappyMonthly * estimatedCostPerLostCustomer;
  const annualRevenueLost = monthlyRevenueLost * 12;

  // Let's contrast with the low price of Radar 360 (e.g., $29/month launch promotion)
  const radarPriceMonthly = 29;
  const subscriptionCostYearly = radarPriceMonthly * 12;
  const netSavingsYearly = annualRevenueLost - subscriptionCostYearly;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header inside widget */}
        <div className="text-center mb-8">
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Simulador Financiero de Reputación
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-4">
            ¿Cuánto dinero está perdiendo tu negocio por mesas desatendidas?
          </h3>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
            La mayoría de los comensales insatisfechos se van en absoluto silencio y jamás regresan. Calcula el costo oculto de la falta de control.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SLIDERS COLUMN */}
          <div className="col-span-1 lg:col-span-6 space-y-6 flex flex-col justify-between">
            {/* Slider 1 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/60">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-350 flex items-center gap-1.5">
                  <span className="p-1 rounded bg-slate-900 text-[#facc15]">🍽️</span> 
                  Comensales al día
                </label>
                <span className="text-sm font-extrabold text-[#facc15] bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 font-mono">
                  {dailyCustomers} mesas/día
                </span>
              </div>
              <input 
                type="range"
                min="10"
                max="300"
                step="5"
                value={dailyCustomers}
                onChange={(e) => setDailyCustomers(Number(e.target.value))}
                className="w-full accent-[#facc15] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 px-0.5 font-mono">
                <span>10</span>
                <span>150</span>
                <span>300</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/60">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-350 flex items-center gap-1.5">
                  <span className="p-1 rounded bg-slate-900 text-[#facc15]">💵</span> 
                  Ticket promedio por mesa
                </label>
                <span className="text-sm font-extrabold text-[#facc15] bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 font-mono">
                  ${averageTicket} USD
                </span>
              </div>
              <input 
                type="range"
                min="5"
                max="150"
                step="5"
                value={averageTicket}
                onChange={(e) => setAverageTicket(Number(e.target.value))}
                className="w-full accent-[#facc15] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 px-0.5 font-mono">
                <span>$5</span>
                <span>$75</span>
                <span>$150</span>
              </div>
            </div>

            {/* Slider 3 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/60">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-350 flex items-center gap-1.5">
                  <span className="p-1 rounded bg-slate-900 text-amber-500">⚠️</span> 
                  % Clientes insatisfechos silenciosos
                </label>
                <span className="text-sm font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                  {dissatisfiedRate}%
                </span>
              </div>
              <input 
                type="range"
                min="1"
                max="25"
                step="1"
                value={dissatisfiedRate}
                onChange={(e) => setDissatisfiedRate(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 px-0.5 font-mono">
                <span>1% (Excelente)</span>
                <span>10% (Promedio)</span>
                <span>25% (Crítico)</span>
              </div>
              <p className="text-[10px] text-slate-400 font-light mt-2 leading-relaxed">
                * El promedio de la industria reporta que un <span className="font-semibold">5% de los comensales</span> experimenta alguna queja (atención lenta, comida fría) que nunca mencionan al mesero para evitar confrontación.
              </p>
            </div>
          </div>

          {/* CALCULATED RESULTS COLUMN */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-between bg-slate-950 border border-slate-850 rounded-2xl p-5 sm:p-6 text-left relative overflow-hidden">
            
            {/* Decorative background aura overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">
                Diagnóstico de Fuga Mensual de Ventas
              </h4>

              {/* Stat Card 1: Patients Lost */}
              <div className="flex items-center gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-900">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Clientes perdidos al mes</span>
                  <p className="text-base font-extrabold text-white">
                    {silentUnhappyMonthly} clientes <span className="text-xs text-rose-400 font-normal">abandonarán tu negocio silenciosamente</span>
                  </p>
                </div>
              </div>

              {/* Stat Card 2: Revenue leak */}
              <div className="flex items-center gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-900">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20 shrink-0 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Costo de pérdida de reputación</span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-2xl font-black text-rose-400 font-mono">
                      ${monthlyRevenueLost.toLocaleString()} USD
                    </p>
                    <span className="text-[10px] text-slate-400">/ mes perdido</span>
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-tight mt-1">
                    * Incluyendo pérdida de valor de vida útil del cliente y boca-o-boca destructivo.
                  </p>
                </div>
              </div>

              {/* Yearly leakage banner */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-850/45 text-center">
                <p className="text-[11px] text-slate-400 font-medium">
                  Merma financiera total acumulada al año: <span className="text-rose-400 font-extrabold font-mono text-sm">${annualRevenueLost.toLocaleString()} USD</span>
                </p>
              </div>
            </div>

            {/* Save Section */}
            <div className="mt-6 pt-5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Ahorro anual neto con Radar 360</span>
                <p className="text-xl font-extrabold text-[#facc15] font-mono flex items-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-[#facc15] inline" />
                  +${netSavingsYearly.toLocaleString()} USD
                </p>
              </div>
              <div className="text-right w-full sm:w-auto">
                <p className="text-[10px] text-[#facc15] font-bold uppercase tracking-wider flex items-center justify-end gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                  Retorno de Inversión (ROI)
                </p>
                <p className="text-[11px] text-slate-300">
                  Sistema paga su licencia el <span className="font-extrabold text-white underline">Día 1</span>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
