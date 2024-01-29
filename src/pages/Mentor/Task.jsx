import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Root from "../../routes/Root";
import DOMPurify from "dompurify";
import moment from "moment";
import { Toaster, toast } from "alert";
import {
  Button,
  Modal,
  FloatingLabel,
  Form,
  ListGroup,
  Card,
  Form as FormBootstrap,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faComment,
  faComments,
  faTimeline,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

function Task() {
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const loggedIn = localStorage.getItem("accessToken");
  const [openModal, setOpenModal] = useState(false);
  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);
  const user = jwtDecode(loggedIn);
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
        toast.success("Your comment added");
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
        .catch((error) => {
          navigate("/mentor/task");
        });
    } else {
      navigate("/login");
    }
  }, [loggedIn]);
  return (
    <>
      <Root />
      <div className="main-content">
        <Toaster position="bottom-right" duration={3500} reverse={true} />
        <div className="card">
          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/mentor/task");
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
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
          <Button variant="primary" className="mx-3" onClick={showModal}>
            <FontAwesomeIcon icon={faTimeline} /> Update Timeline Task
          </Button>
          <hr />
          <div className="comment-section">
            <FloatingLabel
              controlId="floatingTextarea2"
              label={
                comments && comments.length > 0
                  ? "add your comment for this task"
                  : "be first commenter at this task"
              }
            >
              <Form.Control
                name="content"
                as="textarea"
                onChange={(e) => {
                  setComment(e.currentTarget.value);
                }}
                placeholder={
                  comments && comments.length > 0
                    ? "add your comment for this task"
                    : "be first commenter at this task"
                }
                style={{ height: "100px" }}
                value={comment}
              />
            </FloatingLabel>
            <button
              type="submit"
              className="btn btn-success mt-3"
              onClick={commentSubmit}
            >
              <FontAwesomeIcon icon={faComments} /> Add Comment
            </button>
            <hr />
            <div className="comment-container">
              {comments &&
                comments.map((comment, key) => (
                  <Card className="mb-2 p-0" key={key}>
                    <Card.Body className="py-1">
                      <blockquote className="blockquote mb-0">
                        <p className="text-sm">
                          <FontAwesomeIcon icon={faComments} />{" "}
                          {comment.content}
                        </p>
                        <footer className="blockquote-footer text-sm">
                          {moment(comment.createdAt).fromNow()} by{" "}
                          <cite title="Source Title">
                            <FontAwesomeIcon icon={faUser} />{" "}
                            {comment.user.username}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        onHide={hideModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update your task timeline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormBootstrap>
            <FloatingLabel label="Username" className="mb-3">
              <FormBootstrap.Control
                type="text"
                placeholder="Username"
                readOnly={true}
                value={user.username}
              />
            </FloatingLabel>
            <FloatingLabel label="Description" className="mb-3">
              <FormBootstrap.Control
                as="textarea"
                placeholder="Description"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </FormBootstrap>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={hideModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Task;
