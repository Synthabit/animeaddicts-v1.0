var events = document.getElementsByClassName("events-instance");

for (var i = 0; i < events.length; ++i) {
    events[i].addEventListener("mousedown", function(event) {
        toggleVisibility(event.currentTarget);
    }, false);
}

function toggleVisibility(instance) {
    var article = instance.getElementsByTagName("article")[0];
    var articleStyle = article.style.display === "none" ? "block" : "none";

    article.style.display = articleStyle;
}