import React, {useState} from "react";
import {CSRFToken} from "../components/CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";
import {Navigate, useLocation} from "react-router-dom";

export function Login(props) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [csrftoken] = useState(Cookies.get("csrftoken"));
    let [res, setResponse] = useState({});
    const location = useLocation()

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const loginSubmit = e => {
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
                .catch(error => setResponse(error.response.status))
        } catch (err) {
            console.log(err)
        }
    };

    if (res.status === 200) {
        Cookies.set("logged_in", "yes")
        return <Navigate to={location.state.prevLocation} replace/>
    }

    return (
        <div>
            {res === 403 && (<h1>Wrong username or password</h1>)}
            <form onSubmit={loginSubmit}>
                <CSRFToken/>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={onChange}
                    name="username"
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={onChange}
                    name='password'
                    required/>
                <button type="submit" >Send</button>
            </form>
        </div>
    );
}