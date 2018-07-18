import axios from 'axios'
const PORT='http://169.254.5.97:3333'


export const LOADING_SHOW='LOADING_SHOW'
export const GET_LIST_ALL='GET_LIST_ALL';
export function getListAll(dispatch){
    dispatch({type:LOADING_SHOW,LoadingShow:true})
    axios.get(PORT+'/getList').then((req)=>{
        let data=req.data
        dispatch({type:GET_LIST_ALL,data})
        dispatch({type:LOADING_SHOW,LoadingShow:false})
    })
}

export const DETAIL_LIST='DETAIL_LIST'
export function getdetailList(id){
    localStorage.setItem('detailId',id)
    return (dispatch)=>{
        dispatch({type:LOADING_SHOW,LoadingShow:true})
        axios.get(PORT+'/detailList?id='+id).then((res)=>{
            let {detailList,detailName}=res.data
            dispatch({type:DETAIL_LIST,detailList,detailName})
            dispatch({type:LOADING_SHOW,LoadingShow:false})
        })
    }
}

export const ADD_USER='ADD_USER'
export const CHANGE_ADD_SUCCESS='CHANGE_ADD_SUCCESS'
export function addUser({uid,user,money}){
    return (dispatch)=>{
        dispatch({type:LOADING_SHOW,LoadingShow:true})
        axios.get(PORT+`/addUser?uid=${uid}&user=${user}&money=`+money).then((res)=>{
            let addSuccess=res.data.addSuccess;
            addSuccess&&dispatch({type:ADD_USER,uid,user,money});
            dispatch({type:CHANGE_ADD_SUCCESS,addSuccess});
            dispatch({type:LOADING_SHOW,LoadingShow:false})
        })
    }
}

export const DELETE_USER='DELETE_USER'
export const DELETE_USER_SUCCESS='DELETE_USER_SUCCESS'
export function deleteUser(uid){
    return (dispatch)=>{
        dispatch({type:LOADING_SHOW,LoadingShow:true})
        axios.get(PORT+'/delUser?uid='+uid).then((res)=>{
            res.data.code&&dispatch({type:DELETE_USER,uid})
            dispatch({type:DELETE_USER_SUCCESS,deleteSuccess:res.data.code})
            dispatch({type:LOADING_SHOW,LoadingShow:false})
        })
    }
}

export const CHNAGE_USER='CHNAGE_USER';
export const CHNAGE_USER_SUCCESS='CHNAGE_USER_SUCCESS';
export function changeUser(uid,user){
    return (dispatch)=>{
        dispatch({type:LOADING_SHOW,LoadingShow:true})
        axios.get(PORT+'/changeUser?uid='+uid+'&user='+user).then((res)=>{
            let bool=res.data.code;
            bool&&dispatch({type:CHNAGE_USER,uid,user})
            dispatch({type:CHNAGE_USER_SUCCESS,changeUserSuccess:bool})
            dispatch({type:LOADING_SHOW,LoadingShow:false})
        })
    }
}

export const ADD_RECORD='ADD_RECORD'
export const ADD_RECORD_SUCCESS='ADD_RECORD_SUCCESS'
export function addRecord({time,moneyItem,what,user}){
    return (dispatch)=>{
        dispatch({type:LOADING_SHOW,LoadingShow:true})
        axios.get(PORT+`/addRecord?time=${time}&moneyItem=${moneyItem}&what=${what}&user=`+user).then((res)=>{
            let bool=res.data.code;
            bool&&dispatch({type:ADD_RECORD,time,moneyItem,what,user}) 
            dispatch({type:ADD_RECORD_SUCCESS,addRecordSuccess:bool}) 
            dispatch({type:LOADING_SHOW,LoadingShow:false})
        })
    }
}


// //select  insert
// //user(用户名)   list（记录）  [{},{}]
// async function changeList(){
//     let userlist=await select('select *  from  user');
//     for(let i=0;i<userlist.length;i++){
//         userlist[i].child=await select('select * from list where uid=?',[userlist[i].uid])
//     }
// }















