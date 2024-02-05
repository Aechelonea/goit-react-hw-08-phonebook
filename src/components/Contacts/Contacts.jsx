import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
  selectAllContacts,
} from '../../redux/contactsSlice';
import { Box, VStack, Container, useToast } from '@chakra-ui/react';
import Filter from '../Filter/Filter.jsx';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);
  const loading = useSelector(state => state.contacts.loading);
  const toast = useToast();
  const [editState, setEditState] = useState({
    id: null,
    name: '',
    number: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = contact => {
    dispatch(addContact(contact));
  };

  const handleUpdateContact = async () => {
    const { id, name, number } = editState;
    await dispatch(
      updateContact({ id, updatedData: { name, number } })
    ).unwrap();
    setEditState({ id: null, name: '', number: '' }); // Reset edit state
    toast({
      title: 'Contact updated.',
      description: 'The contact has been updated successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    toast({
      title: 'Contact deleted.',
      description: 'The contact has been deleted successfully.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEditChange = (id, field, value) => {
    setEditState(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditStart = (id, name, number) => {
    setEditState({ id, name, number });
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.number.includes(searchQuery)
  );

  if (loading === 'loading') {
    return <Box>Loading contacts...</Box>;
  }

  return (
    <Container maxW="container.xl" centerContent p={5}>
      <VStack spacing={5} align="stretch" w="100%">
        <ContactForm onAddContact={handleAddContact} />
        <Filter onSearchChange={setSearchQuery} />
        <ContactList
          contacts={filteredContacts}
          onEditStart={handleEditStart}
          onDelete={handleDeleteContact}
          onEditChange={handleEditChange}
          onEditSubmit={handleUpdateContact}
          editState={editState}
        />
      </VStack>
    </Container>
  );
};

export default Contacts;
