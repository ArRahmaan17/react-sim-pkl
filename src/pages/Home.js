import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [listOfUsers, setUsers] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/users").then((response) => {
            setUsers(response.data.data)
        })
    }, []);
    return (
        <div className='container'>
            {listOfUsers.map((value, key) => {
                return <div key={value.id} className='card' onClick={() => { navigate(`/user/${value.id}`) }}>
                    <div className='card-header'>
                        {value.username}
                    </div>
                    <div className='card-body'>
                        <div className='card-title'>{value.email}</div>
                        <div className='card-text'>
                            {value.phone_number} / {value.email}
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Home
