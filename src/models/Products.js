import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

export async function createProduct(data) {
  try {
    const productRef = await addDoc(productsCollection, data);
    return { id: productRef.id, ...data };
  } catch (error) {
    console.error(`Error creating a new product: ${error}`);
  }
}

export async function deleteProduct(id) {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) return false;

    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error(`Error deleting the product with id ${id}: ${error}`);
  }
}

export async function updateProduct(id, data) {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    snapshot.exists() ? await productRef.update(data) : null;

    return { id: snapshot.id, ...data };
  } catch (error) {
    console.error(`Error updating product with id ${id}: ${error}`);
  }
}
