import React from 'react'

export default class MobileNav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            openTab: null,
            closeTabMethod: null
        }
        this.closePrev = (e, trigger) => {
            if(!this.state.openTab){
                return
            }
            if(this.state.openTab === "Filters" && trigger !== "Filters"){
                console.log("CLOSE FUNCTION")
                if(document.getElementById("TagsMenu").classList.contains("show-menu")){
                    this.props.context.showMenu(e)
                }
            }
            if(this.state.openTab === "About" && trigger !== "About"){
                console.log("CLOSE FUNCTION")
                this.props.context.closeEnlarge(e)
            }
            return
            // return this.setState({openTab: null})
        }
    }
    render(){
        return(<nav className={"MobileNav-container"}>
            <button 
            className={"Mobilenav-button"}
            onClick={(e) => {
                this.closePrev(e, "Filters")
                this.props.context.showMenu(e)
                let newState = {...this.state}
                newState.openTab = "Filters"
                newState.closeTabMethod = this.props.context.showMenu
                this.setState({openTab: "Filters"}, () => {console.log(this.props.context.showMenu)})
            }}
            ><span>Filters</span></button>
            <button 
                className={"Mobilenav-button"}
                onClick={(e) => {
                    this.closePrev(e, "About")
                    this.props.context.loadEnlarge(e, "portrait.jpg");
                    this.setState({openTab: "About"})
                }}    
            >
                <span>About</span>
            </button>
            <button 
            className={"Mobilenav-button"}>
                <span style={{textDecoration: "line-through solid black"}}>Contact</span>
            </button>
        </nav>)
    }
}
