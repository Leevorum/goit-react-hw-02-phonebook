import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.target.value });
  };

  handleAddContact = data => {
    const stateContacts = [...this.state.contacts];
    const filteredState = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(data.name.toLowerCase());
    });
    if (filteredState.length > 0) {
      alert(`${data.name}, is already in your contacts`);
      return;
    }
    const id = nanoid();
    this.setState({
      contacts: [
        ...stateContacts,
        { name: data.name, id: id, number: data.number },
      ],
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const toLowerCaseFilter = this.state.filter.toLowerCase();
    const filteredState = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(toLowerCaseFilter);
    });

    return (
      <div>
        <section>
          <h2>Phonebook</h2>
          <ContactForm onSubmit={this.handleAddContact} />
        </section>

        <section>
          <h2>Contacts</h2>
          <Filter value={this.state.filter} onChange={this.handleChange} />
          <ContactList
            filteredState={filteredState}
            onDelete={this.deleteContact}
          />
        </section>
      </div>
    );
  }
}
