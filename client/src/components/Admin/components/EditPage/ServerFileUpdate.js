import React from 'react';
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

import { Tab, Tabs } from 'react-bootstrap'
import Accordion from '../Accordion'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
// import ChangeIndex from '../../../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'
import BootstrapModal from '../BootstrapModal'
import Filters from '../Filters/Filters'
import EditFamilyInfo from '../FamilyInfo/EditFamilyInfo';

import SeeAlsoContainer from '../SeeAlso/SeeAlsoContainer'
import ImageBox from '../ImageBox/ImageBox';
import ArrangeFamilyIndexes from '../ArrangeIndexes/ArrangeFamilyIndexes';

/**
 * @props file 
 * @props state
 * @props controls
 * @props familyDropDown 
 * @props themesDropDown
 * @props seeAlso {                    
 *  state: this.context.state,
    context: this.context,
    initialData: this.context.state.artworkInfoData,
    onChange: this.context.fileDataMethods.onChange, 
        }
 */
export default class ServerFileUpdate extends React.Component {
    constructor(props){
        super(props);
        this.state = {showModal: false, modalMessage: null}
    }

    onClose = () => {
        this.setState({showModal: false})
    }
    verify = () => {
        const result = this.props.context.verify()
        if(result.verified){
          return true
        }
        else{
          this.setState({...result})
          return false
        }
      }
    render(){
        // if(!this.props.file){
        //     return null
        // }
        return(
        <div className="FamilyList--detail_update">
            <ImageBox 
                file={this.props.file}
            />
    
            <div className="FamilyList--detail__info">
            <Tabs defaultActiveKey="artworkInfo" transition={false} id={`${this.props.file.fileName}-fileUpdate`}>
                <Tab eventKey="artworkInfo" title="Edit Artwork Info">
                    <ArtworkInfo 
                        file={this.props.file}
                        fileName={this.props.file.fileName}
                        onChange={this.props.context.fileDataMethods.onChange}
                        state={this.props.context.state}
                    />
                </Tab>
                <Tab eventKey="familyInfo" title="Edit Artwork Family Info">
                    <EditFamilyInfo 
                    context={this.props.context}
                    fileName={this.props.file.fileName}
                    />
                </Tab>
                <Tab eventKey="filters" title="Filters">
                    <Filters 
                    context={this.props.context}
                    fileName={this.props.file.fileName}
                    />
                </Tab>
                <Tab eventKey="indexes" title="Arrange indexes">
                    <ArrangeFamilyIndexes 
                        data={this.props.context.state.relatedArtwork[this.props.file.artworkFamily]}
                        file={this.props.file}
                    />
                </Tab>
                <Tab eventKey="seeAlso" title="Select See Also recommendations">
                    <SeeAlsoContainer 
                        context={this.props.context}
                        directory={this.props.context.state.fileData.files[this.props.file.fileName].seeAlso}
                        initialData={this.props.context.state.artworkInfoData}
                    />
                </Tab>
            </Tabs>

            <div className="FamilyList--submit-delete-container">  

            <Link to={`/admin/edit`}>
                <Button
                    variant="danger"
                    className="custom-button"
                    onClick={ () => this.props.context.removeFile(this.props.file.fileName)}
                >
                    Cancel
                </Button>   
            </Link>
                <Button
                    variant="success"
                    className="custom-button"
                    onClick={() => {
                        if(!this.verify()){
                            return
                        }
                        this.setState({showModal: true, modalMessage: "loading..."})
                        //*************** */
                        const postRes = this.props.context.fileDataMethods.updateArtworkInfo(this.props.context.state.fileData.files[this.props.file.fileName])
                        postRes
                            .then( res => {
                            this.setState({modalMessage: res})
                            })
                            .catch(err => {
                                this.setState({modalMessage: err})
                            })
                    }
                    }
                >
                    Submit to server
                </Button>
    
            </div>
    
    
                <BootstrapModal 
                    showModal={this.state.showModal}
                    message={this.state.modalMessage}
                    onClose={this.onClose}
                />
            </div>    
    
        </div>
        )
    }
}

