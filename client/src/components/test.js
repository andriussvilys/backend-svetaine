import React from 'react'
import Button from 'react-bootstrap/Button'
import { BrowserRouter,  Link } from 'react-router-dom';

const testpage = (props) => {
    return(
    <BrowserRouter>
        <h3>yeah works</h3>
        <Button 
            variant="success"
            onClick={() => {
                props.history.push('/')
            }}
        >
            Home
        </Button>
    </BrowserRouter>
    )
}

export default testpage