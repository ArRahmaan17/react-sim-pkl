import React, { useEffect, useState } from "react";
import Root from "../../routes/Root";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
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
              <FontAwesomeIcon icon={faPlus} /> Create Task
            </button>
          </div>
        </div>
        {tasks &&
          tasks.map((task) => (
            <div key={task.id} className="card">
              <div className="card-body">
                <img
                  src={"http://127.0.0.1:3001/" + task.thumbnail}
                  alt=""
                  className="img-thumbnail"
                  onClick={() => {
                    navigate(`/mentor/task/${task.id}`);
                  }}
                />
                <div
                  className="card-title"
                  onClick={() => {
                    navigate(`/mentor/task/${task.id}`);
                  }}
                >
                  {task.title}
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex">
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => {
                      navigate(`/mentor/task/${task.id}/update`);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} /> Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => {
                      navigate(`/mentor/task/${task.id}/update`);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>{" "}
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
