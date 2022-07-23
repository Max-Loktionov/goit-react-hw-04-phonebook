import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import Section from './Section';
import Phonebook from './Phonebook';
import Contacts from './Contacts';
import Filter from './Filter';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filterText, setFilterText] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(
        `this number: ${number} is in phonebook , you dont want to add one more time.`
      );
    } else {
      const contact = {
        name: name,
        number: number,
        id: nanoid(),
      };
      setContacts(prevState => [contact, ...prevState]);
    }
  };

  const changeFilter = e => {
    setFilterText(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filterText.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <Section title="Phonebook">
        <Phonebook onFormSubmit={formSubmitHandler} />
      </Section>
      {contacts.length > 0 && (
        <>
          <Section title="Contacts">
            <Filter value={filterText} onChange={changeFilter} />
            <Contacts
              data={getFiltredContacts()}
              onDeleteContact={deleteContact}
            />
          </Section>
        </>
      )}
    </Container>
  );
}
