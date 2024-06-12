import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Root from "../../routes/Root";
import FabButton from "../components/FabButton";
import {
  token as contextToken,
  validToken as contextValidToken,
} from "../../helpers/context";

function All() {
  let [validToken] = useState(contextValidToken);
  let [token] = useState(contextToken);
  const [listOfUsers, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!validToken) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/users", {
          headers: {
            "X-ACCESS-TOKEN": token,
          },
        })
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => {
          setUsers(error.response.data.data);
        });
    }
  }, [navigate]);
  return (
    <>
      <Root />
      <FabButton />
      <div className="main-content">
        {listOfUsers.map((value, key) => {
          return (
            <div
              key={value.id}
              className="card pointer"
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
