import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

//https://github.com/udacity/reactnd-contacts-complete/tree/master/src

class App extends Component {
  state = {
    contacts: [],
  }
  
  //é invocado após o componente estar montado
  componentDidMount() {
    ContactsAPI.getAll().then ((contacts) => {
      this.setState({contacts})
    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div className="App">
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
