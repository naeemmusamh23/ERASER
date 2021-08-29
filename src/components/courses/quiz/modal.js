import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

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


export default function MyQuizzes ({quiz, id}) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.modalButton}>
    <Button type="button" variant="contained" onClick={handleOpen}>
    <QuestionAnswerIcon/>  My Quizzes
    </Button>
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
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <h3> Quizzes </h3>
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell align="right">Quiz Title</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          {quiz.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell component="th" scope="row">
             <Link to={`${id}/quiz/${row._id}`} >{row.quizTitle}</Link> 
              </TableCell>
              <TableCell align="right">{row.timer}</TableCell>
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
        </div>
      </Fade>
    </Modal>
  </div>
  );
  
}