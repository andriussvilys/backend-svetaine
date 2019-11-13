import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Provider } from './Provider';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ImageInfo from './ImageInfo';
import Edit from './Edit'
import Delete from './Delete/Delete'
import FrontEndIndex from './FrontEnd/FrontEndIndex';
import {PrivateRoute} from './PrivateRoute'

import auth from './Auth'

const Admin = (props) => {
    return(    
        <BrowserRouter>
            <Provider>
                <div className="container">
                <div className="data-container overflow-yes">
                    <nav style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <div style={{marginLeft: "20px", fontWeight: "bold"}}>ADMIN</div>
                        <ul style={{display: "flex", listStyle:"none", margin:"0"}}>
                            <li>
                                <Link to="/admin/create">
                                    <Button>
                                        Create 
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/edit">
                                    <Button>
                                        Edit
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/delete">
                                    <Button variant="danger">
                                        Delete 
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Button 
                                    variant="success"
                                    onClick={() => {
                                        props.history.push('/')
                                    }}
                                >
                                    Home
                                </Button>
                            </li>
                            <li>
                            <Button
                                onClick={() => {
                                    auth.logout( () => {
                                        console.log(auth.authenticated)
                                        props.history.push('/')
                                    })
                                }}
                            >
                                Log OUT
                            </Button>
                            </li>
                        </ul>
                    </nav>
                    <PrivateRoute path="/admin/create" component={ImageInfo} />
                    <PrivateRoute path="/admin/edit" component={Edit} />
                    <PrivateRoute path="/admin/delete" component={Delete} />
                </div>
                </div>
                </Provider>
        </BrowserRouter>




        
      )
}

export default Admin

