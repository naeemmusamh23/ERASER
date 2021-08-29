import React from 'react';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
import { useHistory } from 'react-router';
const API_SERVER = 'https://eraser-401.herokuapp.com';
export default function ContainedButtons({id, assignmentId}) {
  const history = useHistory()
  const handleDelete = () => {
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/course/${id}/delete-as/${assignmentId}`, {
        method: 'delete',
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

  return <Button variant="contained" color="secondary" onClick={handleDelete}>Delete Assignment</Button>;
}