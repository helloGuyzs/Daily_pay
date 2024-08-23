const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUser = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({error: "Only POST requests are allowed"});
  }

  let {fullName, mobileNumber, panNumber, managerId} = req.body;

  if (!fullName || !mobileNumber || !panNumber) {
    return res.status(400).send({error: "Missing required fields"});
  }

  // Mobile number validation
  mobileNumber = mobileNumber.replace(/\D/g, "");
  if (mobileNumber.length !== 10) {
    return res.status(400).send({error: "Invalid mobile number"});
  }

  // PAN number validation
  panNumber = panNumber.toUpperCase();
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panPattern.test(panNumber)) {
    return res.status(400).send({error: "Invalid PAN number"});
  }

  // Manager ID validation
  if (managerId) {
    const managerRef = admin.firestore().collection("managers").doc(managerId);
    const managerDoc = await managerRef.get();
    if (!managerDoc.exists) {
      return res.status(400).send({error: "Invalid manager ID"});
    }
  }

  const userRef = admin.firestore().collection("users").doc();
  await userRef.set({
    fullName,
    mobileNumber,
    panNumber,
    managerId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isActive: true,
  });

  res.status(201).send({message: "User created successfully"});
});

exports.getUsers = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({error: "Only POST requests are allowed"});
  }

  let {userId, mobileNumber, managerId} = req.body;

  if ((userId && (mobileNumber || managerId)) || (mobileNumber && managerId)) {
    return res.status(400).send({error: "Only one filter can be applied"});
  }

  let query = admin.firestore().collection("users");

  if (userId) {
    query = query.doc(userId);
  } else if (mobileNumber) {
    mobileNumber = mobileNumber.replace(/\D/g, "");
    query = query.where("mobileNumber", "==", mobileNumber);
  } else if (managerId) {
    query = query.where("managerId", "==", managerId);
  }

  try {
    const snapshot = await query.get();
    if (snapshot.empty) {
      return res.status(200).send({users: []});
    }

    const users = snapshot.docs.map((doc) => ({
      userId: doc.id,
      ...doc.data(),
    }));

    res.status(200).send({users});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});
