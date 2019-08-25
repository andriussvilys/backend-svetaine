import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';

export default class JsonPreview extends Component {
    // constructor(props){
    //     super(props)
    // }
    // makeList = (data) => {
    //   let list = data.map((item, index) => {
    //     return(
    //       <li key={`${item}${index}JsonPreviewLi`}>
    //         {item}
    //       </li>
    //     )
    //   })
    //   return list
    // }

    makeList = (categories, state) => {
      let list = categories.map((item, index) => {
        let subcategories = [];
        // console.log(categories)
        // console.log(Object.keys(state.category[item]))

        if(Object.keys(state.category[item])){
            subcategories = Object.keys(state.category[item]).map((subcategory, subIndex) => {
            let listitems = [];
            if(state.category[item][subcategory]){
              listitems = state.category[item][subcategory].map((listitem, listIndex) => {
                  return(
                  <p key={`${subcategory}${listIndex}JsonPreviewLi`} className="jsonPreview--listitem">
                    {`"${listitem}", `}
                  </p>
                  )
                })
            }
              
              return(
            <div key={`${subcategory}${subIndex}JsonPreviewLi`} className="jsonPreview--subcategory">
              {`"${subcategory}": [ `}
              
              {listitems}
              ]
            </div>
              )
          })
        }

        return(
          <div key={`${item}${index}JsonPreviewLi`} className="jsonPreview--ul">
            {`"${item}": {`}
            {subcategories}
            }
          </div>
        )
      })
      return list
    }

    // this.state.category[category]


    render() {
        // console.log(this.props)
      return (
        <div className="JsonPreview">
          {'{'}
          <div className="category">
          {`"category": {`}
            <div>
              {this.makeList(this.props.category, this.props.state)}
            </div>
            }
          </div>
          }
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