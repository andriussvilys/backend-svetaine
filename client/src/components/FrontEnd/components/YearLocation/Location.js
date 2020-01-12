import React, { Fragment } from 'react'
import Category from '../TagsMenu/Category'

const Location = (props) => {

    let locations = props.locations

    let locationList = locations.map(loc => {
        return <Category 
                    category={loc}
                    level="listitem"
                    // onChange={() => this.props.context.filterBySubcategory(category, subcategory, listitem)}
                    // isChecked={this.props.context.listitemChecked(category, subcategory, listitem)}
                    showContent={() => {return}}
                />

        // return <li key={`location-${loc}`}>{loc}</li>
    })

        return(
            <div>
                {locationList}
                {/* <ul>{locationList}</ul> */}
            </div>
        )
}

export default Location