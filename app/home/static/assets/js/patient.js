const patientForm = document.getElementById('patient-form');

patientForm.addEventListener('submit', (event) => {
    if (patientForm.checkValidity()) {
        sendPatient();
    } else {
        emptyFormAlert();
    }
    event.preventDefault();
});

function sendPatient() {
    $.ajax({
        url: '/classify-patient',
        type: 'POST',
        dataType: 'json',
        beforeSend: () => {
            loadingAlert();
        },
        success: (response) => {
            console.log(response);
            successAlert();
        },
    });
}

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

function emptyFormAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Campos faltantes',
        text: 'Debe agregar todas las variables clínicas',
        confirmButtonText: 'Aceptar',
    });
}

function errorAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Error al clasificar al paciente',
        text: 'Intente nuevamente por favor!',
        confirmButtonText: 'Aceptar',
        timer: 3000,
    });
}

function successAlert() {
    let timerInterval;
    Swal.fire({
        title: 'Paciente clasificado exitosamente',
        html: 'Los cambios se visualizarán en <b></b> milisegundos.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    });
}
