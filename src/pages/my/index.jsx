import { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

import { View, Button, Text, Image } from '@tarojs/components'
import { AtList, AtListItem, AtGrid } from "taro-ui"
import { getUserInfo, getClockIn } from '../../actions/my'
import './index.scss'

let userInfo = {
  avatar: 'https://img2.baidu.com/it/u=1028277752,678118340&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  name: '油炸小饭团',
  zanNum: 32,
  clockInNum: 12
}

/**
 * 1、获取用户头像和昵称
 * 2、pageshow时候: 刷新页面（点赞数和签到数）
 * 3、flag: 判断签到模块的展示
 * 4、点击签到，请求接口
 */
@connect((store) => ({ ...store, userInfo: store.my.userInfo, token: store.my.token, flag: store.my.flag }), (dispatch) => ({
  getUserInfo() {
    dispatch(getUserInfo())
  }
}))
class Index extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    getUserInfo()
  }
  componentWillUnmount() { }

  componentDidShow() {
    getUserInfo()
    // componentDidMount() {
    console.log("My挂载了", Taro.getCurrentInstance().router.path)
    // }
  }

  componentDidHide() { }

  handleListClick({ type }) {
    console.log("[handleListClick] item index----", type)
  }

  handleClockInClick(flag) {
    if (!flag) {
      // 调用签到接口
      getClockIn({ token: this.props.token })
    }
  }

  render() {
    const { avatar, name, zanNum, clockInNum } = userInfo
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
                value: '历史记录'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '我的收藏'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '我的点赞'
              }
            ]
          }
        />

        <AtList>
          <AtListItem title='推荐分享' onClick={() => this.handleListClick({ type: 'recommend' })} />
          <AtListItem title='意见反馈' arrow='right' onClick={() => this.handleListClick({ type: 'feedback' })} />
          <AtListItem title='关于我们' extraText='详细信息' onClick={() => this.handleListClick({ type: 'aboutUs' })} />
        </AtList>
      </View>
    )
  }
}
export default Index

