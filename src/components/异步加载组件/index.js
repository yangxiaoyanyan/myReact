import React,{Component} from 'react';
//封装一个函数（高阶组件）  参数为回调函数和loading组件
export let LoadAsyncCom = (loadAble,Loading)=>{
    return class LoadAble extends Component{
        constructor(props){
            super(props);
            this.state = {
                Load:Loading
            }
        }
        render(){
            let {Load} = this.state;
            return  <Load />//当异步加载未完成时，loading组件返回，当组件加载完毕时加载组件返回
        }
        componentDidMount(){
            loadAble().then((com)=>{//回调函数执行 异步加载 返回一个组件
                this.setState({Load:com.default});//com.detault就是路径抛出的组件
            })
        }
    }
}

export function Loading(){//loading页面
    return <div>
        loading
    </div>
}

//调用
//LoadAsyncCom(()=>{import('组件路径')},Loading)
