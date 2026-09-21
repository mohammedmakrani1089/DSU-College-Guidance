document.addEventListener("DOMContentLoaded", function() {

    const openRatingBtn = document.getElementById("openRatingBtn");
    const ratingModal = document.getElementById("ratingModal");
    const ratingClose = document.getElementById("ratingClose");
    const ratingSubmitBtn = document.getElementById("ratingSubmitBtn");
    const ratingMessage = document.getElementById("ratingMessage");
    const ratingStars = document.querySelectorAll('input[name="rating"]');

    function openRatingPopup() {
        if (!ratingModal) return;

        ratingModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeRatingPopup() {
        if (!ratingModal) return;

        ratingModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (openRatingBtn) {
        openRatingBtn.addEventListener("click", function() {
            openRatingPopup();
        });
    }

    if (ratingClose) {
        ratingClose.addEventListener("click", function() {
            closeRatingPopup();
        });
    }

    if (ratingModal) {
        ratingModal.addEventListener("click", function(event) {
            if (event.target === ratingModal) {
                closeRatingPopup();
            }
        });
    }

    ratingStars.forEach(function(star) {
        star.addEventListener("change", function() {

            const value = this.value;

            const messages = {
                1: "Very Poor",
                2: "Poor",
                3: "Good",
                4: "Very Good",
                5: "Excellent"
            };

            ratingMessage.textContent = messages[value];
            ratingMessage.style.color = "#2563eb";
        });
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeRatingPopup();
        }
    });

    if (ratingSubmitBtn) {
    ratingSubmitBtn.addEventListener("click", async function() {

        const userName = document.getElementById("ratingName").value.trim();
        const description = document.getElementById("ratingDescription").value.trim();
        const selectedRating = document.querySelector('input[name="rating"]:checked');

        if (!userName) {
            alert("Please enter your name.");
            return;
        }

        if (!selectedRating) {
            alert("Please select a rating.");
            return;
        }

        if (!description) {
            alert("Please enter your feedback.");
            return;
        }

        ratingSubmitBtn.disabled = true;
        ratingSubmitBtn.textContent = "Submitting...";

        try {
            const response = await fetch("/WebsiteRating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_name: userName,
                    rating: selectedRating.value,
                    description: description
                })
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);

                document.getElementById("ratingForm").reset();
                ratingMessage.textContent = "Select a rating";
                ratingMessage.style.color = "#94a3b8";

                closeRatingPopup();
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error("Rating submission error:", error);
            alert("Something went wrong. Please try again.");
        }

        ratingSubmitBtn.disabled = false;
        ratingSubmitBtn.textContent = "Submit Rating →";
    });
}

});