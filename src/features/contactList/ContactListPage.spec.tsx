import { render, screen } from "@testing-library/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContactListPage from "./ContactListPage";
import { selectors } from "./ducks";

describe("ContactListPage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "10" });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  test("should show loader", async () => {
    (useSelector as jest.Mock).mockReturnValue({
      entity: {},
      loading: true,
    });
    render(<ContactListPage />);

    const loader = screen.getByRole("loader");
    expect(loader).toBeInTheDocument();
  });

  test("should use a correct selector", () => {
    (useSelector as jest.Mock).mockReturnValue({ loading: true });

    render(<ContactListPage />);

    expect(useSelector as jest.Mock).toHaveBeenCalledWith(
      selectors.contactListSlice
    );
  });

  test("should see empty text", async () => {
    (useSelector as jest.Mock).mockReturnValue({
      entities: [],
      loading: false,
    });
    render(<ContactListPage />);
    expect(screen.queryAllByTestId("contact")).toHaveLength(0);
    expect(screen.queryByText("empty")).toBeInTheDocument();
  });

  test("should see some data in table", async () => {
    (useSelector as jest.Mock).mockReturnValue({
      entities: [{ id: "1", name: "Pino", city: "Prato" }],
      loading: false,
    });
    render(<ContactListPage />);
    expect(screen.queryAllByTestId("contact")).toHaveLength(1);
  });
});
