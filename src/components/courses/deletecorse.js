import React from 'react';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import { useHistory } from "react-router";

const useStyles = makeStyles({
    button: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: -38
    }
});
const API_SERVER = 'https://eraser-401.herokuapp.com';
const Delete = () => {
    const history = useHistory()
    const classes = useStyles();
    const [ deleteItem, setDeleteItem ] = React.useState([]);

    const { id } = useParams();

    const handleClick = () => {        
        const token = cookie.load('auth-token');
        fetch(`${API_SERVER}/course/${id}/delete`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
        }).then(async (c) => {
            let arraya = await c.json();
            history.push('/')
        })
}

return (
    <div className={classes.button}>
        <button
        className="btn btn-danger"
        onClick={()=>{handleClick(deleteItem.id)}}
        >
        <DeleteSweepIcon /> Delete The Course
        </button>
    </div>
  );
}

export default Delete;