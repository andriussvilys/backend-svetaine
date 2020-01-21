import React, { Fragment } from 'react'
import Category from '../TagsMenu/Category'

const Location = (props) => {

    let locations = props.locations

    let locationList = locations.map(loc => {
        return <Category 
                    key={loc}
                    category={loc}
                    level="location"
                    onChange={() => props.context.filterByLocation(loc)}
                    isChecked={props.context.locationChecked(loc)}
                    showContent={() => {return}}
                    modifierClass={"location-tag"}
                />

        // return <li key={`location-${loc}`}>{loc}</li>
    })

        return(
            <Fragment>
                {locationList}
            </Fragment>
        )
}

export default Location