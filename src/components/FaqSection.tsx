import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, HelpCircle as HelpIcon, Mail } from 'lucide-react';
import { FaqItem } from '../types';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FaqItem[] = [
    {
      id: '1',
      question: '¿Qué es exactamente Radar 360 y cómo funciona en mi restaurante?',
      answer: 'Radar 360 es una plataforma integral de reputación y atención al cliente en mesa en tiempo real diseñada para bares, cafeterías, locales de comida rápida y restaurantes independientes o de franquicia. Consiste en colocar atractivos códigos QR personalizados en tus mesas, barras o áreas comunes. Cuando un comensal los escanea con su celular, puede solicitar un mesero, pedir la cuenta, emitir quejas o calificar el servicio de manera 100% privada antes de irse. Si la experiencia es sumamente positiva, el sistema lo invita de manera fluida a publicar su reseña en tu perfil de Google Maps.'
    },
    {
      id: '2',
      question: '¿Cómo funciona exactamente el Filtro de Reseñas Seguro de Google?',
      answer: 'Es nuestro filtro inteligente en mesa. Cuando el cliente escanea el QR y califica su visita con 4 o 5 estrellas, identificamos a un comensal feliz y le facilitamos el botón directo a tu perfil de Google My Business para que deje su reseña oficial de forma inmediata y orgánica. Pero, si el cliente califica su experiencia con 3 estrellas o menos, el sistema abre al instante un canal de buzón privado. Su queja o disconformidad se procesa internamente contigo, permitiéndole desahogarse de inmediato en mesa en lugar de ir a Google a dañar tu promedio público.'
    },
    {
      id: '3',
      question: '¿Cómo se notifican las Alertas de Riesgo Inmediatas a mi personal de servicio?',
      answer: 'En el preciso momento en que un cliente indica insatisfacción en su teléfono o solicita asistencia, el sistema genera de forma autónoma una alerta prioritaria visible en tiempo real en tu Panel de Control (el cual mantendrás abierto en cualquier tableta, ordenador o celular del equipo de sala). Esto te permite reaccionar de inmediato, acudir a la mesa específica señalada por el sistema, disculparte de forma personalizada, reponer el plato o invitar un postre, resolviendo el roce del servicio cara a cara en mesa antes de que el cliente pague la cuenta y se retire decepcionado.'
    },
    {
      id: '4',
      question: '¿La integración del QR requiere instalar hardware, cables o pagar instalaciones complejas?',
      answer: 'Para nada. No requieres de obras civiles, costosas pantallas de mesa que se quedan sin batería, ni llamadores físicos con pilas breves que confunden al comensal. El sistema es 100% digital y corre en la nube. Te facilitamos plantillas estéticas imprimibles listas con tus códigos de mesa únicos para que las adhieras a tus servilleteros, cartas directas o soportes acrílicos. Es limpio, minimalista, moderno e higiénico.'
    },
    {
      id: '5',
      question: '¿Es práctico para los comensales? ¿Deben descargar alguna app?',
      answer: 'La facilidad de uso es nuestra mayor prioridad técnica. Los comensales no tienen que descargar pesadas aplicaciones desde la Google Play o Apple App Store, ni registrar su nombre, email, redes sociales o contraseñas que generen desconfianza. El acceso es instantáneo de un solo toque: escaneas con la cámara nativa del celular o lector QR preinstalado y se abre en segundos. No hay tiempos de espera ni registros.'
    },
    {
      id: '7',
      question: '¿En cuánto tiempo se activa en mi negocio gastronómico tras realizar el registro?',
      answer: 'Tu tiempo importa. Una vez registras tus datos a través de nuestro formulario de oferta, un consultor técnico se asignará a tu cuenta en menos de 12 horas hábiles. Diseñamos las plantillas para tu menú, parametrizamos tus mesas, cargamos tu ficha de Google Maps y generamos tus códigos listos. Además, te damos una guía rápida en video de 5 minutos para instruir de por vida a tus camareros sin dolores de cabeza.'
    },
    {
      id: '8',
      question: '¿Hay contratos con plazos mínimos forzosos de permanencia o penalizaciones adicionales?',
      answer: 'De ninguna manera. No nos interesan las ataduras ni los contratos de retención complicados. En el Plan Mensual tienes la libertad completa de pausar o solicitar la baja en el momento que consideres oportuno sin penalizaciones, recargos adicionales ni tarifas ocultas. En el Plan Anual, realizas un único pago ultra-reducido por adelantado con un ahorro rotundo anual y estabilidad técnica sin sorpresas.'
    },
    {
      id: '9',
      question: '¿Gozará de soporte post-venta constante si mi menú cambia o deseo agregar mesas?',
      answer: 'Estarás plenamente acompañado. Nuestro canal de soporte especializado vía correo electrónico (radar360negociosgastronomicos@gmail.com) y mesa de ayuda directa estará disponible para ti los 365 días del año. Si decides remodelar la sala, añadir mesas adicionales o reconfigurar las zonas, nosotros actualizaremos tu base de códigos QR sin coste adicional para ti.'
    },
    {
      id: '10',
      question: '¿Qué garantía tengo de que el sistema realmente funcionará?',
      answer: 'Dispones de nuestra firme Garantía de Satisfacción Total de 30 días. Si durante el primer mes sientes que las solicitudes de llamado del camarero en mesa o el sistema de filtro inteligente contra reseñas maliciosas no traen más comensales recurrentes ni blindan tu cocina, procesaremos tu reembolso de forma honesta y transparente.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-950 font-sans px-4 relative overflow-hidden" id="faq-section">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-[#facc15] px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20 mb-3 text-center">
            <HelpCircle className="w-3.5 h-3.5" /> SOPORTE Y TRANSPARENCIA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Todo lo que necesitas saber antes de dar el paso tecnológico que blindará tu reputación.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700/80"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 text-white hover:text-[#facc15] transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#facc15]' : ''}`}>
                    <ChevronDown className="w-4.5 h-4.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-slate-850">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-2xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Soporte Técnico 24/7 Garantizado
          </div>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold max-w-md mx-auto">
            ¿Tienes alguna duda o inconveniente? Contáctanos de inmediato a cualquier hora:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Correo Directo */}
            <a
              href="mailto:radar360negociosgastronomicos@gmail.com"
              className="flex flex-col items-center justify-center p-5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-2xl transition-all hover:border-slate-700 hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-2 text-[#facc15] group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Correo Directo</span>
              <span className="text-xs text-[#facc15] font-mono mt-1 select-all break-all text-center">
                radar360negociosgastronomicos@gmail.com
              </span>
            </a>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/5492613601613"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-2xl transition-all hover:border-green-500/30 hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-2 text-green-400 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.486 0 9.95-4.46 9.954-9.952 0-2.659-1.034-5.159-2.912-7.038C16.538 1.737 14.043.743 11.383.743c-5.491 0-9.957 4.464-9.96 9.957-.001 1.614.425 3.19 1.233 4.595L1.58 20.694l5.067-1.33c1.397.763 2.946 1.168 4.514 1.168h.001zm11.353-7.054c-.302-.15-1.78-.879-2.056-.979-.275-.1-.476-.15-.676.15-.2.3-.777.979-.952 1.178-.175.2-.351.224-.653.075-.302-.15-1.274-.469-2.427-1.496-.897-.8-1.502-1.787-1.678-2.087-.175-.3-.019-.461.13-.611.135-.134.302-.35.453-.524.151-.175.201-.3.302-.5.101-.2.05-.376-.025-.526-.075-.15-.676-1.629-.926-2.228-.244-.588-.492-.507-.676-.516-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.801.376-.275.3-1.053 1.028-1.053 2.507s1.077 2.903 1.228 3.102c.15.2 2.119 3.235 5.132 4.534.717.31 1.275.494 1.71.633.721.23 1.377.198 1.896.12.578-.088 1.78-.728 2.03-1.429.25-.7.25-1.3.175-1.43-.075-.13-.275-.205-.577-.355z" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp Soporte</span>
              <span className="text-xs text-green-400 font-mono mt-1 whitespace-nowrap select-all text-center">
                +54 9 261 360-1613
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
