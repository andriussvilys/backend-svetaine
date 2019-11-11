import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Provider } from './Provider';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ImageInfo from './ImageInfo';
import Edit from './Edit'
import Delete from './Delete/Delete'
import FrontEndIndex from './FrontEnd/FrontEndIndex';

const Admin = (props) => {
    return(
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
                            <Link to="/home">
                                <Button variant="success">
                                    Home
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* <ImageInfo/> */}
                {/* <Route path="/home" exact component={FrontEndIndex} /> */}
                <Route path="/admin/create" component={ImageInfo} />
                <Route path="/admin/edit" component={Edit} />
                <Route path="/admin/delete" component={Delete} />
              </div>
            </div>
            </Provider>
      )
}

export default Admin

