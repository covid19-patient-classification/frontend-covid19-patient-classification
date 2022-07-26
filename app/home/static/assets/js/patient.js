const patientForm = document.getElementById('patient-form');

patientForm.addEventListener('submit', (event) => {
    if (patientForm.checkValidity()) {
        loadingAlert();
    } else {
        errorAlert();
    }
    event.preventDefault();
});

function loadingAlert() {
    Swal.fire({
        title: 'Clasificando al paciente',
        text: 'Espere por favor!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
}

function errorAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Campos faltantes',
        text: 'Debe agregar todas las variables clínicas',
        confirmButtonText: 'Aceptar',
    });
}
