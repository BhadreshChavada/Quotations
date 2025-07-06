function validateStep1() {
  const name = document.getElementById('customerName').value.trim();
  const mobile = document.getElementById('mobileNumber').value.trim();
  if (!name || !mobile) {
    document.getElementById('formError').style.display = 'block';
    return false;
  }
  document.getElementById('formError').style.display = 'none';
  return true;
}

function validateStep3() {
  const estimate = document.getElementById('estimate').value.trim();
  if (!/^[0-9]+$/.test(estimate)) {
    alert('Please enter a valid number for Total Estimate.');
    return false;
  }
  return true;
}

function addItem(tableId, values = ["", "", "", ""]) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" value="${values[0]}" placeholder="Item name"/></td>
    <td><input type="text" value="${values[1]}" placeholder="Company"/></td>
    <td><input type="text" class="itemPrice" value="${values[2]}" placeholder="Price Range"/></td>
    <td><input type="number" value="${values[3]}" placeholder="Qty"/></td>
    <td><button onclick="this.parentElement.parentElement.remove()">Remove</button></td>`;
  tbody.appendChild(row);
}

function loadSampleItems() {

addItem('plywoodTable', ["9MM 8X4 SEMI WATERPROOF GURJAN FACE", "-", "-", ""]);
addItem('plywoodTable', ["25MM 8X4 BLACKBORD SEMI WATERPROOF GURJAN  FACE", "-", "-", ""]);
addItem('plywoodTable', ["12MM 8X4 SEMI WATER PROOF GURJAN FACE", "-", "-", ""]);
addItem('plywoodTable', ["06MM 8X4 SEMI WATER PROOF GURJAN FACE", "-", "-", ""]);
addItem('plywoodTable', ["09MM 8X4 SEMI WATER PROOF GURJAN FACE", "-", "-", ""]);
addItem('plywoodTable', ["30MM 8X4 DOOR BLACK BORD SEMI WATER PROOF GURJAN FACE", "-", "-", ""]);
addItem('plywoodTable', ["9MM 8X4 MDF/HDMR SHEET", "-", "-", ""]);
addItem('plywoodTable', ["12MM 8X4 MDF/HDMR SHEET", "-", "-", ""]);
addItem('plywoodTable', ["WOODEN LAMINATES", "BEEL,MERINO, ROTOLEM", "1400 TO 1600", ""]);
addItem('plywoodTable', ["INNER LAMINATES SHEET FEBRIC", "-", "-", ""]);

addItem('hardwareTable', ["BIDING PATTI A GRAD 1.5 X0.50", "-", "-", ""]);
addItem('hardwareTable', ["BIDING PATTI A GRAD 1.0X 0.50", "-", "-", ""]);
addItem('hardwareTable', ["BIDING PATTI A GRAD 2.0X 0.50", "-", "-", ""]);
addItem('hardwareTable', ["BIDING PATTI A GRAD 2.0X 0.25", "-", "-", ""]);
addItem('hardwareTable', ["FEVICOL", "MARIN", "", ""]);
addItem('hardwareTable', ["HINGES AND SCREW SS", "", "", ""]);
addItem('hardwareTable', ["DOOR LOCK", "", "1500 to 1600", ""]);
addItem('hardwareTable', ["WARDROBE DRAWER LOCK", "GODREJ", "", ""]);
addItem('hardwareTable', ["WARDROBE DRAWER CHANEL", "OZON,GODREJ", "", ""]);
addItem('hardwareTable', ["PROFILE SHUTTER", "", "", ""]);


addItem('kitchenTable', ["KITCHEN LAMINATE SHEET", "ROYLE TOUCH", "3000", ""]);
addItem('kitchenTable', ["KITCHEN TANDEM", "EBCO, GODREJ", "", ""]);
addItem('kitchenTable', ["CHIMNEY", "HINDWARE, ELICA, FABER", "22000 TO 25000", "1"]);
addItem('kitchenTable', ["GAS STOVE", " HINDWARE, ELICA", "", ""]);
addItem('kitchenTable', ["DINING TABLE", "", "", "4 chair"]);

addItem('accessoryTable', ["CURTAIN", "", "650 TO 700 per mt", ""]);
addItem('accessoryTable', ["SOFA KAPAD", "", "650 TO 700 per mt", ""]);
addItem('accessoryTable', ["SOFA PUNCH", "KURLON, SLEEPWEEL", "", ""]);
addItem('accessoryTable', ["FAN", "HAVELLS, CROMPTON, ATOMBERG", "2800", ""]);
addItem('accessoryTable', ["BED SHEET", "KURLON, SLEEPWEL", "15000 to 16000", ""]);
addItem('accessoryTable', ["ALL ROOM MIRROR", "", "", ""]);
}

function renderPreview() {
  const name = document.getElementById("customerName").value;
  const mobile = document.getElementById("mobileNumber").value;
  const note = document.getElementById("note").value.trim();
  const estimate = document.getElementById("estimate").value;

  const tableIds = {
    'Play wood and Laminates': 'plywoodTable',
    'Hardware Item': 'hardwareTable',
    'Kitchen': 'kitchenTable',
    'Extra Accessory': 'accessoryTable'
  };

  let sectionHtml = '';
  for (const [title, id] of Object.entries(tableIds)) {
    const rows = [...document.querySelectorAll(`#${id} tbody tr`)];
    if (rows.length === 0) continue;
    let rowHtml = '';
    rows.forEach(row => {
      const cols = row.querySelectorAll("input");
      rowHtml += `
        <tr>
          <td>${cols[0].value}</td>
          <td>${cols[1].value}</td>
          <td>${cols[2].value}</td>
          <td>${cols[3].value}</td>
        </tr>`;
    });
    sectionHtml += `
      <h4 style="margin-top:30px;">${title}</h4>
      <table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
        <thead style="background: #f0f0f0;">
          <tr>
            <th>Item Name</th><th>Company</th><th>Price Range</th><th>Qty</th>
          </tr>
        </thead>
        <tbody>${rowHtml}</tbody>
      </table>`;
  }

  let noteSection = note ? `<p><strong>Note:</strong><br>${note}</p>` : '';

  document.getElementById("quotationPreview").innerHTML = `
    <div style="margin-bottom:20px;">
      <h2>Akshar Furniture</h2>
      <p>Shop No. 12, Akshar Complex, Ahmedabad<br>Phone: +91-9876543210<br>Email: info@aksharfurniture.com</p>
    </div>
    <div style="text-align: right;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</div>
    <p><strong>Customer Name:</strong> ${name}</p>
    <p><strong>Mobile Number:</strong> ${mobile}</p>
    ${sectionHtml}
    ${noteSection}
    <h3>Total Estimate: ₹${estimate}</h3>
    <h4>Terms & Conditions:</h4>
    <ul>
      <li>Quotation is valid for 15 days.</li>
      <li>10% advance payment required to confirm order.</li>
      <li>Product warrenty depend on company service center.</li>
      <li>For product warrenty original bills are required.</li>
      <li>Chimani price included fittin charges.</li>
    </ul>`;
}

function validateAndGeneratePDF() {
  if (!validateStep1() || !validateStep3()) return;

  const { jsPDF } = window.jspdf;
 const pdf = new jsPDF();
const name = document.getElementById('customerName').value.trim();
const mobile = document.getElementById('mobileNumber').value.trim();
const estimate = document.getElementById('estimate').value.trim();
const note = document.getElementById('note').value.trim();
const date = new Date().toLocaleDateString('en-GB');

let y = 20;

// Company Header
pdf.setFontSize(16);
pdf.setTextColor(0, 0, 100);
pdf.text("Akshar Furniture", 15, y);
y += 7;
pdf.setFontSize(11);
pdf.setTextColor(0, 0, 0);
pdf.text("Vivek Kukadiya", 15, y);
y += 5;
pdf.text("Phone: +91-72019 81378", 15, y);
y += 5;

// Add horizontal line below company header
pdf.setDrawColor(180);
pdf.line(15, y, 195, y);
y += 10;

// Date at top right
pdf.setFontSize(11);
pdf.text(`Date: ${date}`, 195, 20, { align: 'right' });

// ✨ Stylish Customer Info Box
pdf.setFillColor(245, 245, 245); // Light gray background
pdf.roundedRect(15, y, 180, 15, 2, 2, 'F');
pdf.setTextColor(0, 0, 0);
pdf.setFontSize(12);
pdf.text(`Customer Name:`, 20, y + 5);
pdf.setFont(undefined, 'bold');
pdf.text(name, 60, y + 5);
pdf.setFont(undefined, 'normal');
pdf.text(`Mobile Number:`, 20, y + 12);
pdf.setFont(undefined, 'bold');
pdf.text(mobile, 60, y + 12);
pdf.setFont(undefined, 'normal');
y += 22;


  const categories = {
    'Play wood and Laminates': 'plywoodTable',
    'Hardware Item': 'hardwareTable',
    'Kitchen': 'kitchenTable',
    'Extra Accessory': 'accessoryTable'
  };

 for (const [title, tableId] of Object.entries(categories)) {
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);
  if (!rows.length) continue;

  let allRows = [];
  rows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const values = Array.from(inputs).map(input => input.value.trim());
    allRows.push(values);
  });

  // Check columns to keep
  const colHeaders = [title, 'Company', 'Price Range', 'Qty'];
  const keepColumn = [0, 1, 2, 3].map(i => allRows.some(row => row[i]));
  const finalHeaders = colHeaders.filter((_, i) => keepColumn[i]);
  const finalBody = allRows.map(row => row.filter((_, i) => keepColumn[i]));

  // Generate table
  pdf.autoTable({
    startY: y,
    head: [finalHeaders],
    body: finalBody,
    styles: { cellPadding: 3, fontSize: 10 },
    theme: 'grid',
    margin: { left: 15, right: 15 },
    didDrawPage: data => {
      y = data.cursor.y + 10;
    }
  });

  y = pdf.autoTable.previous.finalY + 10;
}


  // Add Note if present
  if (note) {
    pdf.setFontSize(12);
    pdf.text("Note:", 15, y);
    y += 5;
    pdf.setFontSize(11);
    pdf.text(note, 15, y, { maxWidth: 180 });
    y += 10;
  }

  // Total Estimate
  pdf.setFontSize(12);
  pdf.text(`Total Estimate: ${formatINR(estimate)}`, 15, y);
  y += 10;

  // Terms
  pdf.setFontSize(12);
  pdf.text("Terms & Conditions:", 15, y);
  y += 6;
  const terms = [
    "Quotation is valid for 15 days.",
    "10% advance payment required to confirm order.",
    "Product warrenty depend on company service center.",
	"For product warrenty original bills are required.",
	"Kitchen Tendum warrenty depend on company.",
	"Chimani price included fittin charges."
  ];
  pdf.setFontSize(11);
  terms.forEach(term => {
    pdf.text(`• ${term}`, 18, y);
    y += 6;
  });

  // Save PDF
  const fileName = `Akshar_furniture_quotation_${name.replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);
  
  alert("✅ PDF generated successfully!");

  // ✅ Reset form fields
  document.getElementById("customerName").value = "";
  document.getElementById("mobileNumber").value = "";
  document.getElementById("estimate").value = "";
  document.getElementById("note").value = "";

  // ✅ Clear all item tables
  ["plywoodTable", "hardwareTable", "kitchenTable", "accessoryTable"].forEach(id => {
    const tbody = document.getElementById(id).querySelector("tbody");
    tbody.innerHTML = "";
  });

  // ✅ Go back to Step 1
  document.querySelectorAll(".step").forEach(step => step.classList.remove("active"));
  document.getElementById("step1").classList.add("active");
  updateStepDots(1);

  // ✅ Re-fill default sample items
  addPrefilledItems();
}

function formatINR(amount) {
  const number = parseFloat(amount);
  if (isNaN(number)) return 'Rs. 0/-';
  return 'Rs. ' + number.toLocaleString('en-IN') +'/-';
}

function updateStepDots(currentStep) {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`stepDot${i}`);
    if (i < currentStep) dot.className = "progress-step step-done";
    else if (i === currentStep) dot.className = "progress-step step-current";
    else dot.className = "progress-step step-upcoming";
  }
  // Hide Back button on Step 1
  document.getElementById("backButtonWrapper").style.display = currentStep === 1 ? "none" : "block";
}

function nextStep(currentStep) {
  if (currentStep === 1) {
    const name = document.getElementById("customerName").value.trim();
    const mobile = document.getElementById("mobileNumber").value.trim();
    if (!name || !mobile) {
      document.getElementById("formError").style.display = "block";
      return;
    } else {
      document.getElementById("formError").style.display = "none";
	  // Add sample items when going into step 2
		loadSampleItems();
    }
  }
  

  
  if (currentStep === 3) {
    const estimate = document.getElementById("estimate").value.trim();
    if (!/^\d+$/.test(estimate)) {
      document.getElementById("estimateError").style.display = "block";
      return;
    } else {
      document.getElementById("estimateError").style.display = "none";
    }
  }

  document.getElementById(`step${currentStep}`).classList.remove("active");
  document.getElementById(`step${currentStep + 1}`).classList.add("active");
  updateStepDots(currentStep + 1);
  
  if (currentStep +1 === 4) renderPreview();
  
}

function previousStep(currentStep) {
  document.getElementById(`step${currentStep}`).classList.remove("active");
  document.getElementById(`step${currentStep - 1}`).classList.add("active");
  updateStepDots(currentStep - 1);
}

function goBack() {
  const steps = [...document.querySelectorAll('.step')];
  const currentIndex = steps.findIndex(step => step.classList.contains('active'));
  if (currentIndex > 0) {
    steps[currentIndex].classList.remove('active');
    steps[currentIndex - 1].classList.add('active');
    updateStepDots(currentIndex);
  }
}
