import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap';

import SeeAlso from './SeeAlso'
import SelectFamily from '../FamilyInfo/subcomponents/SelectFamily'
import Accordion from '../Accordion'

export default class SeeAlsoContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileList: this.props.initialData,
            allFiles: this.props.initialData
        }
    }

    renderContainer = (data) => {
        const fileNames = Object.keys(data)
        const list = fileNames.map(fileName => {
            return <SeeAlso 
                        key={`seeAlso-${fileName}`}
                        file={data[fileName]}
                        directory={this.props.directory}
                    />
        })
    return <div className="admin-seeAlso-container">{list}</div>
    }

    filterByFamily = (value) => {
        let newRenderList = {}
        const data = this.state.allFiles
        const list = Object.keys(this.state.allFiles)
        list.forEach(objName => {
            if(data[objName].artworkFamily === value){
                const obj = data[objName]
                newRenderList = {...newRenderList, [objName]: obj}
            }
        })
        this.setState({fileList: newRenderList})
    }

    reloadAll = () => {
        this.setState({fileList: this.state.allFiles})
    }


    componentDidMount(){
        this.setState({fileList: this.props.initialData, allFiles: this.props.initialData})
    }

    render(){
        return(
            <Fragment>
                <Accordion
                    title={"filter by family"}
                >
                    <SelectFamily 
                        context={this.props.context}
                        onChange={this.filterByFamily}
                    />
                    <Button 
                        onClick={() => {
                            this.reloadAll()
                        }}
                    >
                        reload all
                    </Button>
                </Accordion>

                {this.renderContainer(this.state.fileList)}

            </Fragment>
        )
    }
}
