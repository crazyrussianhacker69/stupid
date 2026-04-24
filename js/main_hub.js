window.onload = () => {
    const operatorID = sessionStorage.getItem('operatorID');
    if (!operatorID) {
        window.location.href = 'index.html';
    }

    const output = document.getElementById('operatorID');
    output.textContent = `Operator: ${operatorID.toUpperCase()}`;

    const signOutBtn = document.getElementById('signOutBtn');
    signOutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to sign out?')) {
            sessionStorage.removeItem('operatorID');
            window.location.href = 'index.html';
        }
    });

    document.getElementById('formBuilderBtn').addEventListener('click', () => {
        window.location.href = 'form_builder.html';
    });

    document.getElementById('recordEditorBtn').addEventListener('click', () => {
        window.location.href = 'record_editor.html';
    });
};
