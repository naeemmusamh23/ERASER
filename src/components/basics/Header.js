import React, {useContext} from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SignIn from '../auth/SignIn';
import Logo from './Logo';
import {AuthContext} from '../../context/authContext';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useHistory} from 'react-router-dom';

const appTheme = createTheme({
  palette: {
    primary: {
      light: '#6179b9',
      main: '#ffffff',
      dark: '#141a2c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f6ee34',
      main: '#9ccac5',
      dark: '#bdb508',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: appTheme.palette.secondary.main
  },

  inputRoot: {
    color: appTheme.palette.primary.light,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  header: {
    position: 'relative',
    backgroundColor: appTheme.palette.primary.main,
    height: '20vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    boxShadow: '0px 0px',
  },
  icons: {
    color: appTheme.palette.secondary.main
  },
  // button: {
  //   marginLeft: 180,
  // },
  auth: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 5,
    "@media (min-width: 1280px)": {
      // marginTop: theme.spacing(5),
      // backgroundColor: "red"
      right: 5
    },
    [theme.breakpoints.down("sm", "md")]: {
      right: 5
    }
  },
  tabs: {
    width: 'min-content',
    margin: '0 auto',
    // marginTop: '-50px',
    position: 'absolute',
    top: 50,
    zIndex: 10000,
    left:'25%',
    "@media (max-width: 900px)": {
      top: 100,
      left: '15%'
    },
    "@media (max-width: 500px)": {
      top: 100,
      left: '15%'
    },
  },
  tabss: {
    width: 'min-content',
    margin: '0 auto',
    // marginTop: '-50px',
    position: 'absolute',
    top: 50,
    zIndex: 10000,
    left:'25%',
    "@media (max-width: 900px)": {
      top: 100,
      left: '15%'
    },
    "@media (max-width: 500px)": {
      top: 100,
      left: '15%'
    },
  }
}));



export default function Header() {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 0) {
      history.push('/')
    }else if (newValue == 1) {
      history.push('/create-course')
    } else if (newValue == 2) {
      history.push('/join-course')
    }else if (newValue == 3) {
      history.push('/about-us')
    }
  };
  const handleChanges = (event, newValue) => {
    setValue(newValue);
    if (newValue == 0) {
      history.push('/')
    }else if (newValue == 1) {
      history.push('/signup')
    } else if (newValue == 2) {
      history.push('/about-us')
    }
  };

  return (
    <>
    <div className={classes.grow}>
      <AppBar position="static" className={classes.header} >
        <Toolbar>
          <Logo />

        </Toolbar>
          <div className={classes.auth}>
                <SignIn />
            
          </div>
        </AppBar>
      
      </div> 
      <Paper square>
      {context.loggedIn ? (
        <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        // aria-label="disabled tabs example"
        className={classes.tabss}
      >
        <Tab label="Home"/>
        <Tab label="Create Course" />
        <Tab label="Join Course" />
        <Tab label="About Us" />
        </Tabs>
      ): (
        <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChanges}
        // aria-label="disabled tabs example"
        className={classes.tabs}
      >
        <Tab label="Home" />
        <Tab label="SignUp" />
        <Tab label="About Us" />
        </Tabs>
      )}
      
    </Paper>
    </>
  );
}