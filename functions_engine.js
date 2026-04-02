/**
 * Displays the user's 'entry' mode on the status bar.
 * @param {String} mode Entry mode you wish to display.
 * 			"n" = Normal
 * 			"i" = Insert
 */
export function setStatusBarMode(mode) {
    let statusOutput = document.getElementById('status-bar-output');
    if (mode === "n") {
	statusOutput.textContent = ' --NORMAL-- ';
    }
    else if (mode === "i") {
	statusOutput.textContent = ' --INSERT-- '; }
}
