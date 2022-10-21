/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function() {
    var preloader = document.querySelector('.preloader');
    if(preloader) {
        const animations = ['oneByOne', 'delayed', 'sync', 'scenario'];

        new Vivus('loader-logo', {duration: 80, type: animations[1]}, function () {});

        setTimeout(function() {
            preloader.classList.add('show');
        }, 1000);
    }
})
