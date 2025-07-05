const firebaseConfig = {
  apiKey: "AIzaSyAqe4HFF63ONdXsG7iMPCqFMG5IY8C19qw",
  authDomain: "pelatologio-864f4.firebaseapp.com",
  projectId: "pelatologio-864f4",
  storageBucket: "pelatologio-864f4.firebasestorage.app",
  messagingSenderId: "1082547737442",
  appId: "1:1082547737442:web:6a7a30bd3f8185c814d23b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const wordInput = document.getElementById("wordInput");
const wordList = document.getElementById("wordList");

function addWord() {
  const word = wordInput.value.trim();
  if (word) {
    db.collection("words").add({ text: word }).then(() => {
      wordInput.value = "";
    });
  }
}

db.collection("words").onSnapshot((snapshot) => {
  wordList.innerHTML = "";
  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    wordList.appendChild(li);
  });
});
