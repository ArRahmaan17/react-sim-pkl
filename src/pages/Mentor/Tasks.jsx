import React, { useEffect, useState } from "react";
import Root from "../../routes/Root";
import axios from "axios";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
function Tasks() {
  let loggedIn = localStorage.getItem("accessToken");
  let [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/mentor/task", {
        headers: { "X-Access-Token": loggedIn },
      })
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-footer">
            <button className="btn btn-success">Create Task</button>
          </div>
        </div>
        {tasks &&
          tasks.map((task) => (
            <div
              key={task.id}
              className="card"
              onClick={() => {
                navigate(`/mentor/task/${task.id}`);
              }}
            >
              <div className="card-body">
                <img
                  src={"http://127.0.0.1:3001/" + task.thumbnail}
                  alt=""
                  className="img-thumbnail"
                />
                <div className="card-title">{task.title}</div>
                {/* <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(task.content),
                  }}
                ></div> */}
              </div>
              <div className="card-footer">Title</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Tasks;
