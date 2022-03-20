import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button, Text } from '@tarojs/components'
import { AtList, AtListItem, AtGrid, AtCurtain } from "taro-ui"

import * as mineActions from "../../actions/mine.action";
import * as commonActions from "../../actions/common.action"

import { gotoPage, loggingDecorator } from '../../utils/index'

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
    }
  }
  componentDidShow() {
    this.initData()
  }

  initData() {
    Taro.showLoading({
      title: '加载中...',
    });
    const { loadUserInfo, loadFlag } = this.props;
    loadUserInfo();
    loadFlag()
    Taro.hideLoading()
  }

  handleListClick({ type }) {
    console.log("[handleListClick] item index----", type)
    if (type === 'aboutUs') {
      gotoPage({ url: '../sub/sub_aboutUs/index' })
    }
  }

  async handleClockInClick() {
    let { nickName } = this.props.userInfo
    const fn = async () => {
      await this.props.clockIn()
      this.setState({
        isOpened: true
      })
    }
    if (nickName) {
      fn()
    } else {
      loggingDecorator(fn);

    }
  }

  onClose() {
    this.setState({
      isOpened: false
    })
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '搞定企业面试真题，就用面试宝典',
      path: '/pages/first/index',
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/swiper_img.png'
    }
  }

  toastToSignup() {
    Taro.showToast({
      title: '请先登录',
      icon: 'error'
    })
  }



  // 头像点击事件
  onLoginClick() {
    const fn = () => {
      console.log('此处登录没啥内置逻辑')
    }
    loggingDecorator(fn);
  }

  // 子页面 点击事件
  handleGridClick({ gridType }) {
    const fn = () => {
      this.props.changeOptType(gridType)
      gotoPage({ url: '../../sub/sub_history/index' })
    }
    loggingDecorator(fn);
  }
  render() {
    let defaultAvatar = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
    let { clockinNumbers = 0, avatar = defaultAvatar, nickName = '', } = this.props.userInfo
    const { flag } = this.props
    avatar = (avatar && avatar !== '') ? avatar : defaultAvatar

    return (
      <View className='mine-page'>
        {!nickName
          ? (
            <View className='user-info'>
              <View className='user-info-wrap' onClick={() => this.onLoginClick()}>
                <Image className='user-info-avatar' src={avatar} />
                <View className='user-info-text'>
                  <Button className='user-info-name'>
                    登录
                  </Button>
                </View>
              </View>
              <View className='user-clock-status' onClick={() => this.handleClockInClick(flag)}>签到</View>
            </View>
          ) : (
            <View className='user-info'>
              <View className='user-info-wrap'>
                <Image className='user-info-avatar' src={avatar} />
                <View className='user-info-text'>
                  <Button className='user-info-name'>
                    {nickName}
                  </Button>
                </View>
              </View>
              <View className='user-clock-status' onClick={() => flag ? null : this.handleClockInClick(flag)}>{flag ? `连续签到 ${clockinNumbers} 天 ✓` : '签到'}</View>
            </View>
          )}


        {/* 横向3格 */}
        <View className='grid-wrap'>
          <View className='grid-item' onClick={() => this.handleGridClick({ gridType: 3 })}>
            <Image className='grid-item-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/mine_icons/my_history_icon.png' />
            <Text className='grid-item-text'>历史记录</Text>
          </View>
          <View className='grid-item' onClick={() => this.handleGridClick({ gridType: 2 })}>
            <Image className='grid-item-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/mine_icons/my_favo_icon.png' />
            <Text className='grid-item-text'>我的收藏</Text>
          </View>
          <View className='grid-item' onClick={() => this.handleGridClick({ gridType: 1 })}>
            <Image className='grid-item-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/mine_icons/my_zan_icon.png' />
            <Text className='grid-item-text'>我的点赞</Text>
          </View>
        </View>
        {/* 竖向3列 */}
        <View className='mine-list-wrap'>
          <View className='mine-list-item' onClick={() => this.handleListClick({ type: 'recommend' })}>
            <Button className='mine-list-item-text mine-list-item-btn' open-type="share">推荐分享</Button>

            {/* open-type="share" */}
            <Image className='mine-list-item-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/right_arrow_icon.png' />
          </View>
          <View className='mine-list-item'>
            <Button className='mine-list-item-text mine-list-item-btn' open-type="feedback">意见反馈</Button>
            <Image className='mine-list-item-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/right_arrow_icon.png' />
          </View>
          <View className='mine-list-item' onClick={() => this.handleListClick({ type: 'aboutUs' })}>
            <Text className='mine-list-item-text'>关于我们</Text>
            <Image className='mine-list-item-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/right_arrow_icon.png' />
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
  let { userInfo, flag } = state.common
  return {
    userInfo, flag
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(mineActions, dispatch),
  ...bindActionCreators(commonActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
