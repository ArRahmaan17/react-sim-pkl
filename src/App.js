import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [listOfUsers, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUsers(response.data.data)
    })
  }, []);
  return (
    <div className="App">
      <ol>
        {listOfUsers.map((value, key) => {
          return <li>{value.phone_number} / {value.email}</li>
        })}
      </ol>
    </div>
  );
}

export default App;
