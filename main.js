
const db = firebase.database().ref("clients");

function addClient() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const debt = document.getElementById("debt").value;
  const phone = document.getElementById("phone").value;

  db.push({
    firstName,
    lastName,
    debt,
    phone
  });

  clearInputs();
}

function clearInputs() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("debt").value = "";
  document.getElementById("phone").value = "";
}

function loadClients() {
  const list = document.getElementById("clientList");
  db.on("value", (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach((child) => {
      const client = child.val();
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${client.firstName} ${client.lastName}</strong><br />
        Χρωστάει: €${client.debt} | Τηλέφωνο: ${client.phone}
        <br />
        <button onclick="confirmDelete('${child.key}')">Διαγραφή</button>
      `;
      list.appendChild(li);
    });
  });
}

function confirmDelete(id) {
  if (confirm("Θέλεις σίγουρα να διαγράψεις αυτόν τον πελάτη;")) {
    db.child(id).remove();
  }
}

window.onload = loadClients;
