import React, { Fragment } from 'react'
import Category from './Category'
import ClearAll from '../../ClearAll'
import CompoundFilters from '../../CoumpoundFilters'
import pullUp from '../../functions/pullUp'
import ViewHide from './ViewHide'
import Switch from './slider'

export class List extends React.Component{
    constructor(props){
        super(props);
      this.state = {
          opened: false
      }
      this.createList = (data) => {
          const list = data.map(categoryObj => {
              return <Category 
                          key={categoryObj.category}
                          data={categoryObj}
                          context={this.props.context}
                      />
                  })
          return list
      }
    }
    render(){
        return(<div id="TagsMenu" className="FilterTree-container">

                {this.props.context.state.mobile?                
                    <button
                        className={"List-closeButton"}
                        onClick={(e) => {
                            this.props.context.showMenu(e)
                        }}      
                    >
                        <img className={"List-closeButton_img"} src="icons/svg/view-right.svg" alt="close icon"/>
                        <span>close</span>
                    </button> :             
                    <Fragment>
                        <div style={{borderBottom: "2px solid black", padding: "10px"}}>
                            <button 
                                className={"Mobilenav-button"}
                                onClick={(e) => {
                                    this.props.context.loadEnlarge(e, "portrait.jpg");
                                }}    
                            >
                                <span>About</span>
                            </button>
                            <button 
                                style={{border: "0 !important"}}
                                disabled
                                className={"Mobilenav-button"}
                            >
                                <span style={{textDecoration: "line-through solid black"}}>Contact</span>
                            </button>
                        </div>
                    </Fragment>
                }

                {this.props.data ? this.createList(this.props.data) : null}
                <ViewHide 
                    context={this.props.context}
                />
                <Switch 
                    context={this.props.context}
                />
            </div>
        )
    }
}

export default List