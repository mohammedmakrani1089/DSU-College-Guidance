from flask import Flask, Blueprint , redirect , render_template ,url_for , request  , flash , jsonify
from app.database.db import get_connection
import math

home_bp = Blueprint("home", __name__)

@home_bp.route("/")

def home():
    
    connection  = get_connection()
    cursor = connection.cursor( dictionary = True)
    query = "SELECT * FROM NOTICES WHERE NOTICE_DATE >= CURDATE() ORDER BY NOTICE_DATE ASC LIMIT 3;"
    cursor.execute(query)
    
    notices  = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    return render_template("home.html" , notices = notices)

@home_bp.route("/Notices")
def notice():
    
        connection  = get_connection()
        cursor = connection.cursor( dictionary = True )
        query = "SELECT * FROM NOTICES WHERE NOTICE_DATE BETWEEN CURDATE() AND DATE_ADD(CURDATE() , INTERVAL 1 MONTH) ORDER BY NOTICE_DATE ASC;"
        cursor.execute(query)
        
        notices  = cursor.fetchall()
        
        cursor.close()
        connection.close()

        return render_template("notice.html", notices = notices)

@home_bp.route("/AcademicCalendar")
def academic_calendar():
    
    page = request.args.get('page',1,type=int)
    per_page = 6
    offset = (page - 1 ) * per_page
    
    connection = get_connection()
    cursor = connection.cursor( dictionary = True )
    
    cursor.execute("SELECT COUNT(*) AS TOTAL FROM academic_calendar WHERE EVENT_DATE >= CURDATE()")
    total_events = cursor.fetchone()['TOTAL']
    total_pages = math.ceil(total_events/per_page)
    
    query = "SELECT * FROM academic_calendar WHERE EVENT_DATE >= CURDATE() ORDER BY EVENT_DATE ASC LIMIT %s OFFSET %s;"
    cursor.execute(query, (per_page , offset))
    
    events = cursor.fetchall()
    cursor.close()
    connection.close()
    
    has_prev = page > 1
    has_next = page < total_pages
    prev_num = page - 1 if has_prev else None
    next_num = page + 1 if has_next else None
    
    return render_template("academic calendar.html",
                            events = events,
                            page=page,
                            total_pages=total_pages,
                            has_prev=has_prev,
                            has_next=has_next,
                            prev_num=prev_num,
                            next_num=next_num
                           )
    
@home_bp.route("/SubjectDetails", methods = ["POST"])
def subject_details():
    
    department_id = request.form.get("department_id" , type=int)
    semester = request.form.get("semester" , type=int)
    
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    
    query = "SELECT SUBJECT_NAME , SUBJECT_CODE FROM subjects WHERE DEPARTMENT_ID = %s AND SEMESTER = %s ORDER BY SUBJECT_ID ASC"
    
    cursor.execute(query, (department_id , semester))
    subjects = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    return render_template("subject details.html",
                           subjects = subjects
                           )
    
    

@home_bp.route("/AboutCollege")
def about_college():
    return render_template("about_college.html")

@home_bp.route("/CampusTour")  
def campus_tour():
    return render_template("campus tour.html")

@home_bp.route("/Academics")  
def academics():
    return render_template("academics.html")

@home_bp.route("/Facilities")  
def facilities():
    return render_template("facilities.html")

@home_bp.route("/AdmissionGuide")  
def admission_guide():
    
    department_id = request.args.get("department_id" , type=int)
    
    if not department_id:
        return "Please Select The Cource First"
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    
    query = "SELECT DEPARTMENT_NAME,ELIGIBILITY, DOCUMENTS , FEES , SCHOLARSHIP,DESCRIPTION FROM DEPARTMENTS WHERE DEPARTMENT_ID = %s; "
    
    cursor.execute(query ,(department_id,))
    cources = cursor.fetchone()
    
    cursor.close()
    connection.close()
    
    if not cources:
        return "Course details not found."
    
    return render_template("admission guide.html",
                           cources = cources)

@home_bp.route("/FAQ")  
def FAQ():
    return render_template("FAQ.html")

@home_bp.route("/Departments")  
def departments():
    return render_template("departments.html")

@home_bp.route("/HostelFacilities")
def hostel_facilities():
    return render_template("hostel facilities.html")

@home_bp.route("/Placements")
def placement():
    return render_template("placement.html")

@home_bp.route("/Events&Clubs")

def events():
    connection = get_connection()
    cursor = connection.cursor(dictionary = True)
    
    cursor.execute(
        """ SELECT EVENT_ID ,EVENT_NAME ,EVENT_DATE ,LOCATION ,IMAGE , DESCRIPTION FROM events ORDER BY EVENT_DATE ASC"""
    )
    
    all_events = cursor.fetchall()
    
    cursor.execute(
        """ SELECT EVENT_ID ,EVENT_NAME,EVENT_DATE ,LOCATION ,IMAGE , DESCRIPTION FROM events WHERE EVENT_DATE >= CURDATE() ORDER BY EVENT_DATE ASC"""
    )
    
    upcoming_events = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    slider = [9,6,14,4,7,12]
    
    gallery = [11,8,18,17,19,2]
    
    slider_events = [event for event in all_events if event["EVENT_ID"] in slider]
    gallery_events = [event for event in all_events if event["EVENT_ID"] in gallery]
    
    return render_template(
    "events.html",
    all_events = all_events,
    upcoming_events = upcoming_events,
    slider_events = slider_events,
    gallery_events = gallery_events
    )



@home_bp.route("/Club Registration" , methods = ["POST"])

def club_registration():
    
    student_name = request.form.get("student_name")
    email = request.form.get("email")
    course = request.form.get("course")
    semester = request.form.get("semester", type=int)
    club_name = request.form.get("club_name")
    
    connection = get_connection()
    cursor = connection.cursor()
    
    query = """ INSERT INTO club_registration
    (STUDENT_NAME , EMAIL , COURSE , SEMESTER , CLUB_NAME ) 
    VALUES (%s,%s,%s,%s,%s) """
    
    cursor.execute(query, (
    student_name,
    email,
    course,
    semester,
    club_name
    ))
    
    connection.commit()
    
    cursor.close()
    connection.close()
    
    flash(f"You have successfully registered for {club_name}.", "success")
    
    return redirect(url_for("home.events"))




@home_bp.route("/get_journey_subjects", methods=["POST"])
def get_journey_subjects():

    data = request.get_json()

    department_id = data.get("department_id")
    semester = data.get("semester")

    if not department_id or not semester:
        return jsonify({
            "success": False,
            "message": "Course and semester are required."
        }), 400

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    department_query = """
        SELECT DEPARTMENT_ID, DEPARTMENT_NAME
        FROM DEPARTMENTS
        WHERE DEPARTMENT_ID = %s
        LIMIT 1
    """

    cursor.execute(department_query, (department_id,))
    department = cursor.fetchone()

    if not department:
        cursor.close()
        connection.close()

        return jsonify({
            "success": False,
            "message": "Selected course was not found."
        }), 404

    subject_query = """
        SELECT SUBJECT_ID, SUBJECT_NAME, SUBJECT_CODE, SEMESTER
        FROM SUBJECTS
        WHERE DEPARTMENT_ID = %s
        AND SEMESTER = %s
        ORDER BY SUBJECT_ID ASC
    """

    cursor.execute(
        subject_query,
        (department_id, semester)
    )

    subjects = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify({
        "success": True,
        "department_name": department["DEPARTMENT_NAME"],
        "subjects": subjects
    })
    
    
    
@home_bp.route("/get_journey_admission", methods=["POST"])
def get_journey_admission():

    data = request.get_json()

    department_id = data.get("department_id")

    if not department_id:
        return jsonify({
            "success": False,
            "message": "Course is required."
        }), 400

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT
            DEPARTMENT_ID,
            DEPARTMENT_NAME,
            ELIGIBILITY,
            DOCUMENTS,
            FEES,
            SCHOLARSHIP,
            DESCRIPTION
        FROM DEPARTMENTS
        WHERE DEPARTMENT_ID = %s
        LIMIT 1
    """

    cursor.execute(query, (department_id,))

    department = cursor.fetchone()

    cursor.close()
    connection.close()

    if not department:
        return jsonify({
            "success": False,
            "message": "Course information not found."
        }), 404

    return jsonify({
        "success": True,
        "department": department
    })
    
    
@home_bp.route("/Tips & Tricks")
def tips_and_tricks():
    return render_template("tips and tricks.html")


@home_bp.route("/WebsiteRating", methods=["POST"])
def website_rating():
    data = request.get_json()

    user_name = data.get("user_name", "").strip()
    rating = data.get("rating")
    description = data.get("description", "").strip()

    if not user_name:
        return jsonify({
            "success": False,
            "message": "Please enter your name."
        }), 400

    if not rating:
        return jsonify({
            "success": False,
            "message": "Please select a rating."
        }), 400

    if not description:
        return jsonify({
            "success": False,
            "message": "Please enter your feedback."
        }), 400

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        return jsonify({
            "success": False,
            "message": "Invalid rating."
        }), 400

    if rating < 1 or rating > 5:
        return jsonify({
            "success": False,
            "message": "Rating must be between 1 and 5."
        }), 400

    visitor_token = request.cookies.get("visitor_token")

    if not visitor_token:
        return jsonify({
            "success": False,
            "message": "Visitor session not found. Please refresh the page and try again."
        }), 400

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        UPDATE website_visitors
        SET USER_NAME = %s,
            RATING = %s,
            DESCRIPTION = %s
        WHERE VISITOR_TOKEN = %s
    """

    cursor.execute(
        query,
        (user_name, rating, description, visitor_token)
    )

    connection.commit()

    updated_rows = cursor.rowcount

    cursor.close()
    connection.close()

    if updated_rows == 0:
        return jsonify({
            "success": False,
            "message": "Visitor record not found."
        }), 404

    return jsonify({
        "success": True,
        "message": "Thank you for rating our website!"
    })
    
    
@home_bp.route("/Private Policy")
def private_policy():
    return render_template("private policy.html")

@home_bp.route("/Terms & Tricks")
def terms_and_conditions():
    return render_template("terms & conditions.html")