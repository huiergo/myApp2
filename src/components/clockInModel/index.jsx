import React, { Component } from 'react'
import { View, Button, Image } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mineActions from "../../actions/mine.action";
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
    const { avatar, nickName, clockinNumbers, clockinTotal } = this.props.userInfo

    return (
      <View className='clockIn-model'>
        <View className='clockIn-model-bgImg'>

          {/* 签到成功 */}
          <View className='clockIn-model-title'>\\ 签到成功 //</View>
          {/* 中间文字信息 */}
          <View className='clockIn-content'>
            <View className='clockIn-userInfo'>
              {/* 干饭头像  https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13148366509%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649227705&t=39e224be0af609f9a5cac3e58b97965c */}
              <Image className='clockIn-userInfo-avatar' src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13148366509%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649227705&t=39e224be0af609f9a5cac3e58b97965c' />
              <View className='clockIn-userInfo-nick'>{nickName}</View>
            </View>
            <View className='clockIn-userInfo-des'>我在「面试宝典」小程序中</View>

            <View className='clockIn-time'>
              <View className='clockIn-column column1'>
                <View className='clockIn-column-des'>连续签到</View>
                <View className='clockIn-column-number'>{clockinNumbers}天</View>
              </View>
              <Split />
              <View className='clockIn-column column2'>
                <View className='clockIn-column-des'>连续签到</View>
                <View className='clockIn-column-number'>{clockinTotal}天</View>
              </View>
            </View>
          </View>
        </View>
        <View className='clockIn-btns'>
          <Image className='clockIn-save-img' src={require('../../assets/save_img.png')} onClick={this.saveClockInToLocal} />
          <Image className='clockIn-share-img' src={require('../../assets/share_img.png')} onClick={this.shareClockInImg} />
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  const { userInfo, flag } = state.mine
  return {
    userInfo, flag
  }
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(mineActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockInModel);
