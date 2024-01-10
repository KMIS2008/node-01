const fs = require("fs/promises")
const path = require('path');
const {nanoid} = require('nanoid');


const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Возвращает массив контактов.
const listContacts = async() => {
    const readcontacts = await fs.readFile(contactsPath);
    return JSON.parse(readcontacts)
  }

    // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    return allContacts.find(contact => contact.id === contactId) || null;
  }
  
  // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const removeContact = async (contactId)=> {
    const allContacts = await listContacts();

    const index = allContacts.findIndex(contact => contact.id === contactId);
    if (index === -1){
        return null;
    }

    const [removeOldContact] = allContacts.splice(index, 1);

    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return removeOldContact;
  };
   

  // Возвращает объект добавленного контакта.
  const addContact = async(data) => {
    const allContacts = await listContacts();

    const newContact = {
        id: nanoid(),
        ... data
    }
     
    allContacts.push(newContact);

     fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
     return newContact;
  }

  module.exports = {listContacts, getContactById, removeContact, addContact}

//   {
//     "id": "qdggE76Jtbfd9eWJHrssH",
//     "name": "Chaim Lewis",
//     "email": "dui.in@egetlacus.ca",
//     "phone": "(294) 840-6685"
//   },