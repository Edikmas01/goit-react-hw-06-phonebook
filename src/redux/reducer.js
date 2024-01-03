import { createSlice } from '@reduxjs/toolkit';


const contactsInitialState = [];
const searchInitialState = '';

 const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    // setContacts: (state, action) => {
    //   state = action.payload;
    //   return state;
    // },
    addContact: (state, action) => {
      state.push(action.payload);
      return state;
    },

    removeContact: (state, action) => {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
      return state;
    },
  },
});

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    setSearch: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addContact, removeContact, setContacts } = contactsSlice.actions
export const {setSearch} = searchSlice.actions
export const reducers = {
  contacts: contactsSlice.reducer,
  search: searchSlice.reducer,
};
