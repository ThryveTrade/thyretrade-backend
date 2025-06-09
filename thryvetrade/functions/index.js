const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// ✅ Log when a user contacts a broker
exports.logBrokerContact = functions.https.onCall(async (data, context) => {
  const {userId, brokerId, actionType} = data;

  await db.collection("brokerLogs").add({
    userId,
    brokerId,
    actionType,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {success: true};
});

// ✅ Mark a broker as verified
exports.verifyBroker = functions.https.onCall(async (data, context) => {
  const {brokerId} = data;

  await db.collection("brokerVerifications").doc(brokerId).set({
    verified: true,
    verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {success: true};
});
