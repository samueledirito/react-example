import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Contact } from "../types";
import { getContact, selectors } from "./ducks";

interface ContactEditParams {
  id?: string;
}

const ContactEditPage: React.FC = () => {
  const { id } = useParams<ContactEditParams>();
  const dispatch = useDispatch();
  const { entity, loading, error } = useSelector(selectors.contactEditSlice);

  useEffect(() => {
    dispatch(getContact({ id }));
  }, [dispatch]);

  return (
    <Formik
      initialValues={entity || ({ id: "", name: "", city: "" } as Contact)}
      enableReinitialize
      onSubmit={(v) => console.log(v)}
    >
      {(props_ignored: FormikProps<any>) => (
        <>
          <div data-testid="title">Contact edit</div>
          {loading ? (
            <div role="loader">Loading</div>
          ) : (
            <Form data-testid="contactForm">
              <Field
                type="name"
                name="name"
                placeholder="name"
                data-testid="name"
              />
              <Field
                type="city"
                name="city"
                placeholder="city"
                data-testid="city"
              />
              <button type="submit" data-testid="save">
                Save
              </button>
            </Form>
          )}
          {error && (
            <div data-testid="error">Errors: {JSON.stringify(error)}</div>
          )}
          {JSON.stringify(props_ignored)}
        </>
      )}
    </Formik>
  );
};

export default ContactEditPage;
