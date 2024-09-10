--Створення таблиці

CREATE TABLE DEPARTMENT
(
  DEP_ID	INT PRIMARY KEY (DEP_ID),
  DEP_NAME	VARCHAR(50)
)

CREATE TABLE EMP
(
 EMPNO    INT IDENTITY(1, 1) PRIMARY KEY (EMPNO),
 ENAME	  VARCHAR(50) NOT NULL,
 JOB      VARCHAR(50) NOT NULL,
 MGR      VARCHAR(50) NOT NULL,
 HIREDATE DATE DEFAULT GETDATE(),
 SAL      DECIMAL(16,2) DEFAULT 0,
 COMM     INT,
 DEPTNO   INT,
 CONSTRAINT FK_EMP_TO_DEPARTMENT FOREIGN KEY (DEPTNO) REFERENCES DEPARTMENT (DEP_ID)
)

INSERT INTO dbo.DEPARTMENT (DEP_ID, DEP_NAME)
VALUES (10, 'Manager'), 
	   (20, 'Saler')

SELECT * FROM dbo.DEPARTMENT

INSERT INTO dbo.EMP (ENAME, JOB, MGR, HIREDATE, SAL,COMM, DEPTNO)
VALUES ('SMITH','CLERK',7902,'1980-12-17', 800, NULL, 10),
('ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600, 300, 20),
('WARD', 'SALESMAN', 7698, '1981-02-22', 1250, 500, 20),
('JONES', 'MANAGER', 7839, '1981-04-02', 2975, NULL, 20),
('MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250, 1400, 10),
('BLAKE', 'MANAGER', 7839, '1981-05-01', 2850, NULL,10),
('CLARK', 'MANAGER', 7839, '1981-06-09', 2450, NULL, 10),
('SCOTT', 'ANALYST', 7566, '1982-12-09', 3000, NULL, 20),
('KING', 'PRESIDENT', 7566, '1981-11-17', 5000, NULL, 10),
('TURNER', 'SALESMAN', 7698, '1981-09-08', 1500, 0, 20),
('ADAMS', 'CLERK', 7788, '1983-01-12', 1100, NULL, 10),
('JAMES', 'CLERK', 7698, '1981-12-03', 950, NULL, 10),
('FORD','ANALYST', 7566, '1981-12-03', 3000, NULL, 20),
('MILLER', 'CLERK', 7782, '1982-01-23', 1300, NULL, 10)

--1.змінити тип даних в таблиці EMP атрибут ENAME з VARCHAR(50) на VARCHAR(100)

ALTER TABLE dbo.EMP 
ALTER COLUMN ENAME VARCHAR(100)

--Для перевірки:
exec sp_help 'EMP' -- Показує таблицю з властивостями заданої таблиці(наприклад типи стовпчиків)

--2.видалити всіх працівників 10-го відділу з таблиці EMP

DELETE FROM dbo.EMP 
WHERE DEPTNO = 10

--3.додати 3 нових працівника до таблиці EMP (довільні значення атрибутів)

INSERT INTO dbo.EMP (ENAME, JOB, MGR)
VALUES ('SMITH','CLERK',7902),
('ALLEN', 'SALESMAN', 7698),
('MARTIN', 'SALESMAN', 7698)

--4.виправити значення прізвища 'MARTIN' на 'MARTINENKO'

UPDATE dbo.EMP 
SET ENAME = 'MARTINENKO'
WHERE ENAME = 'MARTIN'

--5. додати атрибут Age в таблицю EMP 

ALTER TABLE EMP
ADD AGE INT NULL

--6. Для всіх працівників відділу 10(DEPTNO) значення Age оновити на 25

UPDATE dbo.EMP 
SET AGE = 25
WHERE DEPTNO = 10

--7. Вибрати працівників, заробітна плата(SAL), яких знаходиться в діапазоні 2000-3000 (включно)

SELECT * FROM EMP
WHERE SAL >= 2000 AND SAL <= 3000

SELECT * FROM dbo.EMP
WHERE SAL BETWEEN 2000 AND 3000

--8. Вибрати працівників, прізвище яких CLARK та JAMES

SELECT * FROM dbo.EMP
WHERE ENAME = 'CLARK' OR ENAME = 'JAMES'

SELECT * FROM dbo.EMP
WHERE ENAME LIKE 'CLARK' OR ENAME LIKE 'JAMES'

--9. Створити таблицю Students  Mark значення за замовчуванням = 0

--ID (primary key) автоинкремент

--First_Name

--Last_Name

--Mark

CREATE TABLE STUDENTS
(
	ST_ID INT IDENTITY(1, 1) PRIMARY KEY (ST_ID),
	ST_MARK INT DEFAULT 0,
	ST_FIRST_NAME VARCHAR(50) NOT NULL,
	ST_LAST_NAME VARCHAR(50) NOT NULL
)

--10.видалити таблицю таблицю Students

DROP TABLE dbo.STUDENTS


SELECT * FROM dbo.EMP