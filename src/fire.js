import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDhCE3KIQZddVCEcZbLkHs62cxMfE2A2Cc",
    authDomain: "ig-clone-9bf7a.firebaseapp.com",
    projectId: "ig-clone-9bf7a",
    storageBucket: "ig-clone-9bf7a.appspot.com",
    messagingSenderId: "1000189268887",
    appId: "1:1000189268887:web:d5c54bddf3de26c72fead2"
})

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };
