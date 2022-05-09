import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Logout () {
    Cookies.remove("logged_in")
    return(
        axios.get(`${process.env.REACT_APP_API_URL}/api/logout/`)
            .catch(error => console.log(error))
    );
}