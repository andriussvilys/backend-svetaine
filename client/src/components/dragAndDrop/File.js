import React from 'react';
import {Draggable} from "react-beautiful-dnd"
import './css/dragAndDrop.css';

export default class File extends React.Component{
    bgColor = () => this.props.columnId === "column-2" ? {backgroundColor: "lime"} : {backgroundColor: "yellow"};


    render(){
        return(
            <Draggable 
            draggableId={this.props.file.id} 
            index={this.props.index}
            >
                {(provided)=>{
                    return(
                        <div
                            className="fileContainer"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <img 
                            className="file"
                            // style={{
                            //     height: "100%",
                            //     width: "auto",
                            //     objectFit: "contain",
                            //     border: "1px solid black",
                            //     backgroundColor: "white"
                            // }}
                            src={this.props.file.content}
                            alt={this.props.file.content}
                            />
                            <p className="file-index"
                            style={{backgroundColor: `${this.props.indexColor}`}}
                            // style={this.props.columnId === "column-2" ? {backgroundColor: "lime"} : {backgroundColor: "yellow"}}
                            >{this.props.index}</p>
                            <p className="file-title" >{this.props.file.id}</p>
                        </div>
                    )
                }}
            </Draggable>
        )
    }
} 