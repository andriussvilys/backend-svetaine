import React, { Fragment } from 'react'
import Categories from './subcomponents/Categories'
import DisplayTriggers from './subcomponents/DisplayTriggers/DisplayTriggers'
import YearLocation from './subcomponents/YearLocation'
import Themes from './subcomponents/Themes'
import Accordion from '../Accordion'

const Filters = (props) => {
    const data = props.fileName ? props.context.state.fileData.files[props.fileName] : props.context.state.familySetupData
    console.log("data")
    console.log(data)
    return(
        <Accordion
            title={"Filters"}
        >
            <Accordion
                title={'Select Year and Location'}
            >
                <YearLocation 
                    year={data.year}
                    location={data.location}
                    context={props.context}
                />
            </Accordion>

            <Themes 
                state={props.context.state}
                dataArray={props.context.state.themesData}
                onChange={props.context.familySetupMethods.onChange}
                isChecked={props.context.familySetupMethods.isChecked}
            />

            <Accordion
                title={"Select categories"}
            >
                <Categories />
            </Accordion>

            <Accordion
                title={"Select display triggers"}
            >
                <DisplayTriggers 
                    file={data}
                    context={props.context}
                    familySetup
                />
            </Accordion>
        </Accordion>
    )
}

export default Filters