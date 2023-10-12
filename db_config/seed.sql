-- Data seeding using MySQL 
SELECT * FROM User
-- Data seeding using MySQL 
SELECT * FROM UserSELECT * FROM technologies_master

INSERT INTO tech_sub_topics_master (tech_topic_id, sub_topic, created_at) 
VALUES 
(1, 'Classes and Objects', NOW()),
(2, 'Arrays and Lists', NOW()),
(3, 'HTML, CSS, and JavaScript', NOW()),
(4, 'SQL Queries', NOW()),
(5, 'Rails and Django', NOW());
SELECT * FROM User

-- Insert Statement for status_master
INSERT INTO status_master (status, is_active)
VALUES ('Not Started', true);
INSERT INTO status_master (status, is_active)
VALUES ('Completed', true);
INSERT INTO status_master (status, is_active)
VALUES ('Done', true);
INSERT INTO status_master (status, is_active)
VALUES ('In Progress', true);SELECT * FROM trainee_trainer_techSELECT * FROM user
INSERT INTO status_master (status, is_active)
VALUES ('Delayed', true);
INSERT INTO status_master (status, is_active)
VALUES ('Upcoming', true);


-- Insert into activities_master table
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) 
VALUES 
(1, 'Creating Classes', 'https://example.com/class', NOW()),
(2, 'Sorting Algorithms', 'https://example.com/sorting', NOW()),
(3, 'Building a Website', 'https://example.com/website', NOW()),
(4, 'Join Operations', 'https://example.com/joins', NOW()),
(5, 'Creating REST APIs', 'https://example.com/apis', NOW());

-- Insert into status_master table
INSERT INTO technologies_master (technology, created_at) VALUES ('Python', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('Java', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('JavaScript', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('C++', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('SQL', NOW());

INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (1, 1, 'Introduction to Programming', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (2, 1, 'Data Types and Variables', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (3, 1, 'Control Structures', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (4, 1, 'Functions and Methods', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (5, 1, 'Arrays and Lists', NOW());

SELECT * FROM Activities_master

INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (1, 1, 'Introduction to Python Variables', 'https://example.com/activity1', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (2, 2, 'Control Structures Practice', 'https://example.com/activity2', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (3, 3, 'Functions and Methods Exercise', 'https://example.com/activity3', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (4, 4, 'Arrays and Lists Challenges', 'https://example.com/activity4', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (5, 5, 'SQL Query Building Workshop', 'https://example.com/activity5', NOW());


INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES (1, 'Introduction to Variables in Python', 'https://example.com/activity1', NOW());
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES (1, 'Variable Declarations and Assignments', 'https://example.com/activity2', NOW());

-- For sub_topic_id = 2
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES ( 2, 'Understanding Conditional Statements', 'https://example.com/activity3', NOW());
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES ( 2, 'If-Else Statements Practice', 'https://example.com/activity4', NOW());

-- For sub_topic_id = 3
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES (3, 'Looping in Python', 'https://example.com/activity5', NOW());

INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (1, 100, true, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (2, 200, true, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (3, 300, false, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (4, 400, true, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (5, 500, false, NOW());



INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(1, 1, false, 'Comment 1 by User 1 on Training Plan 1.', 1, '2023-10-11 12:10:40.956', NULL);

INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(2, 3, false, 'Comment 2 by User 3 on Training Plan 2.', 2, '2023-10-11 12:10:40.956', NULL);


INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(3, 5, false, 'Comment 3 by User 5 on Training Plan 3.', 3, '2023-10-11 12:10:40.956', NULL);


INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(4, 2, false, 'Comment 4 by User 2 on Training Plan 1.', 1, '2023-10-11 12:10:40.956', NULL);

INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(5, 4, false, 'Comment 5 by User 4 on Training Plan 2.', 2, '2023-10-11 12:10:40.956', NULL);




INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (1, 'Introduction to JavaScript', 'A comprehensive introduction to the JavaScript programming language.', 'http://example.com/intro-to-js');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (2, 'Web Development Basics', 'Learn the fundamentals of web development, including HTML and CSS.', 'http://example.com/web-dev-basics');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (3, 'Building a Portfolio Website', 'Create your own portfolio website from scratch.', 'http://example.com/portfolio-website');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (4, 'JavaScript Frameworks', 'Explore popular JavaScript frameworks like React and Angular.', 'http://example.com/js-frameworks');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (5, 'Database Design and SQL', 'Learn about database design and SQL for web development.', 'http://example.com/database-design');

INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (1, 1, 'Introduction to Programming', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (2, 1, 'Data Types and Variables', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (3, 1, 'Control Structures', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (4, 1, 'Functions and Methods', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (5, 1, 'Arrays and Lists', NOW());

INSERT INTO tech_sub_topics_master (tech_topic_id, sub_topic, created_at)
VALUES
  ( 10, 'Python Variables and Data Types', CURRENT_TIMESTAMP),
  ( 10, 'Python Conditional Statements and Loops', CURRENT_TIMESTAMP),
  ( 10, 'Python Functions and Modules', CURRENT_TIMESTAMP),
  ( 11, 'Java Variables and Data Types', CURRENT_TIMESTAMP),
  ( 11, 'Java Classes and Objects', CURRENT_TIMESTAMP),
  ( 11, 'Java Inheritance and Polymorphism', CURRENT_TIMESTAMP),
  ( 12, 'JavaScript Variables and Data Types', CURRENT_TIMESTAMP),
  ( 12, 'JavaScript Functions and Objects', CURRENT_TIMESTAMP),
  ( 12, 'JavaScript DOM Manipulation', CURRENT_TIMESTAMP),
  ( 13, 'C++ Variables and Data Types', CURRENT_TIMESTAMP),
  ( 13, 'C++ Pointers and References', CURRENT_TIMESTAMP),
  ( 14, 'C# Variables and Data Types', CURRENT_TIMESTAMP),
  ( 14, 'C# Classes and Objects', CURRENT_TIMESTAMP),
  ( 14, 'C# Generics', CURRENT_TIMESTAMP),
  ( 15, 'Go Variables and Data Types', CURRENT_TIMESTAMP),
  ( 15, 'Go Functions and Methods', CURRENT_TIMESTAMP),
  ( 15, 'Go Concurrency', CURRENT_TIMESTAMP)
INSERT INTO tech_sub_topics_master (tech_topic_id, sub_topic, created_at) 
VALUES 
(1, 'Classes and Objects', NOW()),
(2, 'Arrays and Lists', NOW()),
(3, 'HTML, CSS, and JavaScript', NOW()),
(4, 'SQL Queries', NOW()),
(5, 'Rails and Django', NOW());
SELECT * FROM User

-- Insert Statement for status_master
INSERT INTO status_master (status, is_active)
VALUES ('Not Started', true);
INSERT INTO status_master (status, is_active)
VALUES ('Completed', true);
INSERT INTO status_master (status, is_active)
VALUES ('Done', true);
INSERT INTO status_master (status, is_active)
VALUES ('In Progress', true);
INSERT INTO status_master (status, is_active)
VALUES ('Delayed', true);
INSERT INTO status_master (status, is_active)
VALUES ('Upcoming', true);


-- Insert into activities_master table
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) 
VALUES 
(1, 'Creating Classes', 'https://example.com/class', NOW()),
(2, 'Sorting Algorithms', 'https://example.com/sorting', NOW()),
(3, 'Building a Website', 'https://example.com/website', NOW()),
(4, 'Join Operations', 'https://example.com/joins', NOW()),
(5, 'Creating REST APIs', 'https://example.com/apis', NOW());

-- Insert into status_master table
INSERT INTO technologies_master (technology, created_at) VALUES ('Python', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('Java', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('JavaScript', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('C++', NOW());
INSERT INTO technologies_master (technology, created_at) VALUES ('SQL', NOW());

INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (1, 1, 'Introduction to Programming', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (2, 1, 'Data Types and Variables', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (3, 1, 'Control Structures', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (4, 1, 'Functions and Methods', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (5, 1, 'Arrays and Lists', NOW());

SELECT * FROM Activities_master

INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (1, 1, 'Introduction to Python Variables', 'https://example.com/activity1', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (2, 2, 'Control Structures Practice', 'https://example.com/activity2', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (3, 3, 'Functions and Methods Exercise', 'https://example.com/activity3', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (4, 4, 'Arrays and Lists Challenges', 'https://example.com/activity4', NOW());
INSERT INTO activities_master (activity_id, sub_topic_id, activity, resource_link, created_at) VALUES (5, 5, 'SQL Query Building Workshop', 'https://example.com/activity5', NOW());


INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES (1, 'Introduction to Variables in Python', 'https://example.com/activity1', NOW());
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES (1, 'Variable Declarations and Assignments', 'https://example.com/activity2', NOW());

-- For sub_topic_id = 2
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES ( 2, 'Understanding Conditional Statements', 'https://example.com/activity3', NOW());
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES ( 2, 'If-Else Statements Practice', 'https://example.com/activity4', NOW());

-- For sub_topic_id = 3
INSERT INTO activities_master (sub_topic_id, activity, resource_link, created_at) VALUES (3, 'Looping in Python', 'https://example.com/activity5', NOW());

INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (1, 100, true, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (2, 200, true, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (3, 300, false, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (4, 400, true, NOW());
INSERT INTO status_master (status_id, status, is_active, created_at) VALUES (5, 500, false, NOW());



INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(1, 1, false, 'Comment 1 by User 1 on Training Plan 1.', 1, '2023-10-11 12:10:40.956', NULL);

INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(2, 3, false, 'Comment 2 by User 3 on Training Plan 2.', 2, '2023-10-11 12:10:40.956', NULL);


INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(3, 5, false, 'Comment 3 by User 5 on Training Plan 3.', 3, '2023-10-11 12:10:40.956', NULL);


INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(4, 2, false, 'Comment 4 by User 2 on Training Plan 1.', 1, '2023-10-11 12:10:40.956', NULL);

INSERT INTO comments (comment_id, user_id, is_resolved, comment, training_plan_id, created_at, resolved_on)
VALUES 
(5, 4, false, 'Comment 5 by User 4 on Training Plan 2.', 2, '2023-10-11 12:10:40.956', NULL);




INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (1, 'Introduction to JavaScript', 'A comprehensive introduction to the JavaScript programming language.', 'http://example.com/intro-to-js');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (2, 'Web Development Basics', 'Learn the fundamentals of web development, including HTML and CSS.', 'http://example.com/web-dev-basics');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (3, 'Building a Portfolio Website', 'Create your own portfolio website from scratch.', 'http://example.com/portfolio-website');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (4, 'JavaScript Frameworks', 'Explore popular JavaScript frameworks like React and Angular.', 'http://example.com/js-frameworks');

INSERT INTO activities_master (sub_topic_id, activity, description, resource_link)
VALUES (5, 'Database Design and SQL', 'Learn about database design and SQL for web development.', 'http://example.com/database-design');

INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (1, 1, 'Introduction to Programming', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (2, 1, 'Data Types and Variables', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (3, 1, 'Control Structures', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (4, 1, 'Functions and Methods', NOW());
INSERT INTO tech_topics_master (tech_topic_id, tech_id, topic, created_at) VALUES (5, 1, 'Arrays and Lists', NOW());

INSERT INTO tech_sub_topics_master (tech_topic_id, sub_topic, created_at)
VALUES
  ( 10, 'Python Variables and Data Types', CURRENT_TIMESTAMP),
  ( 10, 'Python Conditional Statements and Loops', CURRENT_TIMESTAMP),
  ( 10, 'Python Functions and Modules', CURRENT_TIMESTAMP),
  ( 11, 'Java Variables and Data Types', CURRENT_TIMESTAMP),
  ( 11, 'Java Classes and Objects', CURRENT_TIMESTAMP),
  ( 11, 'Java Inheritance and Polymorphism', CURRENT_TIMESTAMP),
  ( 12, 'JavaScript Variables and Data Types', CURRENT_TIMESTAMP),
  ( 12, 'JavaScript Functions and Objects', CURRENT_TIMESTAMP),
  ( 12, 'JavaScript DOM Manipulation', CURRENT_TIMESTAMP),
  ( 13, 'C++ Variables and Data Types', CURRENT_TIMESTAMP),
  ( 13, 'C++ Pointers and References', CURRENT_TIMESTAMP),
  ( 14, 'C# Variables and Data Types', CURRENT_TIMESTAMP),
  ( 14, 'C# Classes and Objects', CURRENT_TIMESTAMP),
  ( 14, 'C# Generics', CURRENT_TIMESTAMP),
  ( 15, 'Go Variables and Data Types', CURRENT_TIMESTAMP),
  ( 15, 'Go Functions and Methods', CURRENT_TIMESTAMP),
  ( 15, 'Go Concurrency', CURRENT_TIMESTAMP)

