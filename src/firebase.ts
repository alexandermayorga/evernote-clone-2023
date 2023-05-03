// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Timestamp, addDoc, collection, getFirestore } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";
import { OutputData } from "@editorjs/editorjs";
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
  measurementId: "G-8XVBQCQJTX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(firebaseApp);


async function saveToDB(content:OutputData, user: User) {
  console.log(content);
  return;

  try {
    const docRef = await addDoc(collection(firestore, "notes"), {
      author: user?.email || "nouser@test.com",
      title: "The title of the note",
      content: content,
      created: new Date().getTime(),
      updated: Timestamp.now(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export default firebaseApp;