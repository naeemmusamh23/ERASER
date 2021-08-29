import React from "react";
import TextField from "@material-ui/core/TextField";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import useForm from "../hooks/form";
import cookie from "react-cookies";
import "./create.scss";

const axios = require("axios").default;
const api = "https://eraser-401.herokuapp.com";


const Create = () => {
  const [handleSubmit, handleChange] = useForm(callback);
  const history = useHistory();
  const token = cookie.load("auth-token");

  function callback(data) {
    let obj = {
      name: data.name_course,
      description: data.text_area,
    };
    axios({
      method: "post",
      url: `/create-course`,
      mode: "cors",
      baseURL: api,
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-origin": api,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        history.push("/");
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
                      <h3 className="main-heading">Create Course</h3>
                    <br />
                    <TextField
                      name="name_course"
                      type="text"
                      className="form-input"
                      label="course name"
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      name="text_area"
                      type="text"
                      className="form-input-des"
                      label="description"
                      multiline
                      rows={6}
                      defaultValue="Enter the course description"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <br />
                    <Button
                      type="submit"
                      className="form-button"
                      variant="contained"
                    >
                      submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    </>
  );
};

export default Create;