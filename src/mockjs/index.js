import Mock from 'mockjs'
Mock.setup({timeout:'600-800'})
let userList=[]
let moreList=[]
let moreid=0;
Mock.mock('/getList',(req,res)=>{
    return {userList,moreList}
})
Mock.mock('/detailList',(req,res)=>{
    let id = JSON.parse(req.body).id;
    let obj=userList.find(item=>item.uid===id)
    let detailName=obj?obj.user:''
    let detailList=moreList.filter(item=>item.uid===id);
    return {detailList,detailName}
})
Mock.mock('/addUser',(req,res)=>{
    let {uid,user,money} = JSON.parse(req.body);
    let bool=userList.find(item=>item.uid===uid);
    if(uid===''||user===''||money===''||bool){
        return {addSuccess:false}
    }
    userList.push({uid,user,money});
    return {addSuccess:true}
})
Mock.mock('/delUser',(req,res)=>{
    let uid = JSON.parse(req.body).uid;
    userList=userList.filter(item=>item.uid!==uid);
    moreList=moreList.filter(item=>item.uid!==uid);
    return {msg:'ok',code:true}
})
Mock.mock('/changeUser',(req,res)=>{
    let {uid,user} = JSON.parse(req.body);
    let obj=userList.find(item=>item.user===user)
    if(obj){
        return {msg:'用户名重复err',code:false}
    }
    let changeobj=userList.find(item=>item.uid===uid);
    changeobj.user=user;
    return {msg:'ok',code:true}
})

Mock.mock('/addRecord',(req,res)=>{
    let {time,moneyItem,what,user} = JSON.parse(req.body);
    let uid='';
    userList.forEach(item=>{
        item.user===user&&(uid=item.uid)
    })
    let id=moreid++;
    moneyItem=moneyItem*1
    moreList.push({uid,id,time,moneyItem,what})
    return {msg:'ok',code:true}
   
})