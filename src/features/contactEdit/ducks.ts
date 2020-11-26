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
  contactEditSlice: (state: RootState): ContactEditState => state.contactEdit,
};

export interface GetContactArgs {
  id?: string;
}

export const getContact = createAsyncThunk(
  "getContact",
  async ({ id }: GetContactArgs) => {
    const response = await Axios.get<Contact>(
      `http://localhost:8080/api/contacts/${id}`
    );
    const contacts = deserialize(response.data, {
      transformKeys: "camelCase",
    });
    return contacts.data as Contact;
  }
);

export interface ContactEditState {
  loading: boolean;
  entity?: Contact;
  error?: SerializedError;
}

export const INITIAL_STATE: ContactEditState = { loading: false };

const contactListSlice = createSlice({
  name: "contactEdit",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContact.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });

    builder.addCase(getContact.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.loading = false;
    });

    builder.addCase(getContact.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default contactListSlice.reducer;
