moderatePatientColor = '#17c1e8';
seriusPatientColor = '#3A416F';
criticalPatientColor = '#cb0c9f';

patientsStatus = [
    'moderate-status',
    'serius-status',
    'critical-status',
    'total-status',
];

patientsStatus.forEach((patientStatus) => {
    if (document.getElementById(patientStatus)) {
        const countUp = new CountUp(
            patientStatus,
            document.getElementById(patientStatus).getAttribute('countTo')
        );
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
});

// Chart Doughnut Total patients classified
var ctx1 = document.getElementById('chart-total-patients').getContext('2d');

var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)');

new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['Moderados', 'Graves', 'Críticos'],
        datasets: [
            {
                label: 'Paciente',
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
                data: [140, 60, 18],
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

// Chart bar Patients by week
var ctx2 = document.getElementById('chart-week-patients').getContext('2d');

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['18', '19', '20', '21', '22', '23', '24'],
        datasets: [
            {
                label: 'Pacientes moderados',
                tension: 1,
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: moderatePatientColor,
                data: [10, 10, 5, 7, 5, 5, 5],
                maxBarThickness: 20,
            },
            {
                label: 'Pacientes graves',
                tension: 1,
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: seriusPatientColor,
                data: [3, 3, 3, 5, 3, 3, 3],
                maxBarThickness: 20,
            },
            {
                label: 'Pacientes críticos',
                tension: 1,
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: criticalPatientColor,
                data: [2, 3, 3, 3, 3, 3, 3],
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
                stacked: true
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
                stacked: true
            },
        },
    },
});
