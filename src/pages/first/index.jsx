import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import { gotoPage } from "../../utils/index"
import Filter from './Filter/index'
import DTabs from './DTabs'
import './index.scss'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'

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

    eventCenter.on('event_filter_complete', () => {
      this.setState({
        filterOpen: false
      })
    })
  }



  /**
   * 获取分类
   */
  async fetchCategory() {
    try {
      let tabList = await getJSON({ url: apis.getCategory })
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
      console.log("tabList----", tempList)
    } catch (error) {
      console.log('分类错误---', error)
    }
  }

  hideModel() {
    this.setState({
      filterOpen: false
    })
  }

  onChangeTab(idx) {
    // xxx[i].selected=true
    // this.setState({ tabList:tempTabList  })
    let tempList = this.state.tabList.map((item, index) => {
      if (idx === index) {
        item.selected = true
      } else {
        item.selected = false
      }
      return item

    })

    this.setState({
      tabList: tempList
    }, () => {
      console.log('filteropen 111--', this.state.filterOpen)

    })

    let extraParmas = getGlobalData('extraParmas') || {}
    setGlobalData('extraParmas', {
      ...extraParmas,
      keyword: this.state.tabList[idx].name
    })
    // let extraParmas = getGlobalData('extraParmas') || {}
    // setGlobalData('v_pure', {
    //   ...extraParmas,
    //   keyword: this.state.tabList[idx].name
    // })
    console.log('global---', getGlobalData('extraParmas'))

    console.log('11111111onchange extraParmas----', getGlobalData('extraParmas'))

    // let v_pure = getGlobalData('pure_radio_select')
    // let v_sort = getGlobalData('sort_radio_select')
    // //  可以setState 更新 
    // console.log('v_pure------', v_pure)
    // console.log('v_sort------', v_sort)
    // _this.setState({
    //   current: v_pure.index,
    // })

    // // type 类型id
    // // keyword 搜索关键词
    // // sort 默认0,可以不传，难易-10从易到难11从难道易，浏览量：20从低到高21从高到底,30推荐数据（按照权重倒序）
    // let sortIndex = v_sort && v_sort.index || '0'
    // let sortUpArrow = v_sort && v_sort.option && v_sort.option.upArrow || '0'
    // setGlobalData('extraParmas', {
    //   type: v_pure.option.id,
    //   keyword: v_pure.option.name,
    //   sort: sortIndex + sortUpArrow
    // })
    console.log('filteropen 222--', this.state.filterOpen)
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
          <DTabs tabList={this.state.tabList} scrollHeight={this.state.scrollHeight} onChangeTab={(idx) => this.onChangeTab(idx)} />
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
