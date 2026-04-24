import * as fnEngine from './functions_engine.js';

window.onload = function(){

    let previousKey = null;

    // Load in 'Normal' mode
    let mode = "n";
    fnEngine.setStatusBar(mode);

    // Focus cursor on the first <input> field.
    const fields = document.querySelectorAll('input, button');
    const fieldList = Array.from(fields);
    fnEngine.focusFirstField(fieldList);

    // Global 'keydown' event listener.
    document.addEventListener('keydown', function(keyPress) {

        // Index of the current focused <input> element.
        const focusedField = document.activeElement;
        const focusedFieldIndex = fieldList.indexOf(focusedField);

        // Stores key pressed
        let key = keyPress.key;

        if (mode === "n") {

            // Blocks all typing in this mode!
            keyPress.preventDefault();

            // 'Normal' mode keyboard motions
            fnEngine.nextField(key, focusedFieldIndex, fieldList);
            fnEngine.previousField(key, focusedFieldIndex, fieldList);

            // Delete text in field
            if (previousKey === "d" && key === "d") {
                focusedField.value = "";
                previousKey = null;
            }

            // Change Field
            if (previousKey === "c" && key === "w") {
                focusedField.value = "";
                mode = "i";
                previousKey = null;
            }

            // Changes to 'insert' mode
            if (key === "i") {
                mode = "i";
            }
        }

        if (mode === "i") {

            fnEngine.setStatusBar(mode);

            // Changes to 'normal' mode when 'Escape' is pressed
            if (key === "Escape") {
                mode = "n";
                fnEngine.setStatusBar(mode);
            }
            else if (key === "Enter") {
                if (focusedFieldIndex < fieldList.length - 1) {
                    fieldList[focusedFieldIndex + 1].focus();
                }
            }
        }

        // Keeps track of previous key entered.
        previousKey = key;

    });


    const downloadBtn = document.getElementById('create-file-btn');
    downloadBtn.addEventListener('click', () => fnEngine.createListFromValues(fieldList));


    downloadBtn.addEventListener('keydown',  (event) => {
        const key = event.key;
        if (key === "Enter") {
            fnEngine.createListFromValues(fieldList);
        }
    });
};
