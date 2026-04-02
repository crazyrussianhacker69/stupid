import * as funcEngine from './functions_engine.js';

// /**
//  * Displays the user's 'entry' mode on the status bar.
//  * @param {String} mode Entry mode you wish to display.
//  * 			"n" = Normal
//  * 			"i" = Insert
//  */
// function setStatusBarMode(mode) {
//     let statusOutput = document.getElementById('status-bar-output');
//     if (mode === "n") {
// 	statusOutput.textContent = ' --NORMAL-- ';
//     }
//     else if (mode === "i") {
// 	statusOutput.textContent = ' --INSERT-- '; }
// }
// /**
//  * Focuses the first <input> element in the document, if one exists.
//  * @returns {void}
//  */
// function focusFirstField() {
//     const fields = document.getElementsByTagName('input');
//     if (fields.length > 0) {
// 	fields[0].focus();
//     }
// }

window.onload = function(){

    // Used for changing "Entry" modes
    // n = Normal
    // i = Insert
    let mode = "n";

    // Cursor is focused on the first field when page loads.
    const fields = document.getElementsByTagName('input');
    fields[0].focus();

    // Sets entry mode on status bar
    funcEngine.setStatusBarMode("n");

    // Global 'keydown' event listener
    // Basically, if any key is pressed inside an 'input' element, the function runs.
    document.addEventListener('keydown', function(event){

        // Stores the 'Input' element that has focus.
        const activeElement = document.activeElement;

        /* NORMAL MODE SECTION */

        // Stores key pressed
        let key = event.key;

        if (mode === "n") {

            // Blocks all typing in this mode!
            event.preventDefault();

            // Converts fields into an array and stores it.
            // First instance of "fields"(line 8) is not a "real array" although it seems like.
            // That's why it has to be converted to an actual array so it can be used.
            const fieldsArray = Array.from(fields);

            // Stores the current index of the fieldsArray that was created a step ago.
            const currentIndex = fieldsArray.indexOf(activeElement);

            // Focuses cursor on the next field
            if (key === "j") {
        	if (currentIndex < fieldsArray.length - 1) {
        	    fieldsArray[currentIndex + 1].focus();
        	}
            }

            // Focuses cursor on the previous field
            if (key === "k") {
        	if (currentIndex > 0) {
        	    fieldsArray[currentIndex - 1].focus();
        	}
            }

            // Changes to 'insert' mode
            if (key === "i") {
        	mode = "i";
            }
        }

        /* INSERT MODE SECTION */

        if (mode === "i") {
            funcEngine.setStatusBarMode("i");

            // Changes to 'normal' mode when 'Escape' is pressed
            if (key === "Escape") {
        	mode = "n";
        	funcEngine.setStatusBarMode("n");
            }
        }
    });
};
