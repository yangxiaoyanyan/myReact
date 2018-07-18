import React  from 'react'
import {connect} from 'react-redux'
import {getListAll} from '../../store/actions'
import Component from '../../tools/shouldComponent'
import './index.css'
import Scroll from 'react-bscroll'
class Settlement extends Component{
    render(){
        let {allmoney,userList,average} =this.props;
        return <Scroll  click={true}>
            <div className="Settlement">
                <p className='allmoney'>{allmoney}</p>
                <ul className="list">
                    <li>
                        <span>姓名</span>
                        <span>个人总计</span>
                        <span>平均</span>
                        <span>应付</span>
                        <span>应收</span>
                    </li>
                    {
                        userList&&userList.map((item,key)=>{
                            return <li key={key}>
                                <span>{item.user}</span>
                                <span>{item.usermoney}</span>
                                <span>{average}</span>
                                <span>{item.payment}</span>
                                <span>{item.receivables}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </Scroll>
    }
    componentDidMount(){
        this.props.changeRedux(getListAll)
    }
}
let mapToState=(state)=>{
    return {
        allmoney:state.interactive.allmoney,
        average:state.interactive.average,
        userList:state.interactive.userList
    }
}
let mapToDispatch=(dispatch)=>{
    return {
        changeRedux(obj){
            dispatch(obj)
        }
    }
}
Settlement=connect(mapToState,mapToDispatch)(Settlement)
export default Settlement