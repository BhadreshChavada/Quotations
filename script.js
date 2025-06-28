function addItem(name = '', company = '', price = '', qty = '') {
  const table = document.querySelector('#itemTable tbody');
  const row = table.insertRow();
  row.innerHTML = `
    <td><input type="text" class="itemName" value="${name}"></td>
    <td><input type="text" class="itemCompany" value="${company}"></td>
    <td><input type="text" class="itemPrice" value="${price}"></td>
    <td><input type="number" class="itemQty" value="${qty}"></td>
    <td><button onclick="removeRow(this)">X</button></td>
  `;
}

function removeRow(btn) {
  btn.closest('tr').remove();
}

window.onload = () => {
  addItem("Sofa Set", "Godrej", "₹20,000 - ₹25,000", 1);
  addItem("Dining Table", "Nilkamal", "₹10,000 - ₹15,000", 1);
};

async function generatePDF() {
  // Fill customer and quotation data
  document.getElementById('pdfCustomerName').innerText = document.getElementById('customerName').value;
  document.getElementById('pdfMobileNumber').innerText = document.getElementById('mobileNumber').value;
  document.getElementById('pdfNote').innerText = document.getElementById('note').value;
  document.getElementById('pdfEstimate').innerText = document.getElementById('estimate').value;
  document.getElementById('pdfDate').innerText = new Date().toLocaleDateString('en-IN');

  // Fill item table
  const pdfBody = document.getElementById('pdfItemTable');
  pdfBody.innerHTML = '';
  document.querySelectorAll('#itemTable tbody tr').forEach(row => {
    const name = row.querySelector('.itemName').value;
    const company = row.querySelector('.itemCompany').value;
    const price = row.querySelector('.itemPrice').value;
    const qty = row.querySelector('.itemQty').value;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td>${company}</td><td>${price}</td><td>${qty}</td>`;
    pdfBody.appendChild(tr);
  });

  // Wait for all images to load before rendering PDF
  const container = document.getElementById('quotation');
  container.style.display = 'block';

  const images = container.querySelectorAll("img");
  await Promise.all([...images].map(img => {
    return new Promise(resolve => {
      if (img.complete) resolve();
      else img.onload = resolve;
    });
  }));

  // Generate PDF
  const canvas = await html2canvas(container, { backgroundColor: '#ffffff' });
  const imgData = canvas.toDataURL('image/png');
  const jsPDF = window.jspdf.jsPDF;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  pdf.addImage(imgData, 'PNG', 0, 0, width, height);

  // Save PDF with customer name
  let name = document.getElementById('customerName').value.trim() || 'quotation';
  name = name.replace(/\s+/g, '_');
  pdf.save(`${name}_quotation.pdf`);

  container.style.display = 'none';

  // Ask to share via WhatsApp
  const mobileNumber = document.getElementById('mobileNumber').value.trim();
  if (mobileNumber && confirm("Do you want to share this quotation on WhatsApp?")) {
    const message = encodeURIComponent(`Hello ${document.getElementById('customerName').value}, your quotation is ready. Please check your PDF.`);
    const whatsappLink = `https://wa.me/91${mobileNumber}?text=${message}`;
    window.open(whatsappLink, '_blank');
  }
}
