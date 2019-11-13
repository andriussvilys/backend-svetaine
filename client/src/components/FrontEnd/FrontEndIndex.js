import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link, Route, Redirect } from 'react-router-dom'

import auth from '../Auth'

const FrontEndIndex = (props) => {
    return(
        <div >
            <Button
                onClick={
                    () => {
                        if(auth.isAuthenticated()){
                            props.history.push('/admin')
                        }
                        else{
                            props.history.push('/admin/login')
                        }
                    }
                }
            >
                Admin
            </Button>
            <Button
                onClick={() => {
                    auth.logout( () => {
                        console.log(auth.authenticated)
                        props.history.push('/')
                    })
                }}
            >
                Log Out
            </Button>
            <Button
                onClick={() => {
                    auth.login( () => {
                    })
                }}
            >
                Log IN
            </Button>
        </div>
    )
}

export default FrontEndIndex;