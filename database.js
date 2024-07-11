
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    getDoc,
    setDoc,
    updateDoc

} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyO-YU26vgTVOiHUAAsIjf5EKezHzIs80",
  authDomain: "todolist4-9a02c.firebaseapp.com",
  projectId: "todolist4-9a02c",
  storageBucket: "todolist4-9a02c.appspot.com",
  messagingSenderId: "418956479023",
  appId: "1:418956479023:web:d8521bcc43c902e57a94da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export function getArr(idOfCurrentUser) {
    return getDoc(doc(db, "USERS", idOfCurrentUser))
    .then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.data().array
        }
    })
}

export function getArrStatus(idOfCurrentUser) {
    return getDoc(doc(db, "USERS", idOfCurrentUser))
    .then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.data().arrayStatus
        }
    })
}

export function addArr(newArray, idOfCurrentUser) {
    updateDoc(doc(db, 'USERS', idOfCurrentUser), {
        array: newArray
    })
}

export function addArrStatus(newArrayStatus, idOfCurrentUser) {
    updateDoc(doc(db, 'USERS', idOfCurrentUser), {
        arrayStatus: newArrayStatus
    })
}

export function getUserFirstName(idOfCurrentUser) {
    return getDoc(doc(db, "USERS", idOfCurrentUser))
    .then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.data().firstName
        }
    })
}