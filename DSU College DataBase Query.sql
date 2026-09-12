use dsu_college;
show  tables;

CREATE TABLE DEPARTMENTS(
    DEPARTMENT_ID INT PRIMARY KEY AUTO_INCREMENT,
    DEPARTMENT_NAME VARCHAR(50) NOT NULL,
    DESCRIPTION TEXT NOT NULL,
    HOD_NAME VARCHAR(50),
    LOCATION VARCHAR(50)
);

CREATE TABLE SUBJECTS(
    SUBJECT_ID INT PRIMARY KEY AUTO_INCREMENT,
    DEPARTMENT_ID INT,
    SUBJECT_NAME VARCHAR(100) NOT NULL,
    SEMESTER VARCHAR(10),
    SUBJECT_CODE VARCHAR(15),

    FOREIGN KEY (DEPARTMENT_ID)
    REFERENCES DEPARTMENTS(DEPARTMENT_ID)
);

CREATE TABLE CAMPUS_PLACES(
    PLACE_ID INT PRIMARY KEY AUTO_INCREMENT,
    PLACE_NAME VARCHAR(50) NOT NULL,
    CATEGORY VARCHAR(50) NOT NULL,
    DESCRIPTION TEXT NOT NULL,
    LOCATION VARCHAR(100),
    TIMING VARCHAR(100),
    IMAGE TEXT
);

CREATE TABLE ACADEMIC_CALENDAR(
    CALENDAR_ID INT PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(100) NOT NULL,
    EVENT_DATE DATE,
    DESCRIPTION TEXT NOT NULL
);

CREATE TABLE NOTICES(
    NOTICE_ID INT PRIMARY KEY AUTO_INCREMENT,
    TITLE VARCHAR(100) NOT NULL,
    NOTICE_DATE DATE,
    DESCRIPTION TEXT NOT NULL
);

CREATE TABLE EVENTS(
    EVENT_ID INT PRIMARY KEY AUTO_INCREMENT,
    EVENT_NAME VARCHAR(100) NOT NULL,
    EVENT_DATE DATE,
    LOCATION VARCHAR(100),
    IMAGE TEXT,
    DESCRIPTION TEXT NOT NULL
);

INSERT INTO NOTICES (TITLE, NOTICE_DATE, DESCRIPTION) VALUES
('New Student Orientation Program','2026-08-16','Orientation program for all newly admitted students will be held in the university auditorium.'),

('Student ID Card Verification','2026-08-18','Students are requested to verify their personal details before ID card generation.'),

('Library Membership Registration','2026-08-20','Library membership registration is open for all first semester students.'),

('Club Registration Started','2026-08-22','Registration for technical, cultural and sports clubs has started.'),

('Independence Day Celebration','2026-08-15','Students are invited to participate in the Independence Day cultural celebration.'),

('Campus Tour for Freshers','2026-08-25','A guided campus tour will be organized for newly admitted students.'),

('Time Table Published','2026-08-16','Department-wise class timetable has been uploaded on the student portal.'),

('Python Programming Workshop','2026-09-02','A one-day Python programming workshop will be conducted for beginners.'),

('Mid-1 Examination Schedule Released','2026-09-05','The Mid-1 examination timetable has been published. Students should prepare accordingly.'),

('Mid-1 Examination Begins','2026-09-12','Mid-1 examinations will begin as per the official timetable.'),

('Mid-1 Examination Ends','2026-09-19','Mid-1 examinations will conclude successfully.'),

('Teachers Day Celebration','2026-09-05','Special events and cultural performances will be organized on Teachers Day.'),

('Career Guidance Seminar','2026-09-22','Career experts will guide students regarding higher studies and placements.'),

('Assignment Submission Notice','2026-09-28','Students must submit all pending assignments before the given deadline.'),

('Navratri Celebration','2026-10-15','Traditional Garba Night will be organized inside the university campus.'),

('Industrial Visit Registration','2026-10-18','Interested students can register for the upcoming industrial visit.'),

('Internal Viva Schedule','2026-10-22','Department-wise internal viva schedule has been announced.'),

('Hackathon Registration Open','2026-10-27','Students can register their teams for the annual university hackathon.'),

('Diwali Vacation Notice','2026-11-01','The university will remain closed during Diwali vacation as per the academic calendar.');

INSERT INTO NOTICES (TITLE, NOTICE_DATE, DESCRIPTION) VALUES
('Mid-2 Examination Schedule Released','2026-11-05','The Mid-2 examination timetable has been published. Students are advised to check the schedule carefully.'),

('Mid-2 Examination Begins','2026-11-12','Mid-2 examinations will begin as per the university timetable.'),

('Mid-2 Examination Ends','2026-11-18','Mid-2 examinations will conclude on the scheduled date.'),

('Resume Building Workshop','2026-12-01','The Career Development Cell will conduct a resume building workshop for students.'),

('Placement Aptitude Training','2026-12-03','An aptitude and reasoning training session will be organized for placement preparation.'),

('Technical Fest Registration','2026-12-05','Registration for the Annual Technical Fest has started. Interested students can participate.'),

('Annual Technical Fest','2026-12-08','The university will organize its Annual Technical Fest with various competitions.'),

('Sports Week Announcement','2026-12-10','Sports Week activities will begin next week. Students are invited to register.'),

('Sports Week Begins','2026-12-15','Indoor and outdoor sports competitions will be conducted throughout the week.'),

('Blood Donation Camp','2026-12-18','NSS Unit will organize a voluntary blood donation camp on campus.'),

('Cultural Fest Celebration','2026-12-21','Students are invited to participate in dance, music and drama performances.'),

('Winter Internship Guidance','2026-12-24','A guidance session for winter internship opportunities will be conducted.'),

('Christmas Holiday Notice','2026-12-25','The university will remain closed on account of Christmas.'),

('New Year Holiday Notice','2027-01-01','The university will remain closed on account of New Year.'),

('Final Examination Schedule Released','2027-12-31','The End Semester examination timetable has been published for all departments.'),

('Hall Ticket Distribution','2027-01-02','Students can collect their examination hall tickets from their respective departments.'),

('Final Practical Examination','2027-01-03','Practical examinations will be conducted before the theory examinations.'),

('Final Examination Guidelines','2027-01-04','Students are advised to carry their ID card and hall ticket during examinations.'),

('Final Examination Begins','2027-01-08','The End Semester examinations will commence as per the official timetable.');
use dsu_college;
select * from notices order by NOTICE_DATE asc;

update notices set notice_date = '2026-12-31' where notice_id = 15
