function addClient() {
  const client = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    debt: parseFloat(document.getElementById("debt").value),
    phone: document.getElementById("phone").value.trim()
  };

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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitBtn").addEventListener("click", addClient);
