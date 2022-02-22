import { Component } from 'react';
import { Provider } from 'react-redux';
import Taro from '@tarojs/taro';
import configStore from './store';

import './app.scss';
import rootSaga from './sagas/root';

const store = configStore();
store.runSaga(rootSaga);

class App extends Component {
  componentDidMount() {}

  componentDidShow() {
    // componentDidMount() {
    console.log('App挂载了', Taro.getCurrentInstance().router.path);
    // }
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
