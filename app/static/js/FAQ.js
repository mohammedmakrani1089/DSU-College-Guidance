document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".faq_question");

    faqQuestions.forEach(function(question) {
        question.addEventListener("click", function() {
            // Sirf class add/remove hogi, height CSS khud adjust karega
            this.classList.toggle("active");
        });
    });
});