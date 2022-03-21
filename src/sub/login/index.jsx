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

  async getUserProfile() {
    let _this = this

    let { code } = await Taro.login();

    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        console.log('【UserProfile=======】', res)
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗

        let { nickName, avatarUrl } = res.userInfo
        let user = {
          ..._this.props.userInfo,
          avatar: avatarUrl,
          nickName: nickName
        }
        _this.props.syncUser(user)

        _this.props.submitUserInfo({ ...res, code })

        Taro.navigateBack()
      }
    })

  }

  render() {
    return (
      <View className='login-page'>
        <Image className='login_content_img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/long_content_img.png' />
        <Image className='login_btn_img' onClick={() => this.login()} src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/login_btn%402x.png' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
