/* eslint-disable no-undef */
'use strict';

document.getElementById('back-to-top').addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Easy on scroll event listener
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
};
navbarBlurOnScroll('navbarBlur');
backToTopScroll();

// Back to top button
function backToTopScroll() {
    let backtotop = document.querySelector('.back-to-top');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active');
            } else {
                backtotop.classList.remove('active');
                var tooltip = bootstrap.Tooltip.getInstance(backtotop);
                if (tooltip) tooltip.hide();

            }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }
}

// when input is focused add focused class for style
// eslint-disable-next-line no-unused-vars
function focused(el) {
    if (el.parentElement.classList.contains('input-group')) {
        el.parentElement.classList.add('focused');
    }
}

// when input is focused remove focused class for style
// eslint-disable-next-line no-unused-vars
function defocused(el) {
    if (el.parentElement.classList.contains('input-group')) {
        el.parentElement.classList.remove('focused');
    }
}

// helper for adding on all elements multiple attributes
function setAttributes(el, options) {
    Object.keys(options).forEach(function (attr) {
        el.setAttribute(attr, options[attr]);
    });
}

// adding on inputs attributes for calling the focused and defocused functions
if (document.querySelectorAll('.input-group').length != 0) {
    var allInputs = document.querySelectorAll('input.form-control');
    allInputs.forEach((el) =>
        setAttributes(el, {
            onfocus: 'focused(this)',
            onfocusout: 'defocused(this)',
        })
    );
}

// Navbar blur on scroll
function navbarBlurOnScroll(id) {
    const navbar = document.getElementById(id);
    let navbarScrollActive = navbar ? navbar.getAttribute('navbar-scroll') : false;
    let scrollDistance = 5;
    let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-2', 'z-index-sticky'];
    let toggleClasses = ['shadow-none'];

    if (navbarScrollActive == 'true') {
        window.onscroll = debounce(function () {
            if (window.scrollY > scrollDistance) {
                blurNavbar();
            } else {
                transparentNavbar();
            }
        }, 10);
    } else {
        window.onscroll = debounce(function () {
            transparentNavbar();
        }, 10);
    }

    function blurNavbar() {
        navbar.classList.add(...classes);
        navbar.classList.remove(...toggleClasses);

        toggleNavLinksColor('blur');
    }

    function transparentNavbar() {
        if (navbar) {
            navbar.classList.remove(...classes);
            navbar.classList.add(...toggleClasses);

            toggleNavLinksColor('transparent');
        }
    }

    function toggleNavLinksColor(type) {
        let navLinks = document.querySelectorAll('.navbar-main .nav-link');
        let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line');

        if (type === 'blur') {
            navLinks.forEach((element) => {
                element.classList.remove('text-body');
            });

            navLinksToggler.forEach((element) => {
                element.classList.add('bg-dark');
            });
        } else if (type === 'transparent') {
            navLinks.forEach((element) => {
                element.classList.add('text-body');
            });

            navLinksToggler.forEach((element) => {
                element.classList.remove('bg-dark');
            });
        }
    }
}

// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Toggle Sidenav
const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
const iconSidenav = document.getElementById('iconSidenav');
// const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';

if (iconNavbarSidenav) {
    iconNavbarSidenav.addEventListener('click', toggleSidenav);
}

if (iconSidenav) {
    iconSidenav.addEventListener('click', toggleSidenav);
}

function toggleSidenav() {
    if (body.classList.contains(className)) {
        body.classList.remove(className);
    } else {
        body.classList.add(className);

        iconSidenav.classList.remove('d-none');
    }
}

// Resize navbar color depends on configurator active type of sidenav

// Deactivate sidenav type buttons on resize and small screens
window.addEventListener('resize', sidenavTypeOnResize);
window.addEventListener('load', sidenavTypeOnResize);

function sidenavTypeOnResize() {
    let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
    if (window.innerWidth < 1200) {
        elements.forEach(function (el) {
            el.classList.add('disabled');
        });
    } else {
        elements.forEach(function (el) {
            el.classList.remove('disabled');
        });
    }
}
