import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/main.css';

export default class JsonPreview extends Component {
    constructor(props){
        super(props)
    }
    makeList = (data) => {
      let list = data.map((item, index) => {
        return(
          <li key={`${item}${index}JsonPreviewLi`}>
            {item}
          </li>
        )
      })
      return list
    }
    render() {
        // console.log(this.props)
      return (
        <div className="JsonPreview">
            <div>
                "category:" {this.makeList(this.props.category)}
            </div>
            <div>
                {/* "subcategory": {this.makeList(this.props.subcategory)} */}
            </div>
            <div>
                "listitem:" {` ${this.props.listitem}- `}
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