// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL64q9KLVM0lkVsI47XCW5nPXXYYt6K5M",
  authDomain: "evernote-clone-2023.firebaseapp.com",
  projectId: "evernote-clone-2023",
  storageBucket: "evernote-clone-2023.appspot.com",
  messagingSenderId: "853893628954",
  appId: "1:853893628954:web:bb688c33b64435579efda3",
  measurementId: "G-8XVBQCQJTX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const COLLECTION_NOTES = "notes";

export function createNote(userUID: string): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTION_NOTES), {
    author: userUID,
    title: "Untitled",
    content: null,
    created: Timestamp.now(),
    updated: Timestamp.now(),
  });
}

/**
 * Saves a New Document to DB
 * @param id Note Id in Firebase
 * @param title Note Title
 * @param content Editor JS Output Data as JSON string
 * @returns Promise with either the DocRef or an error
 */
export function updateNote(
  noteID: string,
  title: string,
  content: string
): Promise<void> {
  return updateDoc(doc(db, COLLECTION_NOTES, noteID), {
    title,
    content,
    updated: Timestamp.now(),
  });
}

export function getAllNotes(): Promise<QuerySnapshot<DocumentData>> {
  const author = localStorage.getItem("author");
  const q = query(
    collection(db, COLLECTION_NOTES),
    where("author", "==", author),
    orderBy("updated", "desc")
  );
  return getDocs(q);
}

export function getNote(id: string): Promise<DocumentSnapshot<DocumentData>> {
  const docRef = doc(db, COLLECTION_NOTES, id);
  return getDoc(docRef);
}

export function deleteNote(id: string) {
  return deleteDoc(doc(db, COLLECTION_NOTES, id));
}

export default app;
