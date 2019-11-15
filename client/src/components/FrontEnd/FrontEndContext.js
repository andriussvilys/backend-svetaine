import React from 'react';
import { Provider } from './FrontEndProvider';

import FrontEndIndex from './FrontEndIndex'

export default class FrontEndContext extends React.Component{
    render(){
        console.log('frontendcontext PROPS')
        console.log(this.props)
        const props = {...this.props}
        console.log(props)
        return(    
            <Provider>
                <div>
                    <FrontEndIndex props={props}/>
                </div>
            </Provider>
        )
    }
}