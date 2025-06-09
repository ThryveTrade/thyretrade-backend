const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.joinChallenge = functions.https.onCall(async (data, context) => {
// your join logic...
});

// ✅ Paste the new function here
exports.testFunction = functions.https.onRequest((req, res) => {
res.send("🔥 Firebase Function is working!");
});