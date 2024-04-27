function User(name, surname, birthday) {
  this.name = name;
  this.surname = surname;
  this.birthday = birthday;
}

User.prototype.getInfo = function () {
  return {
    name: this.name,
    surname: this.surname,
    birthday: this.birthday,
  };
};

const user = new User('MyName', 'MySurname', '19.08.2000');
console.log(user.getInfo());
