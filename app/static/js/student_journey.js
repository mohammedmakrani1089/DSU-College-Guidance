document.addEventListener("DOMContentLoaded", function() {

    

    const studentJourneyModal = document.getElementById("studentJourneyModal");
    const studentJourneyClose = document.getElementById("studentJourneyClose");

    const journeySteps = document.querySelectorAll(".journey_step");
    const progressSteps = document.querySelectorAll(".journey_progress_step");

    const studentName = document.getElementById("journeyStudentName");
    const studentCourse = document.getElementById("journeyCourse");
    const studentSemester = document.getElementById("journeySemester");

    const step1Next = document.getElementById("journeyStep1Next");

    const step2Back = document.getElementById("journeyStep2Back");
    const step2Next = document.getElementById("journeyStep2Next");

    const step3Back = document.getElementById("journeyStep3Back");
    const step3Next = document.getElementById("journeyStep3Next");

    const step4Back = document.getElementById("journeyStep4Back");

    const displayName = document.getElementById("journeyDisplayName");
    const displayCourse = document.getElementById("journeyDisplayCourse");
    const displaySemester = document.getElementById("journeyDisplaySemester");

    const admissionCourse = document.getElementById("journeyAdmissionCourse");
    const admissionButton = document.getElementById("journeyAdmissionButton");

    const eligibility = document.getElementById("journeyEligibility");
    const documents = document.getElementById("journeyDocuments");
    const fees = document.getElementById("journeyFees");
    const scholarship = document.getElementById("journeyScholarship");

    const subjectList = document.getElementById("journeySubjectList");
    const subjectMessage = document.getElementById("journeySubjectsMessage");

    let currentStep = 1;

    const studentData = {
        name: "",
        courseId: "",
        course: "",
        semester: ""
    };


    /* =========================
       OPEN JOURNEY
    ========================= */

    function openJourney() {

        studentJourneyModal.classList.add("active");

        document.body.style.overflow = "hidden";

        showStep(1);
    }


    /* =========================
       CLOSE JOURNEY
    ========================= */

    function closeJourney() {

        studentJourneyModal.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* =========================
       SHOW STEP
    ========================= */

    function showStep(stepNumber) {

        currentStep = stepNumber;

        journeySteps.forEach(function(step) {

            step.classList.remove("active");

        });


        progressSteps.forEach(function(step) {

            step.classList.remove("active");

        });


        const selectedStep =
            document.getElementById("journeyStep" + stepNumber);


        if (selectedStep) {

            selectedStep.classList.add("active");

        }


        progressSteps.forEach(function(step) {

            const progressNumber =
                Number(step.dataset.step);


            if (progressNumber <= stepNumber) {

                step.classList.add("active");

            }

        });

    }


    /* =========================
       SAVE STUDENT DATA
    ========================= */

    function saveStudentData() {

        studentData.name = studentName.value.trim();

        studentData.courseId = studentCourse.value;

        studentData.course =
            studentCourse.options[
                studentCourse.selectedIndex
            ].text;

        studentData.semester =
            studentSemester.value;


        displayName.textContent =
            studentData.name;

        displayCourse.textContent =
            studentData.course;

        displaySemester.textContent =
            "Semester " + studentData.semester;

        admissionCourse.textContent =
            studentData.course;
    }


    /* =========================
       LOAD SUBJECTS
    ========================= */

    async function loadJourneySubjects() {

        subjectList.innerHTML = `
            <div class="journey_subject_loading">
                Loading your subjects...
            </div>
        `;


        subjectMessage.textContent =
            "Fetching subjects for your selected course and semester...";


        try {

            const response = await fetch(
                "/get_journey_subjects",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        department_id: studentData.courseId,
                        semester: studentData.semester
                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Subjects could not be loaded."
                );

            }


            const data = await response.json();


            if (!data.success) {

                subjectList.innerHTML = `
                    <div class="journey_subject_empty">
                        ${data.message}
                    </div>
                `;

                subjectMessage.textContent =
                    "Unable to find subjects.";

                return false;
            }


            subjectList.innerHTML = "";


            if (!data.subjects ||
                data.subjects.length === 0) {

                subjectList.innerHTML = `
                    <div class="journey_subject_empty">
                        No subjects found for the selected course and semester.
                    </div>
                `;

                subjectMessage.textContent =
                    data.department_name +
                    " • Semester " +
                    studentData.semester;

                return false;
            }


            subjectMessage.textContent =
                data.department_name +
                " • Semester " +
                studentData.semester;


            data.subjects.forEach(function(subject, index) {

                const subjectCard =
                    document.createElement("div");


                subjectCard.className =
                    "journey_subject_card";


                subjectCard.innerHTML = `
                    <div class="journey_subject_number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="journey_subject_info">

                        <h4>
                            ${subject.SUBJECT_NAME}
                        </h4>

                        <span>
                            ${subject.SUBJECT_CODE}
                        </span>

                    </div>
                `;


                subjectList.appendChild(subjectCard);

            });


            return true;

        } catch (error) {

            console.error(
                "Subject loading error:",
                error
            );


            subjectList.innerHTML = `
                <div class="journey_subject_empty">
                    Unable to load subjects right now.
                </div>
            `;


            subjectMessage.textContent =
                "Please check your connection and try again.";

            return false;
        }
    }


    /* =========================
       LOAD ADMISSION DATA
    ========================= */

    async function loadJourneyAdmission() {

        eligibility.textContent = "Loading...";
        documents.textContent = "Loading...";
        fees.textContent = "Loading...";
        scholarship.textContent = "Loading...";


        try {

            const response = await fetch(
                "/get_journey_admission",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        department_id: studentData.courseId
                    })
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Admission information could not be loaded."
                );

            }


            const data =
                await response.json();


            if (!data.success) {

                eligibility.textContent =
                    data.message;

                documents.textContent =
                    data.message;

                fees.textContent =
                    data.message;

                scholarship.textContent =
                    data.message;

                return false;
            }


            const department =
                data.department;


            admissionCourse.textContent =
                department.DEPARTMENT_NAME;


            eligibility.textContent =
                department.ELIGIBILITY ||
                "Information not available.";


            documents.textContent =
                department.DOCUMENTS ||
                "Information not available.";


            fees.textContent =
                department.FEES ||
                "Information not available.";


            scholarship.textContent =
                department.SCHOLARSHIP ||
                "Information not available.";


            admissionButton.href =
                "/AdmissionGuide?department_id=" +
                studentData.courseId;


            return true;

        } catch (error) {

            console.error(
                "Admission loading error:",
                error
            );


            eligibility.textContent =
                "Unable to load admission information.";

            documents.textContent =
                "Unable to load admission information.";

            fees.textContent =
                "Unable to load admission information.";

            scholarship.textContent =
                "Unable to load admission information.";

            return false;
        }
    }


    /* =========================
       VALIDATE STEP 1
    ========================= */

    function validateStepOne() {

        if (studentName.value.trim() === "") {

            alert("Please enter your name.");

            studentName.focus();

            return false;
        }


        if (studentCourse.value === "") {

            alert("Please select your course.");

            studentCourse.focus();

            return false;
        }


        if (studentSemester.value === "") {

            alert("Please select your semester.");

            studentSemester.focus();

            return false;
        }


        const semester =
            Number(studentSemester.value);


        if (semester < 1 || semester > 2) {

            alert(
                "Please select Semester 1 or Semester 2."
            );

            studentSemester.focus();

            return false;
        }


        return true;
    }

/* =========================
   GET STARTED BUTTON
========================= */

const getStartedButtons = document.querySelectorAll(".get-started-button");

getStartedButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        openJourney();

    });

});

    /* =========================
       CLOSE BUTTON
    ========================= */

    if (studentJourneyClose) {

        studentJourneyClose.addEventListener(
            "click",
            function() {

                closeJourney();

            }
        );

    }


    /* =========================
       OUTSIDE CLICK
    ========================= */

    if (studentJourneyModal) {

        studentJourneyModal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === studentJourneyModal
                ) {

                    closeJourney();

                }

            }
        );

    }


    /* =========================
       STEP 1 → STEP 2
    ========================= */

    if (step1Next) {

        step1Next.addEventListener(
            "click",
            async function() {

                if (!validateStepOne()) {

                    return;
                }


                saveStudentData();


                step1Next.disabled = true;

                step1Next.textContent =
                    "Loading...";


                await loadJourneySubjects();


                step1Next.disabled = false;

                step1Next.textContent =
                    "Continue →";


                showStep(2);

            }
        );

    }


    /* =========================
       STEP 2 → BACK
    ========================= */

    if (step2Back) {

        step2Back.addEventListener(
            "click",
            function() {

                showStep(1);

            }
        );

    }


    /* =========================
       STEP 2 → STEP 3
    ========================= */

    if (step2Next) {

        step2Next.addEventListener(
            "click",
            async function() {

                step2Next.disabled = true;

                step2Next.textContent =
                    "Loading...";


                await loadJourneyAdmission();


                step2Next.disabled = false;

                step2Next.textContent =
                    "Admission Guide →";


                showStep(3);

            }
        );

    }


    /* =========================
       STEP 3 → BACK
    ========================= */

    if (step3Back) {

        step3Back.addEventListener(
            "click",
            function() {

                showStep(2);

            }
        );

    }


    /* =========================
       STEP 3 → STEP 4
    ========================= */

    if (step3Next) {

        step3Next.addEventListener(
            "click",
            function() {

                showStep(4);

            }
        );

    }


    /* =========================
       STEP 4 → BACK
    ========================= */

    if (step4Back) {

        step4Back.addEventListener(
            "click",
            function() {

                showStep(3);

            }
        );

    }


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                studentJourneyModal &&
                studentJourneyModal.classList.contains("active")
            ) {

                closeJourney();

            }

        }
    );

});