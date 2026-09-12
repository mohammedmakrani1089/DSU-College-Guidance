const subjectBtn = document.getElementById("subjectDetailsBtn");
const subjectModal = document.getElementById("subjectModal");
const subjectClose = document.getElementById("subjectClose");
const subjectForm = document.getElementById("subjectForm");

subjectBtn.addEventListener("click", function(event) {
    event.preventDefault();
    subjectModal.style.display = "flex";
});

subjectClose.addEventListener("click", function() {
    subjectModal.style.display = "none";
});

subjectModal.addEventListener("click", function(event) {
    if (event.target === subjectModal) {
        subjectModal.style.display = "none";
    }
});