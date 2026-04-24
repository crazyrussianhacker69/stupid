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
    const statusOutput = document.getElementById('status-bar-output');
    if (mode === "n") {
	statusOutput.textContent = ' --NORMAL-- ';
    }
    else if (mode === "i") {
	statusOutput.textContent = ' --INSERT-- ';
    }
    else {
	statusOutput.textContent = ' ERROR ';
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

/**
 * Moves focus to the next field in the form when a specific key is
 * pressed.
 * @param {string} keyPress - The key input from the user.
 * @param {number} indexOfElement - The current index of the focused field.
 * @param {HTMLElement[]} focusableElements - An array of focusable form elements.
 */
export function nextField(keyPress, indexOfElement, focusableElements) {
    const key = keyPress;
    const currentIndex = indexOfElement;
    const fieldList = focusableElements;
    if (key === "j") {
	if (currentIndex < fieldList.length - 1) {
	    fieldList[currentIndex + 1].focus();
	}
    }
}

/**
 * Moves focus to the previous field in the form when a specific key is
 * pressed.
 * @param {string} keyPress - The key input from the user.
 * @param {number} indexOfElement - The current index of the focused field.
 * @param {HTMLElement[]} focusableElements - An array of focusable form elements.
 */
export function previousField(keyPress, indexOfElement, focusableElements) {
    const key = keyPress;
    const currentIndex = indexOfElement;
    const fieldList = focusableElements;
    if (key === "k") {
	if (currentIndex > 0) {
	    fieldList[currentIndex - 1].focus();
	}
    }
}

export function createListFromValues(list) {
    let values = [];
    for (let i = 0; i < list.length - 1; i++) {
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
