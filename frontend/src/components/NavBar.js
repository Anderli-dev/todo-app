import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {Logout} from "../actions/Logout";
import Cookies from "js-cookie";
import {Container, Nav, Navbar} from "react-bootstrap";

export function NavBar() {
    const isAuth = Cookies.get("logged_in")
    const location = useLocation()
    return (
        <>
            <Navbar variant="dark" style={{ backgroundColor: "#2c3237"}}>
                <Container>
                    <Navbar.Brand href="/">Todo-app</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={"/"}>Home</Nav.Link>
                            <Nav.Link href={"/detail"}>Detail</Nav.Link>
                            {isAuth
                                ?(<Nav.Link as={"a"} href="" onClick={Logout}>Logout</Nav.Link>)
                                :(<Nav.Link as={Link} to="/login" state={{ prevLocation: location.pathname}}>Login</Nav.Link>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}