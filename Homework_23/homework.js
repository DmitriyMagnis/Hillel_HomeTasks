const book = {
  contacts: [
    {
      name: 'Serhii',
      phone: '+380999999999',
      email: 'example@email.com',
    },
  ],
  find(userName) {
    if (typeof userName !== 'string') return 'wrong input';
    const isUserExist = this.contacts.find(
      ({ name }) => name.toLowerCase() === userName.toLowerCase()
    );
    return isUserExist ?? 'User not founded';
  },
  add(contact) {
    if (!contact) return 'wrong input';
    this.contacts.push(contact);
  },
};

//1.1

book.add({
  name: 'Serhii2',
  phone: '+380999999999',
  email: 'example@email.com',
});
console.log(book);

console.log(book.find('Serhii2'));

//==========================================
//1.2

const contacts = [
  {
    name: 'Dmitriy',
    phone: '+380999999999',
    email: 'example@email.com',
  },
];

function Contact({ name, phone, email }) {
  this.name = name;
  this.phone = phone;
  this.email = email;
}

function Book(contacts) {
  this.contacts = contacts;
}

Book.prototype.find = function (userName) {
  if (typeof userName !== 'string') return 'wrong input';
  const isUserExist = this.contacts.find(
    ({ name }) => name.toLowerCase() === userName.toLowerCase()
  );
  return isUserExist ?? 'User not founded';
};

Book.prototype.add = function (contact) {
  if (!contact) return 'wrong input';
  const newContact = new Contact(contact);
  this.contacts.push(newContact);
};

const mappedContacts = contacts.map(el => {
  return new Contact(el);
});

const book1 = new Book(mappedContacts);
book1.add({
  name: 'Dmitriy2',
  phone: '+380999999999',
  email: 'example@email.com',
});

console.log(book1);
console.log(book1.find('Dmitriy'));
console.log(book1.find('Serhi'));
console.log(book1.find('Dmitriy2'));
console.log(book1.find());
