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
DROP TABLE EMP
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
SELECT * FROM DEPT
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

--1.Основне призначення Оптимізатора MS SQL Server 

-- Создание плананировщика запросов, которий занимается оптимизацией этого запроса.
-- Проверка кода на синтаксические ошибки


--2. Як можна оптимізувати SQL запит?

-- Создать индексы для колонок, которые часто используются в WHERE, Join, ORdrer by i тд.
-- Выбрать в SELECT только те колонки которые нужны.
-- Нормалізація данных, разбить большие таблицы на более мелкие
-- Проиндексировать поля которые используются в Join, не использовать Outer или fullJoin'ы и переписать их на INNER, если можно
-- Избегать большого количества индексов в базе
-- Кэширование
-- Использовать меньше под-запросов
-- Просмотреть Execution Plan, убрать ненужные Join'ы и тд


--3. Що таке stored procedure і які їх переваги?

-- stored procedure - сохранениая(скомпелированая) SQL запросы или другие операции, которая хранится в бд
-- Предназначена для повторного использования логики

-- Преимущества: 
-- Повторные вызовы быстрее т.к код уже хранится в скомпилированом виде.
-- Кэширования планов выполнения
-- Безопасность. Доступ только через процедуру, нету доступа к самим таблицам. Нету передеча рискованых даных в запросы, меньше угрозы SQL иньекций
-- Меньше трафика. Передается запрос на вызов процедуры, а не весь код запроса из внешнего источника.


--4.   Вивести інформацію про найстаршого працівника в компанії (таблиця Emp)

SELECT * FROM EMP
SELECT TOP 1 * FROM EMP e ORDER BY e.AGE DESC
SELECT TOP 1 * FROM EMP e WHERE e.AGE = (SELECT MAX(e.AGE) FROM EMP e)

--5.  Вивести інформацію про всіх працівників, за виключенням працівників офісу з місцезнаходженням 'NEW YORK'

SELECT * FROM EMP e
JOIN DEPT d ON d.DEPTNO = e.DEPTNO
WHERE d.LOC <> 'NEW YORK'

SELECT * FROM EMP e
JOIN DEPT d ON d.DEPTNO = e.DEPTNO

EXCEPT

SELECT * FROM EMP e
JOIN DEPT d ON d.DEPTNO = e.DEPTNO
WHERE d.LOC = 'NEW YORK'

--6.    Використовуючи рекурсивний запит вивести всіх підлеглих менеджера ‘BLAKE’ з таблиці Emp

WITH RecursiveQ
AS
(
	SELECT Empno, MGR AS Parent_ID, ENAME, 0 as Level
	FROM Emp e
	WHERE ENAME = 'BLAKE'

	UNION ALL

	SELECT dep.Empno, dep.MGR as Parent_ID, dep.ENAME, Level + 1 as Level
	FROM Emp dep
	JOIN RecursiveQ rec ON dep.MGR = rec.Empno
)
SELECT Empno, Parent_ID, Ename, [Level]
FROM RecursiveQ

 --7.  Вивести найменування відділу з найвищою середньою заробітною платою (табл. Emp, Dept)

SELECT TOP 1 d.DNAME, AVG(e.SAL) avg_sal FROM EMP e 
JOIN DEPT d ON d.DEPTNO = e.DEPTNO
GROUP BY d.DNAME
ORDER BY avg_sal DESC


SELECT d.DNAME, AVG(e.SAL) avg_sal FROM EMP e 
JOIN DEPT d ON d.DEPTNO = e.DEPTNO
GROUP BY d.DNAME
HAVING AVG(e.SAL) >= 
(
	SELECT MAX(avg_sal_inner) FROM 
	(
		SELECT AVG(e.SAL) avg_sal_inner FROM EMP e 
		JOIN DEPT d ON d.DEPTNO = e.DEPTNO
		GROUP BY d.DNAME
	) as AVG_TABLE
)