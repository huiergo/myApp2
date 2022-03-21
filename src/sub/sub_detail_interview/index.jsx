import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from "../../actions/common.action"
import apis from '../../services/apis';
import { getJSON, postJSON } from "../../services/method";
import { loggingDecorator } from "../../utils/index"

import './index.scss'

const Split = () => {
  return <View className='detail-split'>|
  </View>
}

class SubDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      item: {}
    }
  }

  async onLoad(options) {
    const { id } = options
    await this.initSubInterviewDetail(id)
  }

  async initSubInterviewDetail(id) {
    Taro.showLoading({
      title: '加载中...'
    })
    let result = await getJSON({ url: apis.getQuestionDetail + id });
    if (result) {
      await this.setState({
        item: result
      })
    }
    Taro.hideLoading()
  }

  // 赞 事件
  async handleZan(flag) {
    const fn = async () => {
      try {
        console.log("点赞id----", this.state.item.id)
        Taro.showLoading({
          title: '加载中...'
        })
        let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 1, optType: 1 })
        console.log('赞 事件 result----', result)
        result && this.setState({
          item: {
            ...this.state.item,
            likeFlag: !flag
          }
        })
        Taro.hideLoading()
      } catch (error) {
        Taro.showToast({
          title: error,
          icon: 'error'
        })
      }
    }
    loggingDecorator(fn);
  }
  // 收藏 事件
  async handleFavorite(flag) {
    const fn = async () => {
      try {
        Taro.showLoading({
          title: '加载中...'
        })
        console.log("收藏 id----", this.state.item.id)
        let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 1, optType: 2 })
        result && this.setState({
          item: {
            ...this.state.item,
            collectFlag: !flag
          }
        })
        Taro.hideLoading()
      } catch (error) {
        Taro.showToast({
          title: error,
          icon: 'error'
        })
      }
    }
    loggingDecorator(fn);
  }

  /**
   * type:     0面试题1面经
   * optType:  1点赞2收藏3浏览
   */
  async unitOptRequest({ action, id, type = 1, optType }) {
    let api = action == 'opt' ? apis.opt : apis.unOpt
    let result = await postJSON({ url: api, data: { id, type, optType } });
    return result
  }

  render() {
    let { item } = this.state
    const { stem, createdAt, views, likeCount, creatorName, creatorAvatar, collectFlag, likeFlag } = item

    return (
      <View className='detail-interview'>
        <View className='detail-interview__title'>{stem}</View>
        <View className='detail-interview__des'>
          {createdAt}
          <Split />
          {views} 浏览量
          <Split />
          {likeCount} 赞
        </View>
        <View className='detail-interview__user'>
          <Image className='detail-interview__user-avatar' src={creatorAvatar} />
          {creatorName}
        </View>
        <View className='detail-content' dangerouslySetInnerHTML={{ __html: item.content }}></View>

        {/* 点赞和收藏按钮 */}
        <View className='zan-favorite-btns'>
          <Image className='favorite-btn' src={collectFlag ? 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/fav_select.png' : 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/fav.png'} onClick={() => this.handleFavorite(collectFlag)} />
          <Image className='zan-btn' src={likeFlag ? 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/zan_select.png' : 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/zan.png'} onClick={() => this.handleZan(likeFlag)} />
        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(SubDetail);
