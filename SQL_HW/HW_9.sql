/* таблиця студентів */
create table student
( sno integer,
 sname varchar(10),
 age INTEGER
) /* таблиця предметів */
create table courses
( cno varchar(5),
 title varchar(10),
 credits integer
) /* таблиця студентів та предметів, які вони вивчають */
create table take
( sno integer,
 cno varchar(5) 
) insert into student values (1,'AARON',20)
insert into student values (2,'CHUCK',21)
insert into student values (3,'DOUG',20)
insert into student values (4,'MAGGIE',19)
insert into student values (5,'STEVE',22)
insert into student values (6,'JING',18)
insert into student values (7,'BRIAN',21)
insert into student values (8,'KAY',20)
insert into student values (9,'GILLIAN',20)
insert into student values (10,'CHAD',21)
insert into student values (11,'CHUCK',23)
insert into student values (12,'CHUCK2',23)
insert into student values (13,'CHUCK3',23)

insert into courses values ('CS112','PHYSICS', 4)
insert into courses values ('CS113','CALCULUS', 1)
insert into courses values ('CS114','HISTORY', 1) 
insert into courses values ('CS119','HISTORY', 1) 
insert into courses values ('CS120','HISTORY2', 1) 
insert into take values (1,'CS112')
insert into take values (1,'CS113')
insert into take values (1,'CS114')
insert into take values (1,'CS119')
insert into take values (1,'CS120')
insert into take values (2,'CS112')
insert into take values (3,'CS112')
insert into take values (3,'CS114')
insert into take values (4,'CS112')
insert into take values (4,'CS113')
insert into take values (5,'CS113')
insert into take values (6,'CS113')
insert into take values (6,'CS114') 
insert into take values (11,'CS114') 
insert into take values (12,'CS114') 
insert into take values (13,'CS114') 
insert into take values (13,'CS120') 
SELECT * FROM student
SELECT * FROM courses
SELECT * FROM take

--Завдання 1: Знайти курси, які ніхто не відвідує 

SELECT * FROM courses c LEFT JOIN take t ON c.cno = t.cno where t.cno is NULL
SELECT * FROM courses c where NOT EXISTS (SELECT * FROM take where c.cno = cno)

--Завдання 2: Вивести імена студентів та назви курсів, які вони відвідують

SELECT c.title, s.sname FROM courses c 
INNER JOIN take t ON c.cno = t.cno
INNER JOIN student s ON t.sno = s.sno

--Завдання 3: Знайти імена студентів, які відвідують усі доступні курси

SELECT s.sname, count(*) as coursesCount FROM student s 
INNER JOIN take t ON s.sno = t.sno
INNER JOIN courses c ON c.cno = t.cno
GROUP BY s.sno, s.sname
HAVING count(*) = (SELECT count(*) FROM courses)

--Завдання 4: Вивести середню кількість заліків (credits) за курсом, який відвідують студенти віком 21 рік і старше

SELECT c.title, AVG(c.credits) FROM courses c 
INNER JOIN take t ON c.cno = t.cno
INNER JOIN student s ON t.sno = s.sno
WHERE s.age >=21
GROUP BY c.title 

--Завдання 5: Вивести імена студентів і назви курсів, які вони відвідують, якщо заліків цих курсів більше 3

SELECT s.sname, c.title FROM student s 
INNER JOIN take t ON s.sno = t.sno
INNER JOIN courses c ON t.cno = c.cno
WHERE c.credits > 3

--Додаткове **Завдання 6: Знайти студентів, які відвідують більше курсів, ніж середнє значення для всіх студентів

SELECT s.sname, count(*) as courses_count FROM student s 
INNER JOIN take t ON s.sno = t.sno
GROUP BY s.sname
HAVING count(*) >
(
	SELECT AVG(course_count) from (
		SELECT count(*) as course_count FROM student s 
		INNER JOIN take t ON s.sno = t.sno
		INNER JOIN courses c ON t.cno = c.cno
		GROUP BY s.sname
		) as total_average_courses
)
