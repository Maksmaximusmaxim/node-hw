const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContact = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);

};

const getContactById = async (id) => {
  const contacts = await listContact();
  // const idToString = String(id); //можно привеcти число к строке и подставлять значение этой переменной вместо id
  const contact = contacts.find((elem) => elem.id == id); //тут или  поставить не строгое сравнение
  return contact || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContact();
  const newCon = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newCon);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newCon;
};
const removeContact = async (id) => {
  const contacts = await listContact();
  const index = contacts.findIndex((el) => el.id == id);
  if (index === -1) {
    return null;
  }
  const arr = contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return  arr;
};

module.exports = {
  listContact,
  getContactById,
  addContact,
  removeContact,
};
