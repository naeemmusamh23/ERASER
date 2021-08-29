import React from 'react';
import Header from './components/basics/Header.js';
import Footer from './components/basics/Footer.js';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Grade from './components/grade/exam';
import './App.css';
import Main from './components/Main-page/Main.js';
import AboutUs from './components/basics/about-us.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/authContext';
import SignUp from './components/auth/SignUp';
import Create from './components/courses/create.js';
import Join from './components/courses/join.js';
import OneCourse from './components/courses/course';
import OneQuiz from './components/courses/quiz/quiz-page';
import Room from './components/courses/Room';
import OneAssignment from './components/courses/assignment/assignment-page.js';


function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/create-course">
            <Create />
          </Route>
          <Route exact path="/join-course">
            <Join />
          </Route>
          <Route exact path="/course/:id">
            <OneCourse />
          </Route>

          <Route exact path="/about-us">
            <AboutUs />
          </Route>
          <Route exact path="/course/:id/quiz/:quizID">
            <OneQuiz />
          </Route>
          <Route exact path="/course/:id/assignment/:assID">
            <OneAssignment />
          </Route>
          <Route exact path="/course/:id/students">
            <Grade />
          </Route>
          <Route exact path="/course/:id/:roomID"  component={Room}/>
           
        </Switch>

      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;