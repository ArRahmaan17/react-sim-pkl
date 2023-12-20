import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ProfileUser() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    id,
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    address,
  } = state.user;
  const validationSchema = Yub.object().shape({
    first_name: Yub.string()
      .min(8, "first name must be at least 8 characters")
      .max(20, "first name must be at most 20 characters")
      .required("first name is a required field"),
    last_name: Yub.string()
      .min(8, "last name must be at least 8 characters")
      .max(20, "last name must be at most 20 characters")
      .required("last name is a required field"),
    username: Yub.string().min(5).max(15).required(),
    email: Yub.string().email().required(),
    phone_number: Yub.string().min(11).max(13).required(),
    password: Yub.string().min(7).max(15).required(),
    address: Yub.string().min(15).max(255).required(),
  });
  const onSubmit = (data) => {
    console.log(data);
    axios.put(`http://localhost:3001/users/${id}`, data).then((response) => {
      navigate(`/user/${id}`);
    });
  };
  const back = () => {
    navigate(`/user/${id}`);
  };
  return (
    <div className="card">
      <div className="card-body">
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            first_name: first_name ?? "",
            last_name: last_name ?? "",
            username: username,
            email: email,
            phone_number: phone_number,
            password: password,
            address: address ?? "",
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <label className="label" htmlFor="first_name">
              First Name
            </label>
            <Field
              className="form-control"
              autoComplete="off"
              type="text"
              id="first_name"
              name="first_name"
            />
            <ErrorMessage
              className="invalid"
              name="first_name"
              component="span"
            />
            <label className="label" htmlFor="last_name">
              Last Name
            </label>
            <Field
              autoComplete="off"
              className="form-control"
              type="text"
              id="last_name"
              name="last_name"
            />
            <ErrorMessage
              className="invalid"
              name="last_name"
              component="span"
            />
            <label className="label" htmlFor="username">
              Username
            </label>
            <Field
              autoComplete="off"
              className="form-control"
              type="text"
              id="username"
              name="username"
            />
            <label className="label" htmlFor="email">
              Email
            </label>
            <Field
              autoComplete="off"
              className="form-control"
              type="email"
              id="email"
              name="email"
            />
            <label className="label" htmlFor="phone_number">
              Phone Number
            </label>
            <Field
              autoComplete="off"
              className="form-control"
              type="text"
              id="phone_number"
              name="phone_number"
            />
            <label className="label" htmlFor="address">
              Address
            </label>
            <Field
              autoComplete="off"
              className="form-control"
              type="text"
              as="textarea"
              id="address"
              name="address"
            />
            <ErrorMessage className="invalid" name="address" component="span" />
            <label className="label" htmlFor="password">
              Password
            </label>
            <Field
              autoComplete="off"
              className="form-control"
              type="password"
              id="password"
              name="password"
            />
            <ErrorMessage
              className="invalid"
              name="password"
              component="span"
            />
            <div className="flex-end">
              <button className="btn btn-warning" type="submit">
                Update Profile
              </button>
              <button className="btn btn-success" type="button" onClick={back}>
                Back
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ProfileUser;
