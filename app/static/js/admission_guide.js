const admissionButtons = document.querySelectorAll(".admissionGuideBtn");
const admissionModal = document.getElementById("admissionModal");
const admissionClose = document.getElementById("admissionClose");

admissionButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        admissionModal.style.display = "flex";
    });
});

admissionClose.addEventListener("click", function() {
    admissionModal.style.display = "none";
});

admissionModal.addEventListener("click", function(event) {
    if (event.target === admissionModal) {
        admissionModal.style.display = "none";
    }
});