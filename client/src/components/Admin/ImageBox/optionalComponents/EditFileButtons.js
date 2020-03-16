import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap' 
import BootstrapModal from '../../BootstrapModal'

const EditFileButtons = (props) => {
    let showModal = false
    let modalConfirm = false
    let modalMessage = ""

    const deletePromise = (fileName, artworkFamily) => {
        props.context.fileDataMethods.deleteDBrecord(fileName, artworkFamily)
            .then(res => {
                console.log(res)
                modalMessage = res
                modalConfirm = false
                // let newState = {...this.state}
                // const noFile = {...this.state.fileToDelete} 
                // noFile.fileName = null
                // newState.fileToDelete = noFile
                // console.log("no File")
                // console.log(noFile)
            })
    }

    const onClose = () => {
        showModal = false
        console.log("showModal")
        console.log(showModal)
        console.log("modalMessage")
        console.log(modalMessage)
        return 
    }
    return (
        <div className="EditDetailContainer--button-wrapper">
            <Link to={`/admin/edit/${props.file.fileName}`}>
                <Button
                    onClick={(e) => {
                        props.context.fileDataMethods.serverFileToState(props.file)
                    }}
                >
                    Edit
                </Button>
            </Link>
            <Button
                    className="delete-button"
                    onClick={() => {
                            console.log("BUTTON CLICKED IN EDIT-FILE-BUTTON")
                            console.log(props.file.fileName)
                            props.onModalClick(props.file.fileName)
                    }}
                >
                    Delete
            </Button>
        </div>
    )
}

export default EditFileButtons