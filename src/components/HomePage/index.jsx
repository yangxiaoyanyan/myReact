import React  from 'react'
import {Route,NavLink,Switch} from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';
import Component from '../../tools/shouldComponent'

import './index.css'
class HomePage extends Component{
    render(){
        let {child,match}=this.props;
        return <div className="homepage">
            <NavBar
            mode="dark"
            style={{background:'#999'}}
            icon={<Icon  type="left" onClick={()=>{this.props.history.go(-1)}}/>}
            ></NavBar>
            <section className="main">
                <Switch>
                    {
                        child&&child.map((item,key)=>{
                            return <Route path={match.url+item.path} key={key} component={item.component}></Route>
                        })
                    }
                </Switch>
            </section>
            <footer className="foot">
                {
                    child&&child.map((item,key)=>{
                        //let path=key===1?'/detail/-1':item.path
                        return <NavLink to={match.url+item.path} key={key}>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </NavLink>
                    })
                }
            </footer>
        </div>
    }
}
export default HomePage