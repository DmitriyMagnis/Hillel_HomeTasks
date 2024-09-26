--7.РОБОТА З ДАТОЮ , ЧАСОМ ТА РЯДКАМИ
--Використання функцій для роботи з датою та часом.
--Маніпулювання рядками за допомогою різних функцій




--упорядкувати результат по частині рядка
--SUBSTRING(string, start, length)

 select ename,substring(ename,len(ename)-1,2)
 ,len(ename)
 from emp
 order by substring(ename,len(ename)-1,2)




 ---Приклади різних запитів

 --виберемо працівників з найменшою та найбільшою заробітною платою

 select ename
 from (
 select ename, sal,
 min(sal)over() min_sal,
 max(sal)over() max_sal
from emp
 ) x
where sal in (min_sal,max_sal)


---приклади роботи віконних функцій

SELECT Sal, ROW_Number() OVER(ORDER BY sal) AS sal_rn
FROM EMP


 select rank() over(order by sal) rnk, sal
 from emp


 select dense_rank() over(order by sal) rnk, sal
 from emp


 --вибрати різні посади без дублювання з таблиці Emp

 --1

 SELECT DISTINCT job FROM Emp

 --2

 select job
 from (
 select job,
 row_number()over(partition by job order by job) rn
 from emp
 ) x
 where rn = 1


 --3
 select job
 from emp
 group by job


 --розвернення резултатів
 --приклад 1

 SELECT Deptno, count(*) AS count_empl
 FROM  EMP 
 GROUP BY Deptno

 SELECT
	 SUM(CASE
		 WHEN deptno = 10 THEN 1
		 ELSE 0
	 END) AS deptno_10
	,SUM(CASE
		 WHEN deptno = 20 THEN 1
		 ELSE 0
	 END) AS deptno_20
	,SUM(CASE
		 WHEN deptno = 30 THEN 1
		 ELSE 0
	 END) AS deptno_30
	,SUM(CASE
		 WHEN deptno = 40 THEN 1
		 ELSE 0
	 END) AS deptno_40
 FROM
	 emp

--пояснення 

select deptno,
 case when deptno=10 then 1 else 0 end as deptno_10,
 case when deptno=20 then 1 else 0 end as deptno_20,
 case when deptno=30 then 1 else 0 end as deptno_30
 from emp
 order by 1


 select deptno,
 sum(case when deptno=10 then 1 else 0 end) as deptno_10,
 sum(case when deptno=20 then 1 else 0 end) as deptno_20,
 sum(case when deptno=30 then 1 else 0 end) as deptno_30,
 sum(case when deptno=40 then 1 else 0 end) as deptno_40
 from emp
 group by deptno

 --вар 2

 select max(case when deptno=10 then empcount else null end) as deptno_10,
 max(case when deptno=20 then empcount else null end) as deptno_20,
 max(case when deptno=30 then empcount else null end) as deptno_30
 from (
select deptno, count(*) as empcount
 from emp
 group by deptno
 ) x
 




 --Приклад 2

 SELECT JOB, ENAME
 FROM EMP

 --представми кожну посаду окремим стовпчиком

-- Техніка, що застосовувалася у попередньому прикладі, тут не підходить, бо забезпечить повернення 
-- MAX(ENAME) для кожного JOB, тобто одного ENAME для кожного JOB 
-- (тобто ми отримаємо один рядок, як у першому прикладі).
--Щоб вирішити поставлене завдання, необхідно зробити кожне поєднання JOB/ENAME унікальним. 
--Тоді при використанні агрегатної функції для видалення значень NULL не буде втрачено жодне значення ENAME.


--а) за допомогою функції ROW_NUMBER OVER зробимо кожну комбінацію JOB/ENAME уникальным:

select job,
 ename,
 row_number()over(partition by job order by ename) rn
 FROM emp

-- Метою є забезпечення можливості груповання за номером рядка (за стовпцем RN) без винятку
--службовців з результуючої множини через застосування функції
--MAX. Цей крок – найважливіший у вирішенні поставленого завдання.
--Якщо не виконати цей перший крок, зовнішній запит в результаті агрегації видалить потрібні рядки

--ось варіант (ПОМИЛКОВИЙ) , якщо примінити техніку, як у першому прикладі

select max(case when job='CLERK'
 then ename else null end) as clerks,
 max(case when job='ANALYST'
 then ename else null end) as analysts,
 max(case when job='MANAGER'
 then ename else null end) as mgrs,
 max(case when job='PRESIDENT'
 then ename else null end) as prez,
 max(case when job='SALESMAN'
 then ename else null end) as sales
 from emp


 --б) Наступний крок – використати CASE для розподілу значень ENAME по відповідним стовпчикам (JOB):
 SELECT
	 rn
	,CASE
		 WHEN job = 'CLERK' THEN ename
		 ELSE NULL
	 END AS clerks
	,CASE
		 WHEN job = 'ANALYST' THEN ename
		 ELSE NULL
	 END AS analysts
	,CASE
		 WHEN job = 'MANAGER' THEN ename
		 ELSE NULL
	 END AS mgrs
	,CASE
		 WHEN job = 'PRESIDENT' THEN ename
		 ELSE NULL
	 END AS prez
	,CASE
		 WHEN job = 'SALESMAN' THEN ename
		 ELSE NULL
	 END AS sales
 FROM
	 (SELECT job, ename, ROW_NUMBER() OVER (PARTITION BY job ORDER BY ename) rn FROM emp) x

--На даний момент рядки транспоновані в стовпці, залишилося лише
--видалити значення NULL, щоб зробити дані зручні для  сприйняття. Видаляємо значення NULL за допомогою 
--агрегатної функції MAX і групуємо результати по RN. (Можна використати і MIN)
--Комбінаці значень RN/JOB/ENAME унікальні. груповання по RN гарантує, що кожен виклик MAX 
--забезпечить вибір єдиного імені з групи, решта яких є значеннями NULL


 SELECT
	 MAX(CASE
		 WHEN job = 'CLERK' THEN ename
		 ELSE NULL
	 END) AS clerks
	,MAX(CASE
		 WHEN job = 'ANALYST' THEN ename
		 ELSE NULL
	 END) AS analysts
	,MAX(CASE
		 WHEN job = 'MANAGER' THEN ename
		 ELSE NULL
	 END) AS mgrs
	,MAX(CASE
		 WHEN job = 'PRESIDENT' THEN ename
		 ELSE NULL
	 END) AS prez
	,MAX(CASE
		 WHEN job = 'SALESMAN' THEN ename
		 ELSE NULL
	 END) AS sales
 FROM
	 (SELECT job, ename, ROW_NUMBER() OVER (PARTITION BY job ORDER BY ename) rn FROM emp) x
 GROUP BY
	 rn





 --ПРИКЛАД 3
-- Під час формування звіту висунуто вимогу про те, що дублюючі
--Значення в стовпці повинні відображатися лише один раз. Наприклад з таблиці EMP потрібно 
--отримати значення DEPTNO і ENAME,
--при цьому необхідно згрупувати всі рядки для кожного
--значення DEPTNO та виводити кожне значення DEPTNO тільки один раз.


SELECT
	CASE
		WHEN empno = min_empno THEN deptno
		ELSE NULL
	END deptno
   ,ename
FROM
	(SELECT deptno, MIN(empno) OVER (PARTITION BY deptno) min_empno, empno, ename FROM emp) x


---ПРИКЛАД 4
--створити горизональні гістограми 

SELECT
	deptno
   ,REPLICATE('*', COUNT(*)) cnt
FROM
	emp
GROUP BY
	deptno


--ПРИКЛАД 4 ROLLUP
 SELECT
	 COALESCE(job, 'TOTAL') job
	,SUM(sal) sal
 FROM
	 emp
 GROUP BY
	 job WITH ROLLUP


--маркування з використанням CASE

SELECT
	ename
   ,CASE
		WHEN job = 'CLERK' THEN 1
		ELSE 0
	END AS is_clerk
   ,CASE
		WHEN job = 'SALESMAN' THEN 1
		ELSE 0
	END AS is_sales
   ,CASE
		WHEN job = 'MANAGER' THEN 1
		ELSE 0
	END AS is_mgr
   ,CASE
		WHEN job = 'ANALYST' THEN 1
		ELSE 0
	END AS is_analyst
   ,CASE
		WHEN job = 'PRESIDENT' THEN 1
		ELSE 0
	END AS is_prez
FROM
	emp
ORDER BY
	2, 3, 4, 5, 6





---------------------------------------
--(Transaction Control Language – TCL); 
---команди управління транзакціями 
---------------------------------

--COMMIT: затвердження усіх змін, внесених в рамках поточної транзакції.
--ROLLBACK: скасування усіх змін, внесених з моменту останнього COMMIT.
--SAVEPOINT: встановлення точки збереження усередині транзакції, до якої можна відкотити зміни.


CREATE TABLE DEPT
(
 DEPTNO   INT
,DNAME VARCHAR(50)
,LOC     VARCHAR(50)
)INSERT INTO DEPT (DEPTNO, DNAME, LOC)VALUES (10, 'ACCOUNTING', 'NEW YORK'),(20, 'RESEARCH', 'DALLAS'),(30, 'SALES', 'CHICAGO'),(40, 'OPERATIONS', 'BOSTON')UPDATE DEPTSET LOC = 'DALLAS'WHERE DEPTNO = 10SELECT       DEPTNOFROM    DEPTWHERE     DEPTNO = 10DELETE     FROM 	    DEPT----1 SELECT * FROM DEPTBEGIN TRANSACTIONDELETE    FROM DEPT WHERE    DEPTNO = 10COMMITROLLBACKSELECT * FROM DEPT BEGIN TRANSACTIONDELETE    FROM DEPT WHERE    DEPTNO = 20 -- this will create a savepoint after the first DELETE SAVE TRANSACTION FirstDeleteDELETE    FROM DEPT WHERE    DEPTNO = 30ROLLBACK TRANSACTION FirstDeleteCOMMITSELECT *      FROM DEPT



----НАСТУПНЕ ЗАНЯТТЯ
---9. Способи з'єднання таблиць та операції над множинами
--Використання типів з'єднань (JOIN) та операцій над множинами даних для отримання
---потрібної інформації з бази


CREATE TRIGGER EmployeeAudit
ON Employees
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO EmployeeAuditLogs (EmployeeID, AuditAction, AuditTimestamp)
    SELECT i.EmployeeID, 'New Employee Added', GETDATE()
    FROM inserted i;
END;
GO


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




CREATE TABLE EMP_info
(
  EMPNO INT
  ,AuditAction VARCHAR(50)
  ,AuditTimestamp DATETIME
  )



CREATE TRIGGER EmpAudit
ON Emp
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO EMP_info (EMPNO, AuditAction, AuditTimestamp)
    SELECT i.EMPNO, 'New Employee Added', GETDATE()
    FROM inserted i;
END;

INSERT INTO EMP (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL,COMM,DEPTNO,Age,Email,Phone)
VALUES (1000,'SMITH77','CLERK',7902,'2023-12-17', 800, NULL, 20,100,'Example1@gmail.com','+380503101112')


select * from EMP_info