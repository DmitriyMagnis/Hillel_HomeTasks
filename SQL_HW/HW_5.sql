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

--1. за допомогою агрегатної функції визначте кількість записів у таблиці EMP

SELECT COUNT(*) as Row_Count FROM EMP

--2 за допомогою агрегатної функції визначте кількість Comm у таблиці EMP

SELECT COUNT(ISNULL(COMM, 0)) as Comm_Count FROM EMP
SELECT COUNT(COALESCE(COMM, 0)) as Comm_Count FROM EMP


--3 за допомогою агрегатної функції визначте загальну суму заробітних плат в таблиці EMP

SELECT SUM(SAL) as Total_Sal_Sum FROM EMP

--4 за допомогою агрегатної функції визначте суму заробітних плат по відділах в таблиці EMP

SELECT SUM(SAL) as Total_Sal_Sum, DEPTNO  FROM EMP 
GROUP BY DEPTNO

--5 за допомогою агрегатної функції визначте найменшу та найбільшу заробітну плату із таблиці Emp

SELECT MIN(SAL) as Min_SAL, MAX(SAL) as Max_SAL FROM EMP

-- Получение всех записей с минимальной и максимальной зарплатой, с отображением таблица EMP

SELECT * FROM EMP 
WHERE SAL = (SELECT MIN(SAL) FROM EMP) OR SAL = (SELECT MAX(SAL) FROM EMP)
ORDER BY DEPTNO

--6  визначте середню заробітну плату працівників 10-го відділу

SELECT AVG(SAL) FROM EMP WHERE DEPTNO = 10

--7 -- визначте суму заробітних плат по відділах в таблиці EMP та вивести загальну суму заробітних плат

SELECT SUM(SAL), DEPTNO FROM EMP GROUP BY ROLLUP(DEPTNO)
