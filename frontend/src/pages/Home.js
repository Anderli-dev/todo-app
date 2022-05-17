import React, {lazy, Suspense, useState} from "react";
import Cookies from "js-cookie";
import {Spinner} from "react-bootstrap";

const TodoList = lazy(()=>import('../components/TodoList'))

export function Home(){
    const isAuth = Cookies.get("logged_in")
    const [isLoad] = useState(true)

    function todoList(){
        return(
            <>
                {isLoad && (
                    <Suspense fallback={
                        <div style={{marginTop:"30%"}} className="container d-flex justify-content-center">
                            <Spinner className="" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    }>

                        <TodoList/>
                    </Suspense>
                )}

            </>
        )
    }

    const authContent = () => {
        return(
            todoList()
        )
    }

    const guestContent = ()=>{
        return(
            <>
                <div style={{height: "90vh"}} className="d-flex flex-column justify-content-center">
                    <h1 className="text-center fw-bold">Hello stranger!</h1>
                    <h3 className="text-center">This simple todo app</h3>
                    <p className="text-center fw-light">You need login or register to create new tasks</p>
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