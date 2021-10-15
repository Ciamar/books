import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


function CreateBook(props) {

  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });

  let history = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8888/login', user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        history("/"+user.username);
      })
      .catch(err => {
        console.log("Error in login!");
        console.log(err);
      })
  }

  const onChange = e => {
    const {name, value} = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Register</h1>
            <p className="lead text-center">
                Register
            </p>

            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='username'
                  name='username'
                  className='form-control'
                  value={user.username}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='password'
                  placeholder='password'
                  name='password'
                  className='form-control'
                  value={user.password}
                  onChange={onChange}
                />
              </div>

              <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
        </div>
        </div>
      </div>
    </div>
  );

}




export default CreateBook;
