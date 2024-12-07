# EduSphere

EduSphere is a web application designed to replicate the functionality and user interface of Google Classroom. It allows users to manage virtual classrooms, assignments, and announcements.

## Features

- **User Authentication:**

  - Sign up or log in as a **Student** or **Teacher**.

- **Classroom Management:**

  - **Teacher:** Create, update, and delete classes (subject and section).
  - **Student:** Join classes using a unique class code.

- **Announcements:**

  - Both **Teachers** and **Students** can create announcements within a class.
  - **Teachers:**
    - Delete their own announcements.
    - Delete announcements posted by their students.
  - **Students:**
    - Delete only their own announcements.

- **Assignments:**
  - **Teachers:** Create and delete assignments for their classes.
  - **Students:** Submit assignments via a text input (textarea only).
  - **Teachers:** Grade students' submissions.

## Screenshots

### Demo

![EduSphere Demo](/screenshots/webapp.gif)

### ER Diagram

![ER Diagram](/screenshots/EERD.png)

## Tech Stack

- **Frontend:** React and Tailwind CSS
- **Backend** Express, MySQL and JWT for authentication

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/drewmendez/edusphere-lms.git
   cd edusphere-lms
   ```

2. **Install dependencies for frontend:**

   ```bash
   cd client
   npm install
   ```

3. **Install dependencies for backend:**

   ```bash
   cd ../server
   npm install
   ```

4. **Setup database:**

   - Create a MySQL database.
   - Run the provided SQL script located at `server/schema/dbSchema.sql` to set up the database tables.

5. **Configure environment variables:**

   - In the `server` folder, create a `.env` file with the following:

     ```env
     PORT=8080

     MYSQL_HOST=localhost
     MYSQL_USER=root
     MYSQL_PASSWORD=yourpassword
     MYSQL_DB=yourdbname

     JWT_SECRET_KEY=yoursecretkey
     ```

6. **Start the backend server:**

   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend server:**

   ```bash
   cd client
   npm run dev
   ```
