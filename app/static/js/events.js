const eventSlides = document.querySelectorAll(".event_slide");
const eventDots = document.querySelectorAll(".event_slider_dots button");
const eventSlider = document.querySelector(".event_slider");

let currentEventSlide = 0;
let eventSliderTimer;

function showEventSlide(index) {
    eventSlides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    eventDots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    eventSlides[index].classList.add("active");
    eventDots[index].classList.add("active");

    currentEventSlide = index;
}

function nextEventSlide() {
    let nextSlide = currentEventSlide + 1;

    if (nextSlide >= eventSlides.length) {
        nextSlide = 0;
    }

    showEventSlide(nextSlide);
}

function startEventSlider() {
    eventSliderTimer = setInterval(nextEventSlide, 4000);
}

function stopEventSlider() {
    clearInterval(eventSliderTimer);
}

eventDots.forEach(function(dot, index) {
    dot.addEventListener("click", function() {
        showEventSlide(index);
        stopEventSlider();
        startEventSlider();
    });
});

if (eventSlides.length > 1) {
    startEventSlider();

    eventSlider.addEventListener("mouseenter", function() {
        stopEventSlider();
    });

    eventSlider.addEventListener("mouseleave", function() {
        startEventSlider();
    });
}