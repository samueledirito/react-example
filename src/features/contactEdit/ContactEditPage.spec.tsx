import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContactEditPage from "./ContactEditPage";

describe("ContactEditPage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "10" });
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  describe("when entity is loaded", () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockReturnValue({
        entity: { name: "Pino", city: "Prato" },
        loading: false,
      });

      render(<ContactEditPage />);
    });

    it("should save entity after changes", () => {
      const consoleSpy = jest.spyOn(console, "log");

      const name = screen.getByTestId("name");
      const city = screen.getByTestId("city");
      const save = screen.getByTestId("save");

      userEvent.type(name, "ee");
      userEvent.type(city, "ato");

      userEvent.click(save);

      waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith({
          name: "Pinoee",
          city: "Pratoato",
        });
      });
    });
  });

  describe("when entity is loading", () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockReturnValue({
        loading: true,
      });

      render(<ContactEditPage />);
    });

    it("should see loader", () => {
      expect(screen.getByRole("loader")).toBeInTheDocument();
    });
  });

  describe("when entity load fails", () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockReturnValue({
        error: { message: "Errore!!" },
      });

      render(<ContactEditPage />);
    });

    it("should see errors", () => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });
});
