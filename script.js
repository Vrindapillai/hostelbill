function calculateBill() {
  // Get input values
  let days = parseFloat(document.getElementById('days').value);
  let roomRate = parseFloat(document.getElementById('roomRate').value);
  let messRate = parseFloat(document.getElementById('messRate').value);

  // Validate inputs
  if (isNaN(days) || isNaN(roomRate) || isNaN(messRate) || days <= 0 || roomRate < 0 || messRate < 0) {
    document.getElementById('result').innerText = "Please enter valid positive numbers.";
    return;
  }

  // Calculate total
  let roomBill = days * roomRate;
  let messBill = days * messRate;
  let totalBill = roomBill + messBill;

  // Show result
  document.getElementById('result').innerHTML =
    `Hostel Bill Details:
Room Bill: ₹ ${roomBill.toFixed(2)}
Mess Bill: ₹ ${messBill.toFixed(2)}
Total Bill: ₹ ${totalBill.toFixed(2)}`;
}

// Clear form and result
function clearForm() {
  document.getElementById('hostelForm').reset();
  document.getElementById('result').innerText = "";
}
