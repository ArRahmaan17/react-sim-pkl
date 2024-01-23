import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Root from "../../routes/Root";
import DOMPurify from "dompurify";

function Task() {
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const loggedIn = localStorage.getItem("accessToken");
  const commentSubmit = () => {
    if (comment.length < 1) {
      return;
    }
    let data = { content: comment };
    axios
      .post(`http://127.0.0.1:3001/mentor/task/${id}/comment`, data, {
        headers: { "X-Access-Token": loggedIn },
      })
      .then((response) => {
        setComment("");
        setComments(response.data.data);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://127.0.0.1:3001/mentor/task/${id}`, {
          headers: { "X-Access-Token": loggedIn },
        })
        .then((response) => {
          setTask(response.data.data);
          setComments(response.data.data.tasks_comments);
        })
        .catch((error) => {});
    } else {
      navigate("/login");
    }
  }, [loggedIn]);
  return (
    <>
      <Root />
      <div className="main-content">
        <div className="card">
          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/mentor/task");
              }}
            >
              Back
            </button>
          </div>
        </div>
        <div className="card">
          <img
            className="img-thumbnail-detail"
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
          <hr />
          <div className="comment-section">
            <textarea
              name="content"
              className="form-control"
              onChange={(e) => {
                setComment(e.currentTarget.value);
              }}
              placeholder={
                comments && comments.length > 0
                  ? "add your comment for this task"
                  : "be first commenter at this task"
              }
              value={comment}
            ></textarea>
            <button
              type="submit"
              className="btn btn-success"
              onClick={commentSubmit}
            >
              Send
            </button>
            <hr />
            <div className="comment-container">
              {comments &&
                comments.map((comment, key) => (
                  <div className="comment" key={key}>
                    <div className="comment-content" key={comment.id}>
                      <div className="comment-username">
                        by {comment.user.username}
                      </div>
                      {comment.content}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
