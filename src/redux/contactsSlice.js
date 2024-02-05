import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { createSelector } from 'reselect';

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://connections-api.herokuapp.com';

const getAuthToken = () => localStorage.getItem('token');
const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/contacts');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'users/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactsEntityAdapter = createEntityAdapter();

const initialState = contactsEntityAdapter.getInitialState({
  status: 'idle',
  error: null,
  user: null,
  token: null,
  filter: '',
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearUserState(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    changeFilter(state, action) {
      // Reducer for changing the filter
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        contactsEntityAdapter.setAll(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        contactsEntityAdapter.addOne(state, action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        contactsEntityAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        contactsEntityAdapter.removeOne(state, action.payload);
      });
  },
});

const selectSelf = state => state;
export const selectAllContacts = createSelector([selectSelf], state =>
  Object.values(state.contacts.entities)
);
export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectSelf],
  (contacts, state) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(state.contacts.filter.toLowerCase())
    )
);

export const { clearUserState, changeFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
