import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro';
import DSearchBar from './DSearchBar/index'
import DSearchRecord from './DSearchRecord/index'
import DSearchList from './DSearchList/index'
import NewPureRadio from '../../components/newPureRadio'

let timer = null
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }

  }
  componentDidShow() {

  }

  // 父组件调用子组件的方法
  onRef = (ref) => {
    this.child = ref
  }

  onInputChange(v) {
    console.log('onInputChange----', v)
    this.setState({
      keyword: v
    })
  }
  onActionClick() {
    // 隐藏添加到storage
    this.child.seachValue(this.state.keyword)
    // 请求数据---内部已实现监听请求
  }
  render() {

    return (
      <View className='index'>

        <DSearchBar onInputChange={(v) => this.onInputChange(v)} onActionClick={() => this.onActionClick()} />
        {!this.state.keyword && <DSearchRecord onRef={this.onRef} />}

        {/* <NewPureRadio /> */}
        {this.state.keyword && <DSearchList keyword={this.state.keyword} />}
      </View>
    )
  }
}

export default Search
