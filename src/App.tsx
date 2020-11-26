import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ContactEditPage from "./features/contactEdit/ContactEditPage";
import ContactListPage from "./features/contactList/ContactListPage";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/contacts/:id">
            <ContactEditPage />
          </Route>
          <Route exact path="/contacts">
            <ContactListPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/contacts" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
