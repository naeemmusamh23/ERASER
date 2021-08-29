import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import useForm from '../hooks/form';
import cookie from 'react-cookies';
import './join.scss'
const axios = require('axios').default;
const api = 'https://eraser-401.herokuapp.com';

const Join = ()=>{

    const [handleSubmit, handleChange] = useForm(callback);
    const history = useHistory();
    const token = cookie.load('auth-token');

    function callback(data){
        let obj = {
            id: data.id,
        }
        axios( {
            method: 'post',
                url: `/join-course`,
                mode: 'cors',
                baseURL: api,
                data: JSON.stringify(obj),
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-origin': api,
                   Authorization: `Bearer ${token}`,
                }
        })
        .then((response)=> {
            history.push('/');
          })
          .catch(function (error) {
              console.log(error);
            });
    }

    return (
        <>

            <React.Fragment>
        <section className="section backgroundOne">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="card backgroundOne">
                  
                  <Form className="formstyle" onSubmit={handleSubmit}>
                      <h3 className="main-heading">Join Your Course</h3>
                    <br />
                    <TextField name='id' type='text' className="form-input_input" label='Enter Course ID' onChange={handleChange} />
                    <br />
                    <Button type='submit' className="form-button" variant='contained'  > submit </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
        </>
    )
}

export default Join;