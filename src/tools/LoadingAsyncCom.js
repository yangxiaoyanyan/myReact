import React,{Component} from 'react'
// import {Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import './LoadingAsyncCom.css'
export let LoadAsyncCom=(asyncFn,Loading)=>{
    return class Load extends Component{
        constructor(props){
            super(props);
            this.state={
                Load:Loading
            }
        }
        render(){
            let {Load}=this.state;
            return <Load {...this.props}></Load>
        }
        componentDidMount(){
            asyncFn().then((res)=>{
                let Load=res.default;
                this.setState({Load})
            })
        }
    }
}

class Load extends Component{
    render(){
        let {LoadingShow}=this.props
        return <div style={{display:LoadingShow?"flex":"none"}} className="pos">
            <img src={require('../img/loading2.gif')} alt=''/>
        </div>
    }
}
let mapState=(state)=>{
    return {
        LoadingShow:state.interactive.LoadingShow
    }
}
Load=connect(mapState)(Load)
export  let Loading=Load


