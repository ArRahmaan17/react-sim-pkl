import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function CreateUser() {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  const submitForm = (data) => {
    axios
      .post("http://localhost:3001/auth/registration", data)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.errors[0].message);
      });
  };
  const validationSchema = Yub.object().shape({
    username: Yub.string().min(5).max(15).required(),
    email: Yub.string().email().required(),
    phone_number: Yub.string()
      .min(11, "phone number must be at least 11 characters")
      .max(13, "phone number must be at most 13 characters")
      .required("phone number is a required field"),
    password: Yub.string().min(7).max(15).required(),
  });
  return (
    <>
      <div className="main-content">
        <div className="card">
          <div className="card-body">
            <div className="invalid">{errorMessage}</div>
            <Formik
              onSubmit={submitForm}
              initialValues={{
                username: "",
                phone_number: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
            >
              <Form>
                <FloatingLabel label="Username">
                  <Field
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    id="username"
                    placeholder="john"
                    name="username"
                  />
                </FloatingLabel>
                <ErrorMessage
                  className="invalid"
                  component="span"
                  name="username"
                />
                <FloatingLabel label="Email">
                  <Field
                    autoComplete="off"
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="john@jhon.com"
                    name="email"
                  />
                </FloatingLabel>
                <ErrorMessage
                  className="invalid"
                  name="email"
                  component="span"
                />
                <FloatingLabel label="Phone Number">
                  <Field
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    id="phone_number"
                    placeholder="890-31...."
                    name="phone_number"
                  />
                </FloatingLabel>
                <ErrorMessage
                  className="invalid"
                  name="phone_number"
                  component="span"
                />
                <FloatingLabel label="Password">
                  <Field
                    autoComplete="off"
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="password"
                    name="password"
                  />
                </FloatingLabel>
                <ErrorMessage
                  className="invalid"
                  name="password"
                  component="span"
                />
                <button className="btn btn-success" type="submit">
                  <FontAwesomeIcon icon={faUserPlus} /> Create User
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
