import React, {useState} from "react";
import {CSRFToken} from "../components/CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Register(props) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        re_password: ""
    });
    const [csrftoken] = useState(Cookies.get("csrftoken"));
    let [res, setResponse] = useState({});
    const navigate = useNavigate()

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const regSubmit = e => {
        e.preventDefault()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };
        const body = {username: username, password: password, re_password: re_password}
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/api/register/`, body,{
                    headers: headers,
                })
                .then(response => setResponse(response))
                .catch(error => setResponse(error.response))
        } catch (err) {
            console.log(err)
        }

        Cookies.set("logged_in", "yes")
        navigate("/")
    };

    return (
        <div className={"d-flex justify-content-center vh-100 align-items-center"}>
            <form onSubmit={regSubmit} className={"w-25"}>
                <CSRFToken/>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <h2>Register</h2>
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
                            <small id="passwordHelpBlock" className="form-text text-muted">
                                Come up something interesting.
                            </small>
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
                            <small id="passwordHelpBlock" className="form-text text-muted">
                                Your password must be 6 characters long.
                            </small>
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="password"
                                value={re_password}
                                onChange={onChange}
                                name='re_password'
                                className={"form-control"}
                                placeholder="Repeat password"
                                required/>
                        </div>
                        {res.status === 403 && (<p className={"alert alert-danger"}>{res.data["error"]}</p>)}
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center w-100">
                                <a href="/login">Sing up?</a>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4 w-50">Register</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}