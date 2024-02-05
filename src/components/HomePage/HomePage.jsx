import React from 'react';
import { AtSignIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <VStack spacing={8} py={10} textAlign="center">
      <AtSignIcon boxSize={12} />
      {isLoggedIn ? (
        <>
          <Heading>Welcome Back!</Heading>
          <Text>Your contacts are just a click away.</Text>
          <Button as={RouterLink} to="/contacts" colorScheme="blue">
            View Contacts
          </Button>
        </>
      ) : (
        <>
          <Heading>Welcome to the Phonebook App!</Heading>
          <Text>Log in to manage your contacts efficiently and securely.</Text>
          <Box>
            <Button as={RouterLink} to="/login" colorScheme="blue" mr={4}>
              Login
            </Button>
            <Button as={RouterLink} to="/register" colorScheme="green">
              Register
            </Button>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default HomePage;
