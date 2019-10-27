import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const FrontEndIndex = () => {
    return(
        <div>
            <h3>Home</h3>
            <Link to='/admin/create' >
                <Button>
                    Admin
                </Button>
            </Link>
        </div>
    )
}

export default FrontEndIndex;