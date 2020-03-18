import React from 'react';
import Button from 'react-bootstrap/Button'
import { Provider } from '../Provider';
import { BrowserRouter,  Link } from 'react-router-dom';
import ImageInfo from './Create';
import Edit from './Edit'
import Delete from './oldComponents/Delete'
import {PrivateRoute} from '../PrivateRoute'

import auth from '../Auth'

const Admin = (props) => {
    return(    
        <BrowserRouter>
            <Provider>
                <div className="container">
                <div className="data-container overflow-yes">

                    <nav style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <div style={{marginLeft: "20px", fontWeight: "bold"}}>{!auth.guest ? "ADMIN" : "Guest"}</div>
                        <ul style={{display: "flex", listStyle:"none", margin:"0", flexWrap: "wrap", justifyContent: "flex-end"}}>
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
                            {!auth.guest ? <li>
                                        <Link to="/admin/delete">
                                            <Button variant="danger">
                                                Delete 
                                            </Button>
                                        </Link>
                                    </li> :
                                    null
                            }
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
                                        props.history.push('/admin/login')
                                    })
                                }}
                            >
                                Log OUT
                            </Button>
                            </li>
                        </ul>
                    </nav>

                    <PrivateRoute path="/admin/create" component={ImageInfo} guest={auth.guest} />
                    <PrivateRoute path="/admin/edit" component={Edit} guest={auth.guest}/>
                    <PrivateRoute path="/admin/delete" component={Delete} guest={auth.guest} />
                </div>
                </div>
            </Provider>
        </BrowserRouter>
      )
}

export default Admin

