function addClient() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const debt = document.getElementById("debt").value;
  const phone = document.getElementById("phone").value;

  db.collection("clients").add({
    firstName,
    lastName,
    debt,
    phone
  });

  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("debt").value = "";
  document.getElementById("phone").value = "";
}

function deleteClient(id) {
  const confirmDelete = confirm("Θέλεις σίγουρα να διαγράψεις αυτόν τον πελάτη;");
  if (confirmDelete) {
    db.collection("clients").doc(id).delete();
  }
}

function editClient(id, currentData) {
  const newFirstName = prompt("Νέο όνομα:", currentData.firstName);
  const newLastName = prompt("Νέο επίθετο:", currentData.lastName);
  const newDebt = prompt("Νέα χρωστούμενα:", currentData.debt);
  const newPhone = prompt("Νέο τηλέφωνο:", currentData.phone);

  if (newFirstName && newLastName && newDebt && newPhone) {
    db.collection("clients").doc(id).update({
      firstName: newFirstName,
      lastName: newLastName,
      debt: newDebt,
      phone: newPhone
    });
  }
}

db.collection("clients").onSnapshot(snapshot => {
  const clientList = document.getElementById("clientList");
  clientList.innerHTML = "";
  snapshot.forEach(doc => {
    const client = doc.data();
    const li = document.createElement("li");
    li.textContent = `${client.firstName} ${client.lastName} - Χρωστάει: €${client.debt} - Τηλ: ${client.phone} `;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Επεξεργασία";
    editBtn.onclick = () => editClient(doc.id, client);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Διαγραφή";
    deleteBtn.onclick = () => deleteClient(doc.id);
    li.appendChild(deleteBtn);

    clientList.appendChild(li);
  });
});
