const provider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("userInfo").innerText = "Συνδέθηκες ως: " + user.displayName;
      loadClients(user.uid);
    })
    .catch(console.error);
}

function signOut() {
  firebase.auth().signOut().then(() => {
    document.getElementById("userInfo").innerText = "Αποσυνδέθηκες";
    document.getElementById("clientList").innerHTML = "";
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("userInfo").innerText = "Καλωσήρθες " + user.displayName;
    loadClients(user.uid);
  }
});

document.getElementById("clientForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  if (!user) return alert("Πρέπει να συνδεθείς πρώτα!");

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const debt = document.getElementById("debt").value;
  const phone = document.getElementById("phone").value;

  firebase.database().ref("clients/" + user.uid).push({
    name, surname, debt, phone
  });

  this.reset();
});

function loadClients(uid) {
  const list = document.getElementById("clientList");
  list.innerHTML = "";
  firebase.database().ref("clients/" + uid).on("value", snapshot => {
    const data = snapshot.val();
    list.innerHTML = "";
    for (let id in data) {
      const client = data[id];
      const li = document.createElement("li");
      li.textContent = `${client.name} ${client.surname} - ${client.debt}€ - ${client.phone}`;
      list.appendChild(li);
    }
  });
}
