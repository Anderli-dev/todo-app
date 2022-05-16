import React from 'react';
import {NavBar} from './NavBar';
import { Outlet } from 'react-router-dom';
import {SuccessModal} from "./ModalSuccessMsg";

export default () => {
    return (
        <React.Fragment>
            <SuccessModal/>
            <NavBar />
            <div className={"container"}>
                <Outlet />
            </div>
        </React.Fragment>
    );
};