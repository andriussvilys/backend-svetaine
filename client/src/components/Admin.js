import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Provider } from './Provider';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ImageInfo from './ImageInfo';
import Edit from './Edit'

const Admin = (props) => {
    return(
        <BrowserRouter>
          <Provider>
            <nav>
                <ul style={{
                    display:'flex',
                    listStyleType: "none"
                    }}>
                    <li>
                    <Link to='/admin/create' >
                        <Button>
                            CREATE
                        </Button>
                    </Link>
                    </li>
                    <li>
                    <Link to='/admin/edit' >
                        <Button>
                            EDIT
                        </Button>
                    </Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
              <div className="data-container">
                {/* <ImageInfo/> */}
                <Route path="/admin/create" component={ImageInfo} />
                <Route path="/admin/edit" component={Edit} />
              </div>
            </div>
            </Provider>
        </BrowserRouter>
      )
}

export default Admin

