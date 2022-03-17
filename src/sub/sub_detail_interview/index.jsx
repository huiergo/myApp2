import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import apis from '../../services/apis';
import { getJSON, postJSON } from "../../services/method";

import './index.scss'

const Split = () => {
  return <View className='detail-split'>|
  </View>
}

// const html = `<p><b>面试公司：</b>广州欣芝妍化妆品有限公司<br></p><p><b>面试岗位：</b>前端开发</p><p><br></p><p>
// </p><p><b>面试问题：
// </b></p><p>1.<a href="https://www.itcast.cn/news/20211007/11050312845.shtml" target="_blank"> let、const、var区别</a>
// </p><p>2. 是否使用过vuex，vuex里面的几个核心模块有哪些
// </p><p>3. <a href="https://www.itcast.cn/news/20180105/13395719059.shtml" target="_blank">闭包</a>
// </p><p>4. <a href="https://www.itheima.com/news/20211019/110800.html" target="_blank">原型链</a>
// </p><p>5. <a href="https://www.itcast.cn/news/20201016/11023220300.shtml" target="_blank">深拷贝的方</a>法（json方法的缺点：不能拷贝函数和 undefined）
// </p><p>6. <a href="https://www.itcast.cn/news/20210929/17580567129.shtml" target="_blank">vue生命周期</a>（mounted和created的区别，mounted是否任何情况下都能操作到dom）
// </p><p>7. 深拷贝如何实现
// </p><p>8. <a href="https://www.itcast.cn/news/20210506/15001052902.shtml" target="_blank">基本数据类型</a>
// </p><p>9. 基本数据类型和引用数据类型你是怎么理解的
// </p><p>10. 简述项目中遇到的问题，如何解决
// </p><p>11. 如何判断数据类型（typeof和instanceof、对象的constructor）
// </p><p>12. 职业发展规划</p><p>
// </p><p>`

// let item = {
//   views: 367,
//   zanNum: 10,
//   avatar: 'https://img2.baidu.com/it/u=1028277752,678118340&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
//   title: 'interview组件的优势是什么？',
//   date: '2020-02-02',
//   content: '巴拉了解到付款冷冻机房加大加肥禄口街道复健科多了几分两道算法离开家巴拉了解到付款冷冻机房加大加肥禄口街道复健科多了几分两道算法离开家巴拉了解到付款冷冻机房加大加肥禄口街道复健科多了几分两道算法离开家',
//   author: '油炸小饭团'
// }
class SubDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      item: {}
    }
  }
  // onLoad
  // onLoad
  async onLoad(options) {
    const { id } = options
    console.log("[SubDetail questionn------]", id)
    await this.initSubInterviewDetail(id)
  }

  async initSubInterviewDetail(id) {
    Taro.showLoading({
      title: '加载中...'
    })
    let result = await getJSON({ url: apis.getQuestionDetail + id });
    console.log('面经详情----', result)
    if (result) {
      await this.setState({
        item: result
      })
    }
    Taro.hideLoading()
  }


  // 赞 事件
  async handleZan(flag) {
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
  // 收藏 事件
  async handleFavorite(flag) {
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
  /**
   * type:     0面试题1面经
   * optType:  1点赞2收藏3浏览
   */
  async unitOptRequest({ action, id, type = 1, optType }) {
    let api = action == 'opt' ? apis.opt : apis.unOpt
    let result = await postJSON({ url: api, data: { id, type, optType } });
    if (result && result.data && result.data.data) {
      return true
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
        <View className='detail-content' dangerouslySetInnerHTML={{ __html: item.content }}></View>

        {/* 点赞和收藏按钮 */}
        <View className='zan-favorite-btns'>
          <Image className='zan-btn' src={likeFlag ? 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/zan_select.png' : 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/zan.png'} onClick={() => this.handleZan(likeFlag)} />
          <Image className='favorite-btn' src={collectFlag ? 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/fav_select.png' : 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/new-zan-fav/fav.png'} onClick={() => this.handleFavorite(collectFlag)} />
        </View>

      </View>
    )
  }
}

export default SubDetail
