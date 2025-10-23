const admin = require("firebase-admin");
const path = require("path");

(async () => {
  try {
    // 🔹 Load credential service account
    const serviceAccount = require(path.join(process.cwd(), "database", "database.js"));

    // 🔹 Inisialisasi Firebase
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    const db = admin.firestore();
    const doc = await db.collection("whitelist").doc(TOKEN).get();

    // 🔹 Cek token di Firestore
    if (doc.exists && doc.data().token === TOKEN) {
      console.log("✅ Verifikasi token sukses.");

      // 🔹 Update verified di semua konteks
      try {
        verified = true;
        if (typeof globalThis !== "undefined") globalThis.verified = true;
      } catch (e) {
        if (typeof globalThis !== "undefined") globalThis.verified = true;
      }

    } else {
      console.log("❌ Token tidak valid atau tidak terdaftar.");
      process.exit(1);
    }

  } catch (err) {
    console.log("⚠️ Gagal verifikasi:", err.message);
    process.exit(1);
  }
})();