const pureUser = {
  name: 'MyName',
  surname: 'MySurname',
  getInfo() {
    return {
      name: this.name,
      surname: this.surname,
    };
  },
};

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
const user2 = new User('MyName2', 'MySurname2', '19.08.2002');
console.log(user.getInfo());
console.log(user2.getInfo());
console.log(pureUser.getInfo());
