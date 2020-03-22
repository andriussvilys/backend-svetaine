import React from 'react';
import { Context } from '../../Provider';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

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
    this.handleClose = () => this.setState({
        setShow: false, 
        show: false,
        saveButtonText: "Save Changes",
        spinnerDisplay: "d-none",
        saveButtonDisable: false
    });

    this.handleShow = (e) => {
        e.preventDefault()
        this.setState({
            setShow: true, 
            show: true,
            modalMessage: <span>Add <em>{document.getElementById(`add-${this.props.stateKey}-item`).value}</em> to <em>{this.props.stateKey}</em>?</span>
        })
    };
    this.changeButtonText = (message) => {
        this.setState({
            spinnerDisplay: "d-none", 
            saveButtonText: "Done", 
            saveButtonDisable: true,
            modalMessage: message
            
        })
    };
    this.verify = () => {
        const result = this.context.verify()
        if(result.verified){
          return true
        }
        else{
          this.setState({...result})
          return false
        }
      }
}


render(){
    return(
        <Context.Consumer>
        {()=>{
            if(!this.props.addNew){
                return null
            }
            return(
                <div 
                className="imageInfo--box" 
                style={{
                    display: `flex`,
                    margin: "0px",
                    marginLeft: "10px"
                    
                }}>
                    {/* displayAddNew controls wether this component will be visible */}
                    <span className="subtitle">
                        Add new {this.props.stateKey}
                    </span>
                    <form 
                    style={{flexWrap: "wrap", width: "100%", justifyContent: "space-between"}}
                    id={`formFor-${this.props.stateKey}`}
                    action={this.props.router}
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
                        > 
                        SEND
                        </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add to {this.props.stateKey}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.modalMessage}
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
                            if(!this.verify({addNew: true})){
                                return
                            }
                            this.setState({
                                saveButtonText: "",
                                spinnerDisplay: "d-block",
                            })
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