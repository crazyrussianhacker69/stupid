/************************************************************************
 *
 * This file stores functions called in the main.
 * Helps with keeping things as organized as possible lol.
 *
 ***********************************************************************/


/**
 * Displays the user's 'entry' mode on the status bar.
 * @param {string} mode - Entry mode you wish to display. "n" = Normal, "i" = Insert
 */
export function setStatusBar(mode) {
    const statusOutput = document.getElementById('statusBarOutput');
    if (mode === "normal") {
	statusOutput.textContent = ' --NORMAL-- ';
    }
    else if (mode === "insert") {
	statusOutput.textContent = ' --INSERT-- ';
    }
    else if (mode === "window") {
	statusOutput.textContent = ' --WINDOW-- ';
    }
}

/**
 * Focuses on the first <input> element in the document, if one exists.
 * @param {array} fieldList - Input Element array.
 */
export function focusFirstField(fieldList) {
    if (fieldList.length > 0) {
	fieldList[0].focus();
    }
}

export function nextField(index, array) {
    if (index < array.length - 1) {
        array[index + 1].focus();
    }
}

export function previousField(index, array) {
    if (index > 0) {
        array[index - 1].focus();
    }
}

export function createListFromValues(list) {
    let values = [];
    for (let i = 0; i < list.length; i++) {
        values.push(list[i].value);
    }

    // Join using pipe delimiter
    const content = values.join("|");

    // Create text file
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "data.txt";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function displayFunctionalities(mode) {
    const container = document.getElementById('modeOptions');
    if (mode === "normal") {
        container.replaceChildren();
        container.innerHTML = `
            <p class="functionality">&lt;i&gt;&thinsp;Insert&thinsp;</p>
            <p class="functionality">&lt;j&gt;&thinsp;Next Field&thinsp;</p>
            <p class="functionality">&lt;k&gt;&thinsp;Previous Field&thinsp;</p>
            <p class="functionality">&lt;d&gt;&thinsp;Delete&thinsp;</p>
            <p class="functionality">&lt;c&gt;&thinsp;Change&thinsp;</p>
            <p class="functionality">&lt;F10&gt;&thinsp;Forms&thinsp;</p>
            <p class="functionality">&lt;F11&gt;&thinsp;Save and Close&thinsp;</p>
        `;
    }
    else if (mode === "insert") {
        container.replaceChildren();
        container.innerHTML = `
            <p class="functionality">&lt;ESC&gt;&thinsp;Exit Mode&thinsp;</p>
            <p class="functionality">&lt;ENTER&gt;&thinsp;Next Field&thinsp;</p>
        `;
    }
    else if (mode === "window") {
        container.replaceChildren();
        container.innerHTML = `
            <p class="functionality">&lt;ESC&gt;&thinsp;Close&thinsp;</p>
            <p class="functionality">&lt;j&gt;&thinsp;Next&thinsp;</p>
            <p class="functionality">&lt;k&gt;&thinsp;Previous&thinsp;</p>
            <p class="functionality">&lt;ENTER&gt;&thinsp;Confirm&thinsp;</p>
        `;
    }
}

export function saveAndClose() {
    const form = document.getElementById('recordForm');
    if (!form) return;

    // Collect data from all inputs/selects
    const data = {};
    const elements = form.querySelectorAll('input, select, textarea');
    elements.forEach(el => {
        data[el.name || el.id] = el.value;
    });

    // Retrieve current form schemas from localStorage
    const formName = document.getElementById('formTitle').textContent;
    const savedRecords = JSON.parse(localStorage.getItem('formRecords')) || {};

    // Store data under the form name
    if (!savedRecords[formName]) savedRecords[formName] = [];
    savedRecords[formName].push(data);

    // Save back to localStorage
    localStorage.setItem('formRecords', JSON.stringify(savedRecords));

    console.log(`Saved record for form "${formName}":`, data);

    // Go back to main hub
    document.location.href = "main_hub.html";
}

export function displayFormsPanel(loadedForms) {
    // Generates panel box
    const centerPanel = document.getElementById('centerPanel');
    centerPanel.innerHTML = `
        <div id="formPanel">
            <div class="panelHeader">
                <span>Load Form</span>
            </div>
            <div id="formsList"></div>
        </div>
    `;

    // Popullates panel with available forms
    const output = document.getElementById('formsList');
    for (let i = 0; i < loadedForms.length; i++) {
        const row = document.createElement('button');
        row.className = 'highlight formName';
        row.textContent = loadedForms[i].formName;
        output.appendChild(row);
    }

    // Focus on first available form
    const formList = Array.from(document.querySelectorAll('.formName'));
    formList[0].focus();

    return formList;
}

export function renderFormUI(formSchema) {

    const title = document.getElementById('formTitle');
    title.textContent = formSchema.formName;

    const form = document.getElementById('recordForm');
    form.innerHTML = '';

    // Navigation model
    const fieldList = [];

    formSchema.fields.forEach(field => {

        // Label
        const label = document.createElement('label');
        label.textContent = field.label + ":";

        let input;

        // Select
        if (field.type === 'select') {

            input = document.createElement('select');

            field.options.forEach(opt => {
                const option = document.createElement('option');

                option.value = opt;
                option.textContent = opt;

                input.appendChild(option);
            });

        } 

        // Regular input
        else {

            input = document.createElement('input');
            input.type = field.type;
        }

        input.id = field.name;
        input.name = field.name;

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));

        // Add to navigation array
        fieldList.push(input);
    });

    // Focus first field
    if (fieldList.length > 0) {
        fieldList[0].focus();
    }

    return fieldList;
}
export function hideFormPanel() {
    const formPanel = document.getElementById('formPanel');

    if (formPanel) {
        formPanel.remove();
    }
}
