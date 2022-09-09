const patientForm = document.getElementById('patient-form');
const sato2Tooltip = document.getElementById('sato2-tooltip');
const pao2Input = document.getElementById('pao2');
const paa2Tooltip = document.getElementById('pao2-tooltip');
const fio2Input = document.getElementById('fio2');
const fio2Tooltip = document.getElementById('fio2-tooltip');
const pfRatioInput = document.getElementById('pf-ratio');
const pfRatioTooltip = document.getElementById('pf-ratio-tooltip');
const ardsTooltip = document.getElementById('ards-tooltip');

initializeClinicalTooltips();


pao2Input.addEventListener('keyup', () => {
    calculatePfRatio();
});

fio2Input.addEventListener('keyup', () => {
    calculatePfRatio();
});

patientForm.addEventListener('submit', (event) => {
    if (patientForm.checkValidity()) {
        sendPatient();
    } else {
        emptyFormAlert();
    }
    event.preventDefault();
});

function initializeClinicalTooltips(){
    setBoostrapTooltip(sato2Tooltip, '95 - 100%', '90 - 94%', '<90%') // SatO2 tooltip
    setBoostrapTooltip(paa2Tooltip, '61 - 100%', '50 - 60%', '<50%') // PaO2 tooltip
    setBoostrapTooltip(fio2Tooltip, '1 - 20%', '21 - 40%', '>40%') // FiO2 tooltip
    setGeneralTooltip(pfRatioTooltip) // P/F Ratio tootltip
    setGeneralTooltip(ardsTooltip) // ARDS tooltip
}

function setBoostrapTooltip(tooltipId, normalValue, lowValue, criticalValue){
    return new bootstrap.Tooltip(tooltipId, {
        html: true,
        title: displayTooltipHTML(normalValue, lowValue, criticalValue),
    })
}

function calculatePfRatio() {
    var pao2 = pao2Input.value;
    var fio2 = fio2Input.value;

    if (pao2 >= 0 && pao2 <= 100 && fio2 >= 1 && fio2 <= 100) {
        var pfRatio = (pao2 / fio2) * 100;
        pfRatioInput.value = pfRatio;
    }else{
        pfRatioInput.value = ""
    }
}

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
        title: 'Clasificado exitosamente',
        html: displayTimeLineHTML(),
        icon: 'success',
        confirmButtonText: 'De acuerdo',
    });
}

function displayTooltipHTML(normalValue, lowValue, criticalValue){
    return `
        <b>Saturación de oxígeno</b>
        <div class='d-flex mt-2'>
            <span class='badge badge-md badge-dot text-justify p-0'>
                <i class=' bg-gradient-success ms-0'></i>
                <span class='text-xxs'>`+normalValue+ ` Normal</span>
            </span>
        </div>
        <div class='d-flex mt-2'>
            <span class='badge badge-md badge-dot text-justify p-0'>
                <i class='bg-gradient-warning ms-0'></i>
                <span class='text-xxs'>`+lowValue +` Bajo</span>
            </span>
        </div>
        <div class='d-flex mt-2'>
            <span class='badge badge-md badge-dot text-justify p-0'>
                <i class='bg-gradient-danger ms-0'></i>
                <span class='text-xxs'>`+criticalValue+ ` Crítico</span>
            </span>
        </div>                                         
    `;
}


function displayTimeLineHTML() {
    return `
        <div class="container-fluid py-4">
            <div class="row gx-4 text-sm-start">
                <h6 class="text-start">Es un paciente <span class="badge serius-bg badge-md">Grave</span></h6>
                <div class="timeline timeline-one-side mt-3 ps-3" data-timeline-axis-style="dashed">
                    <div class="timeline-block mb-4">
                        <span class="timeline-step">
                            <i class="ni ni-bold-down text-primary text-gradient"></i>
                        </span>
                        <div class="timeline-content">
                            <h6 class="text-dark text-sm font-weight-bold mb-0 text-start">¿ Saturación de O<sub>2</sub> < al 94% ?</h6>
                            <div class="d-flex align-items-center mt-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-danger" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                </svg>
                                <p class="text-secondary fw-bolder text-sm mt-1 mb-0">92.2%</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-block mb-4">
                        <span class="timeline-step">
                            <i class="ni ni-bold-down text-primary text-gradient"></i>
                        </span>
                        <div class="timeline-content">
                            <h6 class="text-dark text-sm font-weight-bold mb-0 text-start">¿ Presión Arterial / Fracción de O<sub>2</sub> inspirado < a 300 mmHg ?</h6>
                            <div class="d-flex align-items-center mt-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-danger" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                </svg>
                                <p class="text-secondary fw-bolder text-sm mt-1 mb-0">208.2 mmHg</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-block mb-4">
                        <span class="timeline-step">
                            <i class="ni ni-bold-down text-primary text-gradient"></i>
                        </span>
                        <div class="timeline-content">
                            <h6 class="text-dark text-sm font-weight-bold mb-0 text-start">¿ Presenta Insuficiencia Respiratoria ?</h6>
                            <div class="d-flex align-items-center mt-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-success" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                </svg>
                                <p class="text-sm text-dark fw-bolder mb-0">NO</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-block mb-4">
                        <span class="timeline-step">
                            <i class="ni ni-bold-down text-primary text-gradient"></i>
                        </span>
                        <div class="timeline-content">
                            <h6 class="text-dark text-sm font-weight-bold mb-0 text-start">¿ Presenta Síndrome de dificultad Respiratoria ?</h6>
                            <div class="d-flex align-items-center mt-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-success" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                </svg>
                                <p class="text-sm text-dark fw-bolder mb-0">NO</p>
                            </div>
                        </div>
                    </div>
                    <div class="timeline-block">
                        <span class="timeline-step">
                            <i class="ni ni-bold-down text-primary text-gradient"></i>
                        </span>
                        <div class="timeline-content">
                            <h6 class="text-dark text-sm font-weight-bold mb-0 text-start">¿ Presenta shock séptico ?</h6>
                            <div class="d-flex align-items-center mt-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-success" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                </svg>
                                <p class="text-sm text-dark fw-bolder mb-0">NO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setGeneralTooltip(tooltipId){
    return new bootstrap.Tooltip(tooltipId, {});
}