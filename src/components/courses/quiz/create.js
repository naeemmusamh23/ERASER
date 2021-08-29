import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import useForm from '../../hooks/form';
import cookie from 'react-cookies';
import { TextField  } from '@material-ui/core';
import Auth from '../../auth/auth';
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
        width: '80%',
        height: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    root: {
        display: 'flex',
        flexFlow: 'wrap',
        height: 'auto',
        justifyContent: 'left',
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

export default function CreateQuiz({ id, owner }) {
    const history = useHistory()
    const classes = useStyles();
    const [handleSubmit, handleChange, values] = useForm(newQuiz)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [questionList, setQuestionList] = React.useState([]);
    const context = useContext(AuthContext)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addQues = (e) => {
        e.stopPropagation();
        e.preventDefault()
        const question = e.target.question.value;
        const answer = e.target.answer.value;
        const option1 = e.target.options[0].value;
        const option2 = e.target.options[1].value;
        const option3 = e.target.options[0].value;
        const obj = {
            question,correct_answer:answer, options : [answer, option1, option2, option3]
        }
        setQuestionList(prev => [...prev, obj])
        e.target.reset()
    }


    async function newQuiz(data) {
        const token = cookie.load('auth-token');
        let obj = {
            ...data, quizQuestions: questionList
        }
        const response = await fetch(`${API_SERVER}/course/${id}/create-quiz`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        });
        let result = await response.json();
        handleClose()
        history.push('/')
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {/* <form className={classes.root} noValidate autoComplete="off" onSubmit={ e=> e.preventDefault()}> */}
                <div className={classes.root}>

                    <TextField
                        id="filled-multiline-flexible"
                        label="Quiz Title"
                        name="quizTitle"
                        multiline
                        rowsMax={2}
                        onChange={handleChange}
                        variant="filled"
                        required
                    />
                </div>
                <h4>You Added {questionList.length} Questions</h4>
                <form onSubmit={addQues} className={classes.root}>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Question"
                            name="question"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Answer"
                            name="answer"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Option1"
                            name="options"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Option2"
                            name="options"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Option3"
                            name="options"
                            multiline
                            rowsMax={2}
                            variant="filled"
                            required
                        />
                        <button type="submit" className="btn btn-primary" >Add This Question</button>
                    </form>
                    <div className={classes.root}>

                    <TextField
                        id="filled-multiline-flexible"
                        label="Duration in minutes"
                        name="timer"
                        rowsMax={1}
                        onChange={handleChange}
                        variant="filled"
                        required
                    />
                    </div>
               
                <div className={classes.button}>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                        Create Quiz
                    </button>
                </div>
        </div>
    );

    return (
        <Auth cond={context.loggedIn && context.user.email == owner}>

        <div>
            <button type="button" className="btn btn-primary" onClick={handleOpen} style={{marginLeft:20}}>
                Create Quiz
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