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
            return <div 
                onScroll={() => {
                    if(!this.state.scrolled){
                        this.setState({"scrolled": true})
                        this.lazyLoadImages()
                    }
                }}
                id="imageSelect"
                className={`imageSelect-container ${document.documentElement.clientWidth > 721 ? "full-height" : ''}`}
                >
                    {previews}
                </div>
        }
        else{return null}  
    }

    lazyLoadImages = () => {
        console.log("lazy load called")
        const images = document.querySelectorAll(".imageSelect-FilePreview")
    
        const preloadImage = (img) => {
          const src = img.getAttribute("data-src")
          if(!src){
            return
          }
          img.src=src
        }
    
        const imgOptions = {
          threshold: 0,
          root: null,
          rootMargin: "0px 0px 300px 0px"
        }
    
        const imgObserver = new IntersectionObserver((entries, imgObserver) => {
          entries.forEach(entry => {
            if(!entry.isIntersecting){
              return
            }
            else{
              preloadImage(entry.target);
              imgObserver.unobserve(entry.target)
            }
          }, imgOptions)
        })
    
        images.forEach(image => {
          imgObserver.observe(image)
        })
      }
    
    render(){
        // if(document.querySelectorAll(".imageSelect-FilePreview")){
        //     this.lazyLoadImages()
        // }
        return(
            <Context.Consumer>
                {() => {
                    return this.createPreviewsALL(this.props.data)
                }}
            </Context.Consumer>
        )

    }
}