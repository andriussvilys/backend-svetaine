import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link, Route, Redirect } from 'react-router-dom'
import { Context } from '../Provider';

import auth from '../Auth'
import TagsMenu from './components/TagsMenu'
import Accordion from '../Accordion'
import ImageSelect from './components/ImageSelect/ImageSelect'

// const adminButtons = (props) => {
//     return(

//             <Accordion
//                 title="ADMIN"
//             >
//                 <div style={{display:"flex", flexDirection:"column"}}>
//                     <Button
//                         onClick={
//                             () => {
//                                 if(auth.isAuthenticated()){
//                                     console.log('logged in')
//                                     props.history.push('/admin/create')
//                                 }
//                                 else{
//                                     console.log('needs logged in')
//                                     props.history.push('/admin/login')
//                                 }
//                             }
//                         }
//                     >
//                         Admin
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             auth.logout( () => {
//                                 console.log(auth.authenticated)
//                                 props.history.push('/')
//                             })
//                         }}
//                     >
//                         Log Out
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             auth.login( () => {
//                             })
//                         }}
//                     >
//                         Log IN
//                     </Button>
//                 </div>
//             </Accordion>
//     )
// }        
export default class FrontEndIndex extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = {}
    }

    adminButtons = (props) => {
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
                                        props.history.push('/admin/create')
                                    }
                                    else{
                                        console.log('needs logged in')
                                        props.history.push('/admin/login')
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
                                    props.history.push('/')
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
        return(
            <Context.Consumer>
                {() => {
                    return <div className="frontEndIndex-container">
                        <TagsMenu>
                                {this.adminButtons(this.props)}
                        </TagsMenu>
                        <ImageSelect data={this.context.state.artworkInfoData} />
                    </div>
                }}
            </Context.Consumer>
        )
    }
}