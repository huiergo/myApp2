import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

class Index extends Component {
  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <View><Text>面经scroll模板</Text></View>
      </View>
    )
  }
}
export default Index

