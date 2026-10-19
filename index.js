
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

/* =========================
   EXPANDABLE SKILLS + TYPING EFFECT
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const skillCards = document.querySelectorAll(".skill-card");

    let activeCard = null;
    let typingTimer = null;

    function stopTyping() {
        if (typingTimer !== null) {
            clearInterval(typingTimer);
            typingTimer = null;
        }
    }

    function closeSkill(card) {
        const trigger = card.querySelector(".skill-card-trigger");
        const details = card.querySelector(".skill-details");

        card.classList.remove("is-expanded");
        trigger.setAttribute("aria-expanded", "false");
        details.hidden = true;
    }

    function typeDescription(element, text) {
        stopTyping();

        element.textContent = "";

        let index = 0;
        const typingSpeed = 22;

        typingTimer = setInterval(function () {
            element.textContent += text.charAt(index);
            index++;

            if (index >= text.length) {
                stopTyping();
            }
        }, typingSpeed);
    }

    skillCards.forEach(function (card) {
        const trigger = card.querySelector(".skill-card-trigger");
        const details = card.querySelector(".skill-details");
        const description = card.querySelector(".skill-typing-text");

        if (!trigger || !details || !description) return;

        trigger.addEventListener("click", function () {
            // Clicking the open skill closes it.
            if (activeCard === card) {
                stopTyping();
                closeSkill(card);
                activeCard = null;
                return;
            }

            // Close the previously opened skill.
            if (activeCard) {
                closeSkill(activeCard);
            }

            stopTyping();

            activeCard = card;

            // Expand the selected skill.
            card.classList.add("is-expanded");
            trigger.setAttribute("aria-expanded", "true");
            details.hidden = false;

            // Type the description from the beginning.
            const text = description.dataset.description || "";
            typeDescription(description, text);
        });
    });
});

/* =========================
   ML FREE SKIN DODGING BUTTON
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const arena = document.getElementById("mlButtonArena");
    const button = document.getElementById("mlSkinButton");

    if (!arena || !button) return;

    // Button positions: left, middle, right.
    const positions = [16, 50, 84];
    let currentPosition = 1;

    function moveButton() {
        // Advance to the next position.
        currentPosition = (currentPosition + 1) % positions.length;

        button.style.left = positions[currentPosition] + "%";
        button.style.top = "50%";
    }

    // Move as soon as the pointer reaches the button.
    button.addEventListener("pointerenter", function (event) {
        if (event.pointerType === "touch") return;

        moveButton();
    });

    // Also dodge when a user taps the button on a touchscreen.
    button.addEventListener("click", function () {
        moveButton();

        // A playful message if the user manages to click it.
        alert(
            "HAHAHA! Na-catch mo! 😂\n\n" +
            "Prank lang! Walang actual free ML skin dito."
        );
    });

    // Start at the middle.
    button.style.left = "50%";
    button.style.top = "50%";
});
