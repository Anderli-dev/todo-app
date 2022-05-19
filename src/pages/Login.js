import React, {useState} from "react";
import {CSRFToken} from "../components/CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";
import {Navigate} from "react-router-dom";

export function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [csrftoken] = useState(Cookies.get("csrftoken"));
    let [res, setResponse] = useState({});

    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const loginSubmit = e => {
        // user login
        e.preventDefault()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };
        const body = {username: username, password: password}
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, body,{
                    headers: headers,
                })
                .then(response => setResponse(response))
                .catch(error => setResponse(error.response))
        } catch (err) {
            console.log(err)
        }

        // set logged_in for using in home show is auth content
        Cookies.set("logged_in", "yes")
    };

    if (res.status === 200) {
        // use only like this
        localStorage.setItem('user', username);
        return <Navigate to={"/"} replace/>
    }

    return (
        <div className="d-flex justify-content-center vh-100 align-items-center">
            <form onSubmit={loginSubmit} className={"w-25"}>
                <CSRFToken/>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <h2>Login</h2>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                value={username}
                                onChange={onChange}
                                name="username"
                                className={"form-control m-auto"}
                                placeholder="Username"
                                required/>
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="password"
                                value={password}
                                onChange={onChange}
                                name='password'
                                className={"form-control"}
                                placeholder="Password"
                                required/>
                        </div>
                        {/* alert msg */}
                        {res.status === 403 && (<p className={"alert alert-danger"}>{res.data["error"]}</p>)}
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center w-100">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4 w-50">Sign in</button>
                        </div>

                        <div className="text-center">
                            <p>Not a member? <a href="/register">Register</a></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}