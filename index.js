const contacts = require('./contacts.js');
const { program } = require('commander');

program
.option('-a, --action <type>')
.option('-i, --contactId <type>')
.option('-n, --name <type>')
.option('-e, --email <type>')
.option('-p, --phone <type>');

program.parse();
const options = program.opts();

const invokeAction = async({action, contactId, name, email, phone})=>{
    switch(action){
        case "list":
            const allcontacts = await contacts.listContacts();
            return console.table(allcontacts);
           
        case "get":
            const contactById = await contacts.getContactById(contactId);
            return console.table(contactById);
            
        case "remove":
            const removeOldContact = await contacts.removeContact(contactId);
            return console.table(removeOldContact);
           
        case "add":
            const newContact = await contacts.addContact({name, email, phone});
            return console.table(newContact);
        
        default:
            console.log("Unknow action");
    }

}
invokeAction(options);
