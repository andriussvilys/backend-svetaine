import React from 'react'

const YearLocation = (props) => {
    return(
        <div className="imageInfo--box" style={{display: "block"}}>
            <div>
                <span>location:</span>
                    <input 
                    type="text" 
                    value={props.location ? props.location : "" }
                    onChange={(e) => {
                        props.context.onChange(e, "location", props.fileName)
                    }} 
                    />
            </div>
            <div>
                <span>year:</span>
                    <input 
                    type="number" 
                    value={props.year ? props.year : "" }
                    onChange={(e) => {
                        props.context.onChange(e, "year", props.fileName)
                    }} 
                    />
            </div>
        </div>
    )
}

export default YearLocation