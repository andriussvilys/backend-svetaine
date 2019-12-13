import React from 'react'
import Accordion from '../Accordion'
import Button from 'react-bootstrap/Button'

const Contact = (props) => {
    return(
        <Accordion
        title="Contact"
        toggle="0" 
        className="TagsMenu-Accordion-label"
        collapseId="about-collapse"
    >
        <p style={{margin: "20px 0 !important"}}>andriussvilys@gmail.com</p>
        <a href="https://www.instagram.com/istmblr/" target="_blank">instagram</a>
        </Accordion>
    )
}

export default Contact