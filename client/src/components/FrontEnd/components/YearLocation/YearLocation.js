import React, { Fragment } from 'react'
import Accordion from '../Accordion'
import Category from '../TagsMenu/Category'

const YearLocation = (props) => {

    let years = props.yearLocation.years
    let locations = props.yearLocation.locations

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
                    // checked={props.context.themeChecked(theme)}
                />
            </div>
            </li>
    })

    let locationList = locations.map(loc => {
        return <li key={`location-${loc}`}>{loc}</li>
    })

        return(
            <Fragment>
                <Category 
                    category="year/location"
                    context={props.context}
                    button
                />
                {/* <div className="category TagsMenu-Accordion-label">
                    <span>year/location</span><span/>
                </div> */}
                <div className="subcategory">
                    subcategories
                </div>
                <div className="list-items">
                    <ul>{yearList}</ul>
                </div>
                <div className="list-items">
                    <ul>{locationList}</ul>
                </div>
            </Fragment>
        )
}

export default YearLocation