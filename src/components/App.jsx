import React from 'react';
import { nanoid } from 'nanoid';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

import {addContact,removeContact,setContacts,setSearch} from "../redux/reducer"
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectors.getSearch);
  const contacts = useSelector(selectors.getContacts);

  const handleSubmit = (name, number) => {
    const isNameAlreadyExists = contacts.some(contact => contact.name === name);

    if (isNameAlreadyExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
  };

  const handleChange = value => {
    dispatch(setSearch(value));
  };

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  // useEffect(() => {
  //   const contactsLS = JSON.parse(localStorage.getItem('contacts')) || [];
  //   dispatch(actions.setContacts(contactsLS));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const normalizedFilter = search.toLowerCase();

  const visibleContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      `${number}`.includes(normalizedFilter)
  );

  return (
    <div style={{ marginLeft: '30px' }}>
      <h1 className="title">Phonebook</h1>
      <Phonebook onSubmit={handleSubmit} />
      <h1 className="title">Contacts</h1>
      <Filter onChange={handleChange} filter={search} />
      <Contacts
        contacts={visibleContacts}
        onChange={handleChange}
        filter={search}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};
export default App;
