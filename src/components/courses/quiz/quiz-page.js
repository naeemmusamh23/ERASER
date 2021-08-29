import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Container, Popper } from '@material-ui/core/';
import { useParams } from "react-router";
import cookie from 'react-cookies';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Show from '../../Show'
import { AuthContext } from '../../../context/authContext';
import Auth from '../../auth/auth';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Timer from './timer';
import Slide from '@material-ui/core/Slide';
import Grades from './grades';
import DeleteQuiz from './delete';
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
  question: {
    padding: 30
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  result: {
    marginTop: '5%',
    textAlign: 'center',
    backgroundColor: 'lightgrey'
  },
  grades: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function OneQuiz() {
  const classes = useStyles();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [questions, setQuestions] = useState([{question:'', correct_answer:'', options:[]}])
  const [answers, setAnswers] = React.useState([]);
  const [showGrades, setShowGrades] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(false);
  const [grade, setGrade] = useState(0);
  const [owner, setOwner] = useState('');
  const { id, quizID } = useParams();
  const context = useContext(AuthContext)
  useEffect(() => {
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
      setOwner(()=> data.owner)
      data.quizes.forEach(quiz => {
        if (quiz._id == quizID) {
          setCurrentQuiz(quiz);
          let arr = quiz.quizQuestions;
          setQuestions(prev => [...arr])
        }
      });
    });
  }, []);

  const handleRadioChange = (event) => {
    let answer = event.target.value;
    if (questions[currentQuestion].correct_answer === answer) {
      setGrade(previous =>previous + 1);
    }
    setAnswers(prev => [...prev, answer]);

  };

  const handleNext = () => {
    setCurrentQuestion(prev => prev+1);
  };

  const handleResult = () => {
    const token = cookie.load('auth-token');
    const obj = {
      solution:{
        grade,answers
      }
    }
    fetch(`${API_SERVER}/course/${id}/${quizID}/submit-quiz`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-origin': API_SERVER,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(obj)
    }).then(async (c) => {
      let data = await c.json();
    });
    setFinish(true);
  }

  const handleStart = () => {
    setStart(true);
  }

  const handleShow = () => {
    setShowGrades(true);
  }

  const handleHide =() =>{
    setShowGrades(false);
  }
  return (<>
    <div className={classes.root}>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2" gutterBottom>
              {currentQuiz.quizTitle}
            </Typography>
            
            <Show condition={!start && context.user.email != owner}>
              <Button onClick={handleStart}
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"> Start Quiz
              </Button>
            </Show>
            <Show condition={start && !finish}>
              <Typography variant="subtitle1" gutterBottom>
                time remaining
                <Timer initialMinute={currentQuiz.timer} initialSeconds={0} />
              </Typography>
            </Show>
          </Paper>
          <Auth cond={context.user.email != owner}>

          <Show condition={start}>
          <div>
        <Show condition={!finish}>
          <Grid>
            <Container maxWidth="md">
              <h3> <strong>
                {questions[currentQuestion].question}
              </strong>
              </h3>

              <form>
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
                  {
                      questions[currentQuestion].options.map((option, idx) => {
                        return (
                          <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                        )
                      })}
                  </RadioGroup>
                </FormControl>
                <Grid>
                  <Button
                    variant="contained"
                    onClick={currentQuestion === questions.length - 1 ? handleResult : handleNext}
                    className={classes.button}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : <ArrowForwardIosIcon />}
                  </Button>
                </Grid>
              </form>
            </Container>
          </Grid >
        </Show>
        <Show condition={finish}>
          <Slide in={finish} direction="left">
            <Container maxWidth="md" className={classes.result}>
              <Typography variant="h3" gutterBottom>
                YOUR GRADE
              </Typography>
              <Typography variant="subtitle1">
                {grade} Out Of {questions.length}
              </Typography>
            </Container>
          </Slide>
        </Show>
      </div>
          </Show>
            </Auth>

        </Grid>
      </Grid>
    </div>
      <Auth cond={context.user.email == owner}>
        <Show condition={!showGrades}>
        <div className="centerDiv"> 
          <Button variant="contained" onClick={handleShow}>Show Grades</Button>
          <DeleteQuiz id={id} quizId={quizID}/>
        </div>
        </Show>
        <Show condition={showGrades}>
          <Button variant="contained" onClick={handleHide}>Hide Grades</Button>
        </Show>
        <Show condition={showGrades}>
          <Grades className={classes.grades} grades={currentQuiz.solutionInfo} />
        </Show>
      </Auth>
    </>
  );
}