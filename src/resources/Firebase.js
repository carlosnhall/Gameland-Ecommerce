/* import { toast, Slide } from "react-toastify"; */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, query, where, collection, getDocs, Timestamp, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA_8qlf3fmFx75ZEChMhm-YLDxRinBaph8",
  authDomain: "gameland-coder.firebaseapp.com",
  projectId: "gameland-coder",
  storageBucket: "gameland-coder.appspot.com",
  messagingSenderId: "95532986554",
  appId: "1:95532986554:web:9d6c734b0d86796b6e5283"
};

const app = initializeApp(firebaseConfig)

export const firestoreDB = getFirestore(app)

export async function getItems() {
  const itemsCollection = collection(firestoreDB, 'products')
  const itemsSnapshot = await getDocs(itemsCollection)
  return itemsSnapshot.docs.map(item => {
    return { ...item.data(), id: item.id }
  })
}

export async function getItemsByCategory(category) {
  const itemsCollection = collection(firestoreDB, 'products')
  const categoryQuery = query(itemsCollection, where('category', '==', category))
  const itemsSnapshot = await getDocs(categoryQuery)
  return itemsSnapshot.docs.map(item => {
    return { ...item.data(), id: item.id }
  })
}

export async function getItem(id) {
  const itemsCollection = collection(firestoreDB, 'products')
  const docref = doc(itemsCollection, id)
  const itemSnapshot = await getDoc(docref)
  return { ...itemSnapshot.data(), id: itemSnapshot.id }
}

export async function submitOrder(order) {
  const date = Timestamp.now()
  const timestampedOrder = { ...order, date }
  const ordersCollection = collection(firestoreDB, 'orders')
  const sentOrder = await addDoc(ordersCollection, timestampedOrder)
  return(sentOrder.id)
}

export async function getOrderById(id) {
  const ordersCollection = collection(firestoreDB, 'orders')
  const docref = doc(ordersCollection, id)
  const orderSnapshot = await getDoc(docref)
  return orderSnapshot.data() && { ...orderSnapshot.data(), id: orderSnapshot.id }
}
