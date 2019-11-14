import React from 'react'
import FilePreview from './FilePreview'

export default class ImageSelect extends React.Component{
    constructor(props){
        super(props)
        this.state = { artworkOnDisplay: null}
    }

    componentDidMount(){
        this.setState({artworkOnDisplay: this.props.data})
    }
    
    render(){
        if(this.props.data){
            let previews = Object.keys(this.props.data).map(objName => {
                return <FilePreview file={this.props.data[objName]} />
            })
            return(
                <div className="imageSelect-container">
                    {previews}
                </div>
            )
        }
        else{return null}
    }
}