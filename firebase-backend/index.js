const express = require("express");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const cors = require("cors");

// Ladda miljövariabler
dotenv.config();

// Initiera Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());


app.use(
    cors({
      origin: "http://localhost:5173", // Tillåt endast din frontend
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Tillåtna metoder
      allowedHeaders: ["Content-Type", "Authorization"], // Tillåtna headers
    })
  );
  app.options("*", cors());
  
// Importera rutter
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
