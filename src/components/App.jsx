import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';



export class App extends Component {
  state = { //визначаю два поля масив і рядок
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '', //пошук контактів за іменем
  };

  filterChange = e => {      //цей метод викликається при зміні значення фільтру і оновлюється коли користувач вводе значення
    this.setState({ filter: e.target.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => //повертаємо відфільтрований масив 
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  addContact = newContact => {
    //перевіряю чи існує контакт з однаковим ід
    const existingContact = this.state.contacts.find(contact => contact.id === newContact.id);

    if (existingContact) { //якщо існує контакт
        alert(`${newContact.name} ${newContact.number} is already in contacts`);
        return;
    }

    this.setState(prevState => ({ //якщо не існує то, оновлюємось та додаємось до попереднього масиву
        contacts: [newContact, ...prevState.contacts],
    }));
};

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleFilter = this.visibleContacts();

    return (
      <div>
        <ContactForm onSubmitData={this.addContact} />

        <h2>Contacts {contacts.length}</h2>
        <Filter value={filter} onChange={this.filterChange} />
        {contacts.length ? (
          <ContactList
            contacts={visibleFilter}
            onDeletContacts={this.deleteContacts}
          />
        ) : (
          <p>No contacts in phonebook</p>
        )}
      </div>
    );
  }
}


// or
// addContact = newContact => {  //функція додавання контактів
   
//   const nameToLowerCase = newContact.name.toLowerCase();

//   if (
//     this.state.contacts.find(  //перевіряю чи існує контакт з таким іменем
//       contact =>
//         contact.name.toLowerCase() === nameToLowerCase ||
//         contact.number === newContact.number
//     )
//   ) {
//     alert(`${newContact.name}  ${newContact.number} is already in contacts`);
//     return;
//   }

//   this.setState(prevState => ({
//     contacts: [newContact, ...prevState.contacts],
//   }));
// };