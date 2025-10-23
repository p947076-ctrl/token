const admin = require("firebase-admin");

// Verifikasi token
(async () => {
  try {
    const serviceAccount = require("./database/database.js");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();
    const doc = await db.collection("whitelist").doc(TOKEN).get();

    if (doc.exists && doc.data().token === TOKEN) {
      console.log("✅ Verifikasi token sukses.");
      verified = true;
    } else {
      console.log("❌ Token tidak valid atau tidak terdaftar.");
      process.exit(1);
    }
  } catch (err) {
    console.log("⚠️ Gagal verifikasi:", err.message);
    process.exit(1);
  }
})();