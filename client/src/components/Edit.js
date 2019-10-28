import React, { Component } from 'react';
import { Context } from './Provider';
import FileUpdate from './FileUpdate'

export default class Edit extends Component{
    static contextType = Context;
    render(){
        return(
            <Context.Consumer>
              {
                  () => {
                    return(
                        <FileUpdate 
                            state={this.context.state}
                            familySetupMethods={this.context.familySetupMethods}
                        />
                    )
                }
            }
            </Context.Consumer>
        )
    }
}