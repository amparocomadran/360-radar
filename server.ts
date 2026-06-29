import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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

interface OwnerData {
  businessName: string;
  googleMapsUrl: string;
  whatsappPhone: string;
  tables: TableConfig[];
  scans: SimulatedScan[];
}

// In-memory real-time store
const store: Record<string, OwnerData> = {
  "otravueltamza@gmail.com": {
    businessName: "Otra Vuelta Mza",
    googleMapsUrl: "https://maps.app.goo.gl/360RadarOtraVuelta",
    whatsappPhone: "+54 261 456-7890",
    tables: [
      { id: "1", number: 1, qrUrl: "", totalScans: 42, avgRating: 4.8 },
      { id: "2", number: 2, qrUrl: "", totalScans: 35, avgRating: 4.9 },
      { id: "3", number: 3, qrUrl: "", totalScans: 28, avgRating: 4.2 },
      { id: "4", number: 4, qrUrl: "", totalScans: 51, avgRating: 4.7 },
      { id: "5", number: 5, qrUrl: "", totalScans: 19, avgRating: 2.1 }
    ],
    scans: [
      {
        id: "s1",
        timestamp: "Hace 3 minutos",
        tableNumber: 2,
        rating: 5,
        clientFeedback: "¡La atención y las pastas estuvieron excelentes, volveremos!",
        actionTaken: "REDIRECT_GOOGLE"
      },
      {
        id: "s2",
        timestamp: "Hace 11 minutos",
        tableNumber: 5,
        rating: 2,
        clientFeedback: "La carne llegó fría y el mesero tardó mucho en traer la cuenta.",
        actionTaken: "WHATS_ALERT_SENT",
        clientPhone: "+54 261 456-7890"
      },
      {
        id: "s3",
        timestamp: "Hace 45 minutos",
        tableNumber: 1,
        rating: 5,
        actionTaken: "REDIRECT_GOOGLE"
      }
    ]
  }
};

function getOrCreateOwner(email: string): OwnerData {
  const normalized = email.toLowerCase().trim();
  if (!store[normalized]) {
    store[normalized] = {
      businessName: "Mi Restaurante Bistro",
      googleMapsUrl: "https://maps.google.com/?cid=1234567890",
      whatsappPhone: "+54 261 456-7890",
      tables: [
        { id: "1", number: 1, qrUrl: "", totalScans: 12, avgRating: 4.5 },
        { id: "2", number: 2, qrUrl: "", totalScans: 8, avgRating: 4.8 },
        { id: "4", number: 4, qrUrl: "", totalScans: 15, avgRating: 4.7 }
      ],
      scans: [
        {
          id: "init1",
          timestamp: "Hace 2 horas",
          tableNumber: 4,
          rating: 5,
          clientFeedback: "Excelente servicio",
          actionTaken: "REDIRECT_GOOGLE"
        }
      ]
    };
  }
  return store[normalized];
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get all real-time data for an owner
  app.get("/api/data", (req, res) => {
    const email = (req.query.email as string) || "otravueltamza@gmail.com";
    const data = getOrCreateOwner(email);
    res.json(data);
  });

  // API Route: Register new lead and send email via Resend
  app.post("/api/leads", async (req, res) => {
    const { businessName, ownerName, email, phone, plan } = req.body;
    
    console.log("Nuevo lead recibido:", { businessName, ownerName, email, phone, plan });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ RESEND_API_KEY no está configurada en las variables de entorno. Omitiendo envío de email.");
      return res.json({ 
        success: true, 
        message: "Lead registrado localmente en el servidor. Configure RESEND_API_KEY para habilitar notificaciones por email." 
      });
    }

    try {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="border-bottom: 2px solid #facc15; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 20px;">🎯 Nuevo Lead Registrado - RADAR 360</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b;">Un nuevo negocio gastronómico se ha registrado</p>
          </div>
          
          <p style="font-size: 14px; color: #334155; line-height: 1.5; margin-bottom: 20px;">
            ¡Hola! Tienes un nuevo lead listo para seguimiento:
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569; width: 40%; font-size: 13px;">Nombre del Negocio:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px; font-weight: 500;">${businessName || 'No especificado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 13px;">Nombre del Dueño:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px;">${ownerName || 'No especificado'}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 13px;">Email de Contacto:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email || 'No especificado'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 13px;">Teléfono (WhatsApp):</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 13px;">
                <a href="https://wa.me/${(phone || '').replace(/\D/g, '')}" style="color: #16a34a; text-decoration: none; font-weight: 500;">${phone || 'No especificado'}</a>
              </td>
            </tr>
            <tr style="background-color: #fbf7e6;">
              <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #fef3c7; color: #b45309; font-size: 13px;">Plan Seleccionado:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #fef3c7; color: #92400e; font-size: 13px; font-weight: bold; text-transform: uppercase;">
                ${plan === 'yearly' ? 'Membresía Anual ($199,99 USD / año)' : 'Membresía Mensual ($19,99 USD / mes)'}
              </td>
            </tr>
          </table>

          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
            <p style="margin: 0; font-size: 12px; color: #475569; font-weight: 500;">
              💡 Haz clic en el enlace de teléfono o email arriba para contactar directamente al cliente.
            </p>
          </div>
          
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-bottom: 0;">
            Este correo fue enviado de manera automática por el sistema de onboarding de RADAR 360.
          </p>
        </div>
      `;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: "Radar 360 <onboarding@resend.dev>",
          to: ["radar360negociosgastronomicos@gmail.com"],
          subject: `🎯 Nuevo Lead: ${businessName || 'Restaurante'} (${plan === 'yearly' ? 'Plan Anual' : 'Plan Mensual'})`,
          html: emailHtml
        })
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error("Error al enviar email con Resend:", responseData);
        return res.status(500).json({ success: false, error: "Error de Resend", details: responseData });
      }

      console.log("Email enviado exitosamente con Resend:", responseData);
      return res.json({ success: true, resendId: (responseData as any).id });
    } catch (error: any) {
      console.error("Excepción al enviar email con Resend:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  // API Route: Register feedback scan from diner
  app.post("/api/scan", (req, res) => {
    const { email, tableNumber, rating, clientFeedback, actionTaken, clientPhone } = req.body;
    const ownerEmail = email || "otravueltamza@gmail.com";
    const data = getOrCreateOwner(ownerEmail);

    const tableNum = parseInt(tableNumber) || 4;

    const newScan: SimulatedScan = {
      id: `live-${Date.now()}`,
      timestamp: "Hace unos instantes",
      tableNumber: tableNum,
      rating: rating || 5,
      clientFeedback,
      actionTaken: actionTaken || "REDIRECT_GOOGLE",
      clientPhone
    };

    // Prepend to scans log
    data.scans.unshift(newScan);

    // Update corresponding table stats
    data.tables = data.tables.map(t => {
      if (t.number === tableNum) {
        const nextScans = t.totalScans + 1;
        const currentRating = rating || 5;
        const newAvg = parseFloat(((t.avgRating * t.totalScans + currentRating) / nextScans).toFixed(1));
        return {
          ...t,
          totalScans: nextScans,
          avgRating: newAvg > 5 ? 5 : newAvg
        };
      }
      return t;
    });

    res.json({ success: true, scan: newScan });
  });

  // API Route: Add table
  app.post("/api/tables/add", (req, res) => {
    const { email, number } = req.body;
    const ownerEmail = email || "otravueltamza@gmail.com";
    const data = getOrCreateOwner(ownerEmail);

    const num = parseInt(number);
    if (isNaN(num)) {
      return res.status(400).json({ error: "Número inválido" });
    }

    if (data.tables.some(t => t.number === num)) {
      return res.status(400).json({ error: "La mesa ya existe" });
    }

    const newTable: TableConfig = {
      id: Date.now().toString(),
      number: num,
      qrUrl: "",
      totalScans: 0,
      avgRating: 5.0
    };

    data.tables.push(newTable);
    data.tables.sort((a, b) => a.number - b.number);

    res.json({ success: true, tables: data.tables });
  });

  // API Route: Remove table
  app.post("/api/tables/remove", (req, res) => {
    const { email, id } = req.body;
    const ownerEmail = email || "otravueltamza@gmail.com";
    const data = getOrCreateOwner(ownerEmail);

    data.tables = data.tables.filter(t => t.id !== id);
    res.json({ success: true, tables: data.tables });
  });

  // API Route: Update settings
  app.post("/api/settings", (req, res) => {
    const { email, businessName, googleMapsUrl, whatsappPhone } = req.body;
    const ownerEmail = email || "otravueltamza@gmail.com";
    const data = getOrCreateOwner(ownerEmail);

    if (businessName) data.businessName = businessName;
    if (googleMapsUrl) data.googleMapsUrl = googleMapsUrl;
    if (whatsappPhone) data.whatsappPhone = whatsappPhone;

    res.json({ success: true, settings: { businessName: data.businessName, googleMapsUrl: data.googleMapsUrl, whatsappPhone: data.whatsappPhone } });
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
