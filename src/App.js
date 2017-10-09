import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

//https://github.com/udacity/reactnd-contacts-complete/tree/master/src

class App extends Component {
  state = {
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

  //pega o contato do servidor, concatena com o novo contato e retorna uma nova lista [array] de contatos
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }
  // short-circuit  {this.state.screen === 'list' && (<ListContact />)}
  // usando state pra fazer o Create, não deixa você voltar na página anterior. Portanto, devemos usar o React Router.
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <ListContacts 
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact} 
          />
        )} />
        <Route path="/create" render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} /> 
      </div>
    );
  }
}

export default App;
