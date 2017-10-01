import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  //value do input zerado
  state = {
    query: '',
  }

  // pegar o valor colocado no value input
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  
  //limpando o campo de busca
  clearQuery = () => {
    this.setState({ query: ''})
  }
  
  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    //variável que será comparada com o filtro
    let showingContacts
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts;
    }

    //pegando os contatos por ordem alfabética
    showingContacts.sort(sortBy('name'))

    return (
      <div className="list-contacts">
        {JSON.stringify(this.state)}
        <div className="list-contacts-top">
          <input 
            className="search-contacts" 
            type="text" 
            placeholder="Search contacts"
            value={query}
            onChange={(event)=> this.updateQuery(event.target.value)}
          />
        </div>

        {showingContacts.length !== contacts.length &&
          <div className="showing=contacts">
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        }

        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className="contact-remove" onClick={() => onDeleteContact(contact)}> 
                Remove
              </button>
            </li>
          ))}
        </ol> 
      </div>
    );
  }
}


export default ListContacts;