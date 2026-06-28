export interface TranslationType {
  promoBanner: string;
  headerDemoLink: string;
  headerFaqLink: string;
  headerCta: string;
  headerLogin: string;
  
  heroTagline: string;
  heroHeadingStart: string;
  heroHeadingHighlight: string;
  heroHeadingEnd: string;
  heroSubheading: string;
  heroQuote: string;
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  heroBadge4: string;
  heroCtaPrimary: string;
  heroCtaDemo: string;
  heroTrustAlerts: string;
  heroTrustSatisfaction: string;

  unlockTagline: string;
  unlockHeading: string;
  unlockSubheading: string;
  
  feature1Title: string;
  feature1Desc: string;
  feature1Badge: string;
  feature2Title: string;
  feature2Desc: string;
  feature2Badge: string;
  feature3Title: string;
  feature3Desc: string;
  feature3Badge: string;
  feature4Title: string;
  feature4Desc: string;
  feature4Badge: string;
  feature5Title: string;
  feature5Desc: string;
  feature5Badge: string;
  unlockCta: string;

  demoTagline: string;
  demoHeading: string;
  demoDesc: string;
  demoCheck1: string;
  demoCheck2: string;
  demoCheck3: string;

  realityTagline: string;
  realityHeading: string;
  realityQuote: string;
  realityLine1: string;
  realityLine2: string;
  realityLine3: string;
  realityLine4: string;
  realityLine5: string;
  realityQuoteBox: string;
  realityLine6: string;
  realityLine7: string;
  realityLine8: string;
  realityList: string[];
  realityLine9: string;
  realityLine10: string;
  realityBoxHeading: string;
  realityBoxDesc1: string;
  realityBoxDesc2: string;
  realityBadge1: string;
  realityBadge2: string;
  realityBadge3: string;
  realityCta: string;

  audienceTagline: string;
  audienceHeading: string;
  audienceTitle1: string;
  audienceDesc1: string;
  audienceTitle2: string;
  audienceDesc2: string;
  audienceTitle3: string;
  audienceDesc3: string;
  audienceQuoteTag: string;
  audienceQuote: string;

  expectTagline: string;
  expectHeading: string;
  expectDesc: string;
  expectTitle1: string;
  expectDesc1: string;
  expectTitle2: string;
  expectDesc2: string;
  expectTitle3: string;
  expectDesc3: string;

  pricingTagline: string;
  pricingHeading: string;
  pricingSubheading: string;
  
  pricingAlt1Tag: string;
  pricingAlt1Title: string;
  pricingAlt1CostLabel: string;
  pricingAlt1Price: string;
  pricingAlt1Range: string;
  pricingAlt1Unit: string;
  pricingAlt1Bullet1: string;
  pricingAlt1Bullet2: string;
  pricingAlt1Bullet3: string;
  pricingAlt1Footer: string;

  pricingAlt2Tag: string;
  pricingAlt2Title: string;
  pricingAlt2CostLabel: string;
  pricingAlt2Price: string;
  pricingAlt2Range: string;
  pricingAlt2Unit: string;
  pricingAlt2Bullet1: string;
  pricingAlt2Bullet2: string;
  pricingAlt2Bullet3: string;
  pricingAlt2Footer: string;

  pricingAlt3Badge: string;
  pricingAlt3Tag: string;
  pricingAlt3Title: string;
  pricingAlt3CostLabel: string;
  pricingAlt3PriceOld: string;
  pricingAlt3Price: string;
  pricingAlt3Unit: string;
  pricingAlt3Bullet1: string;
  pricingAlt3Bullet2: string;
  pricingAlt3Bullet3: string;
  pricingAlt3Bullet4: string;
  pricingAlt3Bullet5: string;
  pricingAlt3CtaMonthly: string;
  pricingAlt3CtaYearly: string;
  pricingAlt3Footer: string;

  summaryHeading: string;
  summaryCheck1Title: string;
  summaryCheck1Desc: string;
  summaryCheck2Title: string;
  summaryCheck2Desc: string;
  summaryCheck3Title: string;
  summaryCheck3Desc: string;
  summaryCheck4Title: string;
  summaryCheck4Desc: string;
  summaryBoxText: string;
  summaryBoxTitle: string;
  summaryBoxSub: string;
  summaryBoxMonthly: string;
  summaryBoxYearly: string;
  summaryBoxFooter: string;

  closingTagline: string;
  closingHeading: string;
  closingSubheading: string;
  closingCardLine1: string;
  closingCardLine2: string;
  closingBtnLabel: string;
  closingBtnMonthly: string;
  closingBtnYearly: string;
  closingFooter: string;

  footerText: string;
  footerMenuHome: string;
  footerMenuBenefits: string;
  footerMenuSupport: string;

  demoPanelTitle: string;
  demoPanelClose: string;
  demoPanelNoLeads: string;
  demoPanelHelper: string;
  demoPanelClear: string;
}

export const translations: Record<'es' | 'en', TranslationType> = {
  es: {
    promoBanner: "OFERTA DE LANZAMIENTO EXCLUSIVA: Descuento del 40% activo por tiempo limitado",
    headerDemoLink: "Prueba Interactiva",
    headerFaqLink: "Preguntas",
    headerCta: "Garantizar Acceso",
    headerLogin: "Acceso Demo",

    heroTagline: "RADAR 360 Negocios Gastronómicos",
    heroHeadingStart: "Convierte clientes felices en ",
    heroHeadingHighlight: "reseñas de Google",
    heroHeadingEnd: " y detecta quejas antes de que destruyan tu reputación",
    heroSubheading: "Sin perseguir clientes para que opinen, sin revisar plataformas una por una, sin descubrir problemas cuando ya es demasiado tarde. Solo un sistema inteligente que captura la experiencia real del cliente — incluso si no estás en el restaurante.",
    heroQuote: "\"El primer sistema que convierte la experiencia de cada mesa en datos, alertas y reseñas que aumentan tus ingresos.\"",
    heroBadge1: "Instalación en 5 Minutos",
    heroBadge2: "Filtro Anti-Reseñas 1★",
    heroBadge3: "Alertas por la app",
    heroBadge4: "100% Sin Hardware Extra",
    heroCtaPrimary: "QUIERO PROTEGER MI REPUTACIÓN AHORA",
    heroCtaDemo: "Probar Demo de Teléfono 📱",
    heroTrustAlerts: "Alertas por la app",
    heroTrustSatisfaction: "Garantía total de satisfacción",

    unlockTagline: "Funcionalidades Clave",
    unlockHeading: "¿Qué desbloquearás con Radar 360?",
    unlockSubheading: "La artillería digital más completa del mercado gastronómico para blindar tu negocio las 24 horas.",
    
    feature1Title: "Sistema QR Inteligente de Atención Instantánea",
    feature1Desc: "Tus clientes pueden llamar al mesero, pedir la cuenta, solicitar ayuda o reportar problemas en segundos desde su celular. Menos espera. Más satisfacción para la clientela.",
    feature1Badge: "Cero Esperas",
    feature2Title: "Filtro de Reputación Automático",
    feature2Desc: "Los clientes felices son enviados a Google para dejar reseñas. Los clientes insatisfechos son dirigidos a un canal privado para resolver el problema antes de que se vuelva público en internet.",
    feature2Badge: "Tu Escudo My Business",
    feature3Title: "Panel Unificado de Experiencia",
    feature3Desc: "Todas las solicitudes, comentarios privados y calificaciones de mesas organizadas por fecha en un solo lugar. Sin caos de libretas ni pérdida de información crucial para el negocio.",
    feature3Badge: "Centralización Total",
    feature4Title: "Monitor de Quejas en Tiempo Real",
    feature4Desc: "Detecta disgustos de tus comensales en el instante en que ocurren. Actúa de forma física antes de perder comensales y que paguen molestos.",
    feature4Badge: "Prevención de deserciones",
    feature5Title: "Análisis Inteligente de Tendencias Gastronómicas",
    feature5Desc: "Descubre exactamente qué platillo o bebida está generando malas experiencias, qué números de mesas tienen más problemas y qué horarios están afectando el servicio mensual de tus ventas de manera invisible.",
    feature5Badge: "Optimización de Operaciones",
    unlockCta: "ADQUIRIR MI ACCESO SEGURO",

    demoTagline: "Prueba Interactiva",
    demoHeading: "Filtra las quejas en privado y eleva tus estrellas en Google automáticamente o en un clic",
    demoDesc: "No tienes que adivinar cómo funciona. Escanea el código QR de mesa a la derecha con tu teléfono móvil para experimentar el flujo de un comensal real, o ingresa directamente al panel de administración en vivo para ver cómo se capturan las alertas.",
    demoCheck1: "Los clientes contentos van directos a tu enlace Maps",
    demoCheck2: "Alertas instantáneas en mesa protegen el servicio",
    demoCheck3: "Evita que comensales molestos escriban en TripAdvisor o Google",

    realityTagline: "LA CRUDA REALIDAD DE LA INDUSTRIA",
    realityHeading: "La mayoría de los restaurantes descubre sus problemas cuando ya perdieron al cliente",
    realityQuote: "Un cliente molesto rara vez se queja.",
    realityLine1: "Simplemente se va.",
    realityLine2: "Y después aparece una estrella en Google.",
    realityLine3: "Una.",
    realityLine4: "Destruyendo semanas enteros de esfuerzo de todo tu equipo de cocina y sala.",
    realityQuoteBox: "Mientras tú sigues creyendo que todo está funcionando bien en tu negocio gastronómico.",
    realityLine5: "Porque nadie te avisó.",
    realityLine6: "Porque nadie levantó la mano a tiempo.",
    realityLine7: "Porque cuando finalmente viste el problema en redes, ya estaba publicado frente a miles de nuevos comensales potenciales.",
    realityLine8: "Entonces empiezas a hacer lo que hacen todos los gerentes agobiados...",
    realityList: ["Preguntar a ciegas", "Investigar qué pasó", "Revisar reseñas antiguas", "Hablar con empleados tensos", "Intentar adivinar qué mesa fue"],
    realityLine9: "Demasiado tarde. El daño ya está hecho.",
    realityLine10: "La reputación de tu marca gastronómica ya recibió un golpe que ahuyentará reservas.",
    realityBoxHeading: "Radar 360 Restaurante existe para cambiar eso estructuralmente de raíz.",
    realityBoxDesc1: "Porque si puedes detectar el problema antes de que llegue a Google, puedes solucionarlo con tu personal de sala antes de que se convierta en una pérdida permanente de ventas.",
    realityBoxDesc2: "Y cuando puedes convertir automáticamente a los clientes felices en excelentes comentarios y reseñas positivas, tu reputación online empieza a acumularse y crecer absolutamente sola sin rogar opiniones.",
    realityBadge1: "🚫 No más adivinanzas",
    realityBadge2: "🚫 No más sorpresas",
    realityBadge3: "🎯 Solo control absoluto",
    realityCta: "PROTEGER LA REPUTACIÓN DE MI MESA HOY",

    audienceTagline: "Público Objetivo",
    audienceHeading: "¿Para quién es esto exactamente?",
    audienceTitle1: "Negocios Gastronómicos",
    audienceDesc1: "Restaurantes, cafeterías, bistrós, bares, comedores y hoteles que dependen enteramente de su calificación en estrellas digitales para atraer turismo y nuevos comensales diariamente.",
    audienceTitle2: "Dueños de Negocios",
    audienceDesc2: "Empresarios enfocados que están cansándose de enterarse de los problemas de cocina o servicio cuando ya es demasiado tarde para disculparse con el cliente.",
    audienceTitle3: "Gerentes y Administradores",
    audienceDesc3: "Gerentes proactivos que quieren controlar de veras la experiencia de cada mesa sin andar persiguendo clientes ni depender de reportes orales incompletos de los meseros.",
    audienceQuoteTag: "REFUERZO ESTRATÉGICO",
    audienceQuote: "\"Lo que realmente estás comprando no es un simple sistema QR. Estás comprando visibilidad total sobre lo que ocurre en tu negocio antes de que afecte tus ingresos.\"",

    expectTagline: "Garantía y Resultados",
    expectHeading: "¿Qué puedes esperar desde los primeros días?",
    expectDesc: "Retornos reales medidos de manera directa sobre la reputación online de tu sucursal gastronómica.",
    expectTitle1: "Más reseñas positivas en Google",
    expectDesc1: "Transforma clientes de manera real y satisfecha en promotores activos de tu restaurante sin perseguirlos ni rogarles su opinión al pagar.",
    expectTitle2: "Menos reseñas negativas",
    expectDesc2: "Detecta la frustración y quejas de tus clientes inmediatamente en el canal privado de forma que actúes antes de que se convierta en una reseña de 1 estrella.",
    expectTitle3: "Control total de tu negocio",
    expectDesc3: "Sabrás exactamente qué ocurre en tus mesas, cuándo ocurre y qué comidas o meseros presentan mayor número de incidencias o halagos.",

    pricingTagline: "Análisis de Tarifas Comparativo",
    pricingHeading: "Haz cuentas... ¿Cuánto puedes ahorrar hoy?",
    pricingSubheading: "Contratar personal de Mystery Shopper o software de reputación inestable te cuesta miles al año. Mira y compara la diferencia:",
    
    pricingAlt1Tag: "ALTERNATIVA TRADICIONAL",
    pricingAlt1Title: "Consultorías Físicas",
    pricingAlt1CostLabel: "Costo estimado de mercado",
    pricingAlt1Price: "$500",
    pricingAlt1Range: "a",
    pricingAlt1Unit: "/ mes",
    pricingAlt1Bullet1: "Reportes manuales tardados",
    pricingAlt1Bullet2: "No actúan en tiempo real",
    pricingAlt1Bullet3: "No evitan la queja en Google",
    pricingAlt1Footer: "Poco práctico para la operación diaria.",

    pricingAlt2Tag: "SOFTWARE TRADICIONAL",
    pricingAlt2Title: "Software de Reputación",
    pricingAlt2CostLabel: "Plataformas generales",
    pricingAlt2Price: "$100",
    pricingAlt2Range: "a",
    pricingAlt2Unit: "/ mes",
    pricingAlt2Bullet1: "No enfocados a restaurantes",
    pricingAlt2Bullet2: "Sin integración física inteligente",
    pricingAlt2Bullet3: "Complicada configuración inicial",
    pricingAlt2Footer: "Requiere que el dueño extraiga reportes a mano.",

    pricingAlt3Badge: "OFERTA IRREPETIBLE ACTIVADA",
    pricingAlt3Tag: "LA MEJOR OPCIÓN CON LAUNCH PROMO",
    pricingAlt3Title: "RADAR 360 COMPLETO",
    pricingAlt3CostLabel: "Con el mejor precio garantizado por un año",
    pricingAlt3PriceOld: "$99 USD",
    pricingAlt3Price: "$19,99",
    pricingAlt3Unit: "USD / mes",
    pricingAlt3Bullet1: "Sistema QR de atención instantánea",
    pricingAlt3Bullet2: "Filtro de reseñas seguro de Google",
    pricingAlt3Bullet3: "Bono Centro de Reputación My Business",
    pricingAlt3Bullet4: "Bono Alertas de Riesgo Inmediatas",
    pricingAlt3Bullet5: "Bono Carpeta de Videos de Capacitación 24/7",
    pricingAlt3CtaMonthly: "Suscripción Mensual ($19,99 USD)",
    pricingAlt3CtaYearly: "Suscripción Anual ($199,99 USD)",
    pricingAlt3Footer: "30 días de garantía • Cancela en un clic",

    summaryHeading: "Resumen de lo que te llevas hoy",
    summaryCheck1Title: "Radar 360 Restaurante (Membresía Completa)",
    summaryCheck1Desc: "Atención instantánea mediante código QR de vanguardia en mesa.",
    summaryCheck2Title: "Llamador de Mesero, Cuenta y Asistencia Física",
    summaryCheck2Desc: "Tus clientes piden auxilio o ticket sin andarse levantando.",
    summaryCheck3Title: "Captura y Filtro de Satisfacción en Tiempo Real",
    summaryCheck3Desc: "Conversión automática instantánea de clientes felices directamente en reseñas de Google.",
    summaryCheck4Title: "Bono: Carpeta de Capacitación Compartida",
    summaryCheck4Desc: "Acceso directo a videos instructivos exclusivos: configuración inicial para comenzar, cómo cancelar suscripción de forma rápida y resolución de dudas comunes para capacitar a tu personal.",
    summaryBoxText: "Garantiza este precio de lanzamiento y blinda la recomendación de tu sucursal gastronómica.",
    summaryBoxTitle: "Selecciona tu Plan",
    summaryBoxSub: "Paga de forma 100% segura mediante Hotmart",
    summaryBoxMonthly: "Plan Mensual ($19,99 USD)",
    summaryBoxYearly: "Plan Anual ($199,99 USD)",
    summaryBoxFooter: "* Sin contratos de permanencia obligatorios. Setup asistido llave en mano.",

    closingTagline: "ÚLTIMA OPORTUNIDAD",
    closingHeading: "No se trata de comprar otro software para tu negocio gastronomico... Se trata de decidir si vas a seguir descubriendo los problemas cuando ya están publicados de forma pública en Google.",
    closingSubheading: "O si vas a detectarlos antes.",
    closingCardLine1: "Cada cliente insatisfecho que no logras identificar en mesa es una reseña negativa esperando suceder frente a tus ingresos del mes que viene.",
    closingCardLine2: "Y cada cliente feliz que no aprovechas es una valiosa recomendación perdida que pudo haber traído a diez nuevos grupos. Es hora de blindar tu labor en cocina.",
    closingBtnLabel: "AHORA O NUNCA",
    closingBtnMonthly: "Plan Mensual ($19,99 USD)",
    closingBtnYearly: "Plan Anual ($199,99 USD)",
    closingFooter: "Únete a cientos de marcas gastronómicas inteligentes. Paga en pesos o dólares de forma segura con precio congelado por 1 año.",

    footerText: "RADAR 360 NEGOCIOS GASTRONÓMICOS © 2026",
    footerMenuHome: "Inicio",
    footerMenuBenefits: "Beneficios",
    footerMenuSupport: "Soporte",

    demoPanelTitle: "🛡️ PANEL DEMO: LEADS",
    demoPanelClose: "Cerrar",
    demoPanelNoLeads: "No hay registros de leads localmente todavía.",
    demoPanelHelper: "Somete datos en cualquier botón de CTA de la página para simular la captura.",
    demoPanelClear: "Limpiar Leads Guardados"
  },
  en: {
    promoBanner: "EXCLUSIVE LAUNCH OFFER: 40% discount active for a limited time",
    headerDemoLink: "Interactive Demo",
    headerFaqLink: "Questions",
    headerCta: "Secure Access",
    headerLogin: "Demo Login",

    heroTagline: "RADAR 360 Food Businesses",
    heroHeadingStart: "Convert happy customers into ",
    heroHeadingHighlight: "Google reviews",
    heroHeadingEnd: " and spot complaints before they destroy your reputation",
    heroSubheading: "No chasing customers for feedback, no checking platforms one by one, no discovering issues when it's already too late. Just an intelligent system that captures the customer's real experience — even if you're not at the restaurant.",
    heroQuote: "\"The first system that turns the experience of each table into data, alerts, and reviews that boost your revenue.\"",
    heroBadge1: "5-Minute Setup",
    heroBadge2: "1★ Review Filter",
    heroBadge3: "In-App Alerts",
    heroBadge4: "100% No Extra Hardware",
    heroCtaPrimary: "I WANT TO PROTECT MY REPUTATION NOW",
    heroCtaDemo: "Try Mobile Demo 📱",
    heroTrustAlerts: "In-App Alerts",
    heroTrustSatisfaction: "Full satisfaction guarantee",

    unlockTagline: "Key Features",
    unlockHeading: "What will you unlock with Radar 360?",
    unlockSubheading: "The most complete digital machinery in the gastronomy market to safeguard your business 24/7.",
    
    feature1Title: "Intelligent QR System for Instant Assistance",
    feature1Desc: "Your customers can call the server, ask for the bill, request assistance, or report issues in seconds from their phone. Less waiting. More satisfaction for your guests.",
    feature1Badge: "Zero Waiting Time",
    feature2Title: "Automatic Reputation Filter",
    feature2Desc: "Happy customers are directed to Google to leave reviews. Dissatisfied customers are routed to a private channel to resolve the issue before it goes public on the internet.",
    feature2Badge: "Your My Business Shield",
    feature3Title: "Unified Experience Dashboard",
    feature3Desc: "All requests, private comments, and table ratings organized by date in one place. No notebook chaos or lost critical information for your business.",
    feature3Badge: "Total Centralization",
    feature4Title: "Real-Time Complaint Monitor",
    feature4Desc: "Detect guest complaints the instant they occur. Intervene physically on the floor before losing diners and having them pay upset.",
    feature4Badge: "Churn Prevention",
    feature5Title: "Smart Culinary Trend Analytics",
    feature5Desc: "Discover exactly which dish or drink is causing poor experiences, which table numbers have the most issues, and which times are quietly hurting your monthly sales.",
    feature5Badge: "Operations Optimization",
    unlockCta: "GET SECURE ACCESS NOW",

    demoTagline: "Interactive Demo",
    demoHeading: "Filter complaints privately and raise your Google stars automatically or in one click",
    demoDesc: "You don't have to guess how it works. Scan the table QR code on the right with your mobile phone to experience a real diner's flow, or enter directly into the live admin dashboard to see how alerts are captured.",
    demoCheck1: "Happy customers go directly to your Maps link",
    demoCheck2: "Instant tableside alerts protect the service",
    demoCheck3: "Stop upset diners from writing on TripAdvisor or Google",

    realityTagline: "THE HARSH INDUSTRY REALITY",
    realityHeading: "Most restaurants find out about their problems when they've already lost the customer",
    realityQuote: "An upset customer rarely complains.",
    realityLine1: "They just leave.",
    realityLine2: "And then a 1-star review appears on Google.",
    realityLine3: "Just one.",
    realityLine4: "Wrecking weeks of hard work from your entire kitchen and floor team.",
    realityQuoteBox: "While you keep believing everything is running perfectly in your food business.",
    realityLine5: "Because nobody let you know.",
    realityLine6: "Because nobody raised their hand on time.",
    realityLine7: "Because when you finally saw the issue on social media, it was already published in front of thousands of potential new diners.",
    realityLine8: "Then you start doing what every overwhelmed manager does...",
    realityList: ["Guessing blindly", "Investigating what happened", "Reviewing old ratings", "Talking to tense employees", "Trying to guess which table it was"],
    realityLine9: "Too late. The damage is already done.",
    realityLine10: "Your culinary brand's reputation has already taken a hit that will turn away reservations.",
    realityBoxHeading: "Radar 360 Restaurant exists to structurally fix this from the roots.",
    realityBoxDesc1: "Because if you can catch the issue before it gets to Google, you can resolve it with your floor staff before it becomes a permanent loss of sales.",
    realityBoxDesc2: "And when you can automatically convert happy customers into excellent comments and positive reviews, your online reputation grows absolutely on its own without begging for opinions.",
    realityBadge1: "🚫 No more guessing",
    realityBadge2: "🚫 No more surprises",
    realityBadge3: "🎯 Just absolute control",
    realityCta: "PROTECT MY TABLE'S REPUTATION TODAY",

    audienceTagline: "Target Audience",
    audienceHeading: "Who is this exactly for?",
    audienceTitle1: "Culinary Businesses",
    audienceDesc1: "Restaurants, cafes, bistros, bars, diners, and hotels that rely entirely on their digital star rating to attract tourists and new diners daily.",
    audienceTitle2: "Business Owners",
    audienceDesc2: "Focused entrepreneurs who are tired of finding out about kitchen or service problems when it is already too late to apologize to the customer.",
    audienceTitle3: "Managers & Administrators",
    audienceDesc3: "Proactive managers who want real control over the experience at each table without chasing customers or relying on incomplete verbal reports from servers.",
    audienceQuoteTag: "STRATEGIC REINFORCEMENT",
    audienceQuote: "\"What you are really buying is not a simple QR system. You are buying total visibility over what happens in your business before it hurts your revenue.\"",

    expectTagline: "Guarantee & Results",
    expectHeading: "What can you expect from the very first days?",
    expectDesc: "Real returns measured directly on the online reputation of your food business branch.",
    expectTitle1: "More positive Google reviews",
    expectDesc1: "Turn satisfied customers into active promoters of your restaurant organically, without chasing them or begging at checkout.",
    expectTitle2: "Fewer negative reviews",
    expectDesc2: "Detect customer frustration and complaints instantly on the private channel so you can act before it becomes a 1-star review.",
    expectTitle3: "Complete control of your business",
    expectDesc3: "You'll know exactly what's happening at your tables, when it happens, and which meals or servers present the most incidents or praise.",

    pricingTagline: "Comparative Pricing Analysis",
    pricingHeading: "Do the math... How much can you save today?",
    pricingSubheading: "Hiring mystery shoppers or dealing with unstable reputation software costs you thousands a year. Compare the difference:",
    
    pricingAlt1Tag: "TRADITIONAL ALTERNATIVE",
    pricingAlt1Title: "On-Site Consultations",
    pricingAlt1CostLabel: "Estimated market cost",
    pricingAlt1Price: "$500",
    pricingAlt1Range: "to",
    pricingAlt1Unit: "/ mo",
    pricingAlt1Bullet1: "Slow manual reports",
    pricingAlt1Bullet2: "No real-time action",
    pricingAlt1Bullet3: "Doesn't prevent Google complaints",
    pricingAlt1Footer: "Impractical for daily floor operations.",

    pricingAlt2Tag: "TRADITIONAL SOFTWARE",
    pricingAlt2Title: "Reputation Software",
    pricingAlt2CostLabel: "General purpose platforms",
    pricingAlt2Price: "$100",
    pricingAlt2Range: "to",
    pricingAlt2Unit: "/ mo",
    pricingAlt2Bullet1: "Not tailored for restaurants",
    pricingAlt2Bullet2: "No smart tableside integration",
    pricingAlt2Bullet3: "Complicated initial onboarding",
    pricingAlt2Footer: "Requires owners to extract reports manually.",

    pricingAlt3Badge: "ONETIME PROMO OFFER ACTIVE",
    pricingAlt3Tag: "THE BEST OPTION WITH LAUNCH PROMO",
    pricingAlt3Title: "RADAR 360 COMPLETE",
    pricingAlt3CostLabel: "With the best price locked for an entire year",
    pricingAlt3PriceOld: "$99 USD",
    pricingAlt3Price: "$19.99",
    pricingAlt3Unit: "USD / month",
    pricingAlt3Bullet1: "Intelligent Tableside QR Service Call",
    pricingAlt3Bullet2: "Secure Google Review Star Filter",
    pricingAlt3Bullet3: "Bonus: My Business Reputation Suite",
    pricingAlt3Bullet4: "Bonus: Immediate Real-Time Risk Alerts",
    pricingAlt3Bullet5: "Bonus: 24/7 Training & Setup Video Library",
    pricingAlt3CtaMonthly: "Monthly Subscription ($19.99 USD)",
    pricingAlt3CtaYearly: "Annual Subscription ($199.99 USD)",
    pricingAlt3Footer: "30-day money-back guarantee • Cancel anytime",

    summaryHeading: "Summary of everything you get today",
    summaryCheck1Title: "Radar 360 Restaurant (Full Membership)",
    summaryCheck1Desc: "Instant service calling via cutting-edge tableside QR codes.",
    summaryCheck2Title: "Server Call, Bill, and Physical Assistance buttons",
    summaryCheck2Desc: "Your guests request help or their check without getting up.",
    summaryCheck3Title: "Real-Time Satisfaction Filter & Capture",
    summaryCheck3Desc: "Instant automatic conversion of happy diners directly into real Google reviews.",
    summaryCheck4Title: "Bonus: Shared Onboarding Video Library",
    summaryCheck4Desc: "Direct access to exclusive setup and training videos: initial walkthrough, quick cancel methods, and answers to common staff questions.",
    summaryBoxText: "Guarantee this launch price and safeguard your restaurant's online standing.",
    summaryBoxTitle: "Choose Your Plan",
    summaryBoxSub: "Pay 100% securely through Hotmart",
    summaryBoxMonthly: "Monthly Plan ($19.99 USD)",
    summaryBoxYearly: "Annual Plan ($199.99 USD)",
    summaryBoxFooter: "* No binding long-term contracts. Guided turnkey setup.",

    closingTagline: "LAST CHANCE OFFER",
    closingHeading: "It's not about buying another software for your restaurant... It's about deciding whether you'll keep discovering issues when they are already published on Google.",
    closingSubheading: "Or if you are going to catch them first.",
    closingCardLine1: "Every unhappy customer you fail to identify at the table is a negative review waiting to happen, threatening next month's reservations.",
    closingCardLine2: "And every happy customer you miss is a valuable referral lost that could have brought in ten new tables. It's time to shield your kitchen's hard work.",
    closingBtnLabel: "NOW OR NEVER",
    closingBtnMonthly: "Monthly Plan ($19.99 USD)",
    closingBtnYearly: "Annual Plan ($199.99 USD)",
    closingFooter: "Join hundreds of smart food brands. Pay securely in pesos or dollars with the price locked for 1 year.",

    footerText: "RADAR 360 FOOD BUSINESSES © 2026",
    footerMenuHome: "Home",
    footerMenuBenefits: "Benefits",
    footerMenuSupport: "Support",

    demoPanelTitle: "🛡️ DEMO PANEL: LEADS",
    demoPanelClose: "Close",
    demoPanelNoLeads: "No local lead records saved yet.",
    demoPanelHelper: "Submit data in any CTA button on the page to simulate lead capture.",
    demoPanelClear: "Clear Saved Leads"
  }
};
