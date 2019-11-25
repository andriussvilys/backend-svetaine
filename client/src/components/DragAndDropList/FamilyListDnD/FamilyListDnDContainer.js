import React from 'react';
import { Context } from '../../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import FamilyListDroppable from './FamilyListDroppable'
import '../css/ImagesPreview.css'

export default class FamilyListDnDContainer extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = null
    }

    createDroppable = () => {
        return(
            <div>
                <FamilyListDroppable 
                key={this.props.data.column.id}
                column={this.props.data.column}
                files={this.props.data.files}
                columnIndex={0}
                fileName={this.props.fileName}
                artworkFamily={this.props.artworkFamily}
                >
                </FamilyListDroppable>
            </div>
        )
    }

    render(){
        return(
            <Context.Consumer>
                {() => {
                        if(this.props.data){
                            return(
                                <div> 
                                    <DragDropContext 
                                        onDragEnd={this.context.fileDataMethods.onDragEndFamilyList}>
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