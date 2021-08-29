import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import useForm from '../../hooks/form';
import cookie from 'react-cookies';
import {TextField} from '@material-ui/core';
import Auth from '../../auth/auth';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useHistory } from 'react-router';


const API_SERVER = 'https://eraser-401.herokuapp.com';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    left: '50%',
    top: '50%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
      display: 'flex',
      flexFlow: 'wrap',
      height: 'auto',
      justifyContent: 'center',
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        padding: '20px 0 7px',
      },
  },
  space: {
    height: 40
  }
}));

export default function CreateAssignment({id, owner}) {
  const history = useHistory()
  const classes = useStyles();
  const [handleSubmit, handleChange, values] = useForm(newAssignment)
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const context = useContext(AuthContext)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  async function newAssignment(data) {
    const token = cookie.load('auth-token');
    const response = await fetch(`${API_SERVER}/course/${id}/create-assignment`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': API_SERVER,
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    let result = await response.json();
    handleClose()
    history.push('/')
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
      <div>

        <TextField
          id="filled-multiline-flexible"
          label="Assignment Title"
          name="assignmentTitle"
          multiline
          rowsMax={2}
          onChange={handleChange}
          variant="filled"
          required
        />
      </div>
            <br/>
        
        <div>

        <TextField
        id="date"
        label="Due Date"
        type="date"
        name="due_date"
        className={classes.textField}
        minDate={new Date()}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        
        required
      />
        </div>
        <br/>
      
        <div>

        <TextField
          id="filled-textarea"
          label="Assignment Text"
          name="assignmentText"
          placeholder="Placeholder"
          multiline
          variant="filled"
          onChange={handleChange}
          required
        />
        </div>
        <br/>
      <div className={classes.button}>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Create Assignment
      </button>
      </div>
      </form>
    </div>
  );

  return (
    <Auth cond={context.loggedIn && context.user.email == owner}>
    <div>
      <button type="button" className="btn btn-primary" onClick={handleOpen} style={{marginLeft:20}}>
        Create Assignment
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
    </Auth>
  );
}