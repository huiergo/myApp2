import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtList, AtListItem, AtGrid } from "taro-ui"

import * as mineActions from "../../actions/mine.action";
import * as loginActions from "../../actions/login.action"
import { gotoPage } from '../../utils/index'

// * 1、获取用户数据
// pageshow时候: 刷新页面（点赞数和签到数）
// * 3、flag: 判断签到模块的展示
// * 4、点击签到，请求接口

class Mine extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getToken()
    return
    // Taro.getAppBaseInfo({
    //   success: res => console.log('00000======', res)
    // })
    //   .then(res => console.log(res))
    let result = Taro.getAccountInfoSync()
    console.log('00000======', result)
    this.initData()
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
      gotoPage({ url: '../sub_aboutUs/index' })
    }
  }

  handleClockInClick(flag) {
    if (!flag) {
      // 调用签到接口
      this.props.clockIn()
    }
  }
  handleGridClick({ gridType }) {
    console.log("[handleGridClick item, index======= ]", props)
    switch (gridType) {
      case 'myHistory':
        gotoPage({ url: '../sub_history/index?gridType=' + gridType })
        break;
      case 'myFavorite':
        gotoPage({ url: '../sub_history/index?gridType=' + gridType })
        break;
      case 'myZan':
        gotoPage({ url: '../sub_history/index?gridType=' + gridType })
        break;
      default:
        break
    }
  }

  render() {

    const { avatar, name, zanNum, clockInNum } = this.props.userInfo
    const { flag } = this.props
    return (
      <View className='index'>
        <AtList>
          <AtListItem
            title={name}
            note={"获赞" + zanNum}
            extraText={flag ? `连续签到${clockInNum}` : '签到'}
            arrow='right'
            thumb={avatar}
            onClick={() => this.handleClockInClick(flag)}
          />
        </AtList>
        <AtGrid
          hasBorder={false}
          data={
            [
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '历史记录11',
                gridType: 'myHistory'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '我的收藏',
                gridType: 'myFavorite'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '我的点赞',
                gridType: 'myZan'
              }
            ]
          }
          onClick={this.handleGridClick}
        />

        <AtList>
          <AtListItem title='推荐分享' onClick={() => this.handleListClick({ type: 'recommend' })} />
          <Button open-type="feedback" >意见反馈</Button>
          <AtListItem title='关于我们' extraText='详细信息' onClick={() => this.handleListClick({ type: 'aboutUs' })} />
        </AtList>
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
