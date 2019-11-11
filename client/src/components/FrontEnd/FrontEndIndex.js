import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

// import ImageInfo from './components/ImageInfo';
// import Edit from './components/Edit'
// import Delete from './components/Delete/Delete'


const FrontEndIndex = () => {
    return(
        <div >
            {/* <h3>Home</h3> */}
            <Link to='/admin' >
                <Button>
                    Admin
                </Button>
            </Link>
        </div>
    )
}

export default FrontEndIndex;