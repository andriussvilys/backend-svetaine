import React from 'react';

const Switch = (props) => {
    return(
        <div className="switch-container">
            <label htmlFor="slider" style={{fontSize: "14px"}}>combine filters: </label>
            {/* <label className="switch">
                <input type="checkbox" 
                    id="slider"
                    onChange={() => {
                        // props.context.resetAll(true)
                        props.context.compoundFiltersSwitch()}}
                />
                <span className="slider round"></span>
            </label> */}
            <form>
                <div>
                    <label htmlFor="compoundFilters-yes">yes</label>
                        <input 
                        checked={props.context.state.compoundFilters}
                        name="compoundFilters"
                        id="compoundFilters-yes"
                        type="radio"
                        onChange={() => {
                            // props.context.resetAll(true)
                            props.context.compoundFiltersSwitch()}}
                        value="no"
                        />
                </div>

                <div>
                    <label htmlFor="compoundFilters-no">no</label>
                        <input 
                        checked={!props.context.state.compoundFilters}
                        name="compoundFilters"
                        id="compoundFilters-no"
                        type="radio"
                        onChange={() => {
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