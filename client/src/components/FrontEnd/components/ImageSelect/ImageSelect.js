import React from 'react'
import FilePreview from '../FilePreview'
import { Context } from '../../FrontEndProvider';

export default class ImageSelect extends React.Component{
    static contextType = Context;
    constructor(props){
        super(props)
        this.state = { artworkOnDisplay: null}
    }
    createPreviewsALL = (data) => {
        if(data){
            let previews = Object.keys(data).map((objName, index) => {
                if(data[objName].displayMain){
                    return <FilePreview 
                    key={`imageSelect-${objName}`}
                    containerClassName="ImagesPreview--imageContainer"
                    className="imageSelect-FilePreview" 
                    // onClick={(e) => this.props.methods.loadEnlarge(e)}
                    onClick={e => this.props.methods.loadEnlarge(e, objName)}
                    file={data[objName]} 
                    />
                }
                else{
                return <div key={`imageSelect-${objName}-${index}`} className="ImagesPreview--imageContainer__empty"></div>
                }
            })
            return(
                <div 
                id="imageSelect"
                className={`imageSelect-container ${document.documentElement.clientWidth > 721 ? "full-height" : ''}`}
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
                    // return this.createPreviews(this.props.data)
                    return this.createPreviewsALL(this.props.data)
                }}
            </Context.Consumer>
        )

    }
}