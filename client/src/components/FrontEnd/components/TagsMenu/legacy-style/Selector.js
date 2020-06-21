import React, { Fragment } from 'react'

const Selector = (props) => {
    return(
        <li className="legacyStyle-List-listItem">
            <label 
                htmlFor={`FilterTree-checkbox-${props.id}`}
                // htmlFor={`FilterTree-checkbox-${props.title}`}
                >
                {props.title}
            </label>
                <input 
                id={`FilterTree-checkbox-${props.id}`} 
                // id={`FilterTree-checkbox-${props.title}`} 
                type="checkbox" 
                checked={props.isChecked}
                onChange={props.onChange}
                ></input>
        </li>
    )
}
export default Selector