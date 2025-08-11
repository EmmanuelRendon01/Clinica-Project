if (sessionStorage.getItem('login') === 'true') {
    window.location.href = 'dashboardPatient.html';
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);

        let data = {}

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        if (!data.email.trim() || !data.name.trim()) {
            alert("There is empty values");
            return;
        }

        const response = await fetch(`http://localhost:9000/api/patients/email/${data.email}`);
        const patient = await response.json();

        if (patient.correo_paciente === data.email) {
            if (patient.nombre_paciente === data.name) {
                sessionStorage.setItem('logged', "user");
                sessionStorage.setItem('login', "true");
                sessionStorage.setItem('session', JSON.stringify(patient.id));
                alert('Login succesful');
                window.location.href = 'dashboardPatient.html';
            } else {
                alert('Email or name incorrect');
            }
        } else {
            alert('Email or name incorrect');
        }
    })
}