import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as commonActions from "../../actions/common.action"

import './index.css'

class Login extends Component {
  constructor() {
    super(...arguments)
  }
  login() {
    this.getUserProfile()
  }

  getUserProfile() {
    let _this = this
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

        let { code } = await Taro.login();
        _this.props.submitUserInfo({ ...res, code })

        Taro.navigateBack()
      }
    })

  }

  render() {
    return (
      <View className='login-page'>
        <Button onClick={() => this.login()}>登录</Button>
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
