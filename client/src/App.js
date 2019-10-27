import React, { Component } from 'react';
import { Provider } from './components/Provider';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import ImageInfo from './components/ImageInfo';
import Edit from './components/Edit'
import FrontEndIndex from './components/FrontEnd/FrontEndIndex'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';
import Admin from './components/Admin'



// const navData = require('./JSON/navigation.json');
// const categories = Object.keys(navData);

export default class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Provider>
          <div className="container">
            <div className="data-container">
              {/* <FrontEndIndex /> */}
              <ul style={{
                    display:'flex',
                    listStyleType: "none",
                    margin: 0,
                    padding: 0
                    }}>
                    <li>
                      <Link to='/home' >
                        <Button>
                            Front-End
                        </Button>
                    </Link>
                    </li>
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

              <Route path="/home" component={FrontEndIndex} />
              <Route path="/admin/create" component={ImageInfo} />
              <Route path="/admin/edit" component={Edit} />
            </div>
          </div>
          </Provider>
      </BrowserRouter>
    )
  }
}