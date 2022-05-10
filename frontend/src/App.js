import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Home} from "./pages/Home";
import {Detail} from "./pages/Detail";
import {Login} from "./pages/Login";
import Layout from "./components/Layout";
import {Logout} from "./actions/Logout";
import Cookies from "js-cookie";
import {Register} from "./pages/Register";

function App() {
    const isAuth = Cookies.get("logged_in")
    const authLinks = (
        <Fragment>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/detail" element={<Detail/>}/>
        </Fragment>);
    const guestLinks = (<Route exact path="/" element={<Home/>}/>);
    return (
        <Router>
            <Routes>
                <Route element={ <Layout/> }>
                    {isAuth ? authLinks : guestLinks}
                </Route>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="" element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
