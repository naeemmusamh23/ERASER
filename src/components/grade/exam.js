import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import UpdateComp from './update';
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const API_SERVER = 'https://eraser-401.herokuapp.com';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    button: {
        marginTop: 20,
        marginRight: 70,
    },
    
});

function MyVerticallyCenteredModal(props) {

    const classes = useStyles();
    const [ grade, setGrade ] = React.useState([]);
    const history = useHistory()

    const { id } = useParams();

    useEffect(() => {
        const token = cookie.load('auth-token');
        fetch(`${API_SERVER}/course/${id}/grades`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
        }).then(async (c) => {
            let data = await c.json();
            setGrade([...data]);
    })
    },[])
    const handleDelete = email => {
      const token = cookie.load('auth-token');
      fetch(`${API_SERVER}/course/${id}/delete-student`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-origin': '*',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({email}),
    }).then(async (c) => {
        history.push(`/course/${id}`)
    })
    }

    return (
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <h3> Grade </h3>
              <Button onClick={()=> history.push(`/course/${id}`)} ><ArrowBackIosIcon/>Back</Button>
        <UpdateComp  />
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">First Exam</TableCell>
            <TableCell align="right">Mid Exam</TableCell>
            <TableCell align="right">Second Exam</TableCell>
            <TableCell align="right">Final Exam</TableCell>
            <TableCell align="right">One Quiz</TableCell>
            <TableCell align="right">Two Quiz</TableCell>
            <TableCell align="right">Three Quiz</TableCell>
            <TableCell align="right">Over All</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          {grade.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.firstExam}</TableCell>
              <TableCell align="right">{row.midExam}</TableCell>
              <TableCell align="right">{row.secondExam}</TableCell>
              <TableCell align="right">{row.finalExam}</TableCell>
              <TableCell align="right">{row.quizOne}</TableCell>
              <TableCell align="right">{row.quizTwo}</TableCell>
              <TableCell align="right">{row.quizThree}</TableCell>
              <TableCell align="right">{row.overAll}</TableCell>
              <TableCell align="right">
              <button
                  className="btn btn-danger"
                  onClick={()=>handleDelete(row.email)}
                  >
                  Delete This Student
              </button>
              </TableCell>
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
    );
  }
  
  function Exam(props) {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
  
        <MyVerticallyCenteredModal grade={props.grade} 
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
export default Exam;