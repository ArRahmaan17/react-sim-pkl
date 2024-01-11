import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Root from "../../routes/Root";

function CreateUser() {
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, []);
  const submitForm = (data) => {
    axios
      .post("http://localhost:3001/users/auth/registration", data)
      .then((response) => {
        navigate("/");
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
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-body">
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
                <label className="label">Username</label>
                <Field
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  id="username"
                  placeholder="john"
                  name="username"
                />
                <ErrorMessage
                  className="invalid"
                  component="span"
                  name="username"
                />
                <label className="label">Email</label>
                <Field
                  autoComplete="off"
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="john@jhon.com"
                  name="email"
                />
                <ErrorMessage
                  className="invalid"
                  name="email"
                  component="span"
                />
                <label className="label">Phone Number</label>
                <Field
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  id="phone_number"
                  placeholder="890-31...."
                  name="phone_number"
                />
                <ErrorMessage
                  className="invalid"
                  name="phone_number"
                  component="span"
                />
                <label className="label">Password</label>
                <Field
                  autoComplete="off"
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="password"
                  name="password"
                />
                <ErrorMessage
                  className="invalid"
                  name="password"
                  component="span"
                />
                <button className="btn btn-success" type="submit">
                  Create User
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
