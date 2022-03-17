import React, { Component } from 'react'
import { View, Button, Image, Text } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from "../../actions/common.action"

import './index.scss'

const Split = () => {
  return <View className='clockIn-split'>
  </View>
}

class ClockInModel extends Component {
  constructor(props) {
    super(props)
  }

  // 保存图片到本地
  saveClockInToLocal() {
    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function () {
              Taro.saveImageToPhotosAlbum({
                success: function (res) {
                  console.log("保存图片成功----", res)
                }
              })

            }
          })
        }
      }
    })
  }

  // 分享海报
  shareClockInImg() {

  }

  render() {
    const { clockinNumbers = 0, clockinTotal = 0, avatar = '', nickName = '' } = this.props.userInfo

    return (
      <View className='clockIn-model'>
        <View className='clockIn-model-bgImg'>

          {/* 签到成功 */}
          <View className='clockIn-model-title'>\\ 签到成功 //</View>
          {/* 中间文字信息 */}
          <View className='clockIn-content'>
            <View className='clockIn-userInfo'>
              <Image className='clockIn-userInfo-avatar' src={avatar} />
              <View className='clockIn-userInfo-nick'>{nickName}</View>
            </View>
            <View className='clockIn-userInfo-des'>我在<Text className='clock-font-black'>「面试宝典」小程序中</Text></View>

            <View className='clockIn-time'>
              <View className='clockIn-column column1'>
                <View className='clockIn-column-des'>连续签到</View>
                <View className='clockIn-column-number'><Text className='clock-font-big'>{clockinNumbers}</Text> 天</View>
              </View>
              <Split />
              <View className='clockIn-column column2'>
                <View className='clockIn-column-des'>累计签到</View>
                <View className='clockIn-column-number'><Text className='clock-font-big'>{clockinTotal}</Text> 天</View>
              </View>
            </View>
          </View>
        </View>
        <View className='clockIn-btns'>
          <Button className='share-btn' open-type="share">
            <Image className='clockIn-share-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/share_img.png' onClick={this.shareClockInImg} />
          </Button>
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  const { userInfo, flag } = state.common
  return {
    userInfo, flag
  }
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(commonActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockInModel);
