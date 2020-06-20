import React from 'react'

export default class ViewHide extends React.Component{
    constructor(props){
        super(props);
      this.state = {view: true}
    }
    render(){
        return(
            <div className="button_legacy-style--container">
                <button
                    disabled={this.state.view}
                    className={`button_legacy-style ${!this.state.view ? `button_legacy-style_disable` : `button_legacy-style_enable`}`}
                    onClick={() => {
                        this.setState({view: !this.state.view})
                        this.props.context.resetAll()}}
                >View all</button>
                <button
                    disabled={!this.state.view}
                    className={`button_legacy-style ${this.state.view ? `button_legacy-style_disable` : `button_legacy-style_enable`}`}
                    onClick={() => {
                        this.setState({view: !this.state.view})
                        this.props.context.resetAll(true)}}
                >Hide all</button>
            </div>
        )
    }
}