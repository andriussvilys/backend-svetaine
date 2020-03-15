import React from 'react'
import FilePreview from '../FilePreview'

const SeeAlso = (props) => {

    const highlighter = (fileName) => {
        return props.directory ? props.directory.includes(fileName) : false
    }

    return(
        <div key={`fileLibrary-${props.file.fileName}`} 
        style={{width: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
        className={`${highlighter(props.file.fileName) ? 'themes-list--selected' : 'notSelected'}`} 
        >
            <div 
            style={{display:"flex", flexDirection:"column", height: "100%", justifyContent:"space-between", marginBottom: "1px"}}
            onClick={(e) => (console.log(props.file))}
            >
                <div>
                    <p className="subtitle">file name:</p>
                    <p style={{fontSize: "10px", fontWeight: "bold"}}>{props.file.fileName}</p>
                    <p className="subtitle">family name:</p>
                    <p style={{fontSize: "10px", fontWeight: "bold"}}>{!props.file.artworkFamily ? null : props.file.artworkFamily}</p>
                </div>
                <FilePreview 
                    key={`fileUpload-${props.file.fileName}`}
                    file={props.file}
                />
            </div>

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

        </div>
    )
}

export default SeeAlso