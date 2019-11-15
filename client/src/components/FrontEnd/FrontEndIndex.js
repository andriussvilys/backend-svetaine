import React from 'react'
import Button from 'react-bootstrap/Button'
import { Context } from './FrontEndProvider';
import { BrowserRouter,  Link } from 'react-router-dom';
// import {Context} from '../Provider'

import auth from '../Auth'
import TagsMenu from './components/TagsMenu'
import Accordion from '../Accordion'
import ImageSelect from './components/ImageSelect/ImageSelect'

Array.from(document.getElementsByTagName("h4")).forEach(item => {
    item.style.whiteSpace = "normal"
})
export default class FrontEndIndex extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {}
    }

    adminButtons = (props) => {
        console.log('FE INDEX PROPS')
        console.log(this.props.props)
        return(
    
                <Accordion
                    title="ADMIN"
                >
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <Button
                            onClick={
                                () => {
                                    if(auth.isAuthenticated()){
                                        console.log('logged in')
                                        this.props.props.history.push('/admin/create')
                                    }
                                    else{
                                        console.log('needs logged in')
                                        this.props.props.history.push('/admin/login')
                                    }
                                }
                            }
                        >
                            Admin
                        </Button>
                        <Button
                            onClick={() => {
                                auth.logout( () => {
                                    console.log(auth.authenticated)
                                    this.props.props.history.push('/')
                                })
                            }}
                        >
                            Log Out
                        </Button>
                        <Button
                            onClick={() => {
                                auth.login( () => {
                                })
                            }}
                        >
                            Log IN
                        </Button>
                    </div>
                </Accordion>
        )
    }  

    render(){
        console.log('FE INDEX load')
        console.log("props")
        console.log(this.props)
        return(
            <BrowserRouter>
                <Context.Consumer>
                    {() => {
                        console.log(this.context)
                        return <div className="frontEndIndex-container">
                            <TagsMenu context={this.context}>
                                {this.props ? this.adminButtons(this.props) : null}
                                    {/* {this.adminButtons(this.props)} */}
                            </TagsMenu>
                            <ImageSelect data={this.context.state.artworkOnDisplay} />
                        </div>
                    }}
                </Context.Consumer>
            </BrowserRouter>
        )
    }
}