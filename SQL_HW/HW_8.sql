CREATE TABLE DEPT
(
 DEPTNO   INT PRIMARY KEY
,DNAME VARCHAR(50)
,LOC     VARCHAR(50)
)

INSERT INTO DEPT (DEPTNO, DNAME, LOC)
VALUES (10, 'ACCOUNTING', 'NEW YORK'),
(20, 'RESEARCH', 'DALLAS'),
(30, 'SALES', 'CHICAGO'),
(40, 'OPERATIONS', 'BOSTON')

CREATE TABLE EMP
(
ID INT PRIMARY KEY IDENTITY (1,1) 
 ,EMPNO   INT 
,ENAME VARCHAR(50)
,JOB     VARCHAR(50)
,MGR     VARCHAR(50)
,HIREDATE DATE
,SAL      INT
,COMM     INT
,DEPTNO     INT
,Age INT
 ,Email VARCHAR(30) 
 ,Phone VARCHAR(20) 

 FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)
)

INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL,COMM,DEPTNO,Age,Email,Phone)
VALUES (7369,'SMITH','CLERK',7902,'2020-12-17', 800, NULL, 20,100,'Example1@gmail.com','+380502101112'),
(7499, 'ALLEN', 'SALESMAN', 7698, '2021-02-20', 1600, 300, 30,23,'Example2@gmail.com','+380502101113'),
(7521, 'WARD', 'SALESMAN', 7698, '2021-02-22', 1250, 500, 40,22,'Example3@gmail.com','+380502101114'),
( 7566, 'JONES', 'MANAGER', 7839, '2021-04-02', 2975, NULL, 20,21,'Example4@gmail.com','+380502101115'),
( 7654, 'MARTIN', 'SALESMAN', 7698, '2021-09-28', 1250, 1400, 30,24,'Example5@gmail.com','+380502101116'),
(7698, 'BLAKE', 'MANAGER', 7839, '2021-05-01', 2850, NULL,30,25,'Example6@gmail.com','+380502101117'),
(7782, 'CLARK', 'MANAGER', 7839, '2021-06-09', 2450, NULL, 10,26,'Example7@gmail.com','+380502101118'),
(7788, 'SCOTT', 'ANALYST', 7566, '2022-12-09', 3000, NULL, 20,23,'Example8@gmail.com','+380502101119'),
(7839, 'KING', 'PRESIDENT', NULL, '2021-11-17', 5000, NULL, 10,23,'Example9@gmail.com','+380502101120'),
(7844, 'TURNER', 'SALESMAN', 7698, '2021-09-08', 1500, 0, 30,23,'Example10@gmail.com','+380502101121'),
(7876, 'ADAMS', 'CLERK', 7788, '2023-01-12', 1100, NULL, 40,21,'Example11@gmail.com','+380502101122'),
(7900, 'JAMES', 'CLERK', 7698, '2021-12-03', 950, NULL, 30,25,'Example12@gmail.com','+3805021011123'),
( 7902, 'FORD','ANALYST', 7566, '2021-12-03', 3000, NULL, 20,22,'Example31@gmail.com','+3805021011124'),
( 7934, 'MILLER', 'CLERK', 7782, '2022-01-23', 1300, NULL, 10,24,'Example14@gmail.com','+3805021011125')


--операції над множинами

--1. Знайти працівників, які є тільки в відділі DEPTNO = 30, але не в DEPTNO = 20:
SELECT * FROM EMP WHERE DEPTNO = 30
	EXCEPT
SELECT * FROM EMP WHERE DEPTNO = 20

--2. Об'єднати списки працівників з відділів DEPTNO = 10 та DEPTNO = 30:

SELECT * FROM EMP WHERE DEPTNO = 10
	UNION
SELECT * FROM EMP WHERE DEPTNO = 30

   --join 

--3 Знайти працівників з відділів в 'NEW YORK' або в 'BOSTON':

SELECT * FROM EMP e 
INNER JOIN DEPT d 
	ON e.DEPTNO = d.DEPTNO
	WHERE d.LOC IN ('NEW YORK', 'BOSTON')

--4 Знайти працівників з відділів в CHICAGO та віком старше 24 роки


SELECT * FROM EMP e 
INNER JOIN DEPT d 
	ON e.DEPTNO = d.DEPTNO
	WHERE d.LOC = 'CHICAGO' AND e.AGE >= 24

 --5. Знайти працівників з відділів, крім 'SALES' і перевірити, які з них заробляють понад $2500:

SELECT * FROM EMP e 
INNER JOIN DEPT d 
	ON e.DEPTNO = d.DEPTNO
	WHERE d.DNAME <> 'SALES' AND e.SAL > 2500


--Додаткове завдання *

--6. Запит для отримання відділів, де кількість працівників менше середнього по компанії: 

WITH CTE_Workers_Count_Table AS (
    SELECT count(*) as COUNT_COL FROM EMP e
	INNER JOIN DEPT d ON e.DEPTNO = d.DEPTNO
	GROUP BY d.DNAME
)


SELECT d.DNAME, count(*) as Total_Woekers FROM EMP e
	INNER JOIN DEPT d ON e.DEPTNO = d.DEPTNO
	GROUP BY d.DNAME
	HAVING count(*) <= (SELECT AVG(COUNT_COL) FROM CTE_Workers_Count_Table)


--(Результат найменування відділу, к-ть працівників)

