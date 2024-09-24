--Створення таблиці

CREATE TABLE EMP
(
 EMPNO   INT PRIMARY KEY (EMPNO),
 ENAME VARCHAR(50),
 JOB     VARCHAR(50),
 MGR     VARCHAR(50),
 HIREDATE DATE,
 SAL      DECIMAL(16,2),
 COMM     INT,
 DEPTNO     INT
)

--Додавання данних до таблиці


INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL,COMM,DEPTNO)
VALUES (7369,'SMITH','CLERK',7902,'1980-12-17', 800, NULL, 20),
(7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600, 300, 30),
(7521, 'WARD', 'SALESMAN', 7698, '1981-02-22', 1250, 500, 30),
( 7566, 'JONES', 'MANAGER', 7839, '1981-04-02', 2975, NULL, 20),
( 7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250, 1400, 30),
(7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01', 2850, NULL,30),
(7782, 'CLARK', 'MANAGER', 7839, '1981-06-09', 2450, NULL, 10),
(7788, 'SCOTT', 'ANALYST', 7566, '1982-12-09', 3000, NULL, 20),
(7839, 'KING', 'PRESIDENT', NULL, '1981-11-17', 5000, NULL, 10),
(7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08', 1500, 0, 30),
(7876, 'ADAMS', 'CLERK', 7788, '1983-01-12', 1100, NULL, 20),
(7900, 'JAMES', 'CLERK', 7698, '1981-12-03', 950, NULL, 30),
( 7902, 'FORD','ANALYST', 7566, '1981-12-03', 3000, NULL, 20),
( 7934, 'MILLER', 'CLERK', 7782, '1982-01-23', 1300, NULL, 10)

--1. за допомогою функції роботи з датами додати один день до поточної дати

SELECT DATEADD(DAY, 1, GETDATE()) C_Date

--2 за допомогою функції роботи з датами визначте кількість різницю дат в годинах 01.09.2024 та 05.09.2024

SELECT DATEDIFF(HOUR, '01.09.2024', '05.09.2024') H_Diff

--3 за допомогою функції роботи з датами  в таблиці EMP додайте 1 рік до дати HIREDATE і виведіть результат

SELECT *, DATEADD(YEAR, 1, HIREDATE) Offset_Date FROM EMP

--4 за допомогою функції роботи з датами отримайте назву місяця прийома на роботу (HIREDATE) в таблиці EMP

SELECT HIREDATE, DATENAME(MONTH, HIREDATE) Month_Name FROM EMP
SELECT HIREDATE, CONCAT(YEAR(HIREDATE), ' - ', DATENAME(MONTH, HIREDATE), ' - ', DAY(HIREDATE)) Month_Name FROM EMP

--5 використовуючи функції для роботи з рядками, визначити довжину атрибута ENAME таблиці EMP та вивести всі атрибути + новий атрибут Ename_size 

SELECT *, LEN(ENAME) Ename_size FROM EMP

--6  використовуючи функції для роботи з рядками, вивести всі атрибути + новий атрибут job_minus_A,  у якому з назви job , видалити всі букви 'A' для кожного працівника в таблиці EMP 

SELECT *, REPLACE(JOB, 'A', '') Without_A FROM EMP

--7 Використовуючи функції для роботи з рядками, вивести найбільшу та найменшу кількість символів ENAME  з таблиці EMP

SELECT MIN(LEN(ENAME)) [MIN], MAX(LEN(ENAME)) [MAX] FROM EMP

--8. Використовуючи функції для роботи з рядками, вивести перші дві літери ENAME таблиці EMP

SELECT *, LEFT(ENAME, 2) First_Letters FROM EMP
SELECT *, SUBSTRING(ENAME, 0, 3) First_Letters FROM EMP