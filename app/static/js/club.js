document.addEventListener("DOMContentLoaded", function() {

    const clubRegisterBtn = document.getElementById("clubRegisterBtn");
    const clubRegistrationModal = document.getElementById("clubRegistrationModal");
    const clubPopupClose = document.getElementById("clubPopupClose");
    const clubPopupCancel = document.getElementById("clubPopupCancel");
    const clubRegistrationForm = document.getElementById("clubRegistrationForm");


    /* =========================
       OPEN CLUB REGISTRATION
    ========================= */

    function openClubRegistration() {

        if (!clubRegistrationModal) {
            return;
        }

        clubRegistrationModal.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* =========================
       CLOSE CLUB REGISTRATION
    ========================= */

    function closeClubRegistration() {

        if (!clubRegistrationModal) {
            return;
        }

        clubRegistrationModal.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* =========================
       REGISTER BUTTON
    ========================= */

    if (clubRegisterBtn) {

        clubRegisterBtn.addEventListener("click", function(event) {

            event.preventDefault();

            openClubRegistration();

        });

    }


    /* =========================
       CLOSE BUTTON
    ========================= */

    if (clubPopupClose) {

        clubPopupClose.addEventListener("click", function() {

            closeClubRegistration();

        });

    }


    /* =========================
       CANCEL BUTTON
    ========================= */

    if (clubPopupCancel) {

        clubPopupCancel.addEventListener("click", function() {

            closeClubRegistration();

        });

    }


    /* =========================
       CLICK OUTSIDE POPUP
    ========================= */

    if (clubRegistrationModal) {

        clubRegistrationModal.addEventListener("click", function(event) {

            if (event.target === clubRegistrationModal) {

                closeClubRegistration();

            }

        });

    }


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener("keydown", function(event) {

        if (
            event.key === "Escape" &&
            clubRegistrationModal &&
            clubRegistrationModal.classList.contains("active")
        ) {

            closeClubRegistration();

        }

    });


    /* =========================
       CLUB REGISTRATION FORM
    ========================= */

    if (clubRegistrationForm) {

        clubRegistrationForm.addEventListener("submit", function() {

            /*
                Do NOT use event.preventDefault() here.

                Form needs to submit normally to Flask.
            */

        });

    }


    /* =========================
       SUCCESS POPUP
    ========================= */

    const registrationSuccessModal =
        document.getElementById("registrationSuccessModal");

    const registrationSuccessClose =
        document.getElementById("registrationSuccessClose");

    const registrationSuccessButton =
        document.getElementById("registrationSuccessButton");


    function closeRegistrationSuccess() {

        if (!registrationSuccessModal) {
            return;
        }

        registrationSuccessModal.style.display = "none";

        document.body.style.overflow = "";

    }


    /* =========================
       SUCCESS POPUP EVENTS
    ========================= */

    if (registrationSuccessModal) {

        document.body.style.overflow = "hidden";


        if (registrationSuccessClose) {

            registrationSuccessClose.addEventListener(
                "click",
                function() {

                    closeRegistrationSuccess();

                }
            );

        }


        if (registrationSuccessButton) {

            registrationSuccessButton.addEventListener(
                "click",
                function() {

                    closeRegistrationSuccess();

                }
            );

        }


        registrationSuccessModal.addEventListener(
            "click",
            function(event) {

                if (event.target === registrationSuccessModal) {

                    closeRegistrationSuccess();

                }

            }
        );

    }

});