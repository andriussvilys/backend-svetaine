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
        checkbox
        fileName={props.fileName}
        string={"themes"}
        id="Themes-list"
        
        router={'/api/themes/update'}
        addNewTarget={'themesData'}
        addNew={true}
        requestKey={"list"}
        // isChecked={this.context.familySetupMethods.isChecked}
        // onChange={this.context.familySetupMethods.onChange}
        />
    )
}

export default Themes 