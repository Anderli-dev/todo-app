import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {Scrollbars} from 'react-custom-scrollbars';
import axios from "axios";
import Cookies from "js-cookie";

export function Home(){
    let [res, setResponse] = useState({});
    const isAuth = Cookies.get("logged_in")

    function getTasks(){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        try {
            axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/`, {
                headers: headers,})
                .then(response => setResponse(response))
                .catch(error => setResponse(error.response))
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

    const todoList = () => {
      return(
          <>
              <div className="card" style={{backgroundColor: "#7a8794"}}>
                  <div className="card-body" data-mdb-perfect-scrollbar="true">
                      <Table striped bordered hover variant="dark" className="m-0" >
                          <thead>
                          <tr>
                              <th className="border-bottom">Task</th>
                              <th className="text-center w-25 border-bottom">Actions</th>
                          </tr>
                          </thead>
                      </Table>
                      <Scrollbars style={{ width: "100%", height: "47vh"}}>
                          <Table striped bordered hover variant="dark">
                              <tbody>
                              {res.data.map((item) => (
                                  <tr key = { item.id }>
                                      <td><a className="text-decoration-none text-white" href={`/task/${item.id}`}>{item.title}</a></td>
                                      <td className="w-25">Del btn, Change btn</td>
                                  </tr>
                              ))
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
      )
    }

    const authContent = () => {
      return(
          <>
              <div className="h1 my-2 pb-3 text-center">
                  <i className="fas fa-check-square me-1"></i>
                  <u>My Todo-s</u>
              </div>

              {res.data !== undefined
                  ?   <>
                      {res.data.length === 0
                          ? notHaveTodoMsg()
                          : todoList()
                      }
                      </>
                  :
                  <></>
              }
            </>
      )
    }

    const guestContent = ()=>{
        return(
            <>
                <div style={{height: "90vh"}} className="d-flex flex-column justify-content-center">
                    <h1 className="text-center fw-bold">Hello stranger!</h1>
                    <h3 className="text-center">This simple todo app</h3>
                    <p className="text-center fw-light">You need login or register to creating new tasks</p>
                </div>
            </>
        )
    }

    return(
        <div>
            <div className="dark">
                {isAuth
                    ? authContent()
                    : guestContent()
                }
            </div>
        </div>
    )
}