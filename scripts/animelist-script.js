// ========================================================================
// Globals
// ========================================================================

var instanceClicked = false;
var animelistInstances = document.getElementsByClassName("animelist-list-instance");
var animelistInstanceOverlay = document.getElementById("animelist-list-instance-overlay");

// ========================================================================
// Add Event Listeners
// ========================================================================

// Add event listeners to every title in the anime list
for (var i = 0; i < animelistInstances.length; ++i)
{
    animelistInstances[i].addEventListener("mouseover", function(event) {
        instanceOnHover(event.currentTarget);
    }, false);

    animelistInstances[i].addEventListener("mouseout", function(event) {
        instanceOnLeave(event.currentTarget);
    }, false);
    
    animelistInstances[i].addEventListener("mousedown", function(event) {
        instanceOnClick(event.currentTarget);
    }, false);
}

// Add event listener to animelistInstanceInfo window
animelistInstanceOverlay.addEventListener("click", instanceOverlayOnClick);

animelistInstanceOverlay.addEventListener('scroll', debounce(function() {
    colorNav();
    hideOverlayHeaderOnScroll();
}));

// ========================================================================
// Utility
// ========================================================================

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

// ========================================================================
// Event Listener Functions
// ========================================================================

// Highlight the image and title on mouse over (desktop)
function instanceOnHover(instance) {
    var article = instance.getElementsByTagName("article")[0];
    var image = instance.getElementsByTagName("img")[0];

    Object.assign(article.style, {
        background: "#cabfe9", 
        color: "#160e2b"
    });

    image.style.filter = "brightness(150%)";

    instanceClicked = false;
}

// Restore default styling on mouse leaving (desktop)
function instanceOnLeave(instance) {    
    var article = instance.getElementsByTagName("article")[0];
    var image = instance.getElementsByTagName("img")[0];

    Object.assign(article.style, {
        background: "", 
        color: "white"
    });

    image.style.filter = "brightness(100%)";

    instanceClicked = false;
}

// Copies the contents of the instance to the Anime List Instance Info
// aside and displays the aside.
function instanceOnClick(instance) {
    // instance
    var image = instance.getElementsByTagName("img")[0].src;
    var title = instance.getElementsByTagName("h4")[0].innerHTML;
    var summary = instance.getElementsByTagName("p");

    // instance info overlay
    var imageOverlay = animelistInstanceOverlay.getElementsByTagName("img")[0];
    var titleOverlay = animelistInstanceOverlay.getElementsByTagName("h2")[0];
    var summaryOverlay = document.getElementById("overlay-summary");
    
    // Copy instance information to overlay
    imageOverlay.src = image;
    titleOverlay.innerHTML = title;

    // Copy summary to overlay
    for (var i = 0; i < summary.length; ++i) {
        var par = summary[i].innerHTML.replace(/(\s\s+|\t)/g, " ").trim();
        summaryOverlay.innerHTML += "<p>" + par + "</p>";
    }

    // Display instance info overlay
    Object.assign(animelistInstanceOverlay.style, {
        display: "block",
        zIndex: "4",
        opacity: "100%"
    });

    // scroll to top of overlay
    animelistInstanceOverlay.scrollTop = 0;

    // Set opacity of titleOverlay to 100%
    Object.assign(titleOverlay.style, {opacity: "100%"});

    // Disable scrolling on site body
    Object.assign(document.body.style, {overflowY: "hidden"});
}

function instanceOverlayOnClick() {
    var summaryOverlay = document.getElementById("overlay-summary");
    Object.assign(animelistInstanceOverlay.style, {
        display: "none",
        zIndex: "0",
        opacity: "0%"
    });

    // clear overlay summary contents
    summaryOverlay.innerHTML = "";

    // Enable scrolling on site body
    Object.assign(document.body.style, {overflowY: "auto"});
}

function hideOverlayHeaderOnScroll() {
    var titleFrame = animelistInstanceOverlay.getElementsByTagName("h2")[0];
    var opac = animelistInstanceOverlay.scrollTop < 10 ? "100%" : "0%";

    Object.assign(titleFrame.style, {opacity: opac});
}
