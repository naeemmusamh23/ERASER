import React from 'react';
import cookie from 'react-cookies';
import { useHistory } from "react-router";


const API_SERVER = 'https://eraser-401.herokuapp.com';

const Delete = ({id}) => {
    const history = useHistory()

    const handleDelete = () => {        
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/course/${id}/leave-course`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': API_SERVER,
            Authorization: `Bearer ${token}`
        },
    }).then(async (c) => {
        history.push('/')
    })
}

return (
    <div>
        <button
        className="btn btn-danger"
        onClick={handleDelete}
        >
        Leave This Course
        </button>
    </div>
  );
}

export default Delete;