let editingClientId = null;

function addClient() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const debt = document.getElementById('debt').value;
  const phone = document.getElementById('phone').value;

  db.collection("clients").add({
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
  db.collection("clients").get().then(snapshot => {
    snapshot.forEach(doc => {
      const client = doc.data();
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${client.firstName} ${client.lastName}</strong><br>
        Χρωστάει: €${client.debt} | Τηλέφωνο: ${client.phone}
        <br>
        <button onclick="editClient('${doc.id}', '${client.firstName}', '${client.lastName}', '${client.debt}', '${client.phone}')">Επεξεργασία</button>
        <button onclick="confirmDelete('${doc.id}')">Διαγραφή</button>
      `;
      list.appendChild(li);
    });
  });
}

function editClient(id, firstName, lastName, debt, phone) {
  editingClientId = id;
  document.getElementById('editForm').style.display = 'block';
  document.getElementById('editFirstName').value = firstName;
  document.getElementById('editLastName').value = lastName;
  document.getElementById('editDebt').value = debt;
  document.getElementById('editPhone').value = phone;
}

function saveEdit() {
  const updatedData = {
    firstName: document.getElementById('editFirstName').value,
    lastName: document.getElementById('editLastName').value,
    debt: document.getElementById('editDebt').value,
    phone: document.getElementById('editPhone').value
  };

  db.collection("clients").doc(editingClientId).update(updatedData).then(() => {
    document.getElementById('editForm').style.display = 'none';
    loadClients();
  });
}

function cancelEdit() {
  document.getElementById('editForm').style.display = 'none';
  editingClientId = null;
}

function confirmDelete(id) {
  if (confirm("Θέλεις σίγουρα να διαγράψεις αυτόν τον πελάτη;")) {
    db.collection("clients").doc(id).delete().then(() => {
      loadClients();
    });
  }
}

window.onload = loadClients;
