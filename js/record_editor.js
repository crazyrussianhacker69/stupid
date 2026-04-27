import * as fnEngine from './functions_editor.js';

window.onload = function(){

    // Load schema from localStorage
    const schema = JSON.parse(localStorage.getItem('formSchema'));
    const recordForm = document.getElementById('recordForm');

    // This array will hold all input/select elements for navigation
    let fieldList = [];

    // Generate fields dynamically
    if (schema && schema.fields.length > 0) {
        schema.fields.forEach(field => {
            // Label
            const labelEl = document.createElement('label');
            labelEl.textContent = field.label + ":";
            labelEl.setAttribute('for', field.name);

            // Input element
            let inputEl;
            if (field.type === 'select') {
                inputEl = document.createElement('select');
                inputEl.id = field.name;

                field.options.forEach(opt => {
                    const optionEl = document.createElement('option');
                    optionEl.value = opt;
                    optionEl.textContent = opt;
                    inputEl.appendChild(optionEl);
                });
            } else {
                inputEl = document.createElement('input');
                inputEl.type = field.type === 'number' ? 'number' : 'text';
                inputEl.id = field.name;
            }

            // Append to form
            recordForm.appendChild(labelEl);
            recordForm.appendChild(inputEl);
            recordForm.appendChild(document.createElement('br'));
            recordForm.appendChild(document.createElement('br'));

            // Add to field list for navigation
            fieldList.push(inputEl);
        });
    }

    // Focus on the first field
    fnEngine.focusFirstField(fieldList);

    // Initial mode: Normal
    let mode = "n";
    fnEngine.setStatusBar(mode);

    // Track previous key for combos
    let previousKey = null;

    // Keydown listener
    document.addEventListener('keydown', function(keyPress) {

        const focusedField = document.activeElement;
        const focusedFieldIndex = fieldList.indexOf(focusedField);
        const key = keyPress.key;

        if (mode === "n") {
            // Block typing
            keyPress.preventDefault();

            // Navigation
            fnEngine.nextField(key, focusedFieldIndex, fieldList);
            fnEngine.previousField(key, focusedFieldIndex, fieldList);

            // Delete field value: dd
            if (previousKey === "d" && key === "d") {
                focusedField.value = "";
                previousKey = null;
            }

            // Change field (cw) -> enters insert mode
            if (previousKey === "c" && key === "w") {
                focusedField.value = "";
                mode = "i";
                previousKey = null;
            }

            // Enter insert mode
            if (key === "i") {
                mode = "i";
            }
        }

        if (mode === "i") {
            fnEngine.setStatusBar(mode);

            if (key === "Escape") {
                mode = "n";
                fnEngine.setStatusBar(mode);
            } else if (key === "Enter") {
                if (focusedFieldIndex < fieldList.length - 1) {
                    fieldList[focusedFieldIndex + 1].focus();
                }
            }
        }

        previousKey = key;
    });

    // Download button
    const downloadBtn = document.getElementById('downloadFileBtn');
    downloadBtn.addEventListener('click', () => fnEngine.createListFromValues(fieldList));

    downloadBtn.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            fnEngine.createListFromValues(fieldList);
        }
    });
};
