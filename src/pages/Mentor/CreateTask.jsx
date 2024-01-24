import React, { useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import moment from "moment";
import "rmc-picker/assets/index.css";
import "rmc-date-picker/assets/index.css";
import "rmc-picker/assets/popup.css";
import "../../css/froala/froala_editor.min.css";
import "../../css/froala/froala_editor.pkgd.min.css";
import "../../css/froala/char_counter.min.css";
import "../../js/froala/froala_editor.min.js";
import "../../js/froala/froala_editor.pkgd.min.js";
import "../../js/froala/plugins.pkgd.min.js";
import DatePicker from "rmc-date-picker/lib/DatePicker.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import Root from "../../routes/Root";
import { useDropzone } from "react-dropzone";
import * as Yub from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {
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
  const navigate = useNavigate();
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [files, setFiles] = useState("");
  const loggedIn = localStorage.getItem("accessToken");

  const config = {
    placeholderText: "Edit Your Content Here!",
    charCounterCount: true,
  };
  const handleChange = (event) => {
    setModel(event);
  };
  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeStartDate = (date) => {
    console.log(
      moment(new Date(date).toISOString()).diff(moment().utcOffset(7), "days")
    );
    if (
      moment(new Date(date).toISOString()).diff(
        moment().utcOffset(7),
        "days"
      ) <= 0
    ) {
      setStatus("Start");
    } else {
      setStatus("Pending");
    }
    setStartDate(date);
    setEndDate(date);
  };
  const handleChangeEndDate = (date) => {
    if (
      moment(new Date(date).toISOString()).diff(
        moment().utcOffset(7),
        "days"
      ) <= 0
    ) {
      setStatus("Start");
    } else {
      setStatus("Pending");
    }
    setEndDate(date);
  };
  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
  };
  const initialValues = {
    status: status,
    title: title,
  };

  const validationSchema = Yub.object().shape({
    status: Yub.string().required(),
    title: Yub.string().max(100).required(),
  });

  const taskSubmit = (data) => {
    data.thumbnail = files;
    data.content = model;
    data.start_date = moment(startDate).format("Y-M-D");
    data.deadline_date = moment(endDate).format("Y-M-D");
    axios
      .post("http://localhost:3001/mentor/task/create", data, {
        headers: {
          "X-ACCESS-TOKEN": loggedIn,
        },
      })
      .then((response) => {
        navigate("/mentor/task");
      })
      .catch((error) => {});
  };
  const acceptedFileItems = acceptedFiles.map((file, index) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      updateFiles(e.target.result);
    };
    return (
      <img
        key={index}
        className="camera-stream"
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
  return (
    <>
      <Root />
      <div className="main-content">
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
                <Field
                  name="title"
                  id="title"
                  className="form-control"
                  onChange={handleTitleChange}
                />
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
                  onModelChange={handleChange}
                />
                <label htmlFor="" className="label">
                  Start Date
                </label>
                <DatePicker
                  defaultDate={startDate || new Date()}
                  minDate={new Date(2023, 11, 1)}
                  maxDate={new Date(2024, 1, 29)}
                  onDateChange={handleChangeStartDate}
                />
                <label htmlFor="" className="label">
                  Deadline Date
                </label>
                <DatePicker
                  defaultDate={endDate || new Date()}
                  minDate={startDate || new Date()}
                  maxDate={new Date(2024, 1, 29)}
                  onDateChange={handleChangeEndDate}
                />
                <label htmlFor="" className="label">
                  Thumbnail
                </label>
                <div className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input id="thumbnail" {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                    <em>(Only *.jpeg and *.png images will be accepted)</em>
                  </div>
                  <aside>
                    <div className="d-flex">{acceptedFileItems}</div>
                    <div className="d-flex">{fileRejectionsItems}</div>
                  </aside>
                </div>
                <label htmlFor="status" className="label">
                  Status
                </label>
                <Field
                  name="status"
                  id="status"
                  readOnly={true}
                  value={status || ""}
                  className="form-control"
                />
                <ErrorMessage
                  name="status"
                  component="span"
                  className="invalid"
                />
                <button type="submit" className="btn btn-success">
                  Create Task
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
