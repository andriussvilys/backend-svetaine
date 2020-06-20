import React from 'react'
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
                {/* <div className={`hamburger ${this.state.opened ? 'hamburger-open' : ""}`}
                    onClick={(e) => {
                        this.props.context.showMenu(e)
                        this.setState({opened: !this.state.opened})
                    }}
                >
                    <img alt="hamburger icon" src={!this.state.opened ? "icons/hamburger.png" : "icons/close.png"} />
                </div> */}
                {/* <ClearAll
                    context={this.props.context}
                /> */}

                {this.props.context.state.mobile?                
                    <button
                        className={"List-closeButton"}
                        onClick={(e) => {
                            this.props.context.showMenu(e)
                        }}      
                    >
                        <img className={"List-closeButton_img"} src="icons/svg/view-right.svg" alt="close icon"/>
                        <span>close</span>
                    </button> : null
                }

                <ViewHide 
                    context={this.props.context}
                />
                {this.props.data ? this.createList(this.props.data) : null}
                <Switch 
                    context={this.props.context}
                />
            </div>
        )
    }
}

export default List