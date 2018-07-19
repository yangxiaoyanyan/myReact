import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getListAll} from '../../store/actions'
import Component from '../../tools/shouldComponent'
import Scroll from 'react-bscroll'
import { /*Carousel, WingBlank,*/List ,InputItem} from 'antd-mobile';
let Item = List.Item;
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            userList:[]
        }
    }
    render(){
        let {allmoney,userList}=this.props
        return <Scroll click={true}>
            <div className="Home">
                <List>
                    <InputItem
                        type="password"
                        placeholder="请输入密码" 
                        onInput={this.input.bind(this)}
                    >密码</InputItem>
                </List>
                <p style={{width:'2rem',height:'.8rem',borderRadius:".2rem",background:'#999',margin:'.1rem auto',textAlign:'center',lineHeight:'.8rem'}}>{allmoney}</p>
                {/* <WingBlank>
                    <Carousel 
                    dots={false}
                    autoplay
                    infinite
                    speed={1000}
                    style={{padding:'.2rem 0'}}
                    >
                    {['ring','ring'].map(type => (
                        <div className="v-item" key={type}>{type}</div>
                    ))}
                    </Carousel>
                </WingBlank> */}
                <div className="userlist" style={{display:userList.length===0?'none':'block'}}>
                    <List>
                    {
                        userList&&userList.map((item,key)=>{
                            //uid: 0, user: "yang", money: 0, usermoney: 120
                            return <Link key={key} to={'detail/'+item.uid} >
                                <Item extra={item.usermoney} style={{borderBottom:'.01rem solid #ccc'}}>
                                    <span style={{display:'inline-block',width:'1rem'}}>{item.uid}</span>{item.user} 
                                </Item>
                            </Link>
                        })
                    }    
                    </List>
                </div>
            </div>     
        </Scroll>
    }
    input(e){
        console.log(e)
        if(/*e.keyCode===13&&*/e.target.value==='123'){
            console.log('1')
            this.props.history.push('/userManagement')
        }
    }
    componentDidMount(){
        this.props.changeRedux(getListAll)
    }
}
let mapToState=(state)=>{
    return {
        allmoney:state.interactive.allmoney,
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
Home=connect(mapToState,mapToDispatch)(Home)
export default Home