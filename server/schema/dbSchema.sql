CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  role VARCHAR(7),
  email VARCHAR(20),
  password VARCHAR(120)
);

CREATE TABLE classes (
  class_id INT PRIMARY KEY AUTO_INCREMENT,
  class_subject VARCHAR(50),
  class_code VARCHAR(6),
  banner_color VARCHAR(7),
  class_section VARCHAR(50),
  teacher_id INT,
  FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);

CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT,
  class_id INT,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE
);

CREATE TABLE assignments (
  assignment_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  description VARCHAR(255),
  class_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  creator_id INT,
  points INT,
  FOREIGN KEY (creator_id) REFERENCES users(user_id),
  FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE
);

CREATE TABLE assignment_completions (
  assignment_completion_id INT PRIMARY KEY AUTO_INCREMENT,
  assignment_id INT,
  student_id INT,
  answer TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  given_points INT,
  FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(user_id)
);

CREATE TABLE announcements (
	announcement_id INT PRIMARY KEY AUTO_INCREMENT,
  class_id INT,
  announcer_id INT,
  announcement TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE,
  FOREIGN KEY (announcer_id) REFERENCES users(user_id)
);