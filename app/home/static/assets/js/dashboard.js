/* eslint-disable no-undef */
/* eslint-disable-next-line no-undef */
('use strict');

const moderatePatientColor = '#10739E';
const seriusPatientColor = '#CF8913';
const criticalPatientColor = '#9D443D';
const skeletonClasses = [
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
const covid19Severities = {
    moderate: { index: 0 },
    serius: { index: 1 },
    critical: { index: 2 },
};

date.locale('es');
let weeklyPatientChartInstance;
let totalPatientsDoughnutChartInstance;
let totalPatientLineChartInstance;
let patientsDataTableInstance;
// let currentSummaryTableData = { patients: [] };

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setDateFormat(createdAt, format) {
    const dateFormat = date.format(new Date(createdAt), format);
    return capitalize(dateFormat.replace('.', ''));
}

function setPatientCard(weeklyDate, data, typeOfPatient) {
    let label = document.getElementById(`${typeOfPatient}-label`);
    label.innerHTML = data.label;
    removeSkeletonClasses(label);

    let dropdownContainer = document.getElementById(`${typeOfPatient}-dropdown-container`);
    let dropdownLabel = document.getElementById(`${typeOfPatient}-dropdown-label`);
    let severityDropdownFilters = document.getElementById(`${typeOfPatient}-dropdown-filters`);
    dropdownLabel.innerHTML = weeklyDate;
    severityDropdownFilters.classList.remove('d-none');
    removeSkeletonClasses(dropdownContainer);

    let statusContainer = document.getElementById(`${typeOfPatient}-status-container`);
    let status = document.getElementById(`${typeOfPatient}-status`);
    setCoutUp(status, data.total);
    removeSkeletonClasses(statusContainer);

    let percentageContainer = document.getElementById(`${typeOfPatient}-percentage-container`);
    let percentage = data.percentage;
    let percentageLabel = data.percentage_label;
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

    weeklyPatientChartInstance = new Chart(weeklyPatientChart, {
        type: 'bar',
        data: {
            labels: getChartLabels(weeklyRanking.labels),
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

    totalPatientsDoughnutChartInstance = new Chart(totalPatientChart, {
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
    const totalLineChartLabelContainer = document.getElementById('total-line-chart-label-container');
    const totalLineChartLegends = document.getElementById('total-line-badges');
    const totalLineChartPercentage = document.getElementById('total-line-chart-percentage');

    setCoutUp(totalLineChartStatus, ranking.total);
    totalLineChartLabel.classList.remove('d-none');
    totalLineChartPercentage.innerHTML = setTotalPatientPercentage(ranking.total_percentage);

    // Legend of line chart
    setLegendTotalPatientLineChart('moderate', moderatePatients.label);
    setLegendTotalPatientLineChart('serius', seriusPatients.label);
    setLegendTotalPatientLineChart('critical', criticalPatients.label);
    totalLineChartLegends.classList.add('mb-1');

    // Construct chart
    constructTotalPatientLineChart(ranking.labels, moderatePatients, seriusPatients, criticalPatients);

    removeSkeletonClasses(totalLineChartStatus);
    removeSkeletonClasses(totalLineChartLabelContainer);
    removeSkeletonClasses(totalLineChartPercentage);
}

function setTotalPatientPercentage(percentage) {
    percentage = percentage.toFixed(0);
    if (percentage >= 0) {
        return `
            <i class="ni ni-bold-up text-sm text-danger me-1"></i>
            <span class="text-sm text-end text-danger font-weight-bolder mt-auto mb-0">+${percentage}%</span>
            <span class="text-secondary text-sm ms-2">en <strong>${new Date().getFullYear()}</strong></span>
        `;
    } else {
        return `
            <i class="ni ni-bold-down text-sm text-success me-1"></i>
            <span class="text-sm text-end text-success font-weight-bolder mt-auto mb-0">${percentage}%</span>
            <span class="text-secondary text-sm ms-2">en <strong>${new Date().getFullYear()}</strong></span>
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

function validateDate(dateLabel) {
    const currentYear = new Date().getFullYear().toString();
    return dateLabel.includes(currentYear);
}

function getChartLabels(chartLabels) {
    if (chartLabels.every(validateDate)) {
        const currentYear = new Date().getFullYear().toString();
        let = labels = [];
        chartLabels.map((label) => {
            if (label.includes(currentYear)) {
                labels.push(label.replace(` ${currentYear}`, ''));
            }
        });
        return labels;
    }

    return chartLabels;
}
function destroyChart(chart) {
    if (chart) chart.destroy();
}

function constructTotalPatientLineChart(chartLabels, moderatePatients, seriusPatients, criticalPatients) {
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
    totalPatientLineChartInstance = new Chart(totalPatientLineChart, {
        type: 'line',
        data: {
            labels: getChartLabels(chartLabels),
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

function clearPatientDataTable(patientsDataTable) {
    patientsDataTableInstance.clear();
    patientsDataTableInstance.destroy();
    patientsDataTable.removeChild(patientsDataTable.getElementsByTagName('tbody')[0]);
}

function createSummaryTable(summary) {
    let patientsDataTableContainer = document.getElementById('datatable-patients-container');
    let patientsDataTable = document.getElementById('datatable-patients');
    let tbody = setTbodySummaryTable(summary.patients);
    if (patientsDataTableInstance) clearPatientDataTable(patientsDataTable);
    patientsDataTable.innerHTML += `
        <tbody>
            ${tbody}
        </tbody>
    `;
    patientsDataTable.classList.remove('d-none');
    removeSkeletonClasses(patientsDataTableContainer);
    setDatatablePlugin();
}

function addTrSummaryTable(patient) {
    let format = 'DD MMM YYYY';
    return `
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
}

function setTbodySummaryTable(patients) {
    let tbody = '';
    // currentSummaryTableData.patients = []
    patients.forEach((patient) => {
        tbody += addTrSummaryTable(patient);
        // currentSummaryTableData.patients.push(patient);
    });
    return tbody;
}

function setCaseSeverityPatient(caseSeverity) {
    let caseSeverityLower = caseSeverity.toLowerCase();

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
    patientsDataTableInstance = new simpleDatatables.DataTable('#datatable-patients');
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
            window.location.href = '/500';
        },
    });
}

function addSkeletonClasses(element, classes) {
    element.classList.add(...classes);
}

function addCardSkeletonClasses(typeOfPatient) {
    let dropdownContainer = document.getElementById(`${typeOfPatient}-dropdown-container`);
    let severityDropdownFilters = document.getElementById(`${typeOfPatient}-dropdown-filters`);
    addSkeletonClasses(dropdownContainer, ['skeleton', 'skeleton-text', 'skeleton-w-30']);

    let statusContainer = document.getElementById(`${typeOfPatient}-status-container`);
    let status = document.getElementById(`${typeOfPatient}-status`);
    status.innerText = 0;
    addSkeletonClasses(statusContainer, ['skeleton', 'skeleton-text', 'skeleton-w-20']);

    let percentageContainer = document.getElementById(`${typeOfPatient}-percentage-container`);
    percentageStatus = document.getElementById(`${typeOfPatient}-percentage`);
    percentageStatus.innerText = '';
    addSkeletonClasses(percentageContainer, ['skeleton', 'skeleton-text', 'skeleton-w-40']);

    severityDropdownFilters.classList.add('d-none');
}

function queryPatientCard(filter) {
    $.ajax({
        url: '/filter-patient-card',
        type: 'GET',
        data: filter,
        beforeSend: () => {
            addCardSkeletonClasses(filter.covid19Severity);
        },
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
let dropDownsCardSelected = {
    moderate: { covid19Severity: 'moderate', dateRange: 'lastSevenDays' },
    serius: { covid19Severity: 'serius', dateRange: 'lastSevenDays' },
    critical: { covid19Severity: 'critical', dateRange: 'lastSevenDays' },
};

localStorage.setItem(`${dropDownsCardSelected.moderate.covid19Severity}-date-range`, dropDownsCardSelected.moderate.dateRange);
localStorage.setItem(`${dropDownsCardSelected.serius.covid19Severity}-date-range`, dropDownsCardSelected.serius.dateRange);
localStorage.setItem(`${dropDownsCardSelected.critical.covid19Severity}-date-range`, dropDownsCardSelected.critical.dateRange);

const dropDownOptions = document.querySelectorAll('#moderate-dropdown-options li a, #serius-dropdown-options li a, #critical-dropdown-options li a');

dropDownOptions.forEach((dropdown) => {
    dropdown.addEventListener('click', () => {
        let covid19Severity = dropdown.getAttribute('data-severity');
        let dateRange = dropdown.getAttribute('date-range');
        let currentDropDownSelected = localStorage.getItem(`${covid19Severity}-date-range`);
        if (currentDropDownSelected !== dateRange) {
            let filter = {
                covid19Severity: covid19Severity,
                dateRange: dateRange,
            };
            localStorage.setItem(`${covid19Severity}-date-range`, dateRange);
            dropDownsCardSelected[covid19Severity] = filter;
            queryPatientCard(filter);
        }
    });
});

function addTotalLineSkeletonClasses() {
    let totalLineChartStatus = document.getElementById('total-line-chart-status');
    totalLineChartStatus.innerText = '';
    addSkeletonClasses(totalLineChartStatus, ['skeleton', 'skeleton-text', 'skeleton-w-20']);

    let totalLineChartLabel = document.getElementById('total-line-chart-label');
    totalLineChartLabel.classList.add('d-none');

    let totalLineChartLabelContainer = document.getElementById('total-line-chart-label-container');
    addSkeletonClasses(totalLineChartLabelContainer, ['skeleton', 'skeleton-text', 'skeleton-w-30']);

    let totalLineChartPercentage = document.getElementById('total-line-chart-percentage');
    totalLineChartPercentage.innerText = '';
    addSkeletonClasses(totalLineChartPercentage, ['skeleton', 'skeleton-text', 'skeleton-w-50']);

    let totalPatientLineChartContainer = document.getElementById('total-line-chart-container');
    addSkeletonClasses(totalPatientLineChartContainer, ['skeleton', 'skeleton-chart']);
}

// Chart line Patients by datepicker
function queryTotalPatientLineChart(filter) {
    $.ajax({
        url: '/filter-total-line-chart',
        type: 'GET',
        data: filter,
        beforeSend: () => {
            destroyChart(totalPatientLineChartInstance);
            addTotalLineSkeletonClasses();
        },
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

var totalLineChartDates = null;

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
                    totalLineChartDates = null;
                } else {
                    const filter = {
                        startDate: startDate,
                        endDate: endDate,
                    };
                    queryTotalPatientLineChart(filter);
                    totalLineChartDates = filter;
                }
            }
        },
        onClose: (dates) => {
            if (dates.length === 1) {
                resetTotalPatientLineChart();
                totalLineChartDates = null;
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

// Summary table dropdown actions
let dropDownsSummaryTableSelected = {
    selected: { covid19Severity: 'all' },
};
const summaryDropDownOptions = document.querySelectorAll('#dropdown-table-options li a');

function addSumaryTableSkeletonClasses() {
    document.getElementById('datatable-patients').classList.add('d-none');
    document.getElementsByClassName('dataTable-top')[0].classList.add('d-none');
    document.getElementsByClassName('dataTable-bottom')[0].classList.add('d-none');

    let patientsDataTableContainer = document.getElementById('datatable-patients-container');
    addSkeletonClasses(patientsDataTableContainer, ['skeleton', 'skeleton-table']);
}

summaryDropDownOptions.forEach((dropdown) => {
    dropdown.addEventListener('click', () => {
        const filter = {
            covid19Severity: dropdown.getAttribute('data-severity'),
        };
        dropDownsSummaryTableSelected.selected = filter;
        addSumaryTableSkeletonClasses();
        querySummaryTable(filter);
    });
});

function updateCardPatient(data, typeOfPatient) {
    let dropDownSelected = dropDownsCardSelected[typeOfPatient];
    let dateRange = dropDownSelected.dateRange.toLowerCase();
    if (dateRange !== 'lastweek') {
        let status = document.getElementById(`${typeOfPatient}-status`);
        let total = 0;
        let percentage = 0;
        let percentageLabel = '';
        if (dateRange === 'lastsevendays') {
            total = data.weekly_ranking.data.patients.total;
            percentage = data.weekly_ranking.data.patients.percentage;
            percentageLabel = data.weekly_ranking.data.patients.percentage_label;
        }
        if (dateRange === 'lastmonth') {
            total = data.monthly_ranking.data.patients.total;
            percentage = data.monthly_ranking.data.patients.percentage;
            percentageLabel = data.monthly_ranking.data.patients.percentage_label;
        }
        setCoutUp(status, total);
        setPatientCardPercentage(typeOfPatient, percentage, percentageLabel);
    }
}

function checkDateExists(chart, createdAt) {
    return chart.data.labels.indexOf(createdAt);
}

function getCovid19SeverityIndex(severity) {
    return covid19Severities[severity].index;
}

function updateWeeklyPatientsChart(typeOfPatient, createdAt) {
    let label = getChartLabels([createdAt])[0];
    let datasetIndex = getCovid19SeverityIndex(typeOfPatient);
    let labelIndex = checkDateExists(weeklyPatientChartInstance, label);
    if (labelIndex === -1) {
        weeklyPatientChartInstance.data.labels.push(label);
        weeklyPatientChartInstance.data.datasets[datasetIndex].data.push(1);
    } else {
        let currentValue = weeklyPatientChartInstance.data.datasets[datasetIndex].data[labelIndex] || 0;
        weeklyPatientChartInstance.data.datasets[datasetIndex].data[labelIndex] = currentValue + 1;
    }
    weeklyPatientChartInstance.update();
}

function updateTotalPatientsDoughnutChart(totalRanking, typeOfPatient) {
    let datasetIndex = getCovid19SeverityIndex(typeOfPatient);
    let totalChartStatus = document.getElementById('total-doughnut-chart-status');
    let currentValue = totalPatientsDoughnutChartInstance.data.datasets[0].data[datasetIndex] || 0;
    let donutSeverityStatus = document.getElementById(`donut-${typeOfPatient}-status`);

    setCoutUp(totalChartStatus, totalRanking.total);
    totalPatientsDoughnutChartInstance.data.datasets[0].data[datasetIndex] = currentValue + 1;
    totalPatientsDoughnutChartInstance.update();
    donutSeverityStatus.innerText = +donutSeverityStatus.innerText + 1;
}

function updateTotalPatientsLineChart(ranking, typeOfPatient, createdAt) {
    if (!totalLineChartDates) {
        let totalLineChartStatus = document.getElementById('total-line-chart-status');
        let totalLineChartPercentage = document.getElementById('total-line-chart-percentage');
        let label = getChartLabels([createdAt])[0];
        let datasetIndex = getCovid19SeverityIndex(typeOfPatient);
        let labelIndex = checkDateExists(totalPatientLineChartInstance, label);

        setCoutUp(totalLineChartStatus, ranking.total);
        totalLineChartPercentage.innerHTML = setTotalPatientPercentage(ranking.total_percentage);
        if (labelIndex === -1) {
            totalPatientLineChartInstance.data.labels.push(label);
            totalPatientLineChartInstance.data.datasets[datasetIndex].data.push(1);
        } else {
            let currentValue = totalPatientLineChartInstance.data.datasets[datasetIndex].data[labelIndex] || 0;
            totalPatientLineChartInstance.data.datasets[datasetIndex].data[labelIndex] = currentValue + 1;
        }
        totalPatientLineChartInstance.update();
    }
}

function updateSummaryTable() {
    querySummaryTable(dropDownsSummaryTableSelected.selected);
}

var socket = io.connect('https://dashboard-microservice.herokuapp.com', {
    forceNew: true,
});

socket.on('patient', (response) => {
    updateCardPatient(response, response.type_of_patient); // Update initial statistics
    updateWeeklyPatientsChart(response.type_of_patient, response.large_date); // Update weekly chart
    updateTotalPatientsDoughnutChart(response.total_ranking, response.type_of_patient); // Update total doughnut chart
    updateTotalPatientsLineChart(response.annual_ranking, response.type_of_patient, response.short_date); // Update total line chart
    updateSummaryTable(dropDownsSummaryTableSelected.selected); // Update summary table
});

// Load
window.addEventListener('load', () => {
    aosInit();
    getInitialData();
});
