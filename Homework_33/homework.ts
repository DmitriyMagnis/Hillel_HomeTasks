'use strict';

interface IStudentParameters {
  firstName: string;
  lastName: string;
  birthDate: Date;
  marks: number[];
  attendance: boolean[];
}

class Student {
  public firstName: string;
  public lastName: string;
  private birthDate: Date;
  private marks: number[];
  private attendance: boolean[];
  private totalLessons: number;
  private currentLesson: number;
  constructor({
    firstName,
    lastName,
    birthDate,
    marks,
    attendance,
  }: IStudentParameters) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.marks = marks;
    this.attendance = attendance;
    this.totalLessons = this.attendance.length;
    this.currentLesson = 0;
  }
  public getAge(): number {
    return new Date().getFullYear() - this.birthDate.getFullYear();
  }
  public getAvarageMark(): number {
    return this.marks.reduce((sum, mark) => sum + mark) / this.marks.length;
  }

  public present(): Student {
    if (this.attendance.length > this.totalLessons) return this;
    this.attendance[this.currentLesson] = true;
    this.currentLesson++;
    return this;
  }
  public absent(): Student {
    if (this.attendance.length > this.totalLessons) return this;
    this.attendance[this.currentLesson] = false;
    this.currentLesson++;
    return this;
  }

  public summary() {
    const averageMark = this.getAvarageMark();
    const averageAttend =
      this.attendance.filter(Boolean).length / this.totalLessons;

    if (averageMark > 90 && averageAttend > 0.9) {
      return 'Молодець!';
    } else if (averageMark > 90 || averageAttend > 0.9) {
      return 'Добре, але можна краще ';
    } else return 'Редиска!';
  }
}

const student1 = new Student({
  firstName: 'Dmitriy',
  lastName: 'LastName',
  birthDate: new Date(2000, 11, 1),
  marks: [100, 100, 100, 100, 100],
  attendance: Array.from<boolean>({ length: 5 }).fill(false),
});
student1.present().present().present().present().present();
console.log(
  'age=>>',
  student1.getAge(),
  'averageMark=>>',
  student1.getAvarageMark(),
  'Summary =>>',
  student1.summary(),
  student1
);
const student2 = new Student({
  firstName: 'Anna',
  lastName: 'Agilera',
  birthDate: new Date(2002, 11, 1),
  marks: [10, 10, 10, 100, 100],
  attendance: Array.from<boolean>({ length: 5 }).fill(false),
});
student2.absent().absent().absent().absent().absent();
console.log(
  'age=>>',
  student2.getAge(),
  'averageMark=>>',
  student2.getAvarageMark(),
  'Summary =>>',
  student2.summary(),
  student2
);

const student3 = new Student({
  firstName: 'Maks',
  lastName: 'Pipa',
  birthDate: new Date(2001, 11, 1),
  marks: [10, 10, 10, 10, 10],
  attendance: Array.from<boolean>({ length: 5 }).fill(false),
});
student3.present().present().present().present().present();
console.log(
  'age=>>',
  student3.getAge(),
  'averageMark=>>',
  student3.getAvarageMark(),
  'Summary =>>',
  student3.summary(),
  student3
);
