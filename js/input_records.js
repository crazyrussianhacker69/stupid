import * as fnEngine from './functions_editor.js';

window.onload = function(){
    if (localStorage.length === 0) {
        alert("No forms detected. \n Please create a form first.");
        window.location.href = "main_hub.html";
    }
    else {
        // State
        let mode = 'window';

        // Load forms from local storage
        const savedForms = JSON.parse(localStorage.getItem('formSchemas'));

        // Initialize UI
        const formList = fnEngine.displayFormsPanel(savedForms);
        fnEngine.setStatusBar(mode);
        fnEngine.displayFunctionalities(mode);

        // Global event listener that will reroute behavior
        document.addEventListener('keydown', handleKeyDown);

        function handleKeyDown(event) {
            if (mode === "window") {
                handleWindow(event);
                return;
            } else if (mode === "normal") {
                handleNormal(event);
                return;
            } else if (mode === "insert") {
                handleInsert(event);
                return;
            }
        }

        function handleWindow(event) {
            const key = event.key;
            event.preventDefault();

            const nodeList = document.querySelectorAll('button'); 
            const focusableElements = Array.from(nodeList);

            let indexOfFocusedElement = focusableElements.indexOf(document.activeElement);

            if (indexOfFocusedElement === -1 && focusableElements.length > 0) {
                indexOfFocusedElement = 0;
                focusableElements[0].focus();
            }

            if (key === 'j') {
                fnEngine.nextField(indexOfFocusedElement, focusableElements);
            } else if (key === 'k') {
                fnEngine.previousField(indexOfFocusedElement, focusableElements);
            } else if (key === 'Enter') {
                if (indexOfFocusedElement >= 0 && indexOfFocusedElement < savedForms.length) {
                    const selectedForm = savedForms[indexOfFocusedElement];
                    fnEngine.renderFormUI(selectedForm);
                    fnEngine.hideFormPanel();
                    mode = 'insert';
                    fnEngine.setStatusBar(mode);
                    fnEngine.displayFunctionalities(mode);
                }
            } else if (key === 'Escape') {
                mode = 'normal';
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
                fnEngine.hideFormPanel();
            }
        }

        function handleNormal(event) {
            let key = event.key;
            event.preventDefault();

            let activeElement = document.activeElement;
            const nodeList = document.querySelectorAll('input', 'select');
            const focusableElements = Array.from(nodeList);
            let indexOfFocusedElement = focusableElements.indexOf(activeElement);
            
            if (key === 'j') {
                fnEngine.nextField(indexOfFocusedElement, focusableElements);
            }
            else if (key === 'k') {
                fnEngine.previousField(indexOfFocusedElement, focusableElements);
            }
            else if (key === 'd') {
                activeElement.value = "";
            }
            else if (key === 'c') {
                activeElement.value = "";
                mode = 'insert';
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
            }
            else if (key === 'i') {
                mode = 'insert';
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
            }
            else if (key === 'F10') {
                mode = 'window';
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
                fnEngine.displayFormsPanel(savedForms);
            }
            else if (key === 'F11') {
                fnEngine.saveAndClose(); 
            }
        }

        function handleInsert(event) {
            const key = event.key;
            if (key === 'Escape') {
                mode = 'normal';
                fnEngine.setStatusBar(mode);
                fnEngine.displayFunctionalities(mode);
            }
            else if (key === 'Enter') {
                let activeElement = document.activeElement;
                const nodeList = document.querySelectorAll('input', 'select');
                const focusableElements = Array.from(nodeList);
                let indexOfFocusedElement = focusableElements.indexOf(activeElement);
                fnEngine.nextField(indexOfFocusedElement, focusableElements); 
            }
        }

        // function loadForm(

        // fnEngine.displayFormsPanel(null, schema); 

        //      // Load schema from localStorage
        //      const schema = JSON.parse(localStorage.getItem('formSchema'));
        //      const recordForm = document.getElementById('recordForm');

        //      // Page Title = Form Title
        //      document.getElementById('formTitle').textContent = schema.formName;

        //      // This array will hold all input/select elements for navigation
        //      let fieldList = [];

        //      // Generate fields dynamically
        //      if (schema && schema.fields.length > 0) {
        //          schema.fields.forEach(field => {
        //              // Label
        //              const labelEl = document.createElement('label');
        //              labelEl.textContent = field.label + ":";
        //              labelEl.setAttribute('for', field.name);

        //              // Input element
        //              let inputEl;
        //              if (field.type === 'select') {
        //                  inputEl = document.createElement('select');
        //                  inputEl.id = field.name;

        //                  field.options.forEach(opt => {
        //                      const optionEl = document.createElement('option');
        //                      optionEl.value = opt;
        //                      optionEl.textContent = opt;
        //                      inputEl.appendChild(optionEl);
        //                  });
        //              } else {
        //                  inputEl = document.createElement('input');
        //                  inputEl.type = field.type === 'number' ? 'number' : 'text';
        //                  inputEl.id = field.name;
        //              }

        //              // Append to form
        //              recordForm.appendChild(labelEl);
        //              recordForm.appendChild(inputEl);
        //              recordForm.appendChild(document.createElement('br'));
        //              recordForm.appendChild(document.createElement('br'));

        //              // Add to field list for navigation
        //              fieldList.push(inputEl);
        //          });
        //      }

        //      // Focus on the first field
        //      fnEngine.focusFirstField(fieldList);

        //      // Initial mode: Normal
        //      let mode = "n";
        //      fnEngine.setStatusBar(mode);
        //      fnEngine.displayFunctionalities(mode);

        //      // Keydown listener
        //      document.addEventListener('keydown', function(keyPress) {

        //          const focusedField = document.activeElement;
        //          const focusedFieldIndex = fieldList.indexOf(focusedField);
        //          const key = keyPress.key;

        //          if (mode === "n") {
        //              // Block typing
        //              keyPress.preventDefault();

        //              // Navigation
        //              fnEngine.nextField(key, focusedFieldIndex, fieldList);
        //              fnEngine.previousField(key, focusedFieldIndex, fieldList);

        //              // Motions
        //              if (key === "d") {                  // Delete field value: d
        //                  focusedField.value = "";
        //              }
        //              else if (key === "c") {             // Change field (c) -> enters insert mode
        //                  focusedField.value = "";
        //                  mode = "i";
        //              }
        //              else if (key === "F1") {
        //                  fnEngine.displayFormsPanel(null, schema);
        //                  mode = "Window";
        //              }
        //              else if (key === "F10") {           // Downloads file
        //                  fnEngine.createListFromValues(fieldList);
        //              }
        //              else if (key === "F11") {           // Save and Close
        //                  fnEngine.saveAndClose();
        //              }
        //              else if (key === "i") {             // Enter insert mode
        //                  mode = "i";
        //              }
        //          }

        //          if (mode === "i") {
        //              fnEngine.setStatusBar(mode);
        //              fnEngine.displayFunctionalities(mode);

        //              if (key === "Escape") {
        //                  mode = "n";
        //                  fnEngine.setStatusBar(mode);
        //                  fnEngine.displayFunctionalities(mode);
        //              }
        //              else if (key === "Enter") {
        //                  if (focusedFieldIndex < fieldList.length - 1) {
        //                      fieldList[focusedFieldIndex + 1].focus();
        //                  }
        //              }
        //          }

        //          if (mode === "Window") {
        //              keyPress.preventDefault();
        //              fnEngine.displayFunctionalities(mode);
        //              fnEngine.setStatusBar(mode);
        //              
        //              if (key === "Escape") {
        //                  fnEngine.displayFormsPanel(key);
        //                  mode = "n";
        //                  fnEngine.setStatusBar(mode);
        //                  fnEngine.displayFunctionalities(mode);
        //              }
        //          }
        //      });
    }
};
