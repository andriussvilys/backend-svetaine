import React, { Fragment } from 'react'

const Selector = (props) => {
    return(
        <li className="legacyStyle-List-listItem">
            <label 
                // className={`FilterTree-title`}
                htmlFor={`FilterTree-checkbox-${props.title}`}
                >
                {props.title}
            </label>
                <input 
                // className={`styledCheckbox-checkbox`}
                id={`FilterTree-checkbox-${props.title}`} 
                type="checkbox" 
                checked={props.isChecked}
                onChange={props.onChange}
                ></input>
        </li>
    )
}
export default Selector