import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button, Text } from '@tarojs/components'
import { AtList, AtListItem, AtGrid, AtCurtain } from "taro-ui"

import * as mineActions from "../../actions/mine.action";
import * as loginActions from "../../actions/login.action"
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
      isOpened: false,
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
    const { likeCount = 0, clockinNumbers } = this.props.userInfo
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
              <View className='user-info-zan-numbers'>
                获赞 {likeCount}
              </View>
            </View>

          </View>
          <View className='user-clock-status' onClick={() => this.handleClockInClick(flag)}>连续签到</View>
        </View>


        {/* 横向3格 */}
        <View className='grid-wrap'>
          <AtGrid
            hasBorder={false}
            data={
              [
                {
                  image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                  value: '历史记录11',
                  gridType: 3
                },
                {
                  image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                  value: '我的收藏',
                  gridType: 2
                },
                {
                  image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                  value: '我的点赞',
                  gridType: 1
                }
              ]
            }
            onClick={this.handleGridClick}
          />
        </View>
        {/* 竖向3列 */}
        <View className='mine-list-wrap'>
          <View className='mine-list-item' onClick={() => this.handleListClick({ type: 'recommend' })}>
            <Text className='mine-list-item-text'>推荐分享</Text>
            <Image className='mine-list-item-icon' src={require('../../assets/share_img.png')} />
          </View>
          <View className='mine-list-item'>
            <Button className='mine-list-item-text mine-list-item-btn' open-type="feedback">意见反馈</Button>
            <Image className='mine-list-item-icon' src={require('../../assets/share_img.png')} />
          </View>
          <View className='mine-list-item' onClick={() => this.handleListClick({ type: 'aboutUs' })}>
            <Text className='mine-list-item-text'>关于我们</Text>
            <Image className='mine-list-item-icon' src={require('../../assets/share_img.png')} />
          </View>
        </View>

        <AtCurtain
          closeBtnPosition='top-right'
          isOpened={this.state.isOpened}
          onClose={this.onClose.bind(this)}
        >
          <ClockInModel />
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
  ...bindActionCreators(loginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
