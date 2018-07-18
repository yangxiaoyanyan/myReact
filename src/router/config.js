import {LoadAsyncCom,Loading}from '../tools/LoadingAsyncCom'
let HomePage=LoadAsyncCom(()=>import('../components/HomePage'),Loading)
let UserManagement=LoadAsyncCom(()=>import('../components/UserManagement'),Loading) 
let Home=LoadAsyncCom(()=>import('../components/Home'),Loading) 
let Detail=LoadAsyncCom(()=>import( '../components/Detail'),Loading)
let Submit=LoadAsyncCom(()=>import('../components/Submit'),Loading) 
let Settlement=LoadAsyncCom(()=>import('../components/Settlement'),Loading) 
// import UserManagement from'../components/UserManagement' 
// import HomePage from'../components/HomePage' 
// import Home from'../components/Home' 
// import Detail from '../components/Detail'
// import Submit from'../components/Submit' 
// import Settlement from'../components/Settlement' 
let config =[{
    path:'/homepage',
    component:HomePage ,
    children:[{
        path:'/home',
        component:Home,
        title:'首页',
        icon:"loading"
    },{
        path:'/detail',
        component:Detail,
        title:'详情',
        icon:"check-circle"
    },{
        path:'/submit',
        component:Submit,
        title:'提交',
        icon:"cross"
    },{
        path:'/settlement',
        component:Settlement,
        title:'结算',
        icon:"ellipsis"
    }]
},{
    path:'/userManagement',
    component:UserManagement
}]
export default config;