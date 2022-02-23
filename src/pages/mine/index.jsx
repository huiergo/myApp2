import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtList, AtListItem, AtGrid } from "taro-ui"

import * as mineActions from "../../actions/mine.action";

class Mine extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { loadUserInfo } = this.props;
    loadUserInfo();
  }
  componentWillReceiveProps(nextProps) {
    console.log("will receive=====", this.props, nextProps)

  }

  handleListClick({ type }) {
    console.log("[handleListClick] item index----", type)
  }

  handleClockInClick(flag) {
    if (!flag) {
      // 调用签到接口
      this.props.getClockIn()
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
                value: '历史记录11'
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

const mapStateToProps = (state) => {
  console.log("mapStateToProps====", state)
  return {
    userInfo: state.mine.userInfo,
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(mineActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
