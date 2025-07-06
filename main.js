function addClient() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const debt = parseFloat(document.getElementById('debt').value);
  const phone = document.getElementById('phone').value;

  db.collection("clients").add({
    firstName,
    lastName,
    debt,
    phone
  })
  .then(() => {
    alert("Ο πελάτης καταχωρήθηκε!");
    location.reload();
  })
  .catch((error) => {
    console.error("Σφάλμα στην καταχώριση:", error);
  });
}

function deleteClient(id) {
  const confirmDelete = confirm("Θέλεις σίγουρα να διαγράψεις αυτόν τον πελάτη;");
  if (confirmDelete) {
    db.collection("clients").doc(id).delete();
  }
}

db.collection("clients").onSnapshot(snapshot => {
  const clientList = document.getElementById("clientList");
  clientList.innerHTML = "";
  snapshot.forEach(doc => {
    const client = doc.data();
    const li = document.createElement("li");
    li.textContent = `${client.firstName} ${client.lastName} - Χρωστάει: €${client.debt} - Τηλ: ${client.phone}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Διαγραφή";
    deleteBtn.onclick = () => deleteClient(doc.id);
    li.appendChild(deleteBtn);

    clientList.appendChild(li);
  });
});

