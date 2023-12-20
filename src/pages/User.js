import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
function User() {
    const { id } = useParams();
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3001/users/${id}/`)
            .then((response) => {
                setUser(response.data.data)
            });
    }, []);
    return (
        <div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.phone_number}</div>
        </div>
    )
}

export default User
