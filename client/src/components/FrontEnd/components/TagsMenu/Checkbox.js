import React from 'react'

const Checkbox = (props) => {
    return(
        <label className={`styledCheckbox-container ${props.className}`}>
                <input 
                    id={props.id}
                    className={`styledCheckbox-checkbox`}
                    type="checkbox" 
                    onChange={props.onChange} 
                    checked={props.isChecked}
                />
                <span className="styleCheckbox-checkmark"></span>
        </label>
//         <Fragment>
//                 <input 
//                 id={props.id}
//                 className="styled-checkbox"
//                 type="checkbox" 
//                 onChange={props.onChange} 
//                 checked={props.isChecked}
//                 />
// <label htmlFor={props.id}></label>
//         </Fragment>
    )
}
export default Checkbox