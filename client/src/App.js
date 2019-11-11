import React, { Component } from 'react';
import { Provider } from './components/Provider';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import ImageInfo from './components/ImageInfo';
import Edit from './components/Edit'
import Delete from './components/Delete/Delete'
import FrontEndIndex from './components/FrontEnd/FrontEndIndex'
import Admin from './components/Admin'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';



// const navData = require('./JSON/navigation.json');
// const categories = Object.keys(navData);

export default class App extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <BrowserRouter>
        <Provider>

            <div className="data-container" >

            <Switch>
              <Route  path="/home" exact component={FrontEndIndex} />
              <Route  path="/admin" component={Admin} />
              <Route  path="/admin/create" exact component={ImageInfo} />
              <Route  path="/admin/edit" exact component={Edit} />
              <Route  path="/admin/delete" exact component={Delete} />
            </Switch>
             </div>

          </Provider>
      </BrowserRouter>
    )
  }
}