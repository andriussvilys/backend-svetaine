import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './Auth'

export const PrivateRoute = ({component: Component, ... rest}) => {
    return(
        <Route {...rest} render={
            (props) => {
                console.log(auth.isAuthenticated())
                if(auth.isAuthenticated()){
                    return <Component {...props} />
                }
                else{
                    return <Redirect 
                    to={
                        {
                        pathname: '/admin/login',
                        state: {
                            from: props.location
                            }
                        }
                    } 
                    />
                }
            }
        } />
    )
} 