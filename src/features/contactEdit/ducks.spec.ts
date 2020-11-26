import { unwrapResult } from "@reduxjs/toolkit";
import Axios from "axios";
import store from "../../store";
import { getContact, selectors } from "./ducks";

describe("Async actions - contactEdit", () => {
  it("getContact - fullfilled", async () => {
    (Axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: { id: "1", type: "contact", attributes: { name: "Pino" } },
      },
    });
    const response = await store
      .dispatch(getContact({ id: "1" }))
      .then(unwrapResult);
    expect(response.name).toEqual("Pino");
  });
  it("getContact - rejected", async () => {
    (Axios.get as jest.Mock).mockRejectedValue("Errore del server");
    await store.dispatch(getContact({ id: "1" }));
    const { error } = selectors.contactEditSlice(store.getState());
    expect(error).toEqual({ message: "Errore del server" });
  });
});
