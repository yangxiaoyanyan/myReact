import React from 'react'
import {fromJS} from 'immutable'
export default class Component extends React.Component{
    shouldComponentUpdate(nextProps,nextState){
        return !fromJS(nextProps).equals(fromJS(this.props))||!fromJS(nextState).equals(fromJS(this.state))
        // return true
    }
}