import React, { Component } from 'react'
import { View, Text, Image, Textarea } from '@tarojs/components'
import './index.scss'

let item = {
  avatar: 'https://img2.baidu.com/it/u=1028277752,678118340&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  difficulty: 1,
  title: 'interview组件的优势是什么？',
  date: '2020-02-02',
  content: '巴拉了解到付款冷冻机房加大加肥禄口街道复健科多了几分两道算法离开家巴拉了解到付款冷冻机房加大加肥禄口街道复健科多了几分两道算法离开家巴拉了解到付款冷冻机房加大加肥禄口街道复健科多了几分两道算法离开家',
  // bgImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648004792&t=c24765b5804b709ed032c43bc69697c7',
  likeNum: 666,
  pvNum: 99,
  isLike: true
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
    return (
      <View className='interview-item'>
        <View className='interview-item__top'>
          <Image className='interview-item__top-avatar' src={item.avatar} />
          <View className='interview-item__top-content'>
            <View className='interview-item__top-content-title'>面经 | {item.title}</View>
            <View className='interview-item__top-content-des'>油炸小饭团 | {item.date}</View>
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
            {item.isLike ? <Image className='interview-item__zan-icon' src={require('../../assets/zan.png')} /> : ' 点赞'}
            {"  " + item.likeNum}
          </View>
          <Split />
          <View className='interview-item__pv-num'>浏览 {item.pvNum}</View>
          <Split />
          <Image className='interview-item__share-icon' src={require('../../assets/share.png')} />
        </View>
      </View>
    )
  }
}
export default Index

