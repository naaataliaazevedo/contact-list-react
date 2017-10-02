import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

//https://github.com/udacity/reactnd-contacts-complete/tree/master/src

class App extends Component {
  state = {
    screen: 'list', //list, create
    contacts: [],
  }
  
  //é invocado após o componente estar montado
  componentDidMount() {
    ContactsAPI.getAll().then ((contacts) => {
      this.setState({ contacts })
    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  //short-circuit  {this.state.screen === 'list' && (<ListContact />)}
  render() {
    return (
      <div className="App">
        {this.state.screen === 'list' && (
          <ListContacts 
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact} 
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;
