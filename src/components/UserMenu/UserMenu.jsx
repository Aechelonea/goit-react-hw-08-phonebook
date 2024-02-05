import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserState } from '../../redux/contactsSlice';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.contacts.user);

  const handleLogout = () => {
    dispatch(clearUserState());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Menu>
      <MenuButton as={Button}>{user ? user.name : 'Account'}</MenuButton>
      <MenuList>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
