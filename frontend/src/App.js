import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import Layout from "./components/Layout";
import {Logout} from "./actions/Logout";
import Cookies from "js-cookie";
import {Register} from "./pages/Register";
import {CreateTODO} from "./pages/CreateTODO";
import {Todo} from "./pages/Todo";
import {PageNotFound} from "./pages/404";

function App() {
    document.body.style.overflow = 'overlay';
    const isAuth = Cookies.get("logged_in")
    const authLinks = (
        <>
            <Route path="/" element={<Home/>}/>
            <Route path="/task/create" element={<CreateTODO/>}/>
            <Route path="/task/:id" element={<Todo/>}/>
        </>);
    const guestLinks = (<Route replace path="/" element={<Home/>}/>);
    return (
        <Router>
            <Routes>
                <Route element={ <Layout/> }>
                    {isAuth ? authLinks : guestLinks}
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="" element={<Logout/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
