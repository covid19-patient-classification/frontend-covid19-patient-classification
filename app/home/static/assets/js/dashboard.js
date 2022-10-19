/* eslint-disable no-undef */
/* eslint-disable-next-line no-undef */
('use strict');
const moderatePatientColor = '#10739E';
const seriusPatientColor = '#CF8913';
const criticalPatientColor = '#9D443D';

let skeletonClasses = [
    'skeleton',
    'skeleton-text',
    'skeleton-chart',
    'skeleton-table',
    'skeleton-body',
    'skeleton-w-10',
    'skeleton-w-20',
    'skeleton-w-30',
    'skeleton-w-40',
    'skeleton-w-50',
    'skeleton-w-60',
    'skeleton-w-70',
    'skeleton-w-90',
    'skeleton-w-90',
    'skeleton-w-100',
];

date.locale('es');
let patientTable;
var totalPatientChartInstance;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setDateFormat(createdAt, format) {
    const dateFormat = date.format(new Date(createdAt), format);
    return capitalize(dateFormat.replace('.', ''));
}

function setPatientCard(weeklyDate, data, typeOfPatient) {
    const label = document.getElementById(`${typeOfPatient}-label`);
    label.innerHTML = data.label;
    removeSkeletonClasses(label);

    const dropdownContainer = document.getElementById(`${typeOfPatient}-dropdown-container`);
    const dropdownLabel = document.getElementById(`${typeOfPatient}-dropdown-label`);
    const moderateDropdownFilters = document.getElementById(`${typeOfPatient}-dropdown-filters`);
    dropdownLabel.innerHTML = weeklyDate;
    moderateDropdownFilters.classList.remove('d-none');
    removeSkeletonClasses(dropdownContainer);

    const statusContainer = document.getElementById(`${typeOfPatient}-status-container`);
    const status = document.getElementById(`${typeOfPatient}-status`);
    setCoutUp(status, data.total);
    removeSkeletonClasses(statusContainer);

    const percentageContainer = document.getElementById(`${typeOfPatient}-percentage-container`);
    const percentage = data.percentage;
    const percentageLabel = data.percentage_label;
    setPatientCardPercentage(typeOfPatient, percentage, percentageLabel);
    removeSkeletonClasses(percentageContainer);
}

function setPatientCardPercentage(typeOfPatient, percentage, percentageLabel) {
    const percentageStatus = document.getElementById(`${typeOfPatient}-percentage`);
    percentage = percentage.toFixed(0);
    if (percentage > 0) {
        percentageStatus.innerHTML = `+${percentage}%`;
        percentageStatus.classList.remove('text-success');
        percentageStatus.classList.add('text-danger');
    } else {
        percentageStatus.innerHTML = `${percentage}%`;
        percentageStatus.classList.remove('text-danger');
        percentageStatus.classList.add('text-success');
    }

    percentageStatus.innerHTML += `<span class="font-weight-normal opacity-8 text-dark" id="moderate-percentage-label"> ${percentageLabel}</span>`;
}

// Chart bar Patients by week
function createWeeklyPatientsChart(weeklyRanking, moderatePatients, seriusPatients, criticalPatients) {
    const weeklyChartContainer = document.getElementById('weekly-chart-container');
    const weeklyPatientChart = document.getElementById('weekly-patient-chart').getContext('2d');

    new Chart(weeklyPatientChart, {
        type: 'bar',
        data: {
            labels: weeklyRanking.labels,
            datasets: [
                {
                    label: moderatePatients.label,
                    tension: 1,
                    borderWidth: 0,
                    borderRadius: 5,
                    backgroundColor: moderatePatientColor,
                    data: moderatePatients.data,
                    maxBarThickness: 20,
                },
                {
                    label: seriusPatients.label,
                    tension: 1,
                    borderWidth: 0,
                    borderRadius: 5,
                    backgroundColor: seriusPatientColor,
                    data: seriusPatients.data,
                    maxBarThickness: 20,
                },
                {
                    label: criticalPatients.label,
                    tension: 1,
                    borderWidth: 0,
                    borderRadius: 5,
                    backgroundColor: criticalPatientColor,
                    data: criticalPatients.data,
                    maxBarThickness: 20,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    },
                    stacked: true,
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 12,
                            family: 'Open Sans',
                            style: 'normal',
                        },
                        color: '#9ca2b7',
                    },
                    stacked: true,
                },
            },
        },
    });
    removeSkeletonClasses(weeklyChartContainer);
}

// Chart Doughnut Total patients classified
function createTotalPatientsDoughnutChart(totalRanking) {
    const moderatePatients = totalRanking.data.moderate_patients;
    const seriusPatients = totalRanking.data.serius_patients;
    const criticalPatients = totalRanking.data.critical_patients;
    const totalChartContainer = document.getElementById('total-doughnut-chart-container');
    const totalPatientChart = document.getElementById('total-patient-doughnut-chart').getContext('2d');
    const gradientStroke1 = totalPatientChart.createLinearGradient(0, 230, 0, 50);
    const totalChartStatus = document.getElementById('total-doughnut-chart-status');
    const totalChartLabel = document.getElementById('total-doughnut-chart-label');

    gradientStroke1.addColorStop(1, 'rgba(16, 115, 158,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(16, 115, 158,0)');

    new Chart(totalPatientChart, {
        type: 'doughnut',
        data: {
            labels: [moderatePatients.label, seriusPatients.label, criticalPatients.label],
            datasets: [
                {
                    weight: 10,
                    cutout: 90,
                    tension: 0.9,
                    pointRadius: 2,
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: [moderatePatientColor, seriusPatientColor, criticalPatientColor],
                    data: [moderatePatients.total, seriusPatients.total, criticalPatients.total],
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            interaction: {
                intersect: false,
                mode: 'point',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            },
        },
    });

    setCoutUp(totalChartStatus, totalRanking.total);
    totalChartLabel.classList.remove('d-none');
    removeSkeletonClasses(totalChartContainer);
    createTotalTable(moderatePatients, seriusPatients, criticalPatients);
}

// Create total table in doughnut chart
function createTotalTable(moderatePatients, seriusPatients, criticalPatients) {
    const totalChartContainer = document.getElementById('total-table-container');
    const totalTable = document.getElementById('total-table');
    totalTable.innerHTML += `
        <tbody>
            <tr>
                <td>
                    <div class="d-flex px-2 py-0">
                        <span class="badge moderate-bg me-3"> </span>
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${moderatePatients.label.split(' ')[1]}</h6>
                        </div>
                    </div>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="text-body text-xs font-weight-bold" id="donut-moderate-status"> ${moderatePatients.total} </span>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="d-flex px-2 py-0">
                        <span class="badge serius-bg me-3"> </span>
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${seriusPatients.label.split(' ')[1]}</h6>
                        </div>
                    </div>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="text-body text-xs font-weight-bold" id="donut-serius-status"> ${seriusPatients.total} </span>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="d-flex px-2 py-0">
                        <span class="badge critical-bg me-3"> </span>
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${criticalPatients.label.split(' ')[1]}</h6>
                        </div>
                    </div>
                </td>
                <td class="align-middle text-center text-sm">
                    <span class="text-body text-xs font-weight-bold" id="donut-critical-status"> ${criticalPatients.total} </span>
                </td>
            </tr>
        </tbody>
    `;
    removeSkeletonClasses(totalChartContainer);
}

// Total patients line chart
function createTotalPatientsLineChart(ranking) {
    const moderatePatients = ranking.data.moderate_patients;
    const seriusPatients = ranking.data.serius_patients;
    const criticalPatients = ranking.data.critical_patients;
    const totalLineChartStatus = document.getElementById('total-line-chart-status');
    const totalLineChartLabel = document.getElementById('total-line-chart-label');
    const totalLineChartPercentage = document.getElementById('total-line-chart-percentage');

    setCoutUp(totalLineChartStatus, ranking.total);
    totalLineChartLabel.classList.remove('d-none');
    totalLineChartPercentage.innerHTML = setTotalPatientPercentage(ranking.total_percentage);

    // Legend of line chart
    setLegendTotalPatientLineChart('moderate', moderatePatients.label);
    setLegendTotalPatientLineChart('serius', seriusPatients.label);
    setLegendTotalPatientLineChart('critical', criticalPatients.label);

    // Construct chart
    constructTotalPatientLineChart(ranking.labels, moderatePatients, seriusPatients, criticalPatients);

    removeSkeletonClasses(totalLineChartStatus);
    removeSkeletonClasses(totalLineChartLabel);
    removeSkeletonClasses(totalLineChartPercentage);
}

function setTotalPatientPercentage(percentage) {
    percentage = percentage.toFixed(0);
    if (percentage >= 0) {
        return `
            <i class="ni ni-bold-up text-sm text-danger me-1"></i>
            <span class="text-sm text-end text-danger font-weight-bolder mt-auto mb-0">+${percentage}%</span>
        `;
    } else {
        return `
            <i class="ni ni-bold-down text-sm text-success me-1"></i>
            <span class="text-sm text-end text-success font-weight-bolder mt-auto mb-0">${percentage}%</span>
        `;
    }
}

function setLegendTotalPatientLineChart(typeOfPatient, patientLabel) {
    const totalLinepatientBadgeContainer = document.getElementById(`total-line-${typeOfPatient}-badge`);
    totalLinepatientBadgeContainer.innerHTML = `
        <i class="${typeOfPatient}-bg"></i>
        <span class="text-dark text-xs">${patientLabel}</span>
    `;
    removeSkeletonClasses(totalLinepatientBadgeContainer);
}

function constructTotalPatientLineChart(chartLabels, moderatePatients, seriusPatients, criticalPatients) {
    if (totalPatientChartInstance) totalPatientChartInstance.destroy();

    const totalPatientLineChartContainer = document.getElementById('total-line-chart-container');
    const totalPatientLineChart = document.getElementById('total-line-chart').getContext('2d');
    const gradientStroke1 = totalPatientLineChart.createLinearGradient(0, 230, 0, 50);
    const gradientStroke2 = totalPatientLineChart.createLinearGradient(0, 230, 0, 50);
    const gradientStroke3 = totalPatientLineChart.createLinearGradient(0, 230, 0, 50);

    // Set gradients colors
    gradientStroke1.addColorStop(1, 'rgba(23, 194, 232, 0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(23, 194, 232,0)');
    gradientStroke2.addColorStop(1, 'rgba(58, 65, 111,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(58, 65, 111,0)');
    gradientStroke3.addColorStop(1, 'rgba(203, 12, 159,0.2)');
    gradientStroke3.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke3.addColorStop(0, 'rgba(203, 12, 159,0)');

    totalPatientChartInstance = new Chart(totalPatientLineChart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: moderatePatients.label,
                    tension: 0.4,
                    pointRadius: 2,
                    pointBackgroundColor: moderatePatientColor,
                    borderColor: moderatePatientColor,
                    backgroundColor: gradientStroke1,
                    borderWidth: 3,
                    fill: true,
                    data: moderatePatients.data,
                    maxBarThickness: 6,
                },
                {
                    label: seriusPatients.label,
                    tension: 0.4,
                    pointRadius: 2,
                    pointBackgroundColor: seriusPatientColor,
                    borderColor: seriusPatientColor,
                    backgroundColor: gradientStroke2,
                    borderWidth: 3,
                    fill: true,
                    data: seriusPatients.data,
                    maxBarThickness: 6,
                },
                {
                    label: criticalPatients.label,
                    tension: 0.4,
                    pointRadius: 2,
                    pointBackgroundColor: criticalPatientColor,
                    borderColor: criticalPatientColor,
                    backgroundColor: gradientStroke3,
                    borderWidth: 3,
                    fill: true,
                    data: criticalPatients.data,
                    maxBarThickness: 6,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    position: 'nearest',
                },
            },
            interaction: {
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 12,
                            family: 'Open Sans',
                            style: 'normal',
                        },
                        color: '#9ca2b7',
                    },
                },
            },
        },
    });

    removeSkeletonClasses(totalPatientLineChartContainer);
}

function clearPatientDataTable(dataTablePatients) {
    patientTable.clear();
    patientTable.destroy();
    dataTablePatients.removeChild(dataTablePatients.getElementsByTagName('tbody')[0]);
}

function createSummaryTable(summary) {
    const format = 'DD MMM YYYY';
    const datatablePatientsContainer = document.getElementById('datatable-patients-container');
    const dataTablePatients = document.getElementById('datatable-patients');

    if (patientTable) clearPatientDataTable(dataTablePatients);

    const tbody = setTbodySummaryTable(summary.patients, format);
    dataTablePatients.innerHTML += `
        <tbody>
            ${tbody}
        </tbody>
    `;
    dataTablePatients.classList.remove('d-none');
    removeSkeletonClasses(datatablePatientsContainer);
    setDatatablePlugin();
}

function setTbodySummaryTable(patients, format) {
    let tbody = '';
    patients.forEach((patient) => {
        tbody += `
           <tr>
            <td class="text-sm text-dark fw-bolder">${patient.identification}</td>
            <td class="text-sm text-dark fw-bolder">${patient.name}</td>
            <td class="text-sm text-dark fw-bolder">${setDateFormat(patient.created_at, format)}</td>
            <td class="text-sm text-dark fw-bolder">${setCaseSeverityPatient(patient.covid19_severity)}</td>
            <td class="text-sm text-dark fw-bolder">${patient.sato2}%</td>
            <td class="text-sm text-dark fw-bolder">${patient.pao2}%</td>
            <td class="text-sm text-dark fw-bolder">${patient.fio2}%</td>
            <td class="text-sm text-dark fw-bolder">${patient.pf_ratio} mmHg</td>
            <td>${setTdSyntomatology(patient.respiratory_failure)}</td>
            <td>${setTdSyntomatology(patient.ards)}</td>
            <td>${setTdSyntomatology(patient.sepsis_shock)}</td>
            <td>${setTdSyntomatology(patient.fever)}</td>
            <td>${setTdSyntomatology(patient.cough)}</td>
            <td>${setTdSyntomatology(patient.sore_throat)}</td>
            <td>${setTdSyntomatology(patient.headache)}</td>
            <td>${setTdSyntomatology(patient.fatigue)}</td>
            <td>${setTdSyntomatology(patient.dyspnea)}</td>
            <td>${setTdSyntomatology(patient.nausea)}</td>
            <td>${setTdSyntomatology(patient.vomit)}</td>
            <td>${setTdSyntomatology(patient.diarrhea)}</td>
           </tr>
        `;
    });
    return tbody;
}

function setCaseSeverityPatient(caseSeverity) {
    const caseSeverityLower = caseSeverity.toLowerCase();

    if (caseSeverityLower === 'moderado') {
        return `<span class="badge moderate-bg badge-sm">${caseSeverity}</span>`;
    }

    if (caseSeverityLower === 'grave') {
        return `<span class="badge serius-bg badge-sm">${caseSeverity}</span>`;
    }

    return `<span class="badge critical-bg badge-sm">${caseSeverity}</span>`;
}

function setTdSyntomatology(symptom) {
    if (symptom) {
        return `
            <div class="d-flex align-items-center">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-danger" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
                <p class="text-sm text-dark fw-bolder mb-0">SI</p>
            </div>
        `;
    }

    return `
        <div class="d-flex align-items-center">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="td-icon text-success" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
            </svg>
            <p class="text-sm text-dark fw-bolder mb-0">NO</p>
        </div>
    `;
}

// Set datable plugin
function setDatatablePlugin() {
    patientTable = new simpleDatatables.DataTable('#datatable-patients');
}

function setCoutUp(element, value) {
    element.setAttribute('countTo', value);
    if (element) {
        const countUp = new CountUp(element, element.getAttribute('countTo'));
        if (!countUp.error) {
            countUp.start();
        }
    }
}

// initialization of Tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {});
    });
}

function removeSkeletonClasses(element) {
    element.classList.remove(...skeletonClasses);
}

function aosInit() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
    });
}

function errorAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Error al procesar la solicitud',
        text: 'Intente nuevamente por favor!',
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true,
    });
}

function setCardDate(startDate, endDate) {
    const currentDate = setDateFormat(new Date().toDateString(), 'MM/DD/YYYY');
    if (currentDate === endDate) {
        startDate = setDateFormat(startDate, 'DD de MMMM');
        endDate = 'Hoy';
    } else {
        startDate = setDateFormat(startDate, 'DD de MMM');
        endDate = setDateFormat(endDate, 'DD de MMM');
    }
    return `${startDate} - ${endDate}`;
}

