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
