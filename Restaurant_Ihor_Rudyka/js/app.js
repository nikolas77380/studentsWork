document.addEventListener("DOMContentLoaded", () => {
    const scrollItems = document.querySelectorAll(".scroll-item")
    const header = document.querySelector(".preview")
    const h1 = document.querySelector("h1")
    const headerPhone = document.querySelector(".header-phone")
    // анимация header
    const headerAnimation = () => {
        if (window.scrollY >= 20) {
            header.classList.remove("fader");
            header.classList.add("small-fader");
            h1.classList.add("name");
            headerPhone.classList.add("mini-header-phone")
        } else {
            header.classList.add("fader");
            header.classList.remove("small-fader");
            h1.classList.remove("name");
            headerPhone.classList.remove("mini-header-phone")
        }
    };
    // анимация айтемов
    const scrollAnimation = () => {
        let windowBreakPoint = (window.innerHeight / 1.1) + window.scrollY;
        scrollItems.forEach(el => {
           let scrolloffset = el.offsetTop; 
           if (windowBreakPoint >= scrolloffset) {
            el.classList.add("animated");
           } else {
            el.classList.remove("animated");
           }
        });
    };
    
    headerAnimation();
    scrollAnimation();

    window.addEventListener("scroll", () => {
        headerAnimation();
        scrollAnimation();
    });
});
