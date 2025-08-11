const signOut = document.getElementById('signOut');
let selectedCourseId = null;

signOut.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('logged');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('session');
    window.location.href = 'login.html';
});

const modalForm = document.getElementById('modalForm');
modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = sessionStorage.getItem('session');
    const formData = new FormData(modalForm);
    let data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    data['id_estado'] = 3;
    data['id_paciente'] = id;

    try {
        const response = await fetch(`http://localhost:9000/api/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        render();
        modalForm.reset();

    } catch (error) {
        console.error('Error creating appointment:', error);
    }
});

const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = sessionStorage.getItem('session');
    const formData = new FormData(updateForm);
    let data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    data['id_estado'] = 3;
    data['id_paciente'] = id;
    data['id'] = selectedCourseId;

    try {
        const response = await fetch(`http://localhost:9000/api/appointments`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        render();

    } catch (error) {
        console.error('Error updating appointment:', error);
    }
});


document.addEventListener("click", async (e) => {

    const deleteBtn = e.target.closest("button[title='Delete']");
    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (confirm("¿Are you sure to delete the appointment?")) {
            try {
                const response = await fetch(`http://localhost:9000/api/appointments/id/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                render();
            } catch (error) {
                console.error('Error deleting appointment:', error);
            }
        }
    }


    const editBtn = e.target.closest("button[title='Edit']");
    if (editBtn) {
        const id = editBtn.dataset.id;
        selectedCourseId = id; // Guardar para update

        try {
            const response = await fetch(`http://localhost:9000/api/appointments/wjoin/${id}`);
            const appointment = await response.json();

            document.getElementById('dateModalUpdate').value = appointment.fecha_cita.substring(0, 10);
            document.getElementById('timeModalUpdate').value = appointment.hora_cita;
            document.getElementById('reasonModalUpdate').value = appointment.motivo;
            document.getElementById('descriptionModalUpdate').value = appointment.descripcion;
            document.getElementById('ubicationModalUpdate').value = appointment.id_ubicacion;
            document.getElementById('paymentModalUpdate').value = appointment.id_metodo_pago;
            document.getElementById('doctorModalUpdate').value = appointment.id_medico;

        } catch (error) {
            console.error('Error loading appointment:', error);
        }
    }
});

async function render() {
    const id = sessionStorage.getItem('session');
    const responseAppointments = await fetch(`http://localhost:9000/api/appointments/userid/${id}`);
    const responsePatient = await fetch(`http://localhost:9000/api/patients/id/${id}`);

    let appointments = await responseAppointments.json();
    let user = await responsePatient.json();

    document.getElementById('username').textContent = `${user.nombre_paciente} appointments`;

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ``;

    if (appointments.length > 0) {
        appointments.forEach(cita => {
            tableBody.innerHTML += `
                <tr>
                    <td>${cita.motivo}</td>
                    <td>${cita.fecha_cita}</td>
                    <td>${cita.hora_cita}</td>
                    <td>${cita.nombre_ubicacion}</td>
                    <td>${cita.nombre_estado}</td>
                    <td>${cita.nombre_medico}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" title="Edit" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="${cita.id}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-danger" title="Delete" data-id="${cita.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        tableBody.innerHTML = `<h4 class="mt-3">This patient has no appointments.</h4>`;
    }
}

render();
