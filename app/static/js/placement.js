const placementYearButtons = document.querySelectorAll(".placement_year_button");
const placementYearContents = document.querySelectorAll(".placement_year_content");

placementYearButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedYear = button.dataset.year;
        placementYearButtons.forEach(function(item) {
            item.classList.remove("active");
        });
        placementYearContents.forEach(function(content) {
            content.classList.remove("active");
        });
        button.classList.add("active");
        document.getElementById("placement-" + selectedYear).classList.add("active");
    });
});