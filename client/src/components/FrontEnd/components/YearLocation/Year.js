import React, { Fragment } from 'react'

const Year = (props) => {

    let years = props.years

    let yearList = years.map(year => {
    return <li key={`year-${year}`} className="tags-li">
            <div 
            className="tagsMenu-listItem"
            >
                <span>{year}</span>
                <input 
                    id={`year-${year}`}
                    type="checkbox" 
                    onChange={() => { props.filterByYear(year)}} 
                    checked={props.yearChecked(year)}
                />
            </div>
            </li>
    })

        return(
            <div>
                <ul className="tagsMenu-list tagsMenu-list-tags">{yearList}</ul>
            </div>
        )
}

export default Year