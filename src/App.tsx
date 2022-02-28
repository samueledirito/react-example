import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ContactEditPage from "./features/contactEdit/ContactEditPage";
import ContactListPage from "./features/contactList/ContactListPage";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/contacts/:id" element={<ContactEditPage />} />
          <Route path="/contacts" element={<ContactListPage />} />
          <Route path="/" element={<Navigate to="/contacts" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
