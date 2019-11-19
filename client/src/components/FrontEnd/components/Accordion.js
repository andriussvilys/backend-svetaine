import React from 'react'
import {Accordion as BootstrapAccordion, Card, Button} from 'react-bootstrap'

const Accordion = (props) => {

    const toggle = (toggle) => {
        if(toggle){
        //     return <BootstrapAccordion as={Card.Header} eventKey="null"
        //     style={{fontWeight: "600"}}
        //     as={Button} 
        //     variant="link" 
        //     eventKey="0" 
        //     className={props.className}
        // >
        //     <BootstrapAccordion.Toggle as={Button} variant="link" eventKey="0" >
        //         {props.title}
        //     </BootstrapAccordion.Toggle>
        //     {props.checkbox}
        // </BootstrapAccordion>
           return  <BootstrapAccordion.Toggle 
            as={Button} 
            variant="link" 
            eventKey="0" 
            className={props.level === "category" ? "tagsMenu-Button tagsMenu-Button_category" : "tagsMenu-Button tagsMenu-Button_subcategory"}
            >
                {props.title}
            </BootstrapAccordion.Toggle>
        }
        else{
            return(
            // <BootstrapAccordion as={Card.Header} eventKey="null"
            //     style={{fontWeight: "600"}}
            //     as={Button} 
            //     variant="link" 
            //     eventKey="0" 
            //     className={props.className}
            // >
            //     {props.title}
            //     {props.checkbox}
            // </BootstrapAccordion>
            <BootstrapAccordion 
            as={Button} 
            variant="link" 
            eventKey="0" 
            className={props.level === "category" ? "tagsMenu-Button_category" : "tagsMenu-Button_subcategory"}
            style={{width: "auto"}}
            >
                {props.title}
            </BootstrapAccordion>
            )
        }
    }
    
    return(
        <BootstrapAccordion>
            <Card className="TagsMenu-Card">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* <BootstrapAccordion.Toggle 
                    as={Button} 
                    variant="link" 
                    eventKey="0" 
                    className={props.level === "category" ? "tagsMenu-Button_category" : "tagsMenu-Button_subcategory"}
                    >
                        {props.title}
                    </BootstrapAccordion.Toggle> */}
                    {toggle(props.toggle)}
                        {props.checkbox}
                </div>
                

                <BootstrapAccordion.Collapse eventKey="0">
                <Card.Body>
                    {props.children}
                </Card.Body>
                </BootstrapAccordion.Collapse>
            </Card>
        </BootstrapAccordion>  
    )
}

export default Accordion