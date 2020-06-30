import React from 'react';

const Switch = (props) => {
    return(
        <div className="switch-container">
            <label className="combineFilters-title" htmlFor="slider" style={{fontSize: "14px"}}>combine filters: </label>
            {/* <label className="switch">
                <input type="checkbox" 
                    id="slider"
                    onChange={() => {
                        // props.context.resetAll(true)
                        props.context.compoundFiltersSwitch()}}
                />
                <span className="slider round"></span>
            </label> */}
            <form className="combineFilters-form">
                <div className="combineFilters-inputContainer">
                    <label 
                        htmlFor="compoundFilters-yes"
                        className="combineFilters-label"
                    >yes</label>
                        <input 
                        checked={props.context.state.compoundFilters}
                        name="compoundFilters"
                        id="compoundFilters-yes"
                        type="radio"
                        onChange={(e) => {
                            // e.preventDefault()
                            // props.context.resetAll(true)
                            props.context.compoundFiltersSwitch()}}
                        value="no"
                        />
                </div>

                <div className="combineFilters-inputContainer">
                    <label 
                        htmlFor="compoundFilters-no"
                        className="combineFilters-label"
                    >no</label>
                        <input 
                        checked={!props.context.state.compoundFilters}
                        name="compoundFilters"
                        id="compoundFilters-no"
                        type="radio"
                        onChange={(e) => {
                            // e.preventDefault()
                            // props.context.resetAll(true)
                            props.context.compoundFiltersSwitch()}}
                        value={"yes"}
                        />
                </div>                
            </form>
        </div>
    )
}

export default Switch