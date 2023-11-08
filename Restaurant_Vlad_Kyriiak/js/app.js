

document.getElementById("navbar").addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    event.stopPropagation();
});

document.querySelectorAll("#tip").forEach(function(item) {
    item.addEventListener("click", function() {
        const menu = document.getElementById("menu");
        menu.classList.add("hidden");
    });
});

document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    if (!menu.contains(event.target) && !event.target.matches("#navbar")) {
        menu.classList.add("hidden");
    }
});