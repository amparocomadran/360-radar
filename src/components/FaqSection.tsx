import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, HelpCircle as HelpIcon } from 'lucide-react';
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
      id: '6',
      question: '¿Qué incluye el Bono de Centro de Reputación y el Reporte AI de correo semanal?',
      answer: 'El panel unificado te permite monitorear todos los comentarios recopilados, identificar picos de quejas por mesa u horario, y registrar las resoluciones. Por su parte, la inteligencia artificial de Radar 360 recopila todos los insights de la semana, organiza las quejas corregidas y sintetiza un informe resumido súper claro que te llegará por correo electrónico. Este te dirá con exactitud qué fortalezas destacar en cocina y qué puntos débiles reforzar con tus meseros o personal de barra.'
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
      question: '¿Gozaré de soporte post-venta constante si mi menú cambia o deseo agregar mesas?',
      answer: 'Estarás plenamente acompañado. Nuestro canal de soporte especializado vía correo electrónico (amparocomadranp@gmail.com) y mesa de ayuda directa estará disponible para ti los 365 días del año. Si decides remodelar la sala, añadir mesas adicionales o reconfigurar las zonas, nosotros actualizaremos tu base de códigos QR sin coste adicional para ti.'
    },
    {
      id: '10',
      question: '¿Qué garantía tengo de que el sistema realmente funcionará?',
      answer: 'Dispones de nuestra firme Garantía de Satisfacción Total de 30 días. Si durante el primer mes sientes que las solicitudes de llamado del camarero en mesa, el sistema de filtro inteligente contra reseñas maliciosas o el reporte AI semanal no traen más comensales recurrentes ni blindan tu cocina, procesaremos tu reembolso de forma honesta y transparente.'
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

        <div className="text-center mt-12 bg-slate-900 border border-slate-850 p-6 rounded-2xl">
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            ¿Tienes otra pregunta específica para tu restaurante o cadena gastronómica?
          </p>
          <a
            href="mailto:amparocomadranp@gmail.com"
            className="text-[#facc15] hover:text-yellow-400 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 mt-2 transition-colors hover:underline"
          >
            Pregúntanos por correo directo a nuestro equipo de ingenieros y especialistas
          </a>
        </div>
      </div>
    </section>
  );
}
