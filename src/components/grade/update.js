import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { TextField } from '@material-ui/core';
import useForm from '../hooks/form';
import { useParams } from "react-router";
import cookie from 'react-cookies';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '90%',
    margin: '0 auto'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  inp: {
      margin: 5
  },
  upBtn: {
    float: 'right'
  }
}));

const API_SERVER = 'https://eraser-401.herokuapp.com';

export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [handleSubmit, handleChange, values]= useForm(handleUpdate)
  const { id } = useParams();

  function handleUpdate (email) {
    const token = cookie.load('auth-token');
    fetch(`${API_SERVER}/course/${id}/grades`,{
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(email),
    }).then(async (c)=>{
      let data = await c.json();
      handleClose();
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className={classes.upBtn} >
      <button className="btn btn-primary " type="button" onClick={handleOpen}>
        Update Grades
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <div className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <TextField className={classes.inp} onChange={handleChange} label="email" name="email" variant="filled" requierd/>
                <TextField className={classes.inp} onChange={handleChange} label="midExam" name="midExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="firstExam" name="firstExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="secondExam" name="secondExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="quizOne" name="quizOne" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="quizTwo" name="quizTwo" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="quizThree" name="quizThree" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="finalExam" name="finalExam" variant="filled" />
                <TextField className={classes.inp} onChange={handleChange} label="overAll" name="overAll" variant="filled" />
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>

      </Modal>
    </div>
    </>
  );
}