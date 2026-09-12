document.addEventListener("DOMContentLoaded", function() {

    /* =========================
       DAILY THOUGHTS
    ========================= */

    const dailyThought = document.getElementById("dailyThought");
    const thoughtDay = document.getElementById("thoughtDay");

    const thoughts = [
        "Small steps every day can lead to big results.",
        "Consistency is more powerful than last-minute effort.",
        "Believe in your progress, even when it feels slow.",
        "Your college years are a chance to learn, explore and grow.",
        "Do not be afraid to ask questions. Every expert was once a beginner.",
        "Use your time wisely today so your future self can thank you.",
        "Learning becomes easier when curiosity becomes a habit.",
        "Take part, try new things and make your college journey memorable.",
        "Mistakes are not failures; they are opportunities to learn.",
        "Keep learning, keep improving and keep moving forward."
    ];


    /* =========================
       GET CURRENT DAY
    ========================= */

    function getDayNumber() {

        const today = new Date();

        const startOfYear = new Date(
            today.getFullYear(),
            0,
            0
        );

        const difference =
            today - startOfYear;

        const oneDay =
            1000 * 60 * 60 * 24;

        const dayOfYear =
            Math.floor(difference / oneDay);

        return dayOfYear;

    }


    /* =========================
       SHOW DAILY THOUGHT
    ========================= */

    function showDailyThought() {

        if (!dailyThought || !thoughtDay) {
            return;
        }

        const dayOfYear =
            getDayNumber();

        const thoughtIndex =
            (dayOfYear - 1) % thoughts.length;

        dailyThought.textContent =
            thoughts[thoughtIndex];

        thoughtDay.textContent =
            String(thoughtIndex + 1).padStart(2, "0");

    }


    /* =========================
       EXAM CHECKLIST
    ========================= */

    const examCheckboxes =
        document.querySelectorAll(
            ".exam_check_item input[type='checkbox']"
        );


    const checklistStorageKey =
        "dsu_exam_checklist";


    function loadChecklist() {

        const savedChecklist =
            JSON.parse(
                localStorage.getItem(
                    checklistStorageKey
                )
            );


        if (!savedChecklist) {
            return;
        }


        examCheckboxes.forEach(
            function(checkbox, index) {

                checkbox.checked =
                    savedChecklist[index] || false;

            }
        );

    }


    function saveChecklist() {

        const checklistState =
            Array.from(examCheckboxes).map(
                function(checkbox) {
                    return checkbox.checked;
                }
            );


        localStorage.setItem(
            checklistStorageKey,
            JSON.stringify(checklistState)
        );

    }


    examCheckboxes.forEach(
        function(checkbox) {

            checkbox.addEventListener(
                "change",
                function() {

                    saveChecklist();

                }
            );

        }
    );


    /* =========================
       INITIALIZE
    ========================= */

    showDailyThought();

    loadChecklist();

});