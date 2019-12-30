import React from 'react'
import Accordion from '../Accordion'

const Contact = (props) => {
    return(
        <Accordion
        title={<span>Contact</span>}
        toggle="0" 
        className="TagsMenu-Accordion-label"
        collapseId="about-collapse"
        level="category"
    >
        <p style={{margin: "20px 0 !important"}}>andriussvilys@gmail.com</p>
        <a href="https://www.instagram.com/istmblr/" rel="noopener noreferrer" target="_blank">instagram</a>
        </Accordion>
    )
}

export default Contact