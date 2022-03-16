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

      // onReady 触发后才能获取小程序渲染层的节点
      let query = Taro.createSelectorQuery()
      query.select('.at-tabs__body')
        .boundingClientRect()
        .exec(res => {
          tabbodyTop = res[0].top
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
    this.initGlobalData()
    eventCenter.on('event_filter_complete', () => {
      //关闭panel
      this.setState({
        filterOpen: false
      })

      let index = null
      if (getGlobalData('pure_radio_select')) {
        index = getGlobalData('pure_radio_select').index
      } else {
        index = this.props.activeIdx
      }


      // let index = getGlobalData('pure_radio_select') && getGlobalData('pure_radio_select').index || this.props.activeIdx
      this.syncUpdateActiveIndexAndTabList(index)
      console.log("[ 000========]", index, getGlobalData('pure_radio_select'))

      //赋值
      let optionData = getGlobalData('sort_radio_select')
      console.log("[ 111========]", optionData)
      this.updateGlobal(optionData.option, index)
    })
  }

  initGlobalData() {
    let tempList = this.props.tabList.map(i => {
      return {
        selectType: '0',
        sortType: '0'
      }
    })
    setGlobalData('filter_data', tempList)

    setGlobalData('sort_radio_select', {
      option: {
        name: '默认', id: '0', upArrow: '0',
      },
      index: 0
    }
    )
  }

  updateGlobal(option, index) {
    let array = getGlobalData('filter_data')
    console.log('updateGlobal before---', array, this.props.activeIdx, option.id, option.upArrow)
    array[index] = {
      selectType: option.id,
      sortType: option.upArrow
    }
    console.log('updateGlobal after----', array)
    setGlobalData('filter_data', array)
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
      this.props.updateTabList(tempList)
    } catch (error) {
    }
  }

  hideModel() {
    this.setState({
      filterOpen: false
    })
  }

  // tab 点击 切换
  onChangeTab(idx) {
    setGlobalData('pure_radio_select', {
      option: this.props.tabList[idx],
      index: idx
    })
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
    this.props.updateTabList(tempList)


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
    this.props.updateExtraParams(extraParams)
  }

  showFilterPanel() {
    this.setState({ filterOpen: true })
    // 发消息通知，触发 sortRadio 刷新，数据取自 globalData
    eventCenter.trigger('event_update_sort_view')
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
        <Filter filterOpen={this.state.filterOpen} hideModel={() => this.hideModel()} />
        {/* tabs联动组件 */}
        <View className='first-content-wrap'>
          <DTabs tabList={this.props.tabList} activeIdx={this.props.activeIdx} scrollHeight={this.state.scrollHeight} onChangeTab={(idx) => this.onChangeTab(idx)} />
          <Image
            className='filter-btn'
            src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/filter_icon.png'
            onClick={() => this.showFilterPanel()}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
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
