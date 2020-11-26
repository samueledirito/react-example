import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import Axios from "axios";
import { deserialize } from "deserialize-json-api";
import { RootState } from "../../rootReducer";
import { Contact } from "../types";

export const selectors = {
  contactListSlice: (state: RootState): ContactListState => state.contactList,
};

export const getContactList = createAsyncThunk("getContactList", async () => {
  const response = await Axios.get<Contact[]>(
    "http://localhost:8080/api/contacts"
  );
  const contacts = deserialize(response.data, {
    transformKeys: "camelCase",
  });
  return contacts.data as Contact[];
});

export interface ContactListState {
  loading: boolean;
  entities?: Contact[];
  error?: SerializedError;
}

const initialState: ContactListState = { loading: false };

const contactListSlice = createSlice({
  name: "contactList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContactList.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });
    builder.addCase(getContactList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default contactListSlice.reducer;