// Initial data
function getInitialData() {
    $.ajax({
        url: '/initial-dashboard-data',
        type: 'GET',
        success: (response) => {
            const weeklyRanking = response.weekly_ranking;
            const annualRanking = response.annual_ranking;
            const totalRanking = response.total_ranking;
            const summary = response.summary;
            const weeklyDate = setCardDate(weeklyRanking.start_date, weeklyRanking.end_date);
            const weeklyModeratePatients = weeklyRanking.data.moderate_patients;
            const weeklySeriusPatients = weeklyRanking.data.serius_patients;
            const weeklyCriticalPatients = weeklyRanking.data.critical_patients;

            // Initial statistics
            setPatientCard(weeklyDate, weeklyModeratePatients, 'moderate');
            setPatientCard(weeklyDate, weeklySeriusPatients, 'serius');
            setPatientCard(weeklyDate, weeklyCriticalPatients, 'critical');

            createWeeklyPatientsChart(weeklyRanking, weeklyModeratePatients, weeklySeriusPatients, weeklyCriticalPatients); // Create weekly chart
            createTotalPatientsDoughnutChart(totalRanking); // Create total doughnut chart
            createTotalPatientsLineChart(annualRanking); // Create total line chart
            createSummaryTable(summary); // Create summary table
            initializeTooltips(); // Initialize tooltips
        },
        error: () => {
            window.location.href = '/internal-error';
        },
    });
}

function queryPatientCard(filter) {
    $.ajax({
        url: '/filter-patient-card',
        type: 'GET',
        data: filter,
        success: (response) => {
            const cardDate = setCardDate(response.start_date, response.end_date);
            setPatientCard(cardDate, response.data.patients, filter.covid19Severity);
        },
        error: () => {
            errorAlert();
        },
    });
}

// Initial statistics dropdown actions
const dropDownOptions = document.querySelectorAll('#moderate-dropdown-options li a, #serius-dropdown-options li a, #critical-dropdown-options li a');
dropDownOptions.forEach((dropdown) => {
    dropdown.addEventListener('click', () => {
        const filter = {
            covid19Severity: dropdown.getAttribute('data-severity'),
            dateRange: dropdown.getAttribute('date-range'),
        };
        queryPatientCard(filter);
    });
});

// Chart line Patients by datepicker
function queryTotalPatientLineChart(filter) {
    $.ajax({
        url: '/filter-total-line-chart',
        type: 'GET',
        data: filter,
        success: (response) => {
            createTotalPatientsLineChart(response.ranking);
        },
        error: () => {
            errorAlert();
        },
    });
}

function resetTotalPatientLineChart() {
    dates = [];
    const filter = {
        startDate: setDateFormat(new Date(), 'DD-MMM-YYYY'),
    };
    queryTotalPatientLineChart(filter);
}

if (document.querySelector('.datepicker')) {
    flatpickr('.datepicker', {
        mode: 'range',
        locale: 'es',
        dateFormat: 'd M Y',
        maxDate: new Date(),
        onChange: (dates) => {
            if (dates.length === 2) {
                const startDate = setDateFormat(dates[0], 'MM-DD-YYYY');
                const endDate = setDateFormat(dates[1], 'MM-DD-YYYY');
                if (startDate === endDate) {
                    clearDatePicker();
                } else {
                    const filter = {
                        startDate: startDate,
                        endDate: endDate,
                    };
                    queryTotalPatientLineChart(filter);
                }
            }
        },
        onClose: (dates) => {
            if (dates.length < 2) {
                resetTotalPatientLineChart();
            }
        },
    });
}

function clearDatePicker() {
    document.querySelector('.datepicker')._flatpickr.clear();
    resetTotalPatientLineChart();
}
document.getElementById('clear-date').addEventListener('click', () => {
    clearDatePicker();
});

// Summary table filter
function querySummaryTable(filter) {
    $.ajax({
        url: '/filter-summary-table',
        type: 'GET',
        data: filter,
        success: (response) => {
            createSummaryTable(response.summary);
        },
        error: () => {
            errorAlert();
        },
    });
}

const summaryDropDownOptions = document.querySelectorAll('#dropdown-table-options li a');
summaryDropDownOptions.forEach((dropdown) => {
    dropdown.addEventListener('click', () => {
        const filter = {
            covid19Severity: dropdown.getAttribute('data-severity'),
        };
        querySummaryTable(filter);
    });
});

// Load
window.addEventListener('load', () => {
    aosInit();
    getInitialData();
});
