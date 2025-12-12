// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjSDHqvQvr5dHJ_nvdIU7yaCKUwRCP_TM",
  authDomain: "pawana-project.firebaseapp.com",
  projectId: "pawana-project",
  storageBucket: "pawana-project.firebasestorage.app",
  messagingSenderId: "714586399733",
  appId: "1:714586399733:web:80206df7969f287db0f6bc",
  measurementId: "G-E881KSJDTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);


export const addContactMessage = async (formData) => {
  try {
    const docRef = await addDoc(collection(firestore, "contactMessages"), formData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Re-throw the error to handle it in the component
  }
};



export { firestore };