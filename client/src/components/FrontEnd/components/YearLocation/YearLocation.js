import React from 'react'
import Accordion from '../Accordion'

const YearLocation = (props) => {

    let years = props.yearLocation.years
    let locations = props.yearLocation.locations

    let yearList = years.map(year => {
    // return <li key={`year-${year}`}>{year}</li>
    return <li key={`year-${year}`} className="tags-li">
            <div 
            className="tagsMenu-listItem"
            // className={
            //     props.context.themeChecked(theme) ? "tagsMenu-listItem checkbox-selected" : "tagsMenu-listItem"
            // }
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
            <Accordion
                title={<span>Year/Location</span>}
                toggle="1" 
                className="Tags"
                open={!props.state.mobile ? "1" : "0"}
                collapseId={"tags-collapse"}
                level="category"
            >   
                <ul>{yearList}</ul>
                <ul>{locationList}</ul>
            </Accordion>
        )
}

export default YearLocation