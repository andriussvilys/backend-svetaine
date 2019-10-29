import React, { Component } from 'react';
import { Context } from './Provider';
import FileUpdate from './FileUpdate'
import EditDetailContainer from './EditPage/EditDetailContainer'

export default class Edit extends Component{
    static contextType = Context;
    render(){
        return(
            <Context.Consumer>
              {
                  () => {
                    return(
                        <div>
                            {/* <FileUpdate 
                                state={this.context.state}
                                familySetupMethods={this.context.familySetupMethods}
                            /> */}
                            <EditDetailContainer 
                                state={this.context.state}
                                familySetupMethods={this.context.familySetupMethods}
                            />
                        </div>
                    )
                }
            }
            </Context.Consumer>
        )
    }
}