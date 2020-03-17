import React from 'react'
import FilePreview from '../FilePreview'
import ImageBox from '../ImageBox/ImageBox'

const SeeAlso = (props) => {

    const highlighter = (fileName) => {
        return props.directory ? props.directory.includes(fileName) : false
    }

    return(
        <div style={{border: "1px solid", margin: "2px"}} className={highlighter(props.file.fileName)? 'themes-list--selected' : 'notSelected'}>
            <ImageBox
                file={props.file}
            >
                <div style={{border: "1px solid grey", padding: "2px"}}>
                    <p style={{fontSize: "10px"}}>use as See Also recommendation</p>
                    <form style={{display:"flex", justifyContent:"space-evenly"}}>
                        <div className="container-radio">
                            <input type="radio" 
                            name="useAsSeeAlso" 
                            id="useAsSeeAlso__radio-yes" 
                            value="yes" 
                            onChange={() => {

                                props.onChange( props.file.fileName, "seeAlso", props.file.fileName, 
                                    props.callBack(props.file.fileName, props.fileName, true)
                                )
                            }}
                            checked={highlighter(props.file.fileName)}
                            />
                            <label 
                            htmlFor="useAsSeeAlso_yes"
                            id="useAsSeeAlso_yes"
                            >yes</label>
                        </div>
                        <div className="container-radio">
                            <input type="radio" 
                            name="useAsSeeAlso" 
                            id="useAsSeeAlso__radio-no" 
                            value="no" 
                            onChange={() => {
                                props.onChange( props.file.fileName, "seeAlso", props.file.fileName)
                            }}
                            checked={!highlighter(props.file.fileName)}
                            />
                            <label htmlFor="useAsSeeAlso_no">no</label>
                        </div>
                    </form>
                </div>
            </ImageBox>
        </div>
    )
}

export default SeeAlso