import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro';
import DSearchBar from './DSearchBar/index'
import DSearchRecord from './DSearchRecord/index'
import DSearchList from './DSearchList/index'

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

  click = (v) => {
    this.child.addValue(v)
  }

  onInputChange(v) {
    console.log('onInputChange----', v)
    this.setState({
      keyword: v
    })
  }

  render() {

    return (
      <View className='index'>
        <View onClick={() => this.click('aaa')}>测试</View>
        <DSearchBar onInputChange={(v) => this.onInputChange(v)} />
        <DSearchRecord onRef={this.onRef} />
        <DSearchList keyword={this.state.keyword} />
      </View>
    )
  }
}

export default Search
