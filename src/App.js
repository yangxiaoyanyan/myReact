import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './store'
import RootRouter from './router'
class App extends Component {
  render() {
    return <Provider store={store}>
      <RootRouter></RootRouter>
    </Provider>;
  }
}

export default App;
