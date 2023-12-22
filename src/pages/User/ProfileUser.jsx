import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Root from "../../routes/Root";

function ProfileUser() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}/`).then((response) => {
      if (Object.keys(response.data.data).length === 0) {
        navigate("/");
      }
      setUser(response.data.data);
    });
  }, [id, navigate]);
  const {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    address,
    profile_picture,
  } = user;
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
    profile_picture: Yub.mixed()
      .nullable(true)
      .test("FILE_ALLOWED", "type file is not allowed", (value) => {
        if (value === undefined) {
          return true;
        } else {
          return value.type.split("image/").length > 1;
        }
      }),
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
      let postData = new FormData(
        document.getElementById("form-profile-upload")
      );
      if (postData.profile_picture == null) {
        postData.delete("profile_picture");
      }
      axios
        .post(`http://localhost:3001/users/${id}`, postData)
        .then((response) => {
          navigate(`/user/${id}`);
        });
    },
  });
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-body">
            <form id="form-profile-upload" onSubmit={formik.handleSubmit}>
              <label className="label" htmlFor="first_name">
                First Name
              </label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                id="first_name"
                name="first_name"
                defaultValue={first_name ?? ""}
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
                defaultValue={last_name ?? ""}
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
                defaultValue={username ?? ""}
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
                defaultValue={email ?? ""}
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
                defaultValue={phone_number ?? ""}
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
                defaultValue={address ?? ""}
              ></textarea>
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
                defaultValue={password ?? ""}
              />
              {formik.errors.password && (
                <span className="invalid">{formik.errors.password}</span>
              )}
              <label className="label" htmlFor="profile_picture">
                Profile Picture : {profile_picture}
              </label>
              <input
                className="form-control-file"
                autoComplete="off"
                type="file"
                id="profile_picture"
                name="profile_picture"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue(
                    "profile_picture",
                    e.currentTarget.files[0]
                  );
                }}
              />
              {formik.errors.profile_picture && (
                <span className="invalid">{formik.errors.profile_picture}</span>
              )}
              <div className="flex-end">
                <button className="btn btn-warning" type="submit">
                  Update Profile
                </button>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={back}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
