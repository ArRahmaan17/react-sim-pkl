import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Root from "../../routes/Root";

function All() {
  const [listOfUsers, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUsers(response.data.data);
    });
  }, []);
  return (
    <>
      <Root />
      <div className="main-content">
        {listOfUsers.map((value, key) => {
          return (
            <div
              key={value.id}
              className="card"
              onClick={() => {
                navigate(`/user/${value.id}`);
              }}
            >
              <div className="card-header">{value.username}</div>
              <div className="card-body">
                <div className="card-title">{value.email}</div>
                <div className="card-text">{value.phone_number}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default All;
