import React, { useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
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
import { Dropzone, FileItemEnglish, FileMosaic } from "@dropzone-ui/react";
function Tasks() {
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [files, setFiles] = useState([]);
  const config = {
    placeholderText: "Edit Your Content Here!",
    charCounterCount: true,
  };
  const handleChange = (event) => {
    setModel(event);
  };

  const handleChangeStartDate = (date) => {
    setStartDate(date);
    setEndDate(date);
  };
  const handleChangeEndDate = (date) => {
    setEndDate(date);
  };
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-header">Task Form</div>
          <div className="card-body">
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
            <Dropzone
              onChange={updateFiles}
              value={files}
              accept="image/*"
              maxFileSize={1050000}
              maxFiles={3}
              fakeUpload={true}
              url="http://localhost:3001"
              view="list"
              draggable
            >
              {files.map((file, index) => (
                <FileMosaic key={index} {...file} preview />
              ))}
            </Dropzone>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
