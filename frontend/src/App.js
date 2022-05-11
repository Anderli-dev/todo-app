import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Home} from "./pages/Home";
import {Detail} from "./pages/Detail";
import {Login} from "./pages/Login";
import Layout from "./components/Layout";
import {Logout} from "./actions/Logout";
import Cookies from "js-cookie";
import {Register} from "./pages/Register";
import {CreateTODO} from "./pages/CreateTODO";

function App() {
    const isAuth = Cookies.get("logged_in")
    const authLinks = (
        <>
            <Route replace path="/" element={<Home/>}/>
            <Route replace path="/detail" element={<Detail/>}/>
            <Route replace path="/task/create" element={<CreateTODO/>}/>
        </>);
    const guestLinks = (<Route replace path="/" element={<Home/>}/>);
    return (
        <Router>
            <Routes>
                <Route element={ <Layout/> }>
                    {isAuth ? authLinks : guestLinks}
                </Route>
                <Route replace path="/login" element={<Login/>}/>
                <Route replace path="/register" element={<Register/>}/>
                <Route replace path="" element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
