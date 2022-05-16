import React, {useState} from "react";
import {CSRFToken} from "../components/CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CreateWhiteIco} from "../actions/CreateWhiteIco";
import {MdAddCircleOutline} from "react-icons/md";
import {useDispatch} from "react-redux";

export function CreateTODO(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [csrftoken] = useState(Cookies.get("csrftoken"));
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { title, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const loginSubmit = e => {
        e.preventDefault()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };
        const body = {title: title, description: description}
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/api/task/create/`, body,{
                    headers: headers,
                })
                .catch(error => console.log(error))
        } catch (err) {
            console.log(err)
        }

        navigate("/", {replace:true})
        dispatch({type:"SHOW_MSG", msg:"Success!Task created"})
    };

    return (
        <div className={"d-flex justify-content-center vh-100 align-items-center"}>
            <form onSubmit={loginSubmit} className={"w-75"}>
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
                    <button type="submit" className="d-flex justify-content-center btn btn-primary btn-block mb-4 w-25">
                        Add
                        <div className="ms-1">{CreateWhiteIco(<MdAddCircleOutline/>)}</div>
                    </button>
                </div>
            </form>
        </div>
    );
}