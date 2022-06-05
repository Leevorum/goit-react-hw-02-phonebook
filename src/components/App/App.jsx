import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Section from 'components/Section/Section';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  //Обновление value
  handleChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.target.value });
  };
  //Обновление стейта
  handleAddContact = data => {
    const stateContacts = [...this.state.contacts];
    const existContact = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(data.name.toLowerCase());
    });
    //Если имя есть в списке контактов выбросить уведомление, и отменить выполнение кода
    if (existContact.length > 0) {
      alert(`${data.name}, is already in your contacts`);
      return;
    }
    //Добавляем ID  для контакта
    const id = nanoid();
    //Обновляем стейт
    this.setState({
      contacts: [
        ...stateContacts,
        { name: data.name, id: id, number: data.number },
      ],
    });
  };
  //Удаляем контакт ID
  deleteContact = contactId => {
    //Возвращаем новый стейт без контакта
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
        <Section title="Phonebook" border="1px solid">
          <ContactForm onSubmit={this.handleAddContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.handleChange} />
          <ContactList
            filteredState={filteredState}
            onDelete={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
