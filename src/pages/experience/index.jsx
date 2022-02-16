import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { tabShow } from "../../actions/common"

@connect((store) => ({ ...store, tabList: store.home.list }), (dispatch) => ({
  tabShow(params) {
    dispatch(tabShow(params))
  }
}))

class Experience extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() {
    tabShow('experience')
  }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <View>Hello, World</View>
      </View>
    )
  }
}
export default Experience


