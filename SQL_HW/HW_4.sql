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

--1. Вибрати всі запити із таблиці EMP(таблиця з заняття 1)

--у яких значення атрибута COMM NULL чи має якесь значення відмінне від NULL

SELECT * FROM dbo.EMP WHERE COMM is NULL
SELECT * FROM dbo.EMP WHERE COMM is NOT NULL

--2  Використовуючи умовну логіку (CASE) розподілити працівників, у яких має якесь значення значення атрибута COMM відмінне від NULL

--назвати 'SOME_VALUE' , у яких значення атрибута COMM NULL - 'EMPTY' та вивести результати запиту

--EMPNO,ENAME, назва нового атрибута New_Group

SELECT EMPNO, ENAME, COMM,
(
	CASE 
		WHEN COMM IS NULL THEN 'EMPTY'
		ELSE 'SOME_VALUE'
	END
) as NEW_GROUP
FROM dbo.EMP

--3 вибрати унікальні DEPTNO з таблиці EMP

SELECT DISTINCT DEPTNO FROM dbo.EMP

--4 Вибрати EMPNO, ENAME, SAL та провести сортування по атрибуту SAL з найбільшої ло найменшої заробітної плати

SELECT EMPNO, ENAME, SAL FROM dbo.EMP
ORDER BY SAL DESC

--5 вибрати унікальні комбінації ENAME,SAL з таблиці EMP

SELECT DISTINCT ENAME, SAL FROM dbo.EMP

--6 Виправити помилку в запиті 

--SELECT EMPNO, ENAME, SAL AS NEW_SAL , COMM 
--FROM EMP
--WHERE NEW_SAL >1000

SELECT EMPNO, ENAME, SAL AS NEW_SAL ,COMM FROM dbo.EMP
WHERE SAL > 1000

--7 --Чому запит п.6 є помлковим?

-- SELECT выполняется после инструкций FROM и WHERE,
-- поєтому на момент выполнения WHERE NEW_SAL >1000, Алиаса NEW_SAL еще не существует и нельзя на него сослаться.

--8 вибрати 7 перших запитів, які відсортовані по ENAME

SELECT TOP 7 * FROM dbo.EMP ORDER BY ENAME

SELECT * FROM dbo.EMP 
ORDER BY ENAME 
OFFSET 0 ROWS
FETCH NEXT 7 ROWS ONLY

--9 Вибрати отсортовані по ENAME записи, 3 рядки, починаючи з 5

SELECT * FROM dbo.EMP 
ORDER BY ENAME 
OFFSET 4 ROWS
FETCH NEXT 3 ROWS ONLY

--10 Яке ключове слово визначяє порядок сортування (знизу вверх чи зверху вниз)

--ASC (по возрастанию) and DESC(по убыванию)