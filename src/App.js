import React, { useState, useReducer, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Filter from './Filter';

import storage from './services/local-storage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  color: #222;
  font-family: 'Roboto', sans-serif;
`;

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'addContact':
      return [...state, action.payload.contact];

    case 'removeContact':
      return state.filter(contact => contact.id !== action.payload.contactId);

    default:
      return state;
  }
};

export default function App() {
  // Contacts
  const [contacts, dispatch] = useReducer(
    contactsReducer,
    storage.get('contacts') || [],
  );

  const handleAddContact = contact => {
    dispatch({ type: 'addContact', payload: { contact } });
  };

  const handleDelete = contactId => {
    dispatch({ type: 'removeContact', payload: { contactId } });
  };

  // Contacts display filter
  useEffect(() => {
    storage.save('contacts', contacts);
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const handleSearch = query => {
    setFilter(query);
  };

  const contactsToShow = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);

  // New Contact validation
  const checkIfNameUnique = name =>
    contacts.every(contact => contact.name !== name);

  return (
    <Container>
      <div>
        <h2>Phonebook</h2>

        <ContactForm
          onAddContact={handleAddContact}
          isNameUnique={checkIfNameUnique}
        />

        <section>
          <h2>Contacts</h2>

          {contacts.length ? (
            <>
              <Filter onSearch={handleSearch} />
              <ContactsList contacts={contactsToShow} onDelete={handleDelete} />
            </>
          ) : (
            <p>No saved contacts</p>
          )}
        </section>
      </div>
    </Container>
  );
}

// export default class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   handleAddContact = сontact => {
//     this.setState(prev => ({
//       contacts: [...prev.contacts, сontact],
//     }));
//   };

//   handleSearch = query => {
//     this.setState({ filter: query });
//   };

//   handleDelete = name => {
//     const { contacts } = this.state;

//     this.setState({
//       contacts: contacts.filter(contact => contact.name !== name),
//     });
//   };

//   checkIfNameUnique = name =>
//     this.state.contacts.every(contact => contact.name !== name);

//   render() {
//     const { contacts, filter } = this.state;

//     const contactsToShow = getContactsToShow(contacts, filter);

//     return (
//       <Container>
//         <div>
//           <h2>Phonebook</h2>

//           <ContactForm
//             onAddContact={this.handleAddContact}
//             isNameUnique={this.checkIfNameUnique}
//           />

//           <section>
//             <h2>Contacts</h2>

//             {contacts.length ? (
//               <>
//                 <Filter onSearch={this.handleSearch} />
//                 <ContactsList
//                   contacts={contactsToShow}
//                   onDelete={this.handleDelete}
//                 />
//               </>
//             ) : (
//               <p>No saved contacts</p>
//             )}
//           </section>
//         </div>
//       </Container>
//     );
//   }
// }
