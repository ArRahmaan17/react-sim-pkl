import React, { useEffect, useState } from "react";
import Root from "../../routes/Root";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, []);
  let [message, setMessage] = useState("");
  const initialValues = { username: "", password: "" };
  const validationSchema = Yub.object().shape({
    username: Yub.string().min(5).max(15).required(),
    password: Yub.string().min(7).max(15).required(),
  });
  const loginProcess = (data) => {
    axios
      .post("http://localhost:3001/users/auth/login", data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        navigate("/");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Login</div>
          </div>
          <div className="card-body">
            <div className="invalid">{message}</div>
            <Formik
              onSubmit={loginProcess}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form>
                <label htmlFor="username" className="label">
                  Username
                </label>
                <Field id="username" name="username" className="form-control" />
                <ErrorMessage
                  component="span"
                  className="invalid"
                  name="username"
                />
                <label htmlFor="password" className="label">
                  Password
                </label>
                <Field id="password" name="password" className="form-control" />
                <ErrorMessage
                  component="span"
                  className="invalid"
                  name="password"
                />
                <button type="submit" className="btn btn-success">
                  Login
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
