let currentUserId = null;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUserId = user.uid;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    loadClients();
  } else {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('app').style.display = 'none';
  }
});

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .catch(error => alert(error.message));
}

function signOut() {
  firebase.auth().signOut();
}

function addClient() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const debt = document.getElementById('debt').value;
  const phone = document.getElementById('phone').value;

  db.collection("clients").add({
    userId: currentUserId,
    firstName,
    lastName,
    debt,
    phone
  }).then(() => {
    clearInputs();
    loadClients();
  });
}

function clearInputs() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('debt').value = '';
  document.getElementById('phone').value = '';
}

function loadClients() {
  const list = document.getElementById('clientList');
  list.innerHTML = '';
  db.collection("clients").where("userId", "==", currentUserId).get().then(snapshot => {
    snapshot.forEach(doc => {
      const client = doc.data();
      const li = document.createElement('li');
      li.innerHTML = `<strong>${client.firstName} ${client.lastName}</strong><br>
        Χρωστάει: €${client.debt} | Τηλέφωνο: ${client.phone}`;
      list.appendChild(li);
    });
  });
}
