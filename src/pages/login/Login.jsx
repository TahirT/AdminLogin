import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css"
import { Navigate } from 'react-router-dom'
import auth from "../../auth";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  setStorageItem = (key, value) => {
    return localStorage && localStorage.setItem(key, value)
  }

  handleLogin() {
  
  const loginUrl = `https://dev.k8s.testgold.dev/interceptor/admin/v1/login`
  const quikly_UIAccessToken = 'quikly.UIaccessToken'
   
  const user = {
    "email": this.state.email,
    "password": this.state.password,
  }
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return dispatch => {
    axios.post(loginUrl, user, requestOptions).then(
      response => {
        if (
          response.data.status === 'success' &&
          response.data.response.access_token
        ) {
          auth.login();
          <Navigate to="home"/>
          this.setStorageItem(
            quikly_UIAccessToken,
            response.data.response.access_token
          )
            console.log("Login Sucess!")
        }
      },
      error => {
        dispatch({
          type: 'LOGIN_FAILED',
          payload: error,
        })
      }
    )
  }
    
  }


  render() {
    return (
      <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink
            to="/"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign In
          </NavLink>
          
        </div>

        <div className="formTitle">
          <NavLink
            to="/"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign In
          </NavLink>{" "}
          or{" "}
        </div>

        <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button 
            className="formFieldButton"
            onClick={this.handleLogin()}
            >Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

        </form>
      </div>
        
      </div>
    </div>

    );
  }
}

export default Login;
