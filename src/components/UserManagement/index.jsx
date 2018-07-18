import React  from 'react'
import Component from '../../tools/shouldComponent'
import { NavBar, Icon ,List, Modal, WingBlank,InputItem} from 'antd-mobile';
import './index.css'
import Scroll from 'react-bscroll'
import {connect} from 'react-redux'
import {getListAll,deleteUser,DELETE_USER_SUCCESS,addUser,CHANGE_ADD_SUCCESS,changeUser,CHNAGE_USER_SUCCESS} from '../../store/actions'
let Item = List.Item;
const alert = Modal.alert;
const prompt=Modal.prompt;
class UserManagement extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modal1:false,
            modal2:false,
            uid:'',
            user:'',
            money:''
        }
    }
    render(){
        let {userList}=this.props;
        let {uid,user,money,modal1,modal2}=this.state
        return <Scroll  click={true}>
            <div className="userManagement">
                <NavBar
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.go(-1)}}
                rightContent={
                    <WingBlank>
                        <Icon type="ellipsis" onClick={()=>{this.setState({modal1:true})}}/>
                    <Modal
                    visible={modal1}
                    transparent
                    maskClosable={false}
                    onClose={()=>{this.setState({modal1:false})}}
                    title="添加用户"
                    footer={[{ text: <WingBlank>确认</WingBlank>, onPress: ()=>{this.setState({modal1:false,modal2:true})} },{ text: '取消', onPress: () => {  this.setState({modal1:false}) } 
                }]}
                    >
                    <List>
                        <InputItem placeholder="id" onChange={(value)=>{
                            this.setState({uid:value})
                        }}></InputItem>
                        <InputItem placeholder="user"  onChange={(value)=>{
                            this.setState({user:value})
                        }}></InputItem>
                        <InputItem placeholder="money"  onChange={(value)=>{
                            this.setState({money:value})
                        }}></InputItem>
                    </List>
                    </Modal>
                    <Modal
                    visible={modal2}
                    transparent
                    maskClosable={false}
                    onClose={()=>{this.setState({modal2:false})}}
                    title="确认添加吗？"
                    footer={[{ text:'确认', onPress: this.addUser.bind(this) },{ text: '取消', onPress: () => {  this.setState({modal2:false}) } 
                }]}
                    >
                    <List>
                        <p>id:{uid}</p>
                        <p>user:{user}</p>
                        <p>money:{money}</p>
                    </List>
                    </Modal>
                    </WingBlank>
                }
                >用户管理</NavBar>
                <List>
                        <Item>
                            <div className="userLists">
                                <font>操作</font>
                                <span className="table_item">id</span>
                                <span className="table_item">user</span>
                                <font>del</font>
                            </div>
                        </Item>
                    {
                        userList&&userList.map((item,key)=>{
                            return  <Item key={key}>
                                <div className="userLists">
                                    <Icon type='check-circle' style={{marginRight:'.1rem'}} onClick={this.changeUser.bind(this,item.uid,item.user)} ></Icon>
                                    <span className="table_item">{item.uid}</span>
                                    <span className="table_item">{item.user}</span>
                                    <Icon type='cross-circle' onClick={this.del.bind(this,item.uid)}></Icon>
                                </div>
                            </Item>
                        })
                    }
                </List>
                
            </div>
        </Scroll>
            
    }
    componentDidMount(){
        this.props.changeRedux(getListAll)
    }
    componentWillReceiveProps(nextProps){
        let {addSuccess,changeUserSuccess,deleteSuccess,LoadingShow}=nextProps;
        if(LoadingShow){
            return false;
        }
        if(addSuccess===true||addSuccess===false){
            let title=addSuccess?'添加完成':'添加错误'
           this.success.call(this,title,this.addSuccess.bind(this))
        }
        if(changeUserSuccess===true||changeUserSuccess===false){
            let title=changeUserSuccess?'添加完成':'添加错误'
           this.success.call(this,title,this.changeSuccess.bind(this))
        }
        if(deleteSuccess===true||deleteSuccess===false){
            let title=deleteSuccess?'删除完成':'删除错误'
           this.success.call(this,title,this.deleteSuccess.bind(this))
        }
    }
    success(title,successFn){
        alert('提示',title , [
            { text: '确定', onPress:successFn},
            { text: '取消', onPress:successFn},            
            ])
    }
    addSuccess(){
        this.props.changeRedux({type:CHANGE_ADD_SUCCESS,addSuccess:null})
    }
    changeSuccess(){
        this.props.changeRedux({type:CHNAGE_USER_SUCCESS,addSuccess:null})
    }
    deleteSuccess(){
        this.props.changeRedux({type:DELETE_USER_SUCCESS,addSuccess:null})
    }
    addUser(){
        let {uid,user,money}=this.state
        this.setState({modal2:false});
        this.props.changeRedux(addUser({uid,user,money}))
    }
    changeUser(uid,users){
        prompt(
            '修改',
            '修改用户名', 
            [{ text: '取消' },
            { text: '确定', onPress: value =>{this.changeUserMethod.call(this,uid,value,users)} }],
            'default', 
            users
        )
    }
    changeUserMethod(uid,user,users){
        if(users===user){
            return alert('提示','用户名未改变' , [
                { text: '取消'},
                { text: '确定'},
                ])
        } else{
            this.props.changeRedux(changeUser(uid,user))
        }

    }
    del(uid){
        alert('删除用户', '确定删除吗???', [
            { text: '取消', onPress: () => console.log('取消') },
            { text: '确定', onPress: () => {this.props.changeRedux(deleteUser(uid))} },
            ])
    }
}
let mapToState=(state)=>{
    return {
        userList:state.interactive.userList,
        addSuccess:state.interactive.addSuccess,
        changeUserSuccess:state.interactive.changeUserSuccess,
        deleteSuccess:state.interactive.deleteSuccess,
        LoadingShow:state.interactive.LoadingShow
    }
}
let mapToDispatch=(dispatch)=>{
    return {
        changeRedux(obj){
            dispatch(obj)
        }
    }
}
UserManagement=connect(mapToState,mapToDispatch)(UserManagement)
export default UserManagement