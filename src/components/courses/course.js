import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Popover } from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Delete from './deletecorse.js';
import CreateRoom from './CreateRoom';
import CreateAssignment from './assignment/create';
import CreateQuiz from './quiz/create';
import OpenRooms from './openRooms'
import io from 'socket.io-client';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Leave from './leave';
import MyAssignment from './assignment/modal.js';
import MyQuizzes from './quiz/modal';
import { useHistory } from 'react-router-dom';
import Auth from '../auth/auth.js';
import { AuthContext } from '../../context/authContext.js';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './course.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import Show from '../Show'


const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: '5px auto',

  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  deleteRooms: {
    marginLeft: "45%",
  },
  center: {
    width: '100%',
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
    marginTop: -37
  },
  typography: {
    padding: theme.spacing(2),
    margin: '0 auto'
  },
  clipboard: {

    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  }
}));

export const socket = io.connect('https://eraser-401.herokuapp.com');

export default function CenteredGrid() {
  const history = useHistory()
  const classes = useStyles();
  const [current, setCurrent] = useState({});
  const [rooms, setRooms] = useState([])
  const [grade, setGrade] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id } = useParams();
  const context = useContext(AuthContext)
  const open = Boolean(anchorEl);
  const popID = open ? 'invitationLink' : undefined;
  useEffect(() => {

    socket.on('rooms', (data) => {
      setRooms(data)
    })
  }, [rooms])

  useEffect(() => {

    socket.emit('give me the rooms', 'hi')
    const token = cookie.load('auth-token');
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
      setCurrent(data);
      let gradeData = data.grades;
      setGrade([...gradeData]);
      setAssignment(data.assignments)
      setQuiz(data.quizes)
    })

  }, [])
  const goToStudents = () => {
    history.push(`/course/${id}/students`)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DeleteTheRooms=()=>{
    socket.emit('deleteTheRooms',id)
  }
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            
            <Paper className={classes.paper}>
              <Button onClick={()=> history.push('/')} ><ArrowBackIosIcon/> Back</Button>
              <Auth cond={context.loggedIn && context.user.email == current.owner}>
              <Delete owner={current.owner} />
              </Auth>
              <Auth cond={context.loggedIn && context.user.email != current.owner}>
                <div className={classes.right}>

                <Leave id={id} />
                </div>
              </Auth>
              <Typography className={classes.center} variant="h2" gutterBottom>
                {current.name}
              </Typography>
              <Typography className={classes.center} variant="subtitle1" gutterBottom>
                {current.description}
              </Typography>
              <div className={classes.center}>

              <Button variant="contained" onClick={handleClick}>Invitation Code</Button>
            <Popover
              id={popID}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >

              <Typography className={classes.typography}>
                <input type="text" data-autoselect="" value={current._id} aria-label={current._id} readonly="" />
                <Show condition={copied}><CheckSharpIcon color="primary" /></Show>
                <CopyToClipboard text={current._id}
                  onCopy={() => setCopied(true)}
                >
                  <FileCopyOutlinedIcon className={classes.clipboard} />
                </CopyToClipboard>
              </Typography>
            </Popover>
              </div>
              <div className="btncourse">
              <MyAssignment id={id} assignments={assignment} />
              <MyQuizzes id={id} quiz={quiz} />
              </div>
              <Auth cond={context.loggedIn && context.user.email == current.owner}>
                
                <div className="btncourse2">
                <button type="button" className="btn btn-primary" onClick={goToStudents}>Students Grades</button>
                <CreateAssignment id={id} owner={current.owner} style={{margin:20}} />
                <CreateQuiz id={id} owner={current.owner} />
                </div>
              <div className="roomsEdit">

                <CreateRoom id={id} owner={current.owner} />
                <button type="button" className="btn btn-primary noMargin" style={{marginTop:20}}startIcon={<DeleteIcon />} onClick={DeleteTheRooms}>Delete Rooms</button>
              </div>
              </Auth>
              <OpenRooms id={id} rooms={rooms} email={context.user.email} owner={current.owner}/>
              
            </Paper>

          </Grid>

        </Grid>
      </div>
    </>
  );
}