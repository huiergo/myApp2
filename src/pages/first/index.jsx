import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import { gotoPage } from "../../utils/index"

import DTabs from './DTabs'
import './index.scss'

export default class First extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: ''
    }
  }
  $instance = getCurrentInstance()

  componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    let viewPortHeight = 0
    let tabbodyTop = 0
    let _this = this
    eventCenter.once(onReadyEventId, () => {
      console.log('onReady')

      // onReady 触发后才能获取小程序渲染层的节点
      let query = Taro.createSelectorQuery()
      query.select('.at-tabs__body')
        .boundingClientRect()
        .exec(res => {
          tabbodyTop = res[0].top
          console.log(res, 'res')
        })

      Taro.createSelectorQuery().selectViewport().boundingClientRect(function (res) {
        viewPortHeight = res.height
        Taro.setStorageSync('viewport_height', viewPortHeight)
        _this.setState({
          scrollHeight: (viewPortHeight - tabbodyTop)
        })
      }).exec()
    })
  }

  render() {

    return (
      <View className='first-page'>

        {/* 搜索框 disabled */}
        <View onClick={() => gotoPage({ url: '../../sub/search/index' })}>
          <AtSearchBar disabled />
        </View>
        {/* 占位图片 */}
        <Image className='index__swiper-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/swiper_img.png' />

        {/* tabs联动组件 */}
        <View className='first-content-wrap'>
          <DTabs scrollHeight={this.state.scrollHeight} />
        </View>
      </View>
    )
  }
}
