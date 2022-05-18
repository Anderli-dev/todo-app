import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from "js-cookie"

export const CSRFToken = () => {
    // just getting token
    const [csrftoken, setcsrftoken] = useState(Cookies.get("csrftoken"));

    useEffect(() => {
        if(!csrftoken){
            axios.get(`${process.env.REACT_APP_API_URL}/api/csrf_cookie/`)
                .then(setcsrftoken(Cookies.get("csrftoken")))
                .catch(error => console.log(error));
        }
    }, [])

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};