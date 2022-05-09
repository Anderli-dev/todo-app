import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Home} from "./pages/Home";
import {Detail} from "./pages/Detail";
import {Login} from "./pages/Login";
import Layout from "./components/Layout";
import {Logout} from "./actions/Logout";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={ <Layout/> }>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/detail" element={<Detail/>}/>
                </Route>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="" element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
