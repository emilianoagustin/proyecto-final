import { db } from "./firebase.js";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const usersCollection = collection(db, "users");

export async function registerUser(email, passwordHash) {
  try {
    const userRef = await addDoc(usersCollection, {
      email,
      password: passwordHash,
    });
    return { id: userRef.id, email };
  } catch (error) {
    console.error(`Error with user register: ${error}`);
  }
}

export async function findUserByEmail(email) {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error finding user email: ${error}`);
  }
}
