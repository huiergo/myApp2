import { Component } from 'react'
import Taro from '@tarojs/taro'

import { View, Button, Text } from '@tarojs/components'


class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() {
    // componentDidMount() {
    console.log("My挂载了", Taro.getCurrentInstance().router.path)
    // }
  }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}
export default Index

