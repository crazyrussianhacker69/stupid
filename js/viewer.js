const formsDropdown = document.getElementById("forms");
const returnBtn = document.getElementById("returnBtn");
const formPreview = document.getElementById("formPreview");

// Load saved records
const formRecords = JSON.parse(localStorage.getItem("formRecords")) || {};
const formNames = Object.keys(formRecords);

if (formNames.length === 0) {
    alert("No saved records found. Please submit some forms first.");
    window.location.href = "main_hub.html";
}

// Populate dropdown
formNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    formsDropdown.appendChild(option);
});

// Display records for selected form
formsDropdown.addEventListener("change", () => {
    const selectedForm = formsDropdown.value;
    if (!selectedForm) {
        formPreview.innerHTML = "";
        return;
    }
    displayRecords(selectedForm);
});

// Display all records for a form in a table with export button
function displayRecords(formName) {
    const records = formRecords[formName] || [];
    formPreview.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `${formName} Records`;
    formPreview.appendChild(title);

    if (records.length === 0) {
        formPreview.appendChild(document.createTextNode("No records submitted yet."));
        return;
    }

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Headers
    const headers = Object.keys(records[0]);
    const thead = document.createElement("tr");
    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        th.style.border = "1px solid black";
        th.style.padding = "4px";
        thead.appendChild(th);
    });
    table.appendChild(thead);

    // Rows
    records.forEach(rec => {
        const row = document.createElement("tr");
        headers.forEach(h => {
            const td = document.createElement("td");
            td.textContent = rec[h];
            td.style.border = "1px solid black";
            td.style.padding = "4px";
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    formPreview.appendChild(table);

    // Export Button
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "Export CSV";
    exportBtn.style.marginTop = "20px";
    exportBtn.addEventListener("click", () => {
        exportRecordsCSV(formName, records);
    });
    formPreview.appendChild(exportBtn);
}

function exportRecordsCSV(formName, records) {
    if (records.length === 0) return alert("No records to export!");

    const csvContent = [
        Object.keys(records[0]).join(','), // headers
        ...records.map(r => Object.values(r).join(',')) // rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${formName}_records.csv`;
    link.click();

    URL.revokeObjectURL(url);
}

// Return button
returnBtn.addEventListener("click", () => {
    window.location.href = "main_hub.html";
});
