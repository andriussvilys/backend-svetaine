import React from 'react';
import {Draggable} from "react-beautiful-dnd"
import './css/dragAndDrop.css';

export default class File extends React.Component{
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
                            src={`uploads/${this.props.file.content}`}
                            alt={this.props.file.content}
                            />
                            <p className="file-index">{this.props.index}</p>
                        </div>
                    )
                }}
            </Draggable>
        )
    }
} 