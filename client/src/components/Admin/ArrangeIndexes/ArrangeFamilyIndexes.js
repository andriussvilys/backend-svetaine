import React from 'react';
import { Context } from '../../Provider';
import { DragDropContext } from 'react-beautiful-dnd';
import FamilyListDroppable from './subcomponents/FamilyListDroppable'

export default class ArrangeFamilyIndexes extends React.Component{
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
                fileName={this.props.file.fileName}
                artworkFamily={this.props.file.artworkFamily}
                >
                </FamilyListDroppable>
            </div>
        )
    }

    render(){
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