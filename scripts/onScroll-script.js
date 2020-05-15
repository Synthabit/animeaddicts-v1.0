var navbar = null;
var navlistItems = null;
var about = null;
var animelist = null;
var siteSections = null;

var curIndex = -1;
var prevIndex = -1;

document.addEventListener("DOMContentLoaded", function() {
    navbar = document.getElementsByClassName("nav")[0];
    navlistItems = document.getElementById("nav-list").getElementsByTagName("li");
    about = document.getElementById("about");
    animelist = document.getElementById("animelist");
    siteSections = document.querySelectorAll("section");

    // Address issue of site sections not loading in on page load
    renderSiteElementsOnScroll();
});

window.addEventListener('scroll', debounce(function() {
    colorNav();
    renderSiteElementsOnScroll();
}));

// Utility function that runs a given function once every 20 ms
function debounce(func, wait = 16, immediate = true) {
    var timeout; 
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callnow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callnow) func.apply(context, args);
    };
}

function colorNav() {
    var color = window.pageYOffset >= 200 ? "#000000" : "#00000075";
    Object.assign(navbar.style, {background: color});
}

function renderSiteElementsOnScroll() {
    for (var i = 0; i < siteSections.length; ++i) {
        const posY = (window.pageYOffset);
        const renderAt = window.pageYOffset + window.innerHeight;
        const sectionBottom = siteSections[i].offsetTop + siteSections[i].offsetHeight;

        const atMenuPoint = posY >= siteSections[i].offsetTop;
        const isNotScrolledPast = posY < sectionBottom;

        if (atMenuPoint && isNotScrolledPast) {
            navlistItems[i].style.borderBottom = "3px solid #cabfe9";
        } else {
            navlistItems[i].style.borderBottom =  "";
        }

        const isShowing = renderAt > siteSections[i].offsetTop;
        if (isShowing) {
            Object.assign(siteSections[i].style, {opacity: "100%"});
        }
    }
}