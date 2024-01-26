import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [files, setFiles] = useState("");
  const loggedIn = localStorage.getItem("accessToken");
  const [task, setTask] = useState({});
  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles);
  };
  let { id } = useParams("id");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/mentor/task/${id}`, {
        headers: { "X-Access-Token": loggedIn },
      })
      .then((response) => {
        setTask(response.data.data);
        setModel(response.data.data.content);
        console.log(new Date(response.data.data.start_date));
        console.log(new Date(response.data.data.deadline_date));
        setStartDate(new Date(response.data.data.start_date));
        setEndDate(new Date(response.data.data.deadline_date));
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
    console.log(data, startDate, endDate);
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
      moment(new Date(date).toISOString()).diff(
        moment().utcOffset(7),
        "days"
      ) <= 0
    ) {
      setStatus("Start");
    } else {
      setStatus("Pending");
    }
    setEndDate(new Date(date));
  };
  const handleChangeStartDate = (date) => {
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
    setStartDate(new Date(date));
  };
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
                  defaultDate={startDate}
                  minDate={startDate}
                  maxDate={new Date(2024, 1, 29)}
                  onDateChange={handleChangeStartDate}
                />
                <label htmlFor="" className="label">
                  Deadline Date
                </label>
                <DatePicker
                  defaultDate={endDate}
                  minDate={startDate}
                  maxDate={new Date(2024, 1, 29)}
                  onDateChange={handleChangeEndDate}
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
                    <div className="d-flex">{acceptedFileItems}</div>
                    <div className="d-flex">{fileRejectionsItems}</div>
                  </aside>
                </div>
                {acceptedFiles.length === 0 && (
                  <img
                    src={"http://127.0.0.1:3001/" + task.thumbnail}
                    className="img-thumbnail"
                    alt={task.thumbnail}
                  />
                )}
                <label htmlFor="status" className="label">
                  Status
                </label>
                <Field
                  name="status"
                  id="status"
                  readOnly={true}
                  value={task.status}
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
