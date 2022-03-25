import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as commonActions from "../../actions/common.action"

import './index.scss'

class Login extends Component {
  constructor() {
    super(...arguments)
  }
  login() {
    this.getUserProfile()
  }

  getUserProfile() {
    var p1 = new Promise((resolve, reject) => {
      Taro.login({
        success: res => {
          resolve(res)
        }
      })
    })
    var p2 = new Promise((resolve, reject) => {
      Taro.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          resolve(res)
        }
      })
    })
    Promise.all([p1, p2]).then((results) => {
      this.handleUserInfo({
        ...results[0],
        ...results[1]
      })
    })
  }

  // 组织好后端需要的字段，并调用接口
  handleUserInfo(data) {
    const { code, userInfo } = data

    let { nickName, avatarUrl } = userInfo
    let user = {
      ...this.props.userInfo,
      avatar: avatarUrl,
      nickName: nickName
    }
    this.props.syncUser(user)

    this.props.submitUserInfo({ ...data, code })

    Taro.navigateBack()
    // 调用接口维护本地登录态
  }

  render() {
    return (
      <View className='login-page'>
        <Image className='login_content_img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/long_content_img.png' />
        <Image className='login_btn_img' onClick={() => this.login()} src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/login_btn%402x.png' />
      </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);