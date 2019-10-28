import React from 'react';
import { Context } from './Provider';
import FileDetail from './FileDetail'
import '../css/ImagesPreview.css'

export default class DnDListContainer extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = null
    }

    createFileDetail = () => {
        return(
            <div>
                <FileDetail 
                key={this.props.data.column.id}
                column={this.props.data.column}
                files={this.props.data.files}
                columnIndex={0}
                >
                </FileDetail>
            </div>
        )
    }

    render(){
        //if this component receives props, we set up the its state
        return(
            <Context.Consumer>
                {() => {
                        if(this.props.data){
                            return(
                                <div> 
                                    {this.props.data ? this.createFileDetail() : null}
                                </div>
                            )
                
                        }
                        else{
                            return null
                        }
                }

                }
            </Context.Consumer>
        )
    }
}