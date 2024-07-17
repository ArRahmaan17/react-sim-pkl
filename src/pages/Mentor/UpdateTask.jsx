import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import moment from "moment";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../css/froala/froala_editor.min.css";
import "../../css/froala/froala_editor.pkgd.min.css";
import "../../css/froala/char_counter.min.css";
import "../../js/froala/froala_editor.min.js";
import "../../js/froala/froala_editor.pkgd.min.js";
import "../../js/froala/plugins.pkgd.min.js";
// import DatePicker from "rmc-date-picker/lib/DatePicker.js";
import DatePicker from "react-date-picker";
import FroalaEditorComponent from "react-froala-wysiwyg";
import Root from "../../routes/Root";
import { useDropzone } from "react-dropzone";
import * as Yub from "yup";
import axios from "axios";
import { Toaster, toast } from "alert";
import { useNavigate, useParams } from "react-router-dom";
import FabButton from "../components/FabButton.jsx";
let env = require("../config/config.json");
function UpdateTask() {
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [files, setFiles] = useState("");
  const loggedIn = localStorage.getItem("accessToken");
  const [task, setTask] = useState({});

  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
  };
  let { id } = useParams("id");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${env.backend_url}mentor/task/${id}`, {
        headers: { "X-Access-Token": loggedIn },
      })
      .then((response) => {
        setTask(response.data.data);
        setModel(response.data.data.content);
        setStatus(response.data.data.status);
        handleChangeStartDate(new Date(response.data.data.start_date));
        handleChangeEndDate(new Date(response.data.data.deadline_date));
      });
  }, []);
  const fileSize = (file) => {
    if (file.size > 100000) {
      return {
        code: "file size to large",
        message: `size is larger than 100kb`,
      };
    }
    return null;
  };
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: { "image/*": [".jpg", ".png", ".jpeg"] },
      maxFiles: 1,
      validator: fileSize,
    });
  const acceptedFileItems = acceptedFiles.map((file, index) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      updateFiles(e.target.result);
    };
    return (
      <img
        key={index}
        className="img-thumbnail"
        width="20%"
        src={files}
        alt=""
      />
    );
  });
  const fileRejectionsItems = fileRejections.map(({ file, errors }) => (
    <ul key={file.path}>
      {file.name} - {file.size / 1000}kb
      {errors.map((error) => (
        <li key={error.code}>{error.message}</li>
      ))}
    </ul>
  ));
  const taskSubmit = (data) => {
    if (status === "End") {
      toast.error(
        "Your update not effected to the task because task is already ended"
      );
    }
    data.start_date = moment(startDate).format("Y-M-D");
    data.deadline_date = moment(endDate).format("Y-M-D");
    data.content = model;
    data.status = status;
    if (files !== "") {
      data.thumbnail = files;
    }
    axios
      .post(`${env.backend_url}mentor/task/${id}/update`, data, {
        headers: { "X-Access-Token": loggedIn },
      })
      .then((response) => {
        navigate("/mentor/task");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const initialValues = {
    status: task.status,
    title: task.title,
  };
  const handleChangeContent = (event) => {
    setModel(event);
  };
  const validationSchema = Yub.object().shape({
    status: Yub.string().required(),
    title: Yub.string().max(100).required(),
  });
  const config = {
    placeholderText: "Edit Your Content Here!",
    charCounterCount: true,
  };
  const handleChangeEndDate = (date) => {
    if (
      moment(new Date(date).toISOString()).diff(moment().utcOffset(7), "days") <
      0
    ) {
      setStatus("End");
    } else if (moment(startDate).diff(moment(), "days") > 0) {
      setStatus("Pending");
    } else {
      setStatus("Start");
    }
    setEndDate(new Date(date));
  };
  const handleChangeStartDate = (date) => {
    setStartDate(new Date(date));
  };
  return (
    <>
      <Root />
      <FabButton />
      <div className="main-content">
        <Toaster position="bottom-right" duration={3500} reverse={true} />
        <div className="card">
          <div className="card-header">Task Form</div>
          <div className="card-body">
            <Formik
              onSubmit={taskSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
            >
              <Form>
                <label htmlFor="title" className="label">
                  Title
                </label>
                <Field name="title" id="title" className="form-control" />
                <ErrorMessage
                  name="title"
                  component="span"
                  className="invalid"
                />
                <label htmlFor="" className="label">
                  Content
                </label>
                <FroalaEditorComponent
                  tag="textarea"
                  config={config}
                  model={model}
                  onModelChange={handleChangeContent}
                />
                <label htmlFor="" className="label">
                  Start Date
                </label>
                <DatePicker
                  onChange={(date) => handleChangeStartDate(date)}
                  value={startDate}
                  className="date-picker"
                  minDate={new Date("2023-12-12")}
                  maxDate={new Date("2024-02-11")}
                />
                <label htmlFor="" className="label">
                  Deadline Date
                </label>
                <DatePicker
                  className="date-picker"
                  onChange={(date) => handleChangeEndDate(date)}
                  value={endDate}
                  minDate={startDate || new Date("2023-12-12")}
                  maxDate={new Date("2024-02-11")}
                />
                <label htmlFor="" className="label">
                  Thumbnail
                </label>
                <div className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input id="thumbnail" {...getInputProps()} />
                    <p>click to select files</p>
                    <em>(Only *.jpeg and *.png images will be accepted)</em>
                  </div>
                  <aside>
                    <div className="d-flex">
                      Accepted Thumbnail:{" "}
                      <div className="d-flex">{acceptedFileItems}</div>
                    </div>
                    <div className="d-flex">
                      Rejected Thumbnail:{" "}
                      <div className="d-flex">{fileRejectionsItems}</div>
                    </div>
                    {acceptedFiles.length === 0 && (
                      <>
                        <div>Recent Thumbnail:</div>
                        <img
                          src={env.backend_url + "/" + task.thumbnail}
                          className="img-thumbnail"
                          alt={task.thumbnail}
                        />
                      </>
                    )}
                  </aside>
                </div>
                <label htmlFor="status" className="label">
                  Status
                </label>
                <Field
                  name="status"
                  id="status"
                  readOnly={true}
                  value={status}
                  className="form-control"
                />
                <ErrorMessage
                  name="status"
                  component="span"
                  className="invalid"
                />
                <button type="submit" className="btn btn-warning mt-3">
                  Update Task
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateTask;
