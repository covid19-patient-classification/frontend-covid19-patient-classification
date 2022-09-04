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
        setPatientCard(response.moderate_patients, 'moderate');
        setPatientCard(response.serius_patients, 'serius');
        setPatientCard(response.critical_patients, 'critical');

        // Create weekly chart
        createWeeklyPatientChart(response.moderate_patients, response.serius_patients, response.critical_patients);
    },
});

function setPatientCard(data, typeOfPatient) {
    var label = document.getElementById(`${typeOfPatient}-label`);
    label.innerHTML = data.label;
    removeSkeletonClasses(label);

    var dropdownContainer = document.getElementById(`${typeOfPatient}-dropdown-container`);
    var dropdownLabel = document.getElementById(`${typeOfPatient}-dropdown-label`);
    var moderateDropdownFilters = document.getElementById(`${typeOfPatient}-dropdown-filters`);
    dropdownLabel.innerHTML = data.date;
    moderateDropdownFilters.classList.remove('d-none');
    removeSkeletonClasses(dropdownContainer);

    var statusContainer = document.getElementById(`${typeOfPatient}-status-container`);
    var status = document.getElementById(`${typeOfPatient}-status`);
    setCoutUp(status, data.weekly_ranking.total);
    removeSkeletonClasses(statusContainer);

    var percentageContainer = document.getElementById(`${typeOfPatient}-percentage-container`);
    var percentage = data.weekly_ranking.percentage;
    var percentageLabel = data.weekly_ranking.percentage_label;
    setPatientPercentage(typeOfPatient, percentage, percentageLabel);
    removeSkeletonClasses(percentageContainer);
}

function setPatientPercentage(typeOfPatient, percentage, percentageLabel) {
    var percentageStatus = document.getElementById(
        `${typeOfPatient}-percentage`
    );
    if (percentage >= 0) {
        percentageStatus.innerHTML = `+${percentage}%`;
        percentageStatus.classList.add('text-danger');
    } else {
        percentageStatus.innerHTML = `${percentage}%`;
        percentageStatus.classList.add('text-success');
    }

    percentageStatus.innerHTML += `<span class="font-weight-normal opacity-8 text-dark" id="moderate-percentage-label"> ${percentageLabel}</span>`;
}

function removeSkeletonClasses(element) {
    element.classList.remove(...skeletonClasses);
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

// Chart bar Patients by week
function createWeeklyPatientChart(moderatePatients, seriusPatients, criticalPatients) {
    var weeklyChartContainer = document.getElementById('weekly-chart-container');
    var weeklyPatientChart= document.getElementById('weekly-patient-chart').getContext('2d');

    new Chart(weeklyPatientChart, {
        type: 'bar',
        data: {
            labels: moderatePatients.weekly_ranking.labels,
            datasets: [
                {
                    label: moderatePatients.label,
                    tension: 1,
                    borderWidth: 0,
                    borderRadius: 5,
                    backgroundColor: moderatePatientColor,
                    data: moderatePatients.weekly_ranking.values,
                    maxBarThickness: 20,
                },
                {
                    label: seriusPatients.label,
                    tension: 1,
                    borderWidth: 0,
                    borderRadius: 5,
                    backgroundColor: seriusPatientColor,
                    data: seriusPatients.weekly_ranking.values,
                    maxBarThickness: 20,
                },
                {
                    label: criticalPatients.label,
                    tension: 1,
                    borderWidth: 0,
                    borderRadius: 5,
                    backgroundColor: criticalPatientColor,
                    data: criticalPatients.weekly_ranking.values,
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

// patientsStatus.forEach((patientStatus) => {
//     var element = document.getElementById(patientStatus);

// });

// Chart Doughnut Total patients classified
var ctx1 = document.getElementById('chart-total-patients').getContext('2d');

var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke1.addColorStop(1, 'rgba(16, 115, 158,0.2)');
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke1.addColorStop(0, 'rgba(16, 115, 158,0)');

// new Chart(ctx1, {
//     type: 'doughnut',
//     data: {
//         labels: ['Moderados', 'Graves', 'Críticos'],
//         datasets: [
//             {
//                 label: 'Paciente',
//                 weight: 9,
//                 cutout: 90,
//                 tension: 0.9,
//                 pointRadius: 2,
//                 borderWidth: 2,
//                 backgroundColor: [
//                     moderatePatientColor,
//                     seriusPatientColor,
//                     criticalPatientColor,
//                 ],
//                 data: [140, 60, 18],
//                 fill: false,
//             },
//         ],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//         interaction: {
//             intersect: false,
//             mode: 'index',
//         },
//         scales: {
//             y: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//             },
//             x: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//             },
//         },
//     },
// });

// Chart line Patients by datepicker
if (document.querySelector('.datepicker')) {
    flatpickr('.datepicker', {
        mode: 'range',
        locale: 'es',
        // defaultDate: "2022-01-01 to 2022-07-24"
    });
}

var ctx3 = document.getElementById('chart-patients-line').getContext('2d');
var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke1.addColorStop(1, 'rgba(23, 194, 232, 0.2)');
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke1.addColorStop(0, 'rgba(23, 194, 232,0)');

var gradientStroke2 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke2.addColorStop(1, 'rgba(58, 65, 111,0.2)');
gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke2.addColorStop(0, 'rgba(58, 65, 111,0)');

var gradientStroke3 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke3.addColorStop(1, 'rgba(203, 12, 159,0.2)');
gradientStroke3.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke3.addColorStop(0, 'rgba(203, 12, 159,0)');

// new Chart(ctx3, {
//     type: 'line',
//     data: {
//         labels: [
//             'Enero',
//             'Febrero',
//             'Marzo',
//             'Abril',
//             'Mayo',
//             'Junio',
//             'Julio',
//         ],
//         datasets: [
//             {
//                 label: 'Pacientes moderados',
//                 tension: 0.4,
//                 borderWidth: 0,
//                 pointRadius: 2,
//                 pointBackgroundColor: moderatePatientColor,
//                 borderColor: moderatePatientColor,
//                 borderWidth: 3,
//                 backgroundColor: gradientStroke1,
//                 fill: true,
//                 data: [50, 40, 300, 220, 500, 250, 400],
//                 maxBarThickness: 6,
//             },
//             {
//                 label: 'Pacientes graves',
//                 tension: 0.4,
//                 borderWidth: 0,
//                 pointRadius: 2,
//                 pointBackgroundColor: seriusPatientColor,
//                 borderColor: seriusPatientColor,
//                 borderWidth: 3,
//                 backgroundColor: gradientStroke2,
//                 fill: true,
//                 data: [30, 90, 40, 140, 290, 290, 340],
//                 maxBarThickness: 6,
//             },
//             {
//                 label: 'Pacientes críticos',
//                 tension: 0.4,
//                 borderWidth: 0,
//                 pointRadius: 2,
//                 pointBackgroundColor: criticalPatientColor,
//                 borderColor: criticalPatientColor,
//                 borderWidth: 3,
//                 backgroundColor: gradientStroke3,
//                 fill: true,
//                 data: [40, 80, 70, 90, 30, 90, 140],
//                 maxBarThickness: 6,
//             },
//         ],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//         interaction: {
//             intersect: false,
//             mode: 'index',
//         },
//         scales: {
//             y: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//             },
//             x: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     beginAtZero: true,
//                     font: {
//                         size: 12,
//                         family: 'Open Sans',
//                         style: 'normal',
//                     },
//                     color: '#9ca2b7',
//                 },
//             },
//         },
//     },
// });

// Datatable of patients resume
const dataTableBasic = new simpleDatatables.DataTable('#datatable-patients', {
    searchable: true,
    fixedHeight: true,
    lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'Todos'],
    ],
});
