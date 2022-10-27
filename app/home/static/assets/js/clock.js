/* eslint-disable no-undef */
'use strict';

document.body.addEventListener('load', startTime());

function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();

    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    document.getElementById('clock').innerHTML = hr + ':' + min;

    var months = [
        'Enero',
        'Febrero',
        'Marazo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];
    var days = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
    ];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay + ', ' + curDay + ' ' + curMonth + ' ' + curYear;
    document.getElementById('date').innerHTML = date;

    setTimeout(function () {
        startTime();
    }, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
