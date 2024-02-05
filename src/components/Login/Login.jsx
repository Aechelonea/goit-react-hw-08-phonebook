import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/contactsSlice';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      toast({
        title: 'Login successful.',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/contacts');
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: error.message || 'Incorrect email or password.',
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
          Login
        </Heading>
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
          Log In
        </Button>
      </VStack>
    </Container>
  );
};

export default Login;
