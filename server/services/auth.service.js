import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

// TODO : DON'T FORGET TO ADD NEW CERT FROM FIREBASE
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default getAuth();
