import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getContactList, selectors } from "./ducks";

const ContactListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { entities = [], loading } = useSelector(selectors.contactListSlice);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  const goToEditPage = (id: string) => () => {
    navigate(`${id}`);
  };

  return (
    <>
      <div data-testid="title">Contact list</div>
      {loading ? (
        <div role="loader">Loading</div>
      ) : entities.length === 0 ? (
        "empty"
      ) : (
        entities.map((x) => (
          <div data-testid="contact" key={x.id}>
            <h1>{x.name}</h1>
            <h2>{x.city}</h2>
            <button onClick={goToEditPage(x.id)}>Edit</button>
          </div>
        ))
      )}
    </>
  );
};

export default ContactListPage;
