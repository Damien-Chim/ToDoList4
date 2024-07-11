
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
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
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getDatabase, ref, set, remove, get, update} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCYYLYvODq2hqevGe3opu4Kn3zAwJt8iaE",
//     authDomain: "todolist3-a71d8.firebaseapp.com",
//     databaseURL: "https://todolist3-a71d8-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "todolist3-a71d8",
//     storageBucket: "todolist3-a71d8.appspot.com",
//     messagingSenderId: "72193973720",
//     appId: "1:72193973720:web:fb5c7adbe3fd390dd3e6ad"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase()

// export function getArr(path) {
//     return get(ref(db, path)).then((snapshot) => {
//         if (snapshot.exists()) {
//             return snapshot.val()
//         }
//         else {
//             return []
//         }
//     })
// }

// export function addArr(newArray, path) {
//     set(ref(db, path), newArray)
// }

// export function removeAllArrays() {
//     remove(ref(db, "Arrays/"))
// }