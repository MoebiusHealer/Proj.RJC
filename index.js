
document.addEventListener("DOMContentLoaded", function () {
    const slideshow = document.getElementById("achievementSlideshow");

    if (!slideshow) return;

    const slides = slideshow.querySelectorAll(".achievement-slide");
    const dots = slideshow.querySelectorAll(".achievement-dot");
    const previousButton = slideshow.querySelector(".prev");
    const nextButton = slideshow.querySelector(".next");

    let currentIndex = 0;
    let slideshowTimer;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function startSlideshow() {
        clearInterval(slideshowTimer);

        slideshowTimer = setInterval(function () {
            showSlide(currentIndex + 1);
        }, 4000);
    }

    function restartSlideshow() {
        startSlideshow();
    }

    previousButton.addEventListener("click", function () {
        showSlide(currentIndex - 1);
        restartSlideshow();
    });

    nextButton.addEventListener("click", function () {
        showSlide(currentIndex + 1);
        restartSlideshow();
    });

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            restartSlideshow();
        });
    });

    // Pause while the visitor hovers over the slideshow.
    slideshow.addEventListener("mouseenter", function () {
        clearInterval(slideshowTimer);
    });

    slideshow.addEventListener("mouseleave", startSlideshow);

    showSlide(0);
    startSlideshow();
});
