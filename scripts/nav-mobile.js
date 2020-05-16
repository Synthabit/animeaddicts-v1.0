var hamburger = document.getElementById("nav-hamburger");
var rectangles = hamburger.getElementsByTagName("rect");
var navList = document.getElementsByClassName("nav-list")[0];

var clicked = false;

// hamburger.addEventListener("mouseover", hamburgerOnHover);
// hamburger.addEventListener("mouseout", hamburgerOnLeave);
hamburger.addEventListener("click", hamburgerOnClick);

function hamburgerOnHover() {
    Object.assign(hamburger.style, {
        background: "#cabfe9"
    });

    for (var i = 0; i < rectangles.length; ++i) {
        Object.assign(rectangles[i].style, {
            fill: "#160e2b"
        });
    }
}

function hamburgerOnLeave() {
    Object.assign(hamburger.style, {
        background: ""
    });

    for (var i = 0; i < rectangles.length; ++i) {
        Object.assign(rectangles[i].style, {
            fill: "#cabfe9"
        });
    }
}

function hamburgerOnClick() {
    navList.classList.toggle("active");
}