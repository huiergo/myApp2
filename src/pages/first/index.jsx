import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import { gotoPage } from "../../utils/index"
import Filter from './Filter/index'
import DTabs from './DTabs'
import './index.scss'

import { getJSON } from '../../services/method';
import apis from '../../services/apis'

export default class First extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: '',
      filterOpen: false,
      tabList: []
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

  async componentDidMount() {
    // 请求 type类型接口
    await this.fetchCategory()
  }



  /**
   * 获取分类
   */
  async fetchCategory() {
    let tabList = await getJSON({ url: apis.getCategory }) || [];
    console.log('分类结果---', tabList)
    let tempList = tabList.map(i => {
      return {
        ...i,
        title: i.name
      }
    })
    this.setState({
      tabList: tempList
    })
  }

  hideModel() {
    this.setState({
      filterOpen: false
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
        {/* 筛选区域 */}
        <Filter tabList={this.state.tabList} filterOpen={this.state.filterOpen} hideModel={() => this.hideModel()} />
        {/* tabs联动组件 */}
        <View className='first-content-wrap'>
          <DTabs tabList={this.state.tabList} scrollHeight={this.state.scrollHeight} />
          <Image
            className='filter-btn'
            src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/filter_icon.png'
            onClick={() => this.setState({ filterOpen: true })}
          />
        </View>
      </View>
    )
  }
}
