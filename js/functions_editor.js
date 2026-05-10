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

export function nextField(key, array) {
    if (key === "j") {
        const focusedElement = document.activeElement;
        const currentIndex = array.indexOf(focusedElement);
        if (currentIndex < array.length - 1) {
            array[currentIndex + 1].focus();
        }
    }
}

export function previousField(key, array) {
    if (key === "k") {
        const focusedElement = document.activeElement;
        const currentIndex = array.indexOf(focusedElement);
        if (currentIndex > 0) {
            array[currentIndex - 1].focus();
        }
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
            <p class="functionality">&lt;F1&gt;&thinsp;Forms&thinsp;</p>
            <p class="functionality">&lt;F10&gt;&thinsp;Download&thinsp;</p>
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
