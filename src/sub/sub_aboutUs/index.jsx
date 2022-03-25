import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.css'

class SubAboutUs extends Component {
  constructor() {
    super(...arguments)
  }

  onShareAppMessage() {
    return {
      title: '搞定企业面试真题，就用面试宝典',
      path: '/pages/first/index',
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/share/share_common.png'
    }
  }

  render() {
    return (
      <View className='index'>
        <Image className='about_us_img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/law.png' />
      </View>
    )
  }
}

export default SubAboutUs
