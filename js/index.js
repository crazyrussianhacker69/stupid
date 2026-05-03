window.onload = () => {
    function validateID(inputBox) {
        if (inputBox.value.length > 0 && inputBox.value.length <=5) {
            sessionStorage.setItem('operatorID', inputBox.value.trim());
            document.location.href = 'main_hub.html';
        }
        else {
            alert('INVALID INPUT!\nID should be no more than 5 characters long');
        }
    }

    const inputBox = document.getElementById('opIDInputBox');
    inputBox.focus();
    inputBox.addEventListener('keydown', (event) => {
        const keypress = event.key;
        if (keypress === 'Enter') {
            validateID(inputBox);
        }
    });

    document.getElementById('loginBtn').addEventListener('click', () => {
        validateID(inputBox);
    });
}
