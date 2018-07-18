import React  from 'react'

import Component from '../../tools/shouldComponent'
import {connect} from 'react-redux'
import { DatePicker, List,Picker,InputItem ,Button,WingBlank,Modal} from 'antd-mobile';
import {getListAll,addRecord,ADD_RECORD_SUCCESS} from '../../store/actions'
const alert = Modal.alert;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Submit extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            date: now,
            money:'',
            what:'',
            userArr:[]
        }
    }
    render(){
        let {date,money,what,userArr,visible}=this.state
        let {userList}=this.props;
        let seasons=this.getNewUserArr(userList)
        return <div className="Submit">
            <WingBlank>
                <List>
                    <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={date}
                    onChange={Time => {this.setState({ date:Time });console.log(this.state.date)}}
                    >
                    <List.Item arrow="horizontal">日期</List.Item>
                    </DatePicker>
                    <Picker
                    data={seasons}
                    title="选择用户"
                    cascade={false}
                    extra="请选择(可选)"
                    value={userArr}
                    onChange={v => this.setState({ userArr: v })}
                    onOk={v => this.setState({ userArr: v })}
                    >
                    <List.Item arrow="horizontal">姓名</List.Item>
                    </Picker>
                    <InputItem placeholder="金额" value={money} onChange={(money)=>{;this.setState({money})}}>金额</InputItem>
                    <InputItem placeholder="用途" value={what} onChange={(what)=>{;this.setState({what})}}>备注</InputItem>
                </List>
                <div className="btns" style={{display:'flex',justifyContent:'center',padding:'.3rem 0'}}>
                    <Button type="primary" inline size="small" style={{ marginRight: '.2rem' }} onClick={()=>{this.setState({visible:true})}}>提交</Button>
                    <Button type="warning" inline size="small" style={{ marginRight: '.2rem' }} onClick={this.clearBtn.bind(this)}>清空</Button>
                </div>
                <Modal
                visible={visible}
                transparent
                maskClosable={false}
                onClose={()=>{this.setState({visible:false})}}
                title="提示"
                footer={[{ text: '取消', onPress: () => { console.log('00');this.setState({visible:false})} },{ text: '确定', onPress: this.submitBtn.bind(this)}]}
                >
                <div >
                    <p><span>日期</span>:<span>{this.getDate(date)}</span></p>
                    <p><span>姓名</span>:<span>{userArr}</span></p>
                    <p><span>金额</span>:<span>{money}</span></p>
                    <p><span>备注</span>:<span>{what}</span></p>
                </div>
                </Modal>
            </WingBlank>
        </div>
    }
    componentDidMount(){
        this.props.changeRedux(getListAll)
    }
    componentWillReceiveProps(nextProps){
        let{addRecordSuccess,LoadingShow}=nextProps;
        if(LoadingShow){
            return false;
        }
        if(addRecordSuccess===null)return false;
        let title=addRecordSuccess?'添加成功':'添加失败'
        this.addAlert(title,this.addRecord.bind(this))
    }
    getNewUserArr(userList){
        return [userList.map(item=>{
            return {
                label:item.user,
                value:item.user
            }
        })] 
    }
    getDate(datetime){
        var year=datetime.getFullYear();//获取完整的年份(4位,1970)
        var month=datetime.getMonth()+1;//获取月份(0-11,0代表1月,用的时候记得加上1)
        if(month<=9){
            month="0"+month;
        }
        var date=datetime.getDate();//获取日(1-31)
        if(date<=9){
            date="0"+date;
        }
        return year+"-"+month+"-"+date
    }
    submitBtn(){
        let {date,money,what,userArr}=this.state;
        
       
        this.setState({visible:false});
        this.clearBtn();
        if(userArr.length===0||what===''||money===''){
            let title="添加错误"
            return this.addAlert(title,this.addRecord.bind(this))
        }
        let time=this.getDate(date)
        this.props.changeRedux(addRecord({time,moneyItem:money,what,user:userArr[0]}))
    }
    addAlert(title,addRecord){
        alert('提示', title, [
            { text: '取消', onPress: addRecord },
            { text: '确定', onPress: addRecord },
          ])
    }
    addRecord(){
        this.props.changeRedux({type:ADD_RECORD_SUCCESS,addRecordSuccess:null})
    }
    clearBtn(){
        this.setState({ userArr:[],money:'',what:'',date:now})
    }
}
let mapToState=(state)=>{
    return {
        addRecordSuccess:state.interactive.addRecordSuccess,
        userList:state.interactive.userList,
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
Submit=connect(mapToState,mapToDispatch)(Submit)
export default Submit