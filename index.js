const data = require("./contacts.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const getContacts = await data.listContact();
      console.log(getContacts);
      break;
    case "get":
      const getById = await data.getContactById(id);
      console.log(getById);
      break;
    case "add":
      const addContact = await data.addContact({ name, email, phone });
      console.log(addContact);
      break;
    case "remove":
      const deleteContact = await data.removeContact(id);
      console.log(deleteContact);
      break;
    default:
        console.warn("\x1B[31m Unknown action type!");
  }
};
// invokeAction({action:"getAll"});
// invokeAction({action:"getById", id:"1"});
// invokeAction({action:"addContact", name:"qwe", email:"qwe@mail.com", phone:"0 000 00 00"});
// invokeAction({action:"delete", id:"1"});

const arr = hideBin(process.argv);

const { argv } = yargs(arr);
console.log(argv);

invokeAction(argv);
