import React, { Component } from 'react';
import { Provider } from './components/Provider';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import {PrivateRoute} from './components/PrivateRoute'
import ImageInfo from './components/ImageInfo';
import Edit from './components/Edit'
import Delete from './components/Delete/Delete'
import FrontEndIndex from './components/FrontEnd/FrontEndIndex'
import FrontEndContext from './components/FrontEnd/FrontEndContext'
import Admin from './components/Admin'
import Login from './components/Login'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';

export default class App extends Component{

  render(){
    return(
        <BrowserRouter>
              <div className="data-container" >

              <Switch>
                <Route  path="/" exact component={FrontEndContext} />
                {/* <Route  path="/" exact component={FrontEndIndex} /> */}
                <Route  path="/admin/login" exact component={Login} />
                <PrivateRoute  path="/admin"  component={Admin} />
                <PrivateRoute  path="/admin/create" component={ImageInfo} />
                <PrivateRoute  path="/admin/edit" component={Edit} />
                <PrivateRoute  path="/admin/delete" component={Delete} />
                <Route to="/*" exact component={FrontEndIndex} />
              </Switch>

              </div>
        </BrowserRouter>
    )
  }
}