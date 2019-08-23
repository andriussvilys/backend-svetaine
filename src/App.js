import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';
import JsonPreview from './components/JsonPreview';

const navData = require('./JSON/navigation.json');
const categories = Object.keys(navData);

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      category: [],
      subcategory: [],
      listitem: []
    }
  }

    onCheck = (e, stateKey) => {
      if(e.target.checked === true){
        let parent = e.target.parentNode.parentNode

        // let input = Array.from(parent.getElementsByTagName('input'))[0];
        const input = (target) => Array.from(target.getElementsByTagName('input'))[0];
        if(input(parent).checked !== true){
          input(parent).checked = true;
          // console.log(`input.value ${input.value}`)
          console.log(e.target.parentNode.className)
            if(e.target.parentNode.classList.contains('list--subcategory')) {
              this.setState({category: [...this.state.category, input(parent).value]})
            }
            if(e.target.parentNode.classList.contains('list--listitem')){
              this.setState({subcategory: [...this.state.subcategory, input(parent).value]})
              if(input(parent.parentNode).checked !== true){
                input(parent.parentNode).checked = true;
                console.log(`parent.aprentNode.value ${input(parent.parentNode).value}`);
                console.log(`parent.aprentNode.value ${input(parent).value}`);

                // this.setState({category: [...this.state.category, input(parent.parentNode).value]})
                // this.setState({category: {[input(parent.parentNode).value]: {[input(parent).value]: [e.target.value]}}})

              }
              this.setState({category: {...this.state.category, [input(parent.parentNode).value]: {[input(parent).value]: [e.target.value]}}})
              let listItemArray = this.state.category[input(parent.parentNode).value];
              console.log(this.state.category['medium'])
              // let listItemArray = this.state.category[input(parent.parentNode).value][input(parent).value];
              // listItemArray = [...listItemArray, e.target.value]
            }
          }
          // this.setState({category: input.value})
          this.setState({[stateKey]: [...this.state[stateKey], e.target.value]})
        }
      else{
        this.setState({[stateKey]: this.state[stateKey].filter(item => item !== e.target.value)})
      }
    }

    makeCategories = () => {
      let result = categories.map((category, index) => {
        // console.log(category)
        let subcategories = Object.keys(navData[category]).map(subcategory => {
          // console.log(navData[category][subcategory])
          let listitems = navData[category][subcategory].map((listitem, index) => {
            return(
              <li key={`${listitem, index}`} className="list--listitem list-group-item">
                <input type="checkbox" value={listitem} onChange={(e) => {this.onCheck(e, 'listitem')}} />
                <span>{listitem}</span>  
              </li>
            )
          })
          return(
            <ul key={subcategory} value={subcategory} className="list--subcategory list-group list-group-item">
              <input type="checkbox" value={subcategory} onChange={(e) => {this.onCheck(e, 'subcategory')}} />
              <span>{subcategory}</span>
              {listitems}
            </ul>
          )
        })
    return(
      <div key={category} label={category} className="list--category list-group">
        <ul value={category}> <input type="checkbox" value={category} onChange={(e) => {this.onCheck(e, 'category')}} /> <span>{category}</span>
        {subcategories}
        </ul>
      </div>
    )
  })
  return result
    }

  render(){
    return(
      <div>
        <div>
          <JsonPreview category={[this.state.category]} 
              subcategory={[this.state.subcategory]} 
              listitem={[this.state.listitem]} />
        </div>
        <div className="container">
          {this.makeCategories()}
        </div>
      </div>
    )
  }
}

// function App() {
//   return (

//   )
// }

// export default App;

// category: {
//   medium: {
//     graphics: [cg, print],
//     photo: [],
//   public: {}
//   }
