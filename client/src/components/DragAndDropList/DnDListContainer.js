import React from 'react';
import { Context } from '../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import DnDListDroppable from './DnDListDroppable'
import './css/ImagesPreview.css'

export default class DnDListContainer extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = null
    }
    createDroppable = () => {
        return(
            <div>
                <DnDListDroppable 
                key={this.props.data.column.id}
                column={this.props.data.column}
                files={this.props.data.files}
                columnIndex={0}
                >
                </DnDListDroppable>
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
                                    <DragDropContext 
                                        onDragEnd={this.context.onDragEnd}>
                                        {this.props.data ? this.createDroppable() : null}
                                    </DragDropContext>  
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