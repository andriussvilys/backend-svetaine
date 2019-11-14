import React from 'react'
import {Accordion as BootstrapAccordion, Card, Button} from 'react-bootstrap'

const Accordion = (props) => {
    return(
        <BootstrapAccordion>
            <Card>
                <BootstrapAccordion.Toggle as={Card.Header} eventKey="0"
                    style={{fontWeight: "600"}}
                    as={Button} 
                    variant="link" 
                    eventKey="0" 
                    className={props.className}
                >
                    {props.title}
                </BootstrapAccordion.Toggle>
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