import {GET_LIST_ALL,DETAIL_LIST,DELETE_USER,DELETE_USER_SUCCESS,ADD_USER,CHANGE_ADD_SUCCESS,CHNAGE_USER_SUCCESS,CHNAGE_USER,ADD_RECORD,ADD_RECORD_SUCCESS,LOADING_SHOW} from '../actions'
let moreId=0;


let obj={
    [ADD_RECORD](state,action){
        let {time,moneyItem,what,user} = action;
        let uid='';
        state.userList.forEach(item=>{
            item.user===user&&(uid=item.uid)
        })
        let id=moreId++;
        moneyItem=moneyItem*1
        state.moreList.push({uid,id,time,moneyItem,what});
    },
    [ADD_RECORD_SUCCESS](state,action){
        state.addRecordSuccess=action.addRecordSuccess
    },
    [GET_LIST_ALL](state,action){
        state.userList=action.data.userList;
        state.moreList=action.data.moreList;
        state.allmoney=addAllMoney(state);
        getUserList(state)
    },
    [DETAIL_LIST](state,action){
        state.detailList=action.detailList;
        state.detailName=action.detailName;
    },
    [DELETE_USER](state,action){
        let uid=action.uid
        state.userList=state.userList.filter(item=>item.uid!==uid);
        state.moreList=state.moreList.filter(item=>item.uid!==uid);
    },
    [DELETE_USER_SUCCESS](state,action){
        state.deleteSuccess=action.deleteSuccess
    },
    [ADD_USER](state,action){
        let {uid,user,money}=action;
        state.userList.push({uid,user,money});
    },
    [CHANGE_ADD_SUCCESS](state,action){
        state.addSuccess=action.addSuccess;
    },
    [CHNAGE_USER](state,action){
        state.userList.forEach(item=>{
            if(item.uid===action.uid){
                item.user=action.user
            }
        })
    },
    [CHNAGE_USER_SUCCESS](state,action){
        state.changeUserSuccess=action.changeUserSuccess
    },
    [LOADING_SHOW](state,action){
        state.LoadingShow=action.LoadingShow
    }
}

let interactive =(state={allmoney:0,userList:[],moreList:[],detailList:[],detailName:'',deleteSuccess:null,addSuccess:null,changeUserSuccess:null,addRecordSuccess:null,LoadingShow:false},action)=>{
    obj[action.type]&&obj[action.type](state,action);
    let userList=state.userList.map(item=>{return {...item}});
    let moreList=state.moreList.map(item=>{return {...item}});
    return {...state,userList,moreList}
}
export default interactive;



//获取所有的钱数
function addAllMoney(state){
    let moneybase=state.userList.reduce((prev,item)=>{return prev+item.money*1},0);
    let changemoney=state.moreList.reduce((prev,item)=>{return prev+item.moneyItem*1},0);
    return moneybase+changemoney;
}
//给数据添加个人总钱数
function getUserList(state){
    let {userList,moreList}=state;
    state.average =state.allmoney/userList.length;
    state.userList=userList.map(value=>{
        value.payment=0;
        value.receivables=0;
        let usermoney=moreList.reduce((prev,item)=>{
                let money=value.uid===item.uid?item.moneyItem:0;
            return prev+money
        },0)
        value.usermoney=usermoney;
        let diff=usermoney-state.average
        if(diff<0){
            value.payment=-diff
        }else if(diff>0){
            value.receivables=diff
        }
        return value
    })
    
}
