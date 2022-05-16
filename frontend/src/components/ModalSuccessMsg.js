import React, {useState} from 'react';
import {Modal, ModalHeader} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

export function SuccessModal(){
    const isShow = useSelector(state => state.isShow)
    const msg = useSelector(state => state.msg)
    const dispatch = useDispatch()

    const close = () =>{
        setTimeout(() => {dispatch({type:"HIDE_MSG"})}, 2000)
    }

    return (
        <>
            {close()}
            <Modal show={isShow}
                   className="h-auto"
                   style={{left: "50%", width: "50%", marginLeft: "-25%"}}
                   dialogClassName="m-0 mw-100"
                   backdrop={false}
                   enforceFocus={false}>
                <ModalHeader className="alert alert-success border-bottom-0 m-0" role="alert">
                    <p className="text-black m-0">{msg}</p>
                </ModalHeader>
            </Modal>
        </>
    )
}