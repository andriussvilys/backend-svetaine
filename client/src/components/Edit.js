import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Context } from './Provider';
import FileUpdate from './FileUpdate'
import EditDetailContainer from './EditPage/EditDetailContainer'
import DnDListContainer from './DragAndDropList/DnDListContainer'

export default class Edit extends Component{
    static contextType = Context;
    render(){
        return(
                <Context.Consumer>
                {
                    () => {
                        return(
                            <div>
                                <Route exact path="/admin/edit">
                                    <EditDetailContainer 
                                        state={this.context.state}
                                        familySetupMethods={this.context.familySetupMethods}
                                    />
                                </Route>
                                <Route path="/admin/edit/:fileName"
                                > 
                                    <div style={{
                                        height: "calc (100vh - 8px)",
                                        width: "calc (100vw - 8px)",
                                        border: "4px solid black",
                                        boxSizing: "content-box"
                                    }}>
                                        
                                    </div>
                                </Route>
                            </div>
                        )
                    }
                }
                </Context.Consumer>
        )
    }
}