document.addEventListener("DOMContentLoaded", function(event) {
    var preloader = document.querySelector('.preloader');
    if(preloader) {
        const animations = ['oneByOne', 'delayed', 'sync', 'scenario'];

        new Vivus('loader-logo', {duration: 80, type: 'oneByOne'}, function () {});

        setTimeout(function() {
            preloader.classList.add('show');
        }, 1000);
    }
})