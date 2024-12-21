const admin = require("firebase-admin");

// Sätt rollen "superadmin" för en användare
const setSuperAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: "superadmin" });
    res.status(200).json({ message: `Superadmin roll har satts för ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Godkänn en pending admin
const approveAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: "admin" });

    const db = admin.firestore();
    await db.collection("admins").doc(user.uid).update({ role: "admin" });

    res.status(200).json({ message: `Admin godkänd för ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrera en ny admin med status "pending"
const registerAdmin = async (req, res) => {
  const { email, password, city } = req.body;

  if (!email || !password || !city) {
    return res.status(400).json({ error: "Alla fält måste fyllas i." });
  }

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    const db = admin.firestore();
    await db.collection("admins").doc(user.uid).set({
      email,
      role: "pending",
      city,
    });

    res.status(201).json({ message: `Admin registrerad med status "pending": ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    
    const user = await admin.auth().getUserByEmail(email);

    // Hämta användarens custom claims
    const userClaims = user.customClaims || {};
    const role = userClaims.role || "user"; 

    // Kontrollera om användaren har admin-behörighet
    if (role !== "admin" && role !== "superadmin") {
      return res.status(403).json({ error: "Access denied. Not an admin." });
    }

    // Generera en custom token för användaren
    const token = await admin.auth().createCustomToken(user.uid);


    return res.status(200).json({
      success: true,
      message: `Welcome ${email}`,
      token,
    });
  } catch (error) {
    console.error("Backend error:", error);

    
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ error: "User not found." });
    }

  
    return res.status(500).json({ error: "Internal server error." });
  }
};



module.exports = { registerAdmin, setSuperAdmin, approveAdmin, adminLogin };
