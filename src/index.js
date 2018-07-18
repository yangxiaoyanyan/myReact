import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.css';
document.documentElement.style.fontSize=window.innerWidth/750*100+'px';
ReactDOM.render(<App />, document.getElementById('root'));
if(process.env.NODE_ENV==='development'){
    require('./mockjs')
    registerServiceWorker();
}



/*async function change(){
    let newArr=[];
    let user=await select('select uid from userlist');
    for(let i=0;i<user.length;i++){
        let obj={}
        let uid=user[i].uid
        obj[uid]=await select('select * from remark where uid=?',[uid]);
        newArr.push(obj)
    }
    res.
}*/