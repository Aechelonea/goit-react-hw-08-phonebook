import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchContacts } from '../redux/contactsSlice';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Navigation from '../components/Navigation/Navigation';
import Contacts from '../components/Contacts/Contacts';
import HomePage from '../components/HomePage/HomePage'; // New home page component
import './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Router basename="/goit-react-hw-08-phonebook">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
