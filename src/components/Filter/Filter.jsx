import React from 'react';
import { Input, Heading } from '@chakra-ui/react';

const Filter = ({ onSearchChange }) => {
  return (
    <>
      <Heading size="md">Search:</Heading>
      <Input
        placeholder="Search contacts"
        onChange={e => onSearchChange(e.target.value)}
        mb={4}
      />
    </>
  );
};

export default Filter;
