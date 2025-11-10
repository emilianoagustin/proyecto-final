import { db } from "./firebase.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const productsCollection = collection(db, "products");

export async function getAllProducts() {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error retrieving products data: ${error}`);
  }
}

export async function getProductById(id) {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error(`Error retrieving data from product with id ${id}: ${error}`);
  }
}
