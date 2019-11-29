import React from 'react'
import FilePreview from '../FilePreview'
import { Context } from '../../FrontEndProvider';

export default class ImageSelect extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = { artworkOnDisplay: null}
    }

    createPreviews = (data) => {
        console.log("CREATE PREVIEWS")
        console.log(data)
        console.log(this.context.state.artworkOnDisplay)
        if(data){
            let previews = Object.keys(data).map(objName => {
                return <FilePreview 
                containerClassName="ImagesPreview--imageContainer"
                className="imageSelect-FilePreview" 
                onClick={this.props.methods.loadEnlarge}
                file={data[objName]} 
                />
            })
            return(
                <div 
                id="imageSelect"
                className="imageSelect-container"
                >
                    {previews}
                </div>
            )
        }
        else{return null} 
    }

    componentDidMount(){
        this.setState({artworkOnDisplay: this.props.data})
    }
    
    render(){
        return(
            <Context.Consumer>
                {() => {
                    return this.createPreviews(this.props.data)
                }}
            </Context.Consumer>
        )

    }
}