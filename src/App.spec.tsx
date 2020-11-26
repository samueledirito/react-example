import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

jest.mock("./features/contactList/ContactListPage", () => ({
  __esModule: true,
  default: () => "ContactList",
}));

jest.mock("./features/contactEdit/ContactEditPage", () => ({
  __esModule: true,
  default: () => "ContactEdit",
}));

describe("App - Navigation", () => {
  beforeAll(() => {
    render(<App />);
  });

  test("'/contacts/1' => ContactEditPage", () => {
    window.history.pushState({}, "", "/contacts/1");
    expect(screen.queryByText("ContactEdit")).toBeDefined();
  });

  test("'/contacts' => ContactListPage", () => {
    window.history.pushState({}, "", "/contacts");
    expect(screen.queryByText("ContactList")).toBeDefined();
  });

  test("'/' => ContactListPage", () => {
    render(<App />);
    window.history.pushState({}, "", "/");
    expect(screen.queryByText("ContactList")).toBeDefined();
  });
});
