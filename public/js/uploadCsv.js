const form = document.getElementById('csvForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tableName = document.getElementById('tableName').value.trim();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`http://localhost:9000/api/files/?table=${tableName}`, {
            method: 'POST',
            body: formData
        });

        alert("Cargado correctamente")
    } catch (err) {
        alert("")
    }
});
