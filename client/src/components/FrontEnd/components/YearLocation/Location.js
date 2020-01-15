import React, { Fragment } from 'react'
import Category from '../TagsMenu/Category'

const Location = (props) => {

    let locations = props.locations

    let locationList = locations.map(loc => {
        return <Category 
                    key={loc}
                    category={loc}
                    level="listitem"
                    // onChange={() => this.props.context.filterBySubcategory(category, subcategory, listitem)}
                    // isChecked={this.props.context.listitemChecked(category, subcategory, listitem)}
                    showContent={() => {return}}
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