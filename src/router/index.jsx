import React from 'react';
import {BrowserRouter as Router,Route,Redirect,withRouter,Switch} from 'react-router-dom'
import config from './config'
import {Loading} from '../tools/LoadingAsyncCom'
import Component from '../tools/shouldComponent'
class  RootRouter extends Component{
       render(){
        return <Router>
        <div>
            <Loading/>
            <Switch>
                {
                    config.map((item,key)=>{
                        return <Route path={item.path} key={key} render={()=>{
                            let Com=withRouter(item.component);
                            return <Com child={item.children}></Com>
                        }}></Route>
                    })
                    
                }
                <Redirect from="/" to="/homepage/home"></Redirect>
            </Switch>
        </div>
        
    </Router>
    }
}
export default RootRouter