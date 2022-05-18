import React from 'react';
import {NavBar} from './NavBar';
import { Outlet } from 'react-router-dom';
import {SuccessModal} from "./ModalSuccessMsg";

export default () => {
    return (
        <React.Fragment>
            {/* modal msg need be here just for opportunity using from any page*/}
            <SuccessModal/>

            {/* this layout wrapper with navbar */}
            <NavBar />
            <div className={"container"}>
                <Outlet />
            </div>
        </React.Fragment>
    );
};