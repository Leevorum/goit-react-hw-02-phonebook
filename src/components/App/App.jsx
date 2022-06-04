import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  handleChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleAddContact = evt => {
    const stateContacts = [...this.state.contacts];
    evt.preventDefault();
    const id = nanoid();
    this.setState({
      contacts: [...stateContacts, { name: this.state.name, id: id }],
    });
  };

  render() {
    return (
      <div>
        <section>
          <h2>Phonebook</h2>
          <form onSubmit={this.handleAddContact}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.name}
              onChange={this.handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <button type="submit">Add contact</button>
          </form>
        </section>
        <section>
          <h2>Contacts</h2>
          <ul>
            {this.state.contacts.map(contact => {
              return <li key={contact.id}>{contact.name}</li>;
            })}
          </ul>
        </section>
      </div>
    );
  }
}
