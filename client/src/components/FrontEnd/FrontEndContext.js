import React from 'react';
import { Provider } from './FrontEndProvider';

import FrontEndIndex from './FrontEndIndex'

export default class FrontEndContext extends React.Component{
    render(){
        const props = {...this.props}
        return(    
            <Provider>
                <div>
                    <FrontEndIndex props={props}/>
                </div>
            </Provider>
        )
    }
}