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

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const debt = document.getElementById("debt");
const phone = document.getElementById("phone");
const clientList = document.getElementById("clientList");

function addClient() {
  const client = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    debt: parseFloat(debt.value),
    phone: phone.value.trim()
  };

  if (client.firstName && client.lastName && !isNaN(client.debt) && client.phone) {
    db.collection("clients").add(client).then(() => {
      firstName.value = "";
      lastName.value = "";
      debt.value = "";
      phone.value = "";
    });
  }
}

db.collection("clients").onSnapshot((snapshot) => {
  clientList.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.firstName} ${data.lastName} - Χρωστάει €${data.debt.toFixed(2)} - Τηλ: ${data.phone}`;
    clientList.appendChild(li);
  });
});


db.collection("words").onSnapshot((snapshot) => {
  wordList.innerHTML = "";
  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    wordList.appendChild(li);
  });
});
