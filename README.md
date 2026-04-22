# NextHire Campus-Automated Placement Solution

This repository contains a full-stack web application developed using the **MERN stack (MongoDB, Express.js, React, Node.js)**. The system is designed to automate and simplify the campus placement process by connecting **Students, Recruiters, and Admin** on a single platform.

## Frontend

The frontend of this project is developed using **React.js**, which provides a dynamic and interactive user interface. It handles routing, component rendering, and user interactions efficiently.

The application includes multiple pages such as:
* Login / Signup Page
* Student Dashboard
* Recruiter Dashboard
* Admin Dashboard
  
The UI is built using **HTML, CSS, and JavaScript**, ensuring a clean, responsive, and user-friendly design. Job listings are displayed using card-based layouts with images for better visualization.

The frontend communicates with the backend using API calls, enabling real-time updates such as job postings and applications.

## Backend

The backend is built using **Node.js and Express.js**, which acts as a bridge between the frontend and the database.
It handles:
* User authentication (login/signup)
* Job posting and retrieval
* Application management
* Admin monitoring

The backend exposes REST APIs for smooth communication with the frontend.

## Database

The project uses **MongoDB** for storing and managing data.

## Collections:

* **Users** → Stores student, recruiter, and admin details
* **Jobs** → Stores job postings (title, company, image, category)
* **Applications** → Stores student job applications

## User Roles

### Student

* View available jobs
* Search and filter jobs
* Apply for jobs
* View applied jobs

### Recruiter

* Add job postings
* Upload job images (via URL)
* View posted jobs

### Admin

* Monitor all activities
* Manage users
* Track job postings and applications

## Workflow

Login → Select Role → Dashboard →
Recruiter adds jobs → Jobs stored in database →
Student views jobs → Student applies →
Admin monitors system

##  Installation and Setup

### Clone the project

git clone <your-repo-link>

### Install dependencies

npm install

### Run Frontend

npm start

### Run Backend

cd backend
npm install
npm run dev

##  Tech Stack

**Frontend:** React.js
**Backend:** Node.js, Express.js
**Database:** MongoDB

## Features

*  Login system with role-based access
*  Navbar with role switching
* Recruiter adds jobs → visible to students
*  Student applies with alert message
*  Search and filter jobs
*  Job cards with images
*  Admin monitoring system
*  Clean and responsive UI

## Challenges Faced

* Integrating frontend with backend
* Managing multiple user roles
* Handling dynamic data updates
* Designing responsive UI
  
## Future Scope

*  Resume upload feature
*  AI-based job recommendations
*  Notification system
*  Analytics dashboard
*  Mobile application
*  Cloud deployment

## Advantages

* Easy to use
* Saves time
* Centralized system
* Real-time updates
* Admin monitoring

##  Limitations

* Requires internet connection
* Basic security (can be improved)
* Limited backend features (can be expanded)

## Conclusion

NextHire Campus is an efficient placement management system that simplifies the recruitment process. It connects students, recruiters, and administrators in a single platform, improving communication, reducing manual work, and enhancing overall placement efficiency.

## Author
* Jamana Madhuri


