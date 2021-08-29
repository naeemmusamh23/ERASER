import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../context/authContext';
import {Form, FormControl, Button} from 'react-bootstrap'
import SignUp from './SignUp';

function Login (props) {
  const history = useHistory();

    const context = useContext(AuthContext); 
    const [logn, setLogn] = useState({
        username: '',
        password: ''
    })
    // I have access to this.context

    const handleChange = e => {
        let key = e.target.name;
        let val = e.target.value;
        setLogn( prev => {return {...prev,[key]:val}});
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();
        context.login(logn.username, logn.password);
        history.push('/')
    }
    return (
        <>
          {context.loggedIn ? (
            <Button variant="danger" className="ml-auto" onClick={context.logout} id={'logout'}>
              Logout
            </Button>
          ) : (<>
            <Form inline className="ml-auto" onSubmit={handleSubmit} id="signinForm">
              <FormControl
                className="mr-sm-2"
                placeholder="email"
                type="text"
                required
                name="username"
                onChange={handleChange}
              />
              <FormControl
                className="mr-sm-2"
                placeholder="password"
                type="password"
                required
                name="password"
                onChange={handleChange}
              />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </>
          )}
        </>
      );
}

export default Login;