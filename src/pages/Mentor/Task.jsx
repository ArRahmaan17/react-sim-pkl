import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Root from "../../routes/Root";
import DOMPurify from "dompurify";

function Task() {
  const { id } = useParams("id");
  const [task, setTask] = useState({});
  const loggedIn = localStorage.getItem("accessToken");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/mentor/task/${id}`, {
        headers: { "X-Access-Token": loggedIn },
      })
      .then((response) => {
        setTask(response.data.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <img
            className="img-thumbnail"
            src={"http://127.0.0.1:3001/" + task.thumbnail}
            alt={task.title}
          />
          <div className="task-title">{task.title}</div>
          <div
            className="task-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(task.content),
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Task;
