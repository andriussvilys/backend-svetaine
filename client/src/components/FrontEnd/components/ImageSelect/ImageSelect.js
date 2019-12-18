import React from 'react'
import FilePreview from '../FilePreview'
import { Context } from '../../FrontEndProvider';

const ImageSelect = (props) => {
    // static contextType = Context;
    // constructor(props){
    //     super(props)
    //     state = { artworkOnDisplay: null}
    // }

    const imageSelectRef = React.createRef()
    const createPreviewsALL = (data) => {
        if(data){
            let previews = Object.keys(data).map((objName, index) => {
                if(data[objName].displayMain){
                    return <FilePreview 
                    lazyLoad={true}
                    key={`imageSelect-${objName}`}
                    containerClassName="ImagesPreview--imageContainer"
                    className="imageSelect-FilePreview" 
                    // onClick={(e) => props.methods.loadEnlarge(e)}
                    onClick={e => props.methods.loadEnlarge(e, objName)}
                    file={data[objName]} 
                    />
                }
                else{
                return <div key={`imageSelect-${objName}-${index}`} className="ImagesPreview--imageContainer__empty"></div>
                }
            })
            return <div 
                ref={imageSelectRef}
                id="imageSelect"
                className={`imageSelect-container ${document.documentElement.clientWidth > 721 ? "full-height" : ''}`}
                >
                    {previews}
                </div>
        }
        else{return null}  
    }

    const lazyLoadImages = () => {
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

    if(imageSelectRef){
      lazyLoadImages()
    }

        return(
            <Context.Consumer>
                {() => {
                  return createPreviewsALL(props.data)
                    // if(imageSelectRef){
                    // }
                    // return createPreviewsALL(props.data)
                }}
            </Context.Consumer>
        )
}

export default ImageSelect