import React from 'react'
import DropDownList from '../../DropDownList'

const Themes = (props) => {
    return(
        <DropDownList 
        title={"Select Family Themes"}
        state={props.state}
        array={props.dataArray}
        onChange={props.onChange}
        isChecked={props.isChecked}
        fileName={props.fileName}
        // onChange={this.context.familySetupMethods.onChange}
        // isChecked={this.context.familySetupMethods.isChecked}
        string={"themes"}
        id="Themes-list"
        router={'/api/themes/update'}
        addNewTarget={'themesData'}
        displayAddNew="initial"
        requestKey={"list"}
        />
    )
}

export default Themes 