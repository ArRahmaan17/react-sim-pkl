import React, { useEffect, useState } from "react";
import Root from "../../routes/Root";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function Tasks() {
  let loggedIn = localStorage.getItem("accessToken");
  let [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const createTasks = () => {
    navigate("/mentor/create-task");
  };
  useEffect(() => {
    if (loggedIn) {
      axios
        .get("http://localhost:3001/mentor/task", {
          headers: { "X-Access-Token": loggedIn },
        })
        .then((response) => {
          setTasks(response.data.data);
        })
        .catch((error) => {});
    } else {
      navigate("login");
    }
  }, []);
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-footer">
            <button className="btn btn-success" onClick={createTasks}>
              Create Task
            </button>
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
              </div>
              <div className="card-footer">
                {moment(task.createdAt).format("LLL")} by{" "}
                {task.user.first_name ?? task.user.username}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Tasks;
