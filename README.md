# 🎓 DSU College Guidance

A full-stack college guidance web application built to help students explore academic information, campus facilities, admission details, placements, events, student clubs and useful college resources in one place.

## 🌐 About The Project

DSU College Guidance is a student-focused web application developed for Dr. Subhash University.

The main goal of this project is to bring important college information together in a simple, organized and user-friendly platform.

Students can explore academic resources, admission information, campus facilities, placements, events, clubs and other useful guidance without having to search through multiple sections separately.

## ✨ Features

### 🏫 College Information
- About the University
- University information
- Important notices
- Quick access to major sections

### 📚 Academics
- Academic information
- Semester-wise subject details
- Department information
- Academic calendar
- Learning approach
- Classroom and practical learning information

### 📝 Admission Guide
- Course-wise eligibility
- Required documents
- Fees information
- Scholarship information
- Detailed admission guidance

### 🏢 Campus & Facilities
- Campus Tour
- Library
- Classrooms
- Computer Labs
- Laboratories
- Sports Facilities
- Hostel
- Transportation
- Canteen

### 💼 Placements
- Placement information
- Placement activities
- Placement highlights
- Average placement information
- Career-related guidance

### 🎉 Events & Clubs
- Campus events
- Event gallery
- Upcoming events
- Cultural and sports events
- Student clubs
- Club information
- Club registration

### 🧭 New Student Journey
An interactive student journey designed to help users explore:

- Student profile
- Course and semester
- Semester subjects
- Admission information
- Campus preview
- Campus exploration

### 💡 Tips & Tricks
- Daily motivational thoughts
- Study tips
- College life tips
- Freshers' Do & Don'ts
- Quick student hacks
- Useful student resources
- Exam preparation checklist

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Jinja2

### Database
- MySQL
- SQL

## 🗄️ Database

MySQL is used to store and manage application data.

The project contains database-driven information for areas such as:

- Departments
- Subjects
- Events
- Club Registrations

Flask routes and SQL queries are used to fetch, insert and update data dynamically.

## 🔄 Application Flow

```text
User
  ↓
HTML / CSS / JavaScript
  ↓
Flask Backend
  ↓
Python Logic
  ↓
MySQL Database
  ↓
Dynamic Data
  ↓
Web Page
```

## 📁 Project Structure

```text
College-Guidence/
│
├── app/
│   │
│   ├── database/
│   │   ├── db.py
│   │   └── test.py
│   │
│   ├── routes/
│   │   ├── home.py
│   │   └── auth.py
│   │
│   ├── static/
│   │   ├── campus/
│   │   ├── css/
│   │   ├── events/
│   │   ├── icon/
│   │   ├── js/
│   │   └── pdf/
│   │
│   ├── templates/
│   │   ├── base.html
│   │   ├── home.html
│   │   ├── academics.html
│   │   ├── facilities.html
│   │   ├── events.html
│   │   ├── placement.html
│   │   ├── tips and tricks.html
│   │   └── ...
│   │
│   └── __init__.py
│
├── .env
├── .gitignore
├── DSU College DataBase Query.sql
├── requirements.txt
├── README.md
└── run.py
```

> **Note:** `.env` contains private configuration and must not be committed to the public repository.

## ⚙️ Installation & Setup

Clone the repository, open the project directory, create and activate a Python virtual environment, install the required dependencies, configure the `.env` file, set up the MySQL database using the included SQL file, and then start the Flask application.

```bash
git clone YOUR_REPOSITORY_URL
cd College-Guidence
python -m venv venv
```

For Git Bash on Windows:

```bash
source venv/Scripts/activate
```

For Command Prompt:

```cmd
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the project root and add your own configuration:

```env
SECRET_KEY=your-secret-key
MYSQL_HOST=localhost
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=your-database-name
```

Set up the MySQL database using:

```text
DSU College DataBase Query.sql
```

Make sure MySQL is running before starting the application.

Run the application:

```bash
python run.py
```

The application will be available at:

```text
http://127.0.0.1:5001
```

## 🔐 Environment & Security

Sensitive configuration values such as the Flask Secret Key, MySQL password and database credentials are stored using environment variables.

The `.env` file is excluded from Git tracking using `.gitignore`.

Never publish real passwords, API keys or other sensitive credentials inside the source code or public repository.

## 📌 Key Project Highlights

- Full-stack Flask web application
- MySQL database integration
- Dynamic content using Jinja2 templates
- Course and semester based subject retrieval
- Dynamic admission information
- Club registration system
- Events and campus information
- Interactive student journey
- Daily student thoughts
- Interactive exam checklist
- Responsive frontend design
- Database-driven content

## 🚀 Future Improvements

Possible future improvements include:

- Student authentication
- Admin dashboard
- Advanced search
- More personalized student recommendations
- Additional student tools
- More analytics and reports

## 👨‍💻 Author

**Gulam Mohammad**

Built as a full-stack college guidance project using Python, Flask, MySQL, SQL, HTML, CSS, JavaScript and Jinja2.

## ⭐ Acknowledgement

This project was developed as a learning and portfolio project to practice full-stack web development, backend development, database integration, SQL, frontend development and interactive web application features.

## 📷 Screenshots

Screenshots of the application can be added here to showcase the main pages and features.