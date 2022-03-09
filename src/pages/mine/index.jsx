import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button, Text } from '@tarojs/components'
import { AtList, AtListItem, AtGrid, AtCurtain } from "taro-ui"

import * as mineActions from "../../actions/mine.action";
import { gotoPage } from '../../utils/index'

import ClockInModel from "../../components/clockInModel";
import './index.scss'

// * 1、获取用户数据
// pageshow时候: 刷新页面（点赞数和签到数）
// * 3、flag: 判断签到模块的展示
// * 4、点击签到，请求接口

class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: true,
      avatar: '',
      nickName: ''
    }
  }
  componentDidMount() {
    this.getUserInfo()
  }
  componentDidShow() {
    this.initData()

  }


  getUserInfo() {
    let _this = this
    // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    Taro.getSetting({
      success: function (res) {
        console.log("用户信息 111----", res)
        if (!res.authSetting['scope.userInfo']) {
          Taro.authorize({
            scope: 'scope.userInfo',
            success: function () {
              // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
              console.log("用户信息222----")
              Taro.getUserInfo({
                success: function (res1) {
                  console.log("用户信息 333----", res1)
                }
              })
            }
          })
        } else {
          Taro.getUserInfo({
            success: function (res1) {
              console.log("用户信息 333----", res1)
              _this.setState({
                nickName: res1.userInfo.nickName,
                // avatarUrl
                avatar: res1.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
  }
  initData() {
    const { loadUserInfo, loadFlag } = this.props;
    loadUserInfo();
    loadFlag()
  }

  handleListClick({ type }) {
    console.log("[handleListClick] item index----", type)
    if (type === 'aboutUs') {
      gotoPage({ url: '../sub_aboutUs/index' })
    }
  }

  handleClockInClick(flag) {
    if (!flag) {
      // 调用签到接口
      this.props.clockIn()
      this.setState({
        isOpened: true
      })
    }
  }
  handleGridClick({ gridType }) {
    gotoPage({ url: '../sub_history/index?gridType=' + gridType })
  }

  onClose() {
    this.setState({
      isOpened: false
    })
  }

  render() {
    const { avatar, nickName, } = this.state
    const { likeCount = 0, clockinNumbers = 0 } = this.props.userInfo
    const { flag } = this.props
    return (
      <View className='mine-page'>
        <View className='user-info'>
          <View className='user-info-wrap'>
            <Image className='user-info-avatar' src={avatar} />
            <View className='user-info-text'>
              <View className='user-info-name'>
                {nickName}
              </View>
              <Text className='user-info-zan-numbers'>
                获赞 {likeCount}
              </Text>
            </View>

          </View>
          <View className='user-clock-status' onClick={() => this.handleClockInClick(flag)}>{flag ? `连续签到 ${clockinNumbers} 天 ✓` : '签到'}</View>
        </View>


        {/* 横向3格 */}
        <View className='grid-wrap'>
          <View className='grid-item' onClick={() => this.handleGridClick({ gridType: 3 })}>
            <Image className='grid-item-icon' src={require('../../assets/mine_icons/my_history_icon.png')} />
            <Text className='grid-item-text'>历史记录</Text>
          </View>
          <View className='grid-item' onClick={() => this.handleGridClick({ gridType: 2 })}>
            <Image className='grid-item-icon' src={require('../../assets/mine_icons/my_favo_icon.png')} />
            <Text className='grid-item-text'>我的收藏</Text>
          </View>
          <View className='grid-item' onClick={() => this.handleGridClick({ gridType: 1 })}>
            <Image className='grid-item-icon' src={require('../../assets/mine_icons/my_zan_icon.png')} />
            <Text className='grid-item-text'>我的点赞</Text>
          </View>
        </View>
        {/* 竖向3列 */}
        <View className='mine-list-wrap'>
          <View className='mine-list-item' onClick={() => this.handleListClick({ type: 'recommend' })}>
            <Text className='mine-list-item-text'>推荐分享</Text>
            <Image className='mine-list-item-icon' src={require('../../assets/other_icons/right_arrow_icon.png')} />
          </View>
          <View className='mine-list-item'>
            <Button className='mine-list-item-text mine-list-item-btn' open-type="feedback">意见反馈</Button>
            <Image className='mine-list-item-icon' src={require('../../assets/other_icons/right_arrow_icon.png')} />
          </View>
          <View className='mine-list-item' onClick={() => this.handleListClick({ type: 'aboutUs' })}>
            <Text className='mine-list-item-text'>关于我们</Text>
            <Image className='mine-list-item-icon' src={require('../../assets/other_icons/right_arrow_icon.png')} />
          </View>
        </View>

        <AtCurtain
          closeBtnPosition='top-right'
          isOpened={this.state.isOpened}
          onClose={this.onClose.bind(this)}
        >
          <ClockInModel avatar={avatar} nickName={nickName} />
        </AtCurtain>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps====", state)
  const { userInfo, flag } = state.mine
  return {
    userInfo, flag
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(mineActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
