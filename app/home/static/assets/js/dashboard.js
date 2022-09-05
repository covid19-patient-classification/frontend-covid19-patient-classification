'use strict';
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

$.ajax({
    url: '/initial-dashboard-data',
    type: 'GET',
    success: (response) => {
        console.log(response);
        var weeklyRanking = response.weekly_ranking;
        var annualRanking = response.annual_ranking;
        var totalRanking = response.total_ranking;
        var weeklyDate = weeklyRanking.date;
        var weeklyModeratePatients = weeklyRanking.values.moderate_patients;
        var weeklySeriusPatients = weeklyRanking.values.serius_patients;
        var weeklyCriticalPatients = weeklyRanking.values.critical_patients;

        // Initial statistics
        setPatientCard(weeklyDate, weeklyModeratePatients, 'moderate');
        setPatientCard(weeklyDate, weeklySeriusPatients, 'serius');
        setPatientCard(weeklyDate, weeklyCriticalPatients, 'critical');

        // Create weekly chart
        createWeeklyPatientsChart(weeklyRanking, weeklyModeratePatients, weeklySeriusPatients, weeklyCriticalPatients);

        // // Create total doughnut chart
        createTotalPatientsDoughnutChart(totalRanking);

        // // Create total line chart
        createTotalPatientsLineChart(annualRanking);
    },
});

function setPatientCard(weeklyDate, data, typeOfPatient) {
    var label = document.getElementById(`${typeOfPatient}-label`);
    label.innerHTML = data.label;
    removeSkeletonClasses(label);

    var dropdownContainer = document.getElementById(`${typeOfPatient}-dropdown-container`);
    var dropdownLabel = document.getElementById(`${typeOfPatient}-dropdown-label`);
    var moderateDropdownFilters = document.getElementById(`${typeOfPatient}-dropdown-filters`);
    dropdownLabel.innerHTML = weeklyDate;
    moderateDropdownFilters.classList.remove('d-none');
    removeSkeletonClasses(dropdownContainer);

    var statusContainer = document.getElementById(`${typeOfPatient}-status-container`);
    var status = document.getElementById(`${typeOfPatient}-status`);
    setCoutUp(status, data.total);
    removeSkeletonClasses(statusContainer);

    var percentageContainer = document.getElementById(`${typeOfPatient}-percentage-container`);
    var percentage = data.percentage;
    var percentageLabel = data.percentage_label;
    setPatientCardPercentage(typeOfPatient, percentage, percentageLabel);
    removeSkeletonClasses(percentageContainer);
}

function setPatientCardPercentage(typeOfPatient, percentage, percentageLabel) {
    var percentageStatus = document.getElementById(`${typeOfPatient}-percentage`);
    
    if (percentage >= 0) {
        percentageStatus.innerHTML = `+${percentage}%`;
        percentageStatus.classList.add('text-danger');
    } else {
        percentageStatus.innerHTML = `${percentage}%`;
        percentageStatus.classList.add('text-success');
    }

    percentageStatus.innerHTML += `<span class="font-weight-normal opacity-8 text-dark" id="moderate-percentage-label"> ${percentageLabel}</span>`;
}

const patientsStatus = [
    'moderate-status',
    'serius-status',
    'critical-status',
    'total-status',
    'donut-moderate-status',
    'donut-serius-status',
    'donut-critical-status',
    'line-total-status',
];


// Chart bar Patients by week
function createWeeklyPatientsChart(weeklyRanking, moderatePatients, seriusPatients, criticalPatients) {
    var weeklyChartContainer = document.getElementById('weekly-chart-container');
    var weeklyPatientChart= document.getElementById('weekly-patient-chart').getContext('2d');

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
function createTotalPatientsDoughnutChart(totalRanking){
    var moderatePatients = totalRanking.values.moderate_patients;
    var seriusPatients = totalRanking.values.serius_patients
    var criticalPatients = totalRanking.values.critical_patients
    var totalChartContainer = document.getElementById('total-doughnut-chart-container');
    var totalPatientChart = document.getElementById('total-patient-doughnut-chart').getContext('2d');
    var gradientStroke1 = totalPatientChart.createLinearGradient(0, 230, 0, 50);
    var totalChartStatus = document.getElementById('total-doughnut-chart-status');
    var totalChartLabel = document.getElementById('total-doughnut-chart-label');
    
    gradientStroke1.addColorStop(1, 'rgba(16, 115, 158,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(16, 115, 158,0)');
    
    new Chart(totalPatientChart, {
        type: 'doughnut',
        data: {
            labels: [moderatePatients.label, seriusPatients.label, criticalPatients.label],
            datasets: [
                {
                    weight: 9,
                    cutout: 90,
                    tension: 0.9,
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: [
                        moderatePatientColor,
                        seriusPatientColor,
                        criticalPatientColor,
                    ],
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
            },
            interaction: {
                intersect: false,
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
function createTotalTable(moderatePatients, seriusPatients, criticalPatients){
    var totalChartContainer = document.getElementById('total-table-container');
    var totalTable = document.getElementById('total-table');
    totalTable.innerHTML += `
        <tbody>
            <tr>
                <td>
                    <div class="d-flex px-2 py-0">
                        <span class="badge moderate-bg me-3"> </span>
                        <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">${moderatePatients.label}</h6>
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
                            <h6 class="mb-0 text-sm">${seriusPatients.label}</h6>
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
                            <h6 class="mb-0 text-sm">${criticalPatients.label}</h6>
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
function createTotalPatientsLineChart(annualRanking){
    var moderatePatients = annualRanking.values.moderate_patients;
    var seriusPatients = annualRanking.values.serius_patients;
    var criticalPatients = annualRanking.values.critical_patients;
    var totalLineChartStatus = document.getElementById('total-line-chart-status');
    var totalLineChartLabel = document.getElementById('total-line-chart-label');
    var totalLineChartPercentage = document.getElementById('total-line-chart-percentage');

    setCoutUp(totalLineChartStatus, annualRanking.total);
    totalLineChartLabel.classList.remove('d-none');
    totalLineChartPercentage.innerHTML += setTotalPatientPercentage(totalLineChartPercentage, annualRanking.total_percentage);

    // Legend of line chart
    setLegendTotalPatientLineChart('moderate', moderatePatients.label);
    setLegendTotalPatientLineChart('serius', seriusPatients.label);
    setLegendTotalPatientLineChart('critical', criticalPatients.label);

    // Construct chart
    constructTotalPatientLineChart(annualRanking.labels, moderatePatients, seriusPatients, criticalPatients);

    removeSkeletonClasses(totalLineChartStatus);
    removeSkeletonClasses(totalLineChartLabel);
    removeSkeletonClasses(totalLineChartPercentage);

}

function setTotalPatientPercentage(element, percentage) {
    
    if (percentage >= 0) {
       return `
            <i class="ni ni-bold-up text-sm me-1 text-danger"></i>
            <span class="text-sm text-end text-danger font-weight-bolder mt-auto mb-0">+${percentage}%</span>
        `;
    } else {
        return `
            <i class="ni ni-bold-down text-sm me-1 text-success"></i>
            <span class="text-sm text-end text-success font-weight-bolder mt-auto mb-0">${percentage}%</span>
        `;
    }
}

function setLegendTotalPatientLineChart(typeOfPatient, patientLabel){
    var totalLinepatientBadgeContainer = document.getElementById(`total-line-${typeOfPatient}-badge`);
    totalLinepatientBadgeContainer.innerHTML = `
        <i class="${typeOfPatient}-bg"></i>
        <span class="text-dark text-xs">${patientLabel}</span>
    `
    removeSkeletonClasses(totalLinepatientBadgeContainer);
}

function constructTotalPatientLineChart(chartLabels, moderatePatients, seriusPatients, criticalPatients){
    var totalPatientLineChartContainer = document.getElementById('total-line-chart-container');
    var totalPatientLineChart = document.getElementById('total-line-chart').getContext('2d');
    var gradientStroke1 = totalPatientLineChart.createLinearGradient(0, 230, 0, 50);
    var gradientStroke2 = totalPatientLineChart.createLinearGradient(0, 230, 0, 50);
    var gradientStroke3 = totalPatientLineChart.createLinearGradient(0, 230, 0, 50);

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

    new Chart(totalPatientLineChart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: moderatePatients.label,
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 2,
                    pointBackgroundColor: moderatePatientColor,
                    borderColor: moderatePatientColor,
                    borderWidth: 3,
                    backgroundColor: gradientStroke1,
                    fill: true,
                    data: moderatePatients.data,
                    maxBarThickness: 6,
                },
                {
                    label: seriusPatients.label,
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 2,
                    pointBackgroundColor: seriusPatientColor,
                    borderColor: seriusPatientColor,
                    borderWidth: 3,
                    backgroundColor: gradientStroke2,
                    fill: true,
                    data: seriusPatients.data,
                    maxBarThickness: 6,
                },
                {
                    label: criticalPatients.label,
                    tension: 0.4,
                    borderWidth: 0,
                    pointRadius: 2,
                    pointBackgroundColor: criticalPatientColor,
                    borderColor: criticalPatientColor,
                    borderWidth: 3,
                    backgroundColor: gradientStroke3,
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
            },
            interaction: {
                intersect: false,
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

// Chart line Patients by datepicker
if (document.querySelector('.datepicker')) {
    flatpickr('.datepicker', {
        mode: 'range',
        locale: 'es',
        // defaultDate: "2022-01-01 to 2022-07-24"
    });
}



// Datatable of patients resume
const dataTableBasic = new simpleDatatables.DataTable('#datatable-patients', {
    searchable: true,
    fixedHeight: true,
    lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'Todos'],
    ],
});

function setCoutUp(element, value) {
    element.setAttribute('countTo', value);
    if (element) {
        const countUp = new CountUp(element, element.getAttribute('countTo'));
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
}

function removeSkeletonClasses(element) {
    element.classList.remove(...skeletonClasses);
}
