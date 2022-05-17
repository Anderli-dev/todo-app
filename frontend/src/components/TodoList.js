import {Button, Table} from "react-bootstrap";
import {Scrollbars} from "react-custom-scrollbars";
import {CreateWhiteIco} from "../actions/CreateWhiteIco";
import {MdDeleteForever, MdEdit, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";
import React, {useEffect, useState} from "react";
import {DeleteTask} from "../actions/DeleteTask";
import {UpdateStatus} from "../actions/UpdateStatus";
import axios from "axios";

export default () => {
    const [tasks, setTasks] = useState([]);
    const [isData, setIsData] = useState(false);

    function delTask(id){
        DeleteTask(id)

        let index = 0;
        for(index; index<tasks.length; index++) {
            if (tasks[index].id === id) {
                break;
            }
        }
        console.log(index)
        if(index !== 0) {
            const newList = [];
            for (let i = 0; i < tasks.length; i++) {
                if (i !== index) {
                    newList.push(tasks[i])
                }
            }
            setTasks(newList);
        }else {
            setIsData(false)
        }

    }

    function doneTask(id){
        const body = {
            task_status:"done"
        }

        UpdateStatus(body, id)

        let index = 0;
        for(index; index<tasks.length; index++) {
            if (tasks[index].id === id) {
                break;
            }
        }

        const newList=[];
        for(let i=0; i < tasks.length; i++){
            if(i !== index) {
                newList.push(tasks[i])
            }
            else {
                tasks[i].is_done = true
                newList.push(tasks[i])
            }
        }

        setTasks(newList);
    }

    function unDoneTask(id){
        const body = {
            task_status:"un_done"
        }

        UpdateStatus(body, id)

        let index = 0;
        for(index; index<tasks.length; index++) {
            if (tasks[index].id === id) {
                break;
            }
        }

        const newList=[];
        for(let i=0; i < tasks.length; i++){
            if(i !== index) {
                newList.push(tasks[i])
            }
            else {
                tasks[i].is_done = false
                newList.push(tasks[i])
            }
        }

        setTasks(newList);

    }

    function getTasks(){
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            try {
                axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/`, {
                    headers: headers,})
                    .then(response => {if (!response.data.length) {setIsData(false) }
                                       else {setIsData(true); setTasks(response.data)}
                    })
                    .catch(error => console.log(error))
            } catch (err) {
                console.log(err)
            }
        }

    useEffect(() => {
        getTasks();
    }, []);

    const notHaveTodoMsg = () => {
        return(
            <>
                <div className="d-flex flex-column" style={{height: "69vh"}}>
                    <div className="">
                        <h2 className="text-muted mt-5 text-center">You dont have todo-s yet...</h2>
                        <h1 className="text-muted text-center ">:(</h1>
                    </div>
                    <div className="text-center mt-auto mt-5"><a href={"/task/create"} >Clik hear to create one</a></div>
                </div>
            </>
        )
    }

    return (
        <>
            {isData
                ?<>
                    <div className="h1 my-2 pb-3 text-center">
                        <i className="fas fa-check-square me-1"></i>
                        <u>My Todo-s</u>
                    </div>
                    <div className="card" style={{backgroundColor: "#7a8794"}}>
                        <div className="card-body" data-mdb-perfect-scrollbar="true">
                            <Table striped bordered hover variant="dark" className="m-0">
                                <thead>
                                <tr>
                                    <th className="border-bottom">Task</th>
                                    <th className="text-center w-25 border-bottom">Actions</th>
                                </tr>
                                </thead>
                            </Table>
                            <Scrollbars style={{width: "100%", height: "47vh"}}>
                                <Table striped bordered hover variant="dark">
                                    <tbody>
                                    {tasks.map(item => (
                                        <tr key={item.id}>
                                            <td><a href={`/task/${item.id}`}
                                                   className={item.is_done ? "d-flex text-decoration-line-through text-white"
                                                       : "d-flex text-decoration-none text-white"}>{item.title}
                                                <div className="ms-2">{CreateWhiteIco(<MdEdit/>)}</div>
                                            </a>
                                            </td>
                                            <td className="w-25 text-center">
                                                {item.is_done
                                                    ? <Button className="me-3 pb-2" onClick={() => unDoneTask(item.id)}>
                                                        {CreateWhiteIco(<MdOutlineCheckBox/>)}
                                                    </Button>
                                                    : <Button className="me-3 pb-2" onClick={() => doneTask(item.id)}>
                                                        {CreateWhiteIco(<MdOutlineCheckBoxOutlineBlank/>)}
                                                    </Button>
                                                }
                                                <Button className="pb-2 btn-danger"
                                                        onClick={() => delTask(item.id)}>{CreateWhiteIco(
                                                    <MdDeleteForever/>)}</Button>
                                            </td>
                                        </tr>))
                                    }
                                    </tbody>
                                </Table>
                            </Scrollbars>
                        </div>
                        <div className="card-footer text-end p-3">
                            <Button href="task/create" className="btn btn-secondary">Add Task</Button>
                        </div>
                    </div>

                </>
                :notHaveTodoMsg()
            }
        </>
    )
}