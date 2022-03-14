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
      isOpened: false,
      avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
      nickName: '',
    }
  }
  componentDidMount() {
    const storage_nickName = Taro.getStorageSync('nickName')
    const storage_avatar = Taro.getStorageSync('avatarUrl')
    this.setState({
      nickName: storage_nickName,
      avatarUrl: storage_avatar || 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
    })
  }
  componentDidShow() {
    this.initData()
  }

  initData() {
    const { loadUserInfo, loadFlag } = this.props;
    loadUserInfo();
    loadFlag()
  }

  handleListClick({ type }) {
    console.log("[handleListClick] item index----", type)
    if (type === 'aboutUs') {
      gotoPage({ url: '../sub/sub_aboutUs/index' })
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
    if (this.state.nickName) {
      this.props.changeOptType(gridType)
      gotoPage({ url: '../../sub/sub_history/index' })
    } else {
      Taro.showToast({
        title: '请先登录',
        icon: 'error'
      })
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
      title: '面试宝典',
      path: '/pages/first/index',
      imageUrl: '../../assets/other_icons/swiper_img.png'
    }
  }

  getUserProfile() {
    let _this = this
    if (!Taro.getStorageSync('nickName')) {
      Taro.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          let { nickName, avatarUrl } = res.userInfo
          Taro.setStorageSync('nickName', nickName)
          Taro.setStorageSync('avatarUrl', avatarUrl)

          _this.setState({
            nickName,
            avatarUrl
          })
        }
      })
    }

  }
  render() {
    const { avatarUrl, nickName, } = this.state
    const { clockinNumbers = 0 } = this.props.userInfo
    const { flag } = this.props

    return (
      <View className='mine-page'>
        <View className='user-info'>
          <View className='user-info-wrap'>
            <Image className='user-info-avatar' src={avatarUrl} />
            <View className='user-info-text'>
              <Button className='user-info-name' onClick={nickName ? null : () => this.getUserProfile()}>
                {nickName ? nickName : '登录'}
              </Button>
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
            <Button className='mine-list-item-text mine-list-item-btn' open-type="share">推荐分享</Button>

            {/* open-type="share" */}
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
          <ClockInModel avatar={avatarUrl} nickName={nickName} />
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
