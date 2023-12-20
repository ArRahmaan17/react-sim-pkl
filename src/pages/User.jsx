import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function User() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}/`).then((response) => {
      setUser(response.data.data);
    });
  }, [id]);
  let navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">Detail User {id}</div>
      <div className="card-body">
        <div>
          Name:{" "}
          {user.first_name == null
            ? "Empty"
            : `${user.first_name} ${user.last_name}`}
        </div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Phone Number: {user.phone_number}</div>
        <div>Address: {user.address ?? "Empty"}</div>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-warning"
          onClick={() => {
            navigate(`update`, { state: { user: user } });
          }}
        >
          Update
        </button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default User;
