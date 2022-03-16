import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import * as firstActions from "./first.action"

import { gotoPage } from "../../utils/index"
import Filter from './Filter/index'
import DTabs from './DTabs'
import './index.scss'

import { getJSON } from '../../services/method';
import apis from '../../services/apis'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'


class First extends Component {

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

      let { index } = getGlobalData('pure_radio_select')

      this.syncUpdateActiveIndexAndTabList(index)
    })
  }

  componentWillUnmount() {
    eventCenter.off('event_filter_complete')
  }

  /**
   * 获取分类
   */
  async fetchCategory() {
    try {
      let tabList = await getJSON({ url: apis.getCategory })
      let tempList = tabList.map(i => {
        return {
          ...i,
          title: i.name
        }
      })
      console.log("fetchCategory---", tempList)
      this.props.updateTabList(tempList)
    } catch (error) {
      console.log('分类错误---', error)
    }
  }

  hideModel() {
    this.setState({
      filterOpen: false
    })
  }

  // tab 点击 切换
  onChangeTab(idx) {
    this.syncUpdateActiveIndexAndTabList(idx)
  }

  syncUpdateActiveIndexAndTabList(idx) {
    let tempList = this.props.tabList.map((item, index) => {
      if (idx === index) {
        item.selected = true
        this.props.changeActiveIdx(idx)
      } else {
        item.selected = false
      }
      return item
    })

    setGlobalData('pure_radio_select', {
      option: this.props.tabList[idx],
      index: idx
    })

    // type  0全部,不传也是全部 或者模块的类型id
    // keyword 搜索关键词
    // sort: 排序，默认0,可以不传，难易-10从易到难11从难道易，浏览量：20从低到高21从高到底,30推荐数据（按照权重倒序）


    // let sortIndex = v_sort && v_sort.index || '0'
    // let sortUpArrow = v_sort && v_sort.option && v_sort.option.upArrow || '0'
    // setGlobalData('extraParmas', {
    //   type: v_pure.option.id,
    //   keyword: v_pure.option.name,
    //   sort: sortIndex + sortUpArrow
    // })

    let v_sort = getGlobalData('sort_radio_select')
    let sortIndex = v_sort && v_sort.index || '0'
    let sortUpArrow = v_sort && v_sort.option && v_sort.option.upArrow || '0'

    // 单选的id
    let type = this.props.tabList[idx].id

    // 排序的sort
    let sort = sortIndex + sortUpArrow

    let extraParams = {
      type,
      sort,
    }
    console.log('【extraParams----】', extraParams)
    this.props.updateExtraParams(extraParams)
    this.props.updateTabList(tempList)
  }

  render() {
    console.log('first this.props.tabList----', this.props.tabList)
    return (
      <View className='first-page'>

        {/* 搜索框 disabled */}
        <View onClick={() => gotoPage({ url: '../../sub/search/index' })}>
          <AtSearchBar disabled />
        </View>
        {/* 占位图片 */}
        <Image className='index__swiper-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/swiper_img.png' />
        {/* 筛选区域 */}
        <Filter filterOpen={this.state.filterOpen} hideModel={() => this.hideModel()} />
        {/* tabs联动组件 */}
        <View className='first-content-wrap'>
          <DTabs tabList={this.props.tabList} activeIdx={this.props.activeIdx} scrollHeight={this.state.scrollHeight} onChangeTab={(idx) => this.onChangeTab(idx)} />
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

const mapStateToProps = (state) => {
  console.log('first state----', state.first)
  let { activeIdx, tabList } = state.first
  return {
    activeIdx,
    tabList
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(firstActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(First);
