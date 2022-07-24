moderatePatientColor = '#17c1e8'
seriusPatientColor = '#3A416F'
criticalPatientColor = '#cb0c9f'

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
                    moderatePatientColor, seriusPatientColor, criticalPatientColor
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
