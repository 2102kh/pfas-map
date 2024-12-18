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
    // Skapa användare i Firebase Authentication
    const user = await admin.auth().createUser({
      email,
      password,
    });

    
    const db = admin.firestore();
    await db.collection("admins").doc(user.uid).set({
      email: email,
      role: "pending",
      city: city,
    });

    res.status(201).json({ message: `Admin registrerad med status "pending": ${email}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerAdmin, setSuperAdmin, approveAdmin };



