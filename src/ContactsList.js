import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';

const List = styled.ul`
  padding: 0;
  width: 300px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContactLine = styled.div`
  margin: 8px 0px;
`;

export default function ContactsList({ contacts, onDelete }) {
  return (
    <List>
      {contacts.map(contact => (
        <ListItem key={uuidv1()}>
          <div>
            <ContactLine>Name: {contact.name}</ContactLine>
            <ContactLine>Number: {contact.number}</ContactLine>
          </div>
          <button type="button" onClick={() => onDelete(contact.id)}>
            Delete
          </button>
        </ListItem>
      ))}
    </List>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};
