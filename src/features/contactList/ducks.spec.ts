import Axios from "axios";
import store from "../../store";
import { getContactList, selectors } from "./ducks";

describe("Async actions - contactList", () => {
  it("getContactList - fullfilled", async () => {
    (Axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: [
          {
            id: "1",
            type: "contact",
            attributes: { name: "Pino", city: "Pratone" },
          },
        ],
      },
    });
    await store.dispatch(getContactList());
    const { entities } = selectors.contactListSlice(store.getState());
    expect(entities.length).toEqual(1);
  });

  it("getContact - rejected", async () => {
    (Axios.get as jest.Mock).mockRejectedValue("Errore del server");
    await store.dispatch(getContactList());
    const { error } = selectors.contactListSlice(store.getState());
    expect(error).toEqual({ message: "Errore del server" });
  });
});
