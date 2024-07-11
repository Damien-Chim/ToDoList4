// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    getDoc,
    setDoc
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

var signUpButton = document.getElementById('signUpButton')
signUpButton.addEventListener('click', function(event) {
    event.preventDefault()
    const auth = getAuth()
    const db = getFirestore()

    var firstName = document.getElementById('registerFirstNameInput').value
    var lastName = document.getElementById('registerLastNameInput').value
    var email = document.getElementById('registerEmailInput').value
    var password = document.getElementById('registerPasswordInput').value

    // save to authentication
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user

        // to be saved into the database
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            uniqueIdentifier: user.uid,
            array: [],
            arrayStatus: []
        }
        alert("Account created successfully")
        // save to database
        setDoc(doc(db, "USERS", user.uid), userData)
        .then(() => {
            window.location.href = 'homepage.html'
        })
        .catch((error) => {
            console.log("error saving information to database", error)
        })
    })

    .catch((error) => {
        var errorCode = error.code
        if (errorCode === 'auth/email-already-in-use') {
            alert("Email already in use")
        }
        
        else if (errorCode === 'auth/weak-password'){
            alert("Password must be at least 6 characters long")
        }

        else {
            alert('Unable to create user')
        }
    })
})

var signInButton = document.getElementById('signInButton')
signInButton.addEventListener('click', function(event) {
    event.preventDefault()
    
    var email = document.getElementById('emailInput').value
    var password = document.getElementById('passwordInput').value
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        localStorage.setItem('currentDeviceUser', user.uid)
        window.location.href = 'homepage.html'
    })
    .catch((error) => {
        const errorCode = error.code
        if (errorCode === 'auth/invalid-credential') {
            alert("Incorrect email or password")
        }

        else if (errorCode === 'auth/missing-password') {
            alert("Please enter your password")
        }

        else {
            alert("Account does not exist")
        }
    })
})