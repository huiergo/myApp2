import React, { Component } from 'react'
import { View, Text, Image, Textarea } from '@tarojs/components'
import './index.scss'
import { gotoPage } from '../../utils'

const Split = () => {
  return <View className='split'>
  </View>
}
class Index extends Component {
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { item } = this.props
    return (
      <View className='interview-item' onClick={() => gotoPage({ url: `../../sub/sub_detail_interview/index?id=${item.id}` })}>
        <View className='interview-item__top'>
          <Image className='interview-item__top-avatar' src={item.creatorAvatar} />
          <View className='interview-item__top-content'>
            <View className='interview-item__top-content-title'>面经 | {item.stem}</View>
            <View className='interview-item__top-content-des'>{item.creatorName} | {item.createdAt}</View>
          </View>
        </View>

        <View className='interview-item__center'>
          <View
            className='interview-item__center-text'
          >
            {item.content}
          </View>
          {item.bgImg ? <Image className='interview-item__center-img' src={item.bgImg} /> : null}

        </View>

        <View className='interview-item__bottom'>
          <View className='interview-item__like-num'>
            {item.likeFlag ? <Image className='interview-item__zan-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/zanzan.png' /> : ' 点赞'}
            {"  " + item.likeCount}
          </View>
          <Split />
          <View className='interview-item__pv-num'>浏览 {item.views}</View>
        </View>
      </View>
    )
  }
}
export default Index

