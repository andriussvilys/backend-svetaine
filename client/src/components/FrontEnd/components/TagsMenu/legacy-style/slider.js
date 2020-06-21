import React from 'react';

const Switch = (props) => {
    return(
        <div className="switch-container">
            <label htmlFor="slider" style={{fontSize: "14px"}}>compound filters: </label>
            <label className="switch">
                <input type="checkbox" 
                    id="slider"
                    onChange={() => {
                        // props.context.resetAll(true)
                        props.context.compoundFiltersSwitch()}}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Switch