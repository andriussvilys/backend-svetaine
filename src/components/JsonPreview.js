import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/main.css';

export default class JsonPreview extends Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props)
      return (
        <div className="JsonPreview">
            <div>
                "category:" {this.props.category}
            </div>
            <div>
                "subcategory": {this.props.subcategory}
            </div>
            <div>
                "listitem:" {` ${this.props.listitem} `}
            </div>
        </div>
      )
    }
  }

// function JsonPreview(props) {
//     return(
//         console.log(this.props)
//         <div>
//             category: {this.props.category}
//             subcategory: {this.props.subcategory}
//             listitem: {this.item.listitem}
//         </div>
//     )
// }

// export default JsonPreview;