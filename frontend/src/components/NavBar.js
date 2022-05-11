import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Logout} from "../actions/Logout";
import Cookies from "js-cookie";
import {Container, Nav, Navbar} from "react-bootstrap";

export function NavBar() {
    const isAuth = Cookies.get("logged_in")
    const location = useLocation()
    return (
        <>
            <Navbar variant="dark" style={{ backgroundColor: "#2c3237"}} >
                <Container>
                    <Navbar.Brand href="/">Todo-app</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className={"flex-grow-0 d-flex w-100"}>
                        <Nav className={"w-100"}>
                            <Nav.Link href={"/"}>Home</Nav.Link>
                            {isAuth
                                ?(
                                    <>
                                        <Nav.Link href={"/detail"}>Detail</Nav.Link>
                                        <div className={" ms-auto"}>
                                            <Nav.Link as={"a"} href="" onClick={Logout}>Logout</Nav.Link>
                                        </div>
                                    </>
                                )
                                :(
                                    <>
                                        <div className={" ms-auto d-flex"}>
                                            <Nav.Link as={Link} to="/login" state={{ prevLocation: location.pathname}}>Login</Nav.Link>
                                            <p className={"nav-item m-0 p-2"}>or</p>
                                            <Nav.Link as={Link} to="/register" state={{ prevLocation: location.pathname}}>Register</Nav.Link>
                                        </div>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}