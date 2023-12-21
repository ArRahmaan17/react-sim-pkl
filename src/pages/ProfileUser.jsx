import React from "react";
import { useFormik } from "formik";
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
    profile_picture: Yub.mixed().required(),
  });
  const back = () => {
    navigate(`/user/${id}`);
  };
  const formik = useFormik({
    initialValues: {
      first_name: first_name ?? "",
      last_name: last_name ?? "",
      username: username ?? "",
      email: email ?? "",
      phone_number: phone_number ?? "",
      password: password ?? "",
      address: address ?? "",
      profile_picture: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      console.log(data);
      // axios.post(`http://localhost:3001/users/${id}`, data).then((response) => {
      //   navigate(`/user/${id}`);
      // });
    },
  });
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <label className="label" htmlFor="first_name">
            First Name
          </label>
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            id="first_name"
            name="first_name"
            value={first_name ?? ""}
          />
          {formik.errors.first_name && (
            <span className="invalid">{formik.errors.first_name}</span>
          )}
          <label className="label" htmlFor="last_name">
            Last Name
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="text"
            id="last_name"
            name="last_name"
            value={last_name ?? ""}
          />
          {formik.errors.last_name && (
            <span className="invalid">{formik.errors.last_name}</span>
          )}
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="text"
            id="username"
            name="username"
            value={username ?? ""}
          />
          {formik.errors.username && (
            <span className="invalid">{formik.errors.username}</span>
          )}
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={email ?? ""}
          />
          {formik.errors.email && (
            <span className="invalid">{formik.errors.email}</span>
          )}
          <label className="label" htmlFor="phone_number">
            Phone Number
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="text"
            id="phone_number"
            name="phone_number"
            value={phone_number ?? ""}
          />
          {formik.errors.phone_number && (
            <span className="invalid">{formik.errors.phone_number}</span>
          )}
          <label className="label" htmlFor="address">
            Address
          </label>
          <textarea
            autoComplete="off"
            className="form-control"
            id="address"
            name="address"
          >
            {address ?? ""}
          </textarea>
          {formik.errors.address && (
            <span className="invalid">{formik.errors.address}</span>
          )}
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="off"
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password ?? ""}
          />
          {formik.errors.password && (
            <span className="invalid">{formik.errors.password}</span>
          )}
          <label className="label" htmlFor="profile_picture">
            Profile Picture
          </label>
          <input
            className="form-control-file"
            autoComplete="off"
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={(e) => {
              formik.setFieldValue("profile_picture", e.currentTarget.files[0]);
            }}
          />
          {formik.errors.profile_picture && (
            <span className="invalid">{formik.errors.profile_picture}</span>
          )}
          <div className="flex-end">
            <button className="btn btn-warning" type="submit">
              Update Profile
            </button>
            <button className="btn btn-success" type="button" onClick={back}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUser;
