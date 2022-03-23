import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.css'

class SubAboutUs extends Component {
  constructor() {
    super(...arguments)
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
