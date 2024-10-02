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
CREATE TABLE
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

--операції над множинами

--1. Знайти працівників, які є тільки в відділі DEPTNO = 30, але не в DEPTNO = 20:

SELECT * FROM EMP
EXCEPT
SELECT * FROM EMP WHERE DEPTNO = 20


--2. Об'єднати списки працівників з відділів DEPTNO = 10 та DEPTNO = 30:

SELECT * FROM EMP WHERE DEPTNO = 10
UNION
SELECT * FROM EMP WHERE DEPTNO = 30

   --join 

--3 Знайти працівників з відділів в 'NEW YORK' або в 'BOSTON':

SELECT * FROM DEPARTMENT

--4 Знайти працівників з відділів в CHICAGO та віком старше 24 роки

 --5. Знайти працівників з відділів, крім 'SALES' і перевірити, які з них заробляють понад $2500:

 

--Додаткове завдання *

--6. Запит для отримання відділів, де кількість працівників менше середнього по компанії: 

--(Результат найменування відділу, к-ть працівників)