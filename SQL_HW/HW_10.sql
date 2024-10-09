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

--Завдання 1: Знайти студентів, які не відвідують курс 'CALCULUS'

SELECT * FROM student s
LEFT JOIN take t ON t.sno = s.sno
LEFT JOIN courses c ON t.cno = c.cno
WHERE c.title NOT IN ('CALCULUS') OR c.title IS NULL


--Завдання 2: Завдання 2: Вивести курси, кількість credits яких дорівнює  середньому значенню credits всіх курсів

SELECT * FROM courses c 
WHERE c.credits = (SELECT AVG(c2.credits) FROM courses c2)

--Завдання 3: Оновити вік студентів, які відвідують курс 'PHYSICS', додавши до їх віку 1 рік

UPDATE student
SET AGE = AGE + 1
WHERE EXISTS (
  SELECT t.sno 
  FROM take t
  JOIN courses c ON t.cno = c.cno
  WHERE student.sno = t.sno AND c.title = 'PHYSICS'
)
SELECT * FROM student s

--Завдання 4: Вивести імена студентів та курси, які вони відвідують, впорядковані за назвою курсу

SELECT s.sname, c.title FROM student s
JOIN take t ON t.sno = s.sno
JOIN courses c ON t.cno = c.cno
ORDER BY c.title ASC

--Завдання 5 ** За допомогою рекурсії, створити запит, який вибере такі даніт (дата в другому стовпчику поточнаЮ а рік такий як на прикладі)  

WITH Rec (dy, yr) AS 
(
 SELECT dy, year(dy)+10 as yr FROM (SELECT GETDATE() dy) tmp
 UNION ALL
 SELECT DATEADD(YEAR, 1, dy), yr
 FROM Rec
 WHERE year(DATEADD(YEAR, 1, dy)) <= yr
)

SELECT ROW_NUMBER() OVER(ORDER BY Rec.dy ASC) as ID, datename(YY, Rec.dy) as day_of_year, cast(Rec.dy AS date) as dat
FROM Rec option (maxrecursion 400)
