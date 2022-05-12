import React from 'react';
import {Modal, ModalHeader} from "react-bootstrap";

export class SuccessModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = { isShow: true };
        this.close = this.close.bind(this);
    }

    close(){
        setTimeout(() => {this.setState(() => {return {isShow: false}})}, 2000)
    }

    render() {
        document.body.style.overflow = 'overlay';
        this.close();
        return (
            <>
                <Modal show={this.state.isShow}
                       className="h-auto"
                       style={{left: "50%", width: "50%", marginLeft: "-25%"}}
                       dialogClassName="m-0 mw-100"
                       backdrop={false}
                       enforceFocus={false}>
                    <ModalHeader className="alert alert-success border-bottom-0 m-0" role="alert">
                        <p className="text-black m-0">{this.props.text}</p>
                    </ModalHeader>
                </Modal>
            </>
        )
    }
}