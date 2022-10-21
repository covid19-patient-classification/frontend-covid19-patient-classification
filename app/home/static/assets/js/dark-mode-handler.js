/* eslint-disable no-undef */
const themeSwitch = document.getElementById('theme-switch');
const themeIndicator = document.getElementById('theme-indicator');
const sidenav = document.getElementById('sidenav-main');
const page = document.body;

const themeStates = ['light', 'dark'];
const indicators = ['fa-moon', 'fa-sun'];
const pageClass = ['bg-gray-100', 'dark-page'];
const navClass = ['bg-white', 'bg-dark'];

let currentTheme = localStorage.getItem('theme');

function setTheme(theme) {
    localStorage.setItem('theme', themeStates[theme]);
}

function setIndicator(theme) {
    themeIndicator.classList.remove(indicators[0]);
    themeIndicator.classList.remove(indicators[1]);
    themeIndicator.classList.add(indicators[theme]);
}

function setNavTheme(theme) {
    sidenav.classList.remove(navClass[0]);
    sidenav.classList.remove(navClass[1]);
    sidenav.classList.remove('bg-transparent');
    sidenav.classList.add(navClass[theme]);
}

function setPage(theme) {
    page.classList.remove(pageClass[0]);
    page.classList.remove(pageClass[1]);
    page.classList.add(pageClass[theme]);
}

if (currentTheme === null) {
    localStorage.setItem('theme', themeStates[0]);
    setIndicator(0);
    setPage(0);
    setNavTheme(0);
    themeSwitch.checked = true;
}
if (currentTheme === themeStates[0]) {
    setIndicator(0);
    setPage(0);
    setNavTheme(0);
    themeSwitch.checked = true;
}
if (currentTheme === themeStates[1]) {
    setIndicator(1);
    setPage(1);
    setNavTheme(1);
    themeSwitch.checked = false;
}

themeSwitch.addEventListener('change', function () {
    if (this.checked) {
        setTheme(0);
        setIndicator(0);
        setPage(0);
        setNavTheme(0);
    } else {
        setTheme(1);
        setIndicator(1);
        setPage(1);
        setNavTheme(1);
    }
});
