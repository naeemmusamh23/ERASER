import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Show from '../../Show';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Typography, useForkRef } from '@material-ui/core';
import { Button, TextareaAutosize } from '@material-ui/core';
import useForm from '../../hooks/form';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteAssignment from './delete';
const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  ass: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
    // width: '75%'
  },
  title: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  text: {
    alignContent: 'center',
    padding: theme.spacing(2),
    width: '50%',
    border: '2px grey solid',
    borderRadius: 20,
    boxShadow: '0 8px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  solution: {
    alignContent: 'center',
    padding: theme.spacing(2),
    width: '45%'
  },
  submit: {
    padding: theme.spacing(2),
  },  
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
}));

export default function OneAssignment(props) {
  const classes = useStyles();
  const token = cookie.load('auth-token');
  const context = useContext(AuthContext)
  const [currentAssignment, setCurrentAssignment] = useState({solutionInfo: []});
  const [handleSubmit, handleChange, values] = useForm(getData);
  const [loading, setLoading] = React.useState(true);
  const [start, setStart] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [owner, setOwner] = useState('');
  const { id, assID } = useParams();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetch(`${API_SERVER}/course/${id}`, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      },
    }).then(async (c) => {
      let data = await c.json();
      setOwner(()=> data.owner)
      data.assignments.forEach(assignment => {

        if (assignment._id === assID) {
          setCurrentAssignment(assignment);
          setLoading(false);
        }

      });
    });
  }, []);

  function getData(data) {
    setLoading(true);

    const token = cookie.load('auth-token');
    const obj = {
      email:props.email,
      solution: data.solution
    }
    //TO save the solution in the database
    axios({
      method: 'post',
      url: `/course/${id}/${assID}/submit-assignment`,
      mode: 'cors',
      baseURL: API_SERVER,
      data: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setLoading(false);
      setFinish(true);
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  const handleStart = () => {
    setStart(true)
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className={classes.title}>
        <Show condition={loading}>
          <CircularProgress />
        </Show>
        <Typography variant="h2" gutterBottom>
          {currentAssignment.assignmentTitle}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Due Date : </strong>{currentAssignment.due_date}
        </Typography>
      </Box>
      <Show condition={!start && context.user.email != owner}>
        <Button color="primary"
          variant="contained"
          className={classes.start}
          onClick={handleStart}
        >
          Start Assignment
        </Button>
      </Show >

      <div>
        <Show condition={context.user.email == owner}>
          <div className="centerDiv">

        <Button color='primary' variant='contained' type="button" onClick={handleOpen}>
          Show Student Solution
        </Button>
        <DeleteAssignment id={id} assignmentId={currentAssignment._id} />
          </div>
        </Show>
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
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Name Student </TableCell>
                  <TableCell align="left"> Solutions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentAssignment.solutionInfo.map((index) => {
                  return (
                  <TableRow >
                    <TableCell align="left">{index.student}</TableCell>
                    <TableCell align="left">{index.solution.solution}</TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        </Fade>
        </Modal>
      </div>

      <Box className={classes.ass}>
        <Typography className={classes.text}>
          {currentAssignment.assignmentText}
        </Typography>
      </Box>

      <Show condition={start && !finish}>
        <Box>
          <form onSubmit={handleSubmit} className={classes.ass}>
            <TextareaAutosize className={classes.solution}
              onChange={handleChange}
              maxRows={50}
              placeholder="Submit your Solution Text Or link for external file"
              name="solution"
            />
            <Button variant="contained" className={classes.submit} type="submit">Submit Assignment</Button>
          </form>

        </Box>

      </Show>
      <Box className={classes.title}>
        <Show condition={loading}>
          <CircularProgress />
        </Show>
        <Show condition={finish}>
          <Typography variant="h3" gutterBottom>
            You Submitted Successfully
          </Typography>
        </Show>
      </Box>

    </div >
  );
}