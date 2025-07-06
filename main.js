function addClient() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const debt = parseFloat(document.getElementById('debt').value);
  const phone = document.getElementById('phone').value;

  if (!firstName || !lastName || isNaN(debt) || !phone) {
    alert("Συμπλήρωσε όλα τα πεδία σωστά.");
    return;
  }

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