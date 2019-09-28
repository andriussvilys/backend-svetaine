import React, { Component } from 'react';
import { Context } from '../Provider';
import { DragDropContext} from 'react-beautiful-dnd';
import Column from './Column';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/components/navigationInfo.css';
import '../../css/components/imageInfo.css';

export default class NavigationInfo extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = this.props.state
    }

    onDragEnd = () => {
        alert('move ended')
    }

    render(){
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                {() => {
                    return this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const files = column.fileIds.map(fileId => {
                            return this.state.files[fileId]
                        })
                        return <Column 
                        key={column.id}
                        column={column}
                        files={files}
                        ></Column>
                    })
                }}
            </DragDropContext>
        )


        }
}