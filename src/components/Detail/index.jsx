import React  from 'react'
import {connect} from 'react-redux'
import {getdetailList}from'../../store/actions'
import './index.css'
import Component from '../../tools/shouldComponent'
class Detail extends Component{
    render(){
        let {detailList,detailName}=this.props;
        return <div className="Detail">
            <ul className="detailList">
                <li className='title'>{detailName}</li>
               {
                   detailList&&detailList.map((item,key)=>{
                        return <li key={key} className='detailItem'>
                            <span>{item.time}</span>
                            <span>{item.what}</span>
                            <span>{item.moneyItem}</span>
                        </li>
                   })
               }
            </ul>
        </div>
    }
    componentDidMount(){
        let localId=localStorage.getItem('detailId')
        let id=this.props.location.pathname.split('detail/')[1]||localId;
        this.props.changeRedux(getdetailList(id))
    }
}
let mapToState=(state)=>{
    return {
        detailList:state.interactive.detailList,
        detailName:state.interactive.detailName
    }
}
let mapToDispatch=(dispatch)=>{
    return {
        changeRedux(obj){
            dispatch(obj)
        }
    }
}
Detail=connect(mapToState,mapToDispatch)(Detail)
export default Detail