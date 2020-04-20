import React, { Fragment } from 'react'
import Categories from './subcomponents/Categories'
import DisplayTriggers from './subcomponents/DisplayTriggers/DisplayTriggers'
import YearLocation from './subcomponents/YearLocation'
import Themes from './subcomponents/Themes'
import Accordion from '../Accordion'
import { Tabs, Tab } from 'react-bootstrap'

const Filters = (props) => {
    const data = props.fileName ? props.context.state.fileData.files[props.fileName] : props.context.state.familySetupData
    const onChange = props.fileName ? props.context.fileDataMethods.onChange : props.context.familySetupMethods.onChange
    const isChecked = props.fileName ? props.context.fileDataMethods.isChecked : props.context.familySetupMethods.isChecked

    return(
        <Tabs defaultActiveKey="categories" transition={false} id="noanim-tab-example">
            <Tab eventKey="categories" title="Categories">
                <Categories 
                    context={props.context}
                    fileName={data.fileName ? data.fileName : null}
                    modalInvoke={props.modalInvoke}
                    allowDelete={props.allowCategoriesDelete}
                />
            </Tab>
            <Tab eventKey="displayTriggers" title="Display Triggers">
                <DisplayTriggers 
                    file={data}
                    context={props.context}
                    familySetup={data.fileName ? false : true}
                />
            </Tab>
            <Tab eventKey="themes" title="Themes">
                <Themes 
                    context={props.context}
                    dataArray={props.context.state.themesData}
                    onChange={onChange}
                    fileName={data.fileName ? data.fileName : null}
                    modalInvoke={props.modalInvoke}
                    allowDelete={props.allowThemesDelete}
                />
            </Tab>
            <Tab eventKey="yearAndLocation" title="Year and Location">
                <YearLocation 
                    year={data.year}
                    location={data.location}
                    context={props.context}
                    fileName={data.fileName ? data.fileName : null}
                />
            </Tab>
        </Tabs>

        // <Accordion
        //     title={"Filters"}
        // >
        //     <Accordion
        //         title={`Year and Location`}
        //     >
        //         <YearLocation 
        //             year={data.year}
        //             location={data.location}
        //             context={props.context}
        //             fileName={data.fileName ? data.fileName : null}
        //         />
        //     </Accordion>

        //     <Accordion
        //         title={"Themes"}
        //     >
        //         <Themes 
        //             context={props.context}
        //             dataArray={props.context.state.themesData}
        //             onChange={onChange}
        //             fileName={data.fileName ? data.fileName : null}
        //             modalInvoke={props.modalInvoke}
        //             allowDelete={props.allowThemesDelete}
        //         />
        //     </Accordion>

        //     <Accordion
        //         title={"Categories"}
        //     >
        //         <Categories 
        //             context={props.context}
        //             fileName={data.fileName ? data.fileName : null}
        //             modalInvoke={props.modalInvoke}
        //             allowDelete={props.allowCategoriesDelete}
        //         />
        //     </Accordion>

        //     <Accordion
        //         title={"Display Triggers"}
        //     >
        //         <DisplayTriggers 
        //             file={data}
        //             context={props.context}
        //             familySetup={data.fileName ? false : true}
        //         />
        //     </Accordion>
        // </Accordion>
    )
}

export default Filters