import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';

const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalButton: {
    marginTop: 30,
  },
}));


export default function TemporaryDrawer () {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ listTodo, setListTodo ] = React.useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/task`, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
      }).then(async (c) => {
          let data = await c.json();
          setListTodo(()=>[...data]);
      })
  },[])

  return (
    <div className={classes.modalButton}>
    <button type="button" className="btn btn-primary" onClick={handleOpen}>
      Todo list
    </button>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {listTodo.map(index => (
            <Typography>{index.quizTitle ? index.quizTitle : index.assignmentTitle}</Typography>
          ))}
        </div>
      </Fade>
    </Modal>
  </div>
  );
  
}