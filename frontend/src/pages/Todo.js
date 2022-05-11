import React, {useEffect, useState} from "react";
import {CSRFToken} from "../components/CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";

export function Todo(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const {id} = useParams();
    const [csrftoken] = useState(Cookies.get("csrftoken"));
    let [res, setResponse] = useState({});


    const { title, description } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    useEffect(() => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };
        try {
            axios.get(`${process.env.REACT_APP_API_URL}/api/task/`+ id,{
                    headers: headers,
                })
                .then(response => {setResponse(response);
                    setFormData({ ...formData, ["title"]: response.data["title"],
                                                    ["description"]: response.data["description"]
                    });
                })
                .catch(error => setResponse(error.response))
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    const todoSubmit = e => {
        e.preventDefault()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };
        const body = {title: title, description: description}
        try {
            axios.put(`${process.env.REACT_APP_API_URL}/api/task/`+ id, body,{
                    headers: headers,
                })
                .then(response => setResponse(response))
                .catch(error => setResponse(error.response))
        } catch (err) {
            console.log(err)
        }
    };

    return (
        // TODO add success msg after update
        <div className={"d-flex justify-content-center vh-100 align-items-center"}>
            <form onSubmit={todoSubmit} className={"w-75"}>
                <CSRFToken/>
                <div className="form-outline mb-4 w-25">
                    <label className="form-label" htmlFor="loginName">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={onChange}
                        name="title"
                        className={"form-control m-auto"}
                        required/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">Description</label>
                    <textarea
                        value={description}
                        onChange={onChange}
                        name="description"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="10"
                        required></textarea>
                </div>

                <div className="d-flex justify-content-start">
                    <button type="submit" className="btn btn-primary btn-block mb-4 w-25">Save</button>
                </div>
            </form>
        </div>
    );
}