import React, { useState } from 'react';
import { Button, Input, VStack, useToast, Heading } from '@chakra-ui/react';

const ContactForm = ({ onAddContact }) => {
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const toast = useToast();

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact(newContact);
    setNewContact({ name: '', number: '' }); // Reset form
    toast({
      title: 'Contact added.',
      description: 'You have added a new contact successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading size="md">Add New Contact</Heading>
      <VStack mt={4}>
        <Input
          placeholder="Name"
          value={newContact.name}
          onChange={e => setNewContact({ ...newContact, name: e.target.value })}
        />
        <Input
          placeholder="Number"
          value={newContact.number}
          onChange={e =>
            setNewContact({ ...newContact, number: e.target.value })
          }
        />
        <Button type="submit" colorScheme="blue">
          Add Contact
        </Button>
      </VStack>
    </form>
  );
};

export default ContactForm;
