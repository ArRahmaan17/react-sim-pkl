import React, { useEffect, useState } from "react";
import Root from "../../routes/Root";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  let [message, setMessage] = useState("");
  const initialValues = { username: "", password: "" };
  const validationSchema = Yub.object().shape({
    username: Yub.string().min(5).max(15).required(),
    password: Yub.string().min(7).max(15).required(),
  });
  const loginProcess = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data)
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
                <FloatingLabel label="username">
                  <Field
                    id="username"
                    name="username"
                    className="form-control mb-1"
                    placeholder="Username"
                  />
                </FloatingLabel>
                <ErrorMessage
                  component="span"
                  className="invalid mb-1"
                  name="username"
                />
                <FloatingLabel label="password">
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className="form-control mb-1"
                    placeholder="password"
                  />
                </FloatingLabel>
                <ErrorMessage
                  component="span"
                  className="invalid mb-1"
                  name="password"
                />
                <button type="submit" className="btn btn-success mt-2">
                  <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
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
