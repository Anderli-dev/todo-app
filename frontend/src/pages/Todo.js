import React, {useEffect, useState} from "react";
import {CSRFToken} from "../components/CSRFToken";
import Cookies from "js-cookie";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {DeleteTask} from "../actions/DeleteTask";
import {SuccessModal} from "../components/ModalSuccessMsg";

export function Todo(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        is_done: null
    });
    const [csrftoken] = useState(Cookies.get("csrftoken"));
    let [res, setResponse] = useState([]);
    const [isSave, setIsSave] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate()

    const { title, description, is_done } = formData;
    const onChange = e => setFormData({ ...formData,
        [e.target.name]: e.target.type === 'checkbox'? e.target.checked : e.target.value });

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
                .then(response => {setFormData({ ...formData, ["title"]: response.data["title"],
                                                    ["description"]: response.data["description"],
                                                    ["is_done"]: response.data["is_done"]});
                })
                .catch(error => setResponse(error.response))
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    const taskSubmit = e => {
        e.preventDefault()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };
        const body = {title: title, description: description, is_done: is_done}
        try {
            axios.put(`${process.env.REACT_APP_API_URL}/api/task/`+ id, body,{
                    headers: headers,
                })
                .then(response => setResponse(response))
                .catch(error => setResponse(error.response))
        } catch (err) {
            console.log(err)
        }
        setIsSave(true)
    };

    function delTask(id){
        DeleteTask(id)
        navigate("/")
    }

    const onShow = () => {
        setTimeout(()=>{setIsSave(false)}, 2150)
        return <SuccessModal/>
    }

    return (
        <div className="d-flex justify-content-center vh-100 align-items-center">
            {isSave && onShow()}
            <form onSubmit={taskSubmit} className="w-75">
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
                <div className="form-outline mb-2">
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
                <div className="form-check">
                    <label className="form-check-label mb-2" htmlFor="flexCheckDefault">Done</label>
                    <input className="form-check-input"
                           onChange={onChange}
                           name="is_done"
                           type="checkbox"
                           id="flexCheckDefault"
                           checked={is_done}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary btn-block mb-4 w-25" >Save</button>
                    <button type="submit" className="btn btn-danger btn-block mb-4" onClick={()=>delTask(id)}>Delete</button>
                </div>
            </form>
        </div>
    );
}