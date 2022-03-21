import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as commonActions from "../../actions/common.action"

import './index.scss'

class Share extends Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.flag) {
        Taro.showToast({
          title: '打卡成功'
        })
      }
      //  else {
      //   Taro.showToast({
      //     title: '打卡失败'
      //   })
      // }
    }, 300);
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '搞定企业面试真题，就用面试宝典',
      path: '/pages/first/index',
      // imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/swiper_img.png'
    }
  }

  render() {
    return (
      <View className='share-page'>
        <View className='share-bg-img'>
          {/* 内容展示区 */}
          <View className='share-content'>
            <View className='share-days'><View className='share-days-number'>{this.props.userInfo.clockinNumbers}</View>天</View>
            <View className='share-userInfo-des'>我在<Text className='share-font-black'>「面试宝典」小程序中</Text></View>
          </View>
        </View>
        <Button className='share-btn'>
          <Image className='clockIn-share-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/share_img.png' onClick={this.shareClockInImg} />
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { userInfo, flag } = state.common
  return {
    userInfo, flag
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(commonActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
