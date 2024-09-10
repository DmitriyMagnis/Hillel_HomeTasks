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

--1. Вибрати всі записи із таблиці Emp (2 варіанти відповіді).

SELECT * FROM EMP;  
SELECT EMP.* FROM EMP;
SELECT EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO FROM EMP;

--2. Вибрати прізвище(імя) та заробітну плату працівника.

SELECT ENAME, SAL FROM EMP;

--3.Вибрати прізвище та заробітну плату працівника з додаванням 100 до заробітної плати кожного працівника.

SELECT ENAME, SAL+100 as INCSalary FROM EMP;

--4.Вибрати прізвище та заробітну плату працівників, у яких заробітна плата більше ніж 2000.

SELECT ENAME, SAL as Salary FROM EMP WHERE SAL >= 2000; 

-- 'as' або 'alias' змінює назву стовпчика в результуючій таблиці(у даному конексті)


--5.Яким оператором SQL можна змінити дані в таблиці?  - UPDATE [Назва таблиці] SET [Атрибут] = [Значення] WHERE [Умова]
	
--6. Чи є різниця в SQL, якщо написати  SELECT, Select, select? -- Ні, нема різниці.

--7. Після якого оператора перелічуємо таблиці, що містять поля зазначені після SELECT? -- FROM [Перелік таблиць]
