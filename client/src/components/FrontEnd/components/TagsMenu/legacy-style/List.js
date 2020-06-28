import React, { Fragment } from 'react'
import Category from './Category'
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
                <div className={"FilterTree-wrapper"}>
                    {this.props.data ? this.createList(this.props.data) : null}
                    {this.props.context.state.artworkOnDisplay ?                 
                    <ViewHide 
                        context={this.props.context}
                    /> : null
                    }
                    <Switch 
                        context={this.props.context}
                    />
                </div>
            </div>
        )
    }
}

export default List