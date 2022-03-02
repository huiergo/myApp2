import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { gotoPage } from '../../utils'

const handleTag = (tag) => {
  switch (tag) {
    case 1:
      return {
        className: 'simple',
        des: '简单'
      }
    case 2:
      return {
        className: 'normal',
        des: '一般'
      }
    case 3:
      return {
        className: 'hard',
        des: '困难'
      }
    default:
      return {
        className: 'normal',
        des: '一般'
      }
  }
}
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
    const { item } = this.props
    return (
      <View className='question-item' onClick={() => gotoPage({ url: `../../pages/sub_detail_question/index?id=${item.likeCount}` })}>
        <View className='question-item__top'>
          <View className={`question-item__tag ${handleTag(item.difficulty).className}`}>
            {handleTag(item.difficulty).des}
          </View>
          <Text className='question-item__title'>{item.stem}</Text>
        </View>
        <View className='question-item__bottom'>
          <View className='question-item__like-num'>
            {item.isLike ? <Image className='question-item__zan-icon' src={require('../../assets/zan.png')} /> : ' 点赞'}
            {"  " + item.likeCount}
          </View>
          <Split />
          <View className='question-item__pv-num'>浏览 {item.views}</View>
          <Split />
          <Image className='question-item__share-icon' src={require('../../assets/share.png')} />
        </View>
      </View>
    )
  }
}
export default Index

