const firebaseConfig = {
  apiKey: "AIzaSyAqe4HFF63ONdXsG7iMPCqFMG5IY8C19qw",
  authDomain: "pelatologio-864f4.firebaseapp.com",
  databaseURL: "https://pelatologio-864f4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pelatologio-864f4",
  storageBucket: "pelatologio-864f4.appspot.com",
  messagingSenderId: "1082547737442",
  appId: "1:1082547737442:web:6a7a30bd3f8185c814d23b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let userId = null;

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    userId = result.user.uid;
    loadClients();
  });
}

document.getElementById("clientForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!userId) return alert("Συνδεθείτε πρώτα!");
  const firstName = document.getElementById("firstName").value;
  const lastName  = document.getElementById("lastName").value;
  const phone     = document.getElementById("phone").value;
  const email     = document.getElementById("email").value;
  db.ref("clients/" + userId).push({ firstName, lastName, phone, email });
  e.target.reset();
});

function loadClients() {
  const list = document.getElementById("clientList");
  list.innerHTML = "";
  db.ref("clients/" + userId).on("value", snapshot => {
    list.innerHTML = "";
    snapshot.forEach(child => {
      const data = child.val();
      const li = document.createElement("li");
      li.className = "client";
      li.innerHTML = `
        <div class="client-summary">${data.firstName} ${data.lastName}</div>
        <div class="client-details">
          Τηλέφωνο: ${data.phone}<br>
          Email: ${data.email}
        </div>`;
      list.appendChild(li);
    });
  });
}
