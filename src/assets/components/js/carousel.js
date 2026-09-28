const carousel = document.querySelector(".carousel");

if (carousel) {
    const cards = [...carousel.querySelectorAll(".photo-card")];
    const stage = carousel.querySelector(".photo-stage");
    const counter = carousel.querySelector(".carousel-counter");
    const total = carousel.querySelector(".carousel-total");
    const caption = carousel.querySelector(".carousel-caption");
    const previousButton = carousel.querySelector(".carousel-previous");
    const nextButton = carousel.querySelector(".carousel-next");

    const captions = [
        "A little mermaid magic.",
        "Paws, whiskers and plenty of personality.",
        "Pretty in pink, made for sharing.",
        "A little seaside celebration.",
        "Big ideas for little celebrations."
    ];

    // Start with the third image in the centre.
    let active = 2;

    function renderCarousel() {
        cards.forEach((card, index) => {
            let position =
                (index - active + cards.length) % cards.length;

            if (position > 2) {
                position -= cards.length;
            }

            card.dataset.position = position;
        });

        counter.textContent = String(active + 1).padStart(2, "0");
        total.textContent = String(cards.length).padStart(2, "0");
        caption.textContent = captions[active];
    }

    function moveCarousel(direction) {
        active =
            (active + direction + cards.length) % cards.length;

        renderCarousel();
    }

    // Clicking a photo brings it to the centre.
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            active = index;
            renderCarousel();
        });
    });

    previousButton.addEventListener("click", () => {
        moveCarousel(-1);
    });

    nextButton.addEventListener("click", () => {
        moveCarousel(1);
    });

    // Arrow keys work while the carousel or its buttons have focus.
    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveCarousel(-1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            moveCarousel(1);
        }
    });

    // Swipe support for touchscreens.
    let touchStartX = null;
    let touchStartY = null;

    stage.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    stage.addEventListener("touchend", (event) => {
        if (touchStartX === null) return;

        const deltaX =
            event.changedTouches[0].clientX - touchStartX;

        const deltaY =
            event.changedTouches[0].clientY - touchStartY;

        // Only change images for a mainly horizontal swipe.
        if (
            Math.abs(deltaX) > 45 &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
            moveCarousel(deltaX < 0 ? 1 : -1);
        }

        touchStartX = null;
        touchStartY = null;
    }, { passive: true });

    stage.addEventListener("touchcancel", () => {
        touchStartX = null;
        touchStartY = null;
    }, { passive: true });

    renderCarousel();
}