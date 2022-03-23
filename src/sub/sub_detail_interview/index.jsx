import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button, RichText } from '@tarojs/components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from "../../actions/common.action"
import apis from '../../services/apis';
import { getJSON, postJSON } from "../../services/method";
import { loggingDecorator, getCurrentPageUrlWithArgs } from "../../utils/index"

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

  url = ''
  title = ''

  componentDidMount() {
    this.url = getCurrentPageUrlWithArgs()
    console.log('url------', this.url)
  }


  async onLoad(options) {
    const { id } = options
    await this.initSubInterviewDetail(id)
    Taro.reportAnalytics('interview_detail', {
      id: id,
    })
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
      this.title = result.stem
    }
    Taro.hideLoading()
  }

  // 赞 事件
  async handleZan(flag) {
    const fn = async () => {
      try {
        Taro.showLoading({
          title: '加载中...'
        })
        let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 1, optType: 1 })
        result && this.setState({
          item: {
            ...this.state.item,
            likeFlag: !flag
          }
        }, () => {
          if (flag) {
            Taro.showToast({
              title: '点赞已取消',
              duration: 1000
            })
          } else {
            Taro.showToast({
              title: '感谢您的认可',
              duration: 1000
            })
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
        let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 1, optType: 2 })
        result && this.setState({
          item: {
            ...this.state.item,
            collectFlag: !flag
          }
        }, () => {
          if (flag) {
            Taro.showToast({
              title: '收藏已取消',
              duration: 1000
            })
          } else {
            Taro.showToast({
              title: '收藏成功',
              duration: 1000
            })
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


  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.title,
      path: this.url,
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/share/share_common.png'
    }
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
        {/* dangerouslySetInnerHTML={{ __html: item.content }} */}
        <View className='detail-content detail-content-interview' >
          <RichText className='rich-text' nodes={item.content} />
        </View>

        {/* 点赞和收藏按钮 */}
        <View className='zan-favorite-btns'>
          <Image className='favorite-btn' src={collectFlag ? require('../../assets/zan_fav_btns/fav_select.png') : require('../../assets/zan_fav_btns/fav.png')} onClick={() => this.handleFavorite(collectFlag)} />
          <Image className='zan-btn' src={likeFlag ? require('../../assets/zan_fav_btns/zan_select.png') : require('../../assets/zan_fav_btns/zan.png')} onClick={() => this.handleZan(likeFlag)} />
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
