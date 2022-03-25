import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import './index.scss'

const Split = () => {
  return <View className='pagination-split'>
  </View>
}
class CustomPagination extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { lastId, nextId, pageClick } = this.props
    return (
      <View className='custom-pagination'>
        <View className='last-btn' style={lastId ? '' : 'opacity:0.5'} onClick={lastId ? pageClick(lastId) : null}>
          <Image className='last-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/up_arrow_icon.png' />
          上一页
        </View>
        <Split />
        <View className='next-btn' style={nextId ? '' : 'opacity:0.5'} onClick={nextId ? pageClick(nextId) : null}>
          下一页
          <Image className='next-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/down_arrow_icon.png' />
        </View>
      </View>
    )
  }
}

export default CustomPagination