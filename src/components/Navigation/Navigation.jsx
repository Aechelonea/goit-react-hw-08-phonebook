import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Button, Text, Spacer } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { clearUserState } from '../../redux/contactsSlice';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  const handleLogout = () => {
    dispatch(clearUserState());
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  return (
    <Flex bg="gray.800" px={4} py={2} alignItems="center">
      <Box>
        <Link as={RouterLink} to="/" px={2} color="white">
          Home
        </Link>
      </Box>
      {isLoggedIn && (
        <Box>
          <Link as={RouterLink} to="/contacts" px={2} color="white">
            Contacts
          </Link>
        </Box>
      )}
      <Spacer />
      <Box>
        {!isLoggedIn ? (
          <>
            <Link as={RouterLink} to="/register" px={2} color="white">
              Register
            </Link>
            <Link as={RouterLink} to="/login" px={2} color="white">
              Login
            </Link>
          </>
        ) : (
          <>
            <Text display="inline" color="white" pr={4}>
              {userDetails.email}
            </Text>
            <Button onClick={handleLogout} colorScheme="blue">
              Logout
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navigation;