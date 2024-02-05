import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/contactsSlice';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  useToast,
  Heading,
} from '@chakra-ui/react';

const Register = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      toast({
        title: 'Registration successful.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: error.message || 'Failed to register.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container centerContent>
      <VStack
        as="form"
        onSubmit={handleSubmit}
        spacing={4}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        w="full"
        maxW="md"
        mt={8}
        bgColor="white"
      >
        <Heading size="lg" textAlign="center">
          Register
        </Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            bgColor="gray.50"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            bgColor="gray.50"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            bgColor="gray.50"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Register
        </Button>
      </VStack>
    </Container>
  );
};

export default Register;
