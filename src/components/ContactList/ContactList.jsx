import React from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  Text,
  Input,
  Heading,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const ContactList = ({
  contacts,
  onEditStart,
  onDelete,
  onEditChange,
  onEditSubmit,
  editState,
}) => {
  return (
    <List spacing={3}>
      <Heading size="md">Contacts:</Heading>
      {contacts.map(contact => (
        <ListItem
          key={contact.id}
          p={4}
          boxShadow="md"
          borderRadius="md"
          bg="white"
          _hover={{ bg: 'gray.50' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {editState.id === contact.id ? (
            <>
              <Input
                name="name"
                value={editState.name}
                onChange={e => onEditChange(contact.id, 'name', e.target.value)}
                size="sm"
              />
              <Input
                name="number"
                value={editState.number}
                onChange={e =>
                  onEditChange(contact.id, 'number', e.target.value)
                }
                size="sm"
                ml={2}
              />
              <Button
                onClick={() =>
                  onEditSubmit(contact.id, editState.name, editState.number)
                }
                size="sm"
                colorScheme="green"
                ml={2}
              >
                <CheckIcon />
              </Button>
            </>
          ) : (
            <>
              <Box
                onClick={() =>
                  onEditStart(contact.id, contact.name, contact.number)
                }
              >
                <Text fontWeight="bold">{contact.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {contact.number}
                </Text>
              </Box>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => onDelete(contact.id)}
              >
                Delete
              </Button>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
