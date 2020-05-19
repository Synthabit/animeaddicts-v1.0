var events = document.getElementsByClassName("events-instance");


for (var i = 0; i < events.length; ++i) {
    var article = events[i].getElementsByTagName("article")[0];
    article.style.display = "none";
    
    events[i].getElementsByTagName("h4")[0].addEventListener("mousedown", function(event) {
        toggleVisibility(event.currentTarget.parentElement);
    }, false);
}

function toggleVisibility(instance) {
    console.log("clicked");
    var article = instance.getElementsByTagName("article")[0];
    var articleStyle = article.style.display == "none" ? "block" : "none";

    article.style.display = articleStyle;
}