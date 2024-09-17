--1.Створити таблицю Employee  з такими атрибутами (внести 5 рядків даних)

--id (primaty key) автоінкремент

--First_Name

--Last_Name

--Department

CREATE TABLE dbo.Employee
(
 Emp_ID   INT IDENTITY PRIMARY KEY (Emp_ID),
 Emp_First_Name	  VARCHAR(50) NOT NULL,
 Emp_Last_Name	  VARCHAR(50) NOT NULL,
)


INSERT INTO dbo.Employee (Emp_First_Name, Emp_Last_Name)
VALUES ('SMITH','Macconahi'),
	   ('Tanya','Balandina'),
	   ('Evgen','Mirandius')

--2 Створити таблицю Department з такими атрибутами (внести 3 рядки даних)

--Department_ID (primaty key) автоінкремент

--Dept_Name

CREATE TABLE dbo.DEPARTMENT
(
  DEP_ID	INT IDENTITY PRIMARY KEY (DEP_ID),
  DEP_NAME	VARCHAR(50)
)

INSERT INTO dbo.DEPARTMENT (DEP_NAME)
VALUES ('Sales'),
	   ('Finance')

--3 Додати до створеної таблиці Employee обмеження Age > 21

ALTER TABLE dbo.Employee
ADD Emp_Age INT CONSTRAINT CHK_PersonAge CHECK (Emp_Age >= 18);

--4 Додати обмеження зовнішнього ключа з найменуванням обмеження до стовпця Department_ID таблиці Employee:

ALTER TABLE dbo.Employee
ADD Departmen_ID INT CONSTRAINT FK_DepartmentID FOREIGN KEY (Departmen_ID) REFERENCES dbo.DEPARTMENT(DEP_ID);

--5 Створити збережену процедуру, яка виведе всі  записи з таблиці Employee 

CREATE PROCEDURE Show_All_Employee
AS
 SELECT * FROM dbo.Employee
GO;

CREATE PROCEDURE Show_All_Employee2
AS
BEGIN
 SELECT * FROM dbo.Employee
END;


--6 Створити скалярну функцію, що буде отримувати вхідне значення та множити його на 2

--DROP FUNCTION DoubleNumber

CREATE FUNCTION DoubleNumber ( @NUM INT )
RETURNS INT
AS	
BEGIN
	RETURN @NUM * 2
END;

--7 Виконати збережену процедуру , викликати створену функцію
-- Оновити дані з Null => Number
UPDATE dbo.Employee 
SET Emp_Age = IIF(Emp_ID > 2, 21, 18)

SELECT Emp_Age, 
(
  CASE
	WHEN Emp_Age <= 18 THEN dbo.DoubleNumber(Emp_Age)
	ELSE Emp_Age
  END
) as DOUBLED_AGE 
FROM dbo.Employee

EXEC Show_All_Employee;
EXEC Show_All_Employee2;