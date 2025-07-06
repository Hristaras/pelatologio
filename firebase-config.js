const firebaseConfig = {
  apiKey: "AIzaSyBQD6HW1wWf-5pJITQgJMRbvcRKdpCSm_c",
  authDomain: "pelatologio2.firebaseapp.com",
  databaseURL: "https://pelatologio2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pelatologio2",
  storageBucket: "pelatologio2.firebasestorage.app",
  messagingSenderId: "463233168409",
  appId: "1:463233168409:web:adf751fba0851e23042688"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
