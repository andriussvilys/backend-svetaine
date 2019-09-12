import React from 'react';
import { Context } from './Provider';
import axios from 'axios';
import '../css/components/extendedList.css';
import '../css/components/imageInfo.css';
// import openIconic from 'open-iconic';

class AddNew extends React.Component{

static contextType = Context;

// componentDidMount(){
//     console.log('component did mount')
//     this.context.loadData("themes")
// }

// addNew = (e, id, router, requestKey) => {
//     e.preventDefault();
//     console.log('addNew Runs')
//     console.log(id)
//     console.log(router)
//     console.log(requestKey)
//     const newAddition = document.getElementById(id).value;
//     console.log(newAddition)
//     axios.put(router, {[requestKey]: newAddition})
//     // axios.put(router, requestKey, requestValue)
//     // eg.: axios.put('api/themes/update', {[key]: "value"})
//     .then( res => {
//       let addition = res.data[requestKey]
//       console.log(addition)
//       return addition
//     })
//     .then(res => {
//         this.setState({ [requestKey]: [...this.state[requestKey], newAddition]})
//     })
//   }

render(){
    return(
        <Context.Consumer>
        {()=>{
            return(
                <div className="imageInfo--box">
                    <span className="subtitle">
                        Add new {this.props.stateKey}
                    </span>
                    <form 
                    id={`formFor-${this.props.stateKey}`}
                    action={this.props.router}
                    onSubmit={ (e) => {
                        this.context.addNew(
                            e,
                            e.target.firstChild.id,
                            e.target.action,
                            this.props.requestKey,
                            this.props.stateKey
                        )
                    }
                    }
                    >
                        <input 
                            type="text" 
                            id={`add-${this.props.stateKey}-item`} 
                            // onSubmit={ (e) => {
                            //     this.addNew(
                            //         e,
                            //         e.target.previousSibling.id,
                            //         e.target.parentNode.action,
                            //         {[this.props.requestKey]: this.props.requestValue}
                            //     )
                            // }
                            // }
                        />
                        <button 
                        type="submit" 
                        form={`formFor-${this.props.stateKey}`}
                        value="SEND"
                        className="button-extend"

                        // onSubmit={ (e) => {
                        //     this.addNew(
                        //         e,
                        //         e.target.previousSibling.id,
                        //         e.target.parentNode.action,
                        //         {[this.props.requestKey]: this.props.requestValue}
                        //     )
                        // }
                        // }
                        
                        > 
                        </button>
                    </form>
                </div>
            )
            }
        }
        </Context.Consumer>
    )
    }
}

export default AddNew;