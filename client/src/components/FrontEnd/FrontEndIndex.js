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
                            console.log('logged in')
                            props.history.push('/admin')
                        }
                        else{
                            console.log('needs logged in')
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