import React from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Logout} from "../actions/Logout";
import Cookies from "js-cookie";

export function NavBar() {
    const isAuth = Cookies.get("logged_in")
    const location = useLocation()
    return (
        <nav>
            <ul>
                <li><NavLink to={"/"} replace>Home</NavLink></li>
                <li><NavLink to={"/detail"} replace>Detail</NavLink></li>
                {isAuth
                    ?(<li><a href="" onClick={Logout}>Logout</a></li>)
                    :(<li><NavLink to="/login" state={{ prevLocation: location.pathname}} replace >Login</NavLink></li>)
                }
            </ul>
        </nav>
    )
}