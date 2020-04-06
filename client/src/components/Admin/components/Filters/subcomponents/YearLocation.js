import React from 'react'

const YearLocation = (props) => {
    return(
        <div className="imageInfo--box" style={{display: "block"}}>
            <div className="yearLocation-wrapper">
                <label 
                htmlFor={"filters-location"}
                >location:</label>
                    <input 
                    id={"filters-location"}
                    type="text" 
                    value={props.location ? props.location : "" }
                    onChange={(e) => {
                        props.context.onChange(e, "location", props.fileName)
                    }} 
                    />
            </div>
            <div className="yearLocation-wrapper">
                <label htmlFor={"filters-year"}>year:</label>
                    <input 
                    id={"filters-year"}
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