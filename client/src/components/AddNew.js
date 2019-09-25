import React from 'react';
import { Context } from './Provider';
// import axios from 'axios';
// import BootstrapModal from './BootstrapModal';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../css/components/extendedList.css';
import '../css/components/imageInfo.css';
// import openIconic from 'open-iconic';

class AddNew extends React.Component{

static contextType = Context;

constructor(props){
    super(props);

    this.state = {
        setShow: false,
        show: false,
        saveButtonText: "Save Changes",
        spinnerDisplay: "d-none",
        saveButtonDisable: false
    }
    // this.openModal = () => {
    //     this.setState({modalShow: !this.state.modalShow})
    // }
    this.handleClose = () => this.setState({
        setShow: false, 
        show: false,
        saveButtonText: "Save Changes",
        spinnerDisplay: "d-none",
        saveButtonDisable: false
    });

    this.handleShow = (e) => {
        e.preventDefault()
        this.setState({setShow: true, show: true})
    };
    this.changeButtonText = () => {
        this.setState({spinnerDisplay: "d-none", saveButtonText: "Done", saveButtonDisable: true})
    };
}


render(){
    return(
        <Context.Consumer>
        {()=>{
            return(
                <div className="imageInfo--box">
                    <span className="subtitle">
                        Add new {this.props.stateKey}
                    </span>
                    <form 
                    style={{flexWrap: "wrap"}}
                    id={`formFor-${this.props.stateKey}`}
                    action={this.props.router}
                    // onSubmit={ (e) => {
                    //     this.context.addNew(
                    //         e,
                    //         e.target.firstChild.id,
                    //         e.target.action,
                    //         this.props.requestKey,
                    //         this.props.stateKey,
                    //         this.handleShow
                    //     )
                    // }
                    // }
                    onSubmit={this.handleShow}
                    >
                        <input 
                            type="text" 
                            id={`add-${this.props.stateKey}-item`} 
                        />
                        <Button 
                        variant="success" size="sm"
                        type="submit" 
                        form={`formFor-${this.props.stateKey}`}
                        className="button-extend"
                        > SEND
                        </Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add to {this.props.stateKey}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                `save ${
                                    document.getElementById(`add-${this.props.stateKey}-item`) ? 
                                    document.getElementById(`add-${this.props.stateKey}-item`).value 
                                    : ""} to ${this.props.stateKey}?` 
                            }
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button
                        style={{transition: "0.2s all"}}
                        disabled={this.state.saveButtonDisable}
                        variant="primary"
                        onClick={ (e) => {
                            this.setState({saveButtonText: ""})
                            this.setState({spinnerDisplay: "d-block"})
                            this.context.addNew(
                                e,
                                `add-${this.props.stateKey}-item`,
                                this.props.router,
                                this.props.requestKey,
                                this.props.stateKey,
                                this.changeButtonText
                            )
                        }
                        }
                        >
                        {this.state.saveButtonText}
                        <Spinner 
                        style={{
                            height: "20px",
                            width: "20px",
                            borderWidth: "2px"
                        }}
                        animation="border" 
                        variant="purple" 
                        className={this.state.spinnerDisplay}
                        />
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </form>
                </div>
            )
            }
        }
        </Context.Consumer>
    )
    }
}

export default AddNew;