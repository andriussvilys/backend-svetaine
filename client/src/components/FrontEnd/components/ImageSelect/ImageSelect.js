import React from 'react'
import FilePreview from '../FilePreview'
import { Context } from '../../FrontEndProvider';

const ImageSelect = (props) => {

    const createPreviewsALL = (data) => {
        if(data){
            let previews = Object.keys(data).map((objName) => {
              //check if width < height 
              //if true, add half-size class
              const halfSize = props.state.artworkInfoData[objName].naturalSize.naturalWidth < props.state.artworkInfoData[objName].naturalSize.naturalHeight ? "halfSize" : null
              if(props.state.artworkOnDisplay[objName]){
                return <FilePreview 
                        key={`imageSelect-${objName}`}
                        containerClassName={`ImagesPreview--imageContainer ${halfSize}`}
                        className="imageSelect-FilePreview loadByDefault" 
                        onClick={e => props.methods.loadEnlarge(e, objName)}
                        file={data[objName]} 
                        mobile={props.mobile}
                        />
              }
              else{
                return <FilePreview 
                        key={`imageSelect-${objName}`}
                        containerClassName={`
                        ImagesPreview--imageContainer 
                        ImagesPreview--imageContainer__empty
                        ${halfSize}`}
                        className="imageSelect-FilePreview" 
                        onClick={e => props.methods.loadEnlarge(e, objName)}
                        file={data[objName]} 
                        mobile={props.mobile}
                        />
              }
            })
            return <div 
                      id="imageSelect"
                      className={`imageSelect-container ${document.documentElement.clientWidth > 721 ? "full-height" : null}`}
                      >
                          {previews}
                          {props.mobile ? <div id="spanner" style={{width: "calc(100% - 15vw)", flex: "1 1 100%"}}></div> : null}
                          {setTimeout(() => {
                            lazyLoadImages()
                          }, 50)}

                    </div>
        }
        else{return null}  
    }

    const lazyLoadImages = () => {  
        const images = document.querySelectorAll(".loadByDefault")

        if(images){
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
      }
    return(
      createPreviewsALL(props.data)
    )
}

export default ImageSelect