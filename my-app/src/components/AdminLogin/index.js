import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Passport from "./Passport";
import axios from 'axios';
import { Stack } from "@material-ui/core";


class AdminLogin extends React.Component {

    construct(props) {
        this.state = {
            username: '',
            password: ''
        };
    }
        setUserInfo(event, key) {
            // The element from input form will automatically bind an event object to the event function
            // The target attribute of the event object is equal to the input DOM element object, so event.target.value can get the value of the current input
            let obj = {};
            obj[key] = event.target.value;
            // update the state
            this.setState(obj);
        }

    render() {
        const pass=new Passport();
        if (pass.storageLogin(localStorage.getItem("username"), localStorage.getItem("password"))){
            // Check the local storage of the account, if there, skip login and redirect to the admin page.
            console.log(localStorage.getItem("username"), localStorage.getItem("password"))
            return <Redirect to="/admin" />
        }else{
            // if no local storage of the account, redirect to the login page.
        return (
        <div>
            <h3>Admin Login</h3>
                <div>
                    <span>Account</span>
                    <Stack spacing={3} direction="row"></Stack>
                    <span><input type="text" onInput={(event) => {
                        // Input the account
                        this.setUserInfo(event, 'username');
                    }}></input></span>
                </div>
                <div>
                    <span>password</span>
                    <Stack spacing={3} direction="row"></Stack>
                    <span><input type="password" onInput={(event) => {
                        // Input the password
                        this.setUserInfo(event, 'password');
                    }}></input></span>
                </div>
                <hr/>
                <div>
                    <button onClick={() => {
                        // Check the account and password
                        // alert(this.state.username + this.state.password);
                        const p = new Passport();
                        p.login(this.state.username, this.state.password, () => {
                            // Redirect, when login successfully
                            this.props.history.push('/admin');
                            if (!window.localStorage){
                                alert("This browser is incompatible with local storage, please change another browser if you still want to save your account!");
                            }else{
                                localStorage.setItem("username", this.state.username);
                                localStorage.setItem("password", this.state.password);
                                console.log(localStorage.getItem("username"), localStorage.getItem("password"));
                            }
                        })
                        
                    }}>Login</button>
                </div>
            </div>
        )
        }
    }
}

export default AdminLogin;