import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAz8MIvKk1UxgMZpDiI_RcWpydzn-yi8Zc",
    authDomain: "mini-project-27e4f.firebaseapp.com",
    projectId: "mini-project-27e4f",
    storageBucket: "mini-project-27e4f.appspot.com",
    messagingSenderId: "981347796759",
    appId: "1:981347796759:web:1e1387ded66c53caf91952",
    measurementId: "G-ER9WYWZ82M"
};

const app = initializeApp(firebaseConfig);


export const store = getStorage(app);




