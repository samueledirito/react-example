import { combineReducers } from "@reduxjs/toolkit";
import contactEdit from "./features/contactEdit/ducks";
import contactList from "./features/contactList/ducks";

const rootReducer = combineReducers({
  contactList,
  contactEdit,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
