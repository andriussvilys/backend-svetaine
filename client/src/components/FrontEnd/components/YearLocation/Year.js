import React, { Fragment } from 'react'
import Category from '../TagsMenu/Category'

const Year = (props) => {

    let years = props.years

    let yearList = years.map(year => {
    // return <li key={`year-${year}`} className="tags-li">
    //         <div 
    //         className="tagsMenu-listItem"
    //         >
    //             <span>{year}</span>
    //             <input 
    //                 id={`year-${year}`}
    //                 type="checkbox" 
    //                 onChange={() => { props.filterByYear(year)}} 
    //                 checked={props.yearChecked(year)}
    //             />
    //         </div>
    //         </li>
            return <Category 
            key={year}
            category={year}
            level="year"
            onChange={() => props.context.filterByYear(year)}
            isChecked={props.context.yearChecked(year)}
            showContent={() => {return}}
            modifierClass={"year-tag"}
        />
    })

        return(
            <Fragment>
                <ul className="tagsMenu-list tagsMenu-list-tags">{yearList}</ul>
            </Fragment>
        )
}

export default Year