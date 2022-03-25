import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components'
import { AtSearchBar, AtCurtain } from 'taro-ui'
import * as firstActions from "./first.action"
import * as commonActions from "../../actions/common.action"
import { gotoPage, loggingDecorator } from "../../utils/index"
import Filter from './Filter/index'
import DTabs from './DTabs'
import ClockInModel from "../../components/clockInModel";
import './index.scss'
import { getJSON, postJSON } from '../../services/method';
import apis from '../../services/apis'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import DTabContent from "./DTabContent/index";

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: 0,
      filterOpen: false,
      isCurtainOpened: false,
    }
  }

  componentWillMount() {
    this.calculateScrollHeight()
  }

  async componentDidMount() {
    //获取数据,初始化全局tabGlobal
    await this.fetchCategoryAndInitGlobal()
    //默认选中第一个tab
    await this.props.changeActiveIdx(0)
    //获取用户信息
    this.fetchUserInfo()
    //注册全局监听
    this.initEvent()
  }

  componentWillUnmount() {
    eventCenter.off('event_filter_complete')
  }

  /* 页面实例用于跳转 */
  $instance = getCurrentInstance()

  /* 计算scrollViewHeight */
  calculateScrollHeight() {
    const onReadyEventId = this.$instance.router.onReady
    let viewPortHeight = 0
    let tabBodyTop = 0
    let tabHeight = 44
    let searchBarHeight = 0
    let _this = this
    Taro.setStorageSync('at_tabs_height', tabHeight)
    eventCenter.once(onReadyEventId, () => {
      // onReady 触发后才能获取小程序渲染层的节点
      let query = Taro.createSelectorQuery()
      //获取 search Bar高度，并缓存
      query.select('.first-search-bar').boundingClientRect()
      //获取 tabBodyTop 顶部高度，并缓存
      query.select('.at-tabs__body').boundingClientRect()
        .exec(res => {
          searchBarHeight = res[0].height
          tabBodyTop = res[1].top
          Taro.setStorageSync('at_search_height', searchBarHeight)
        })

      Taro.createSelectorQuery().selectViewport().boundingClientRect(function (res) {
        viewPortHeight = res.height
        Taro.setStorageSync('viewport_height', viewPortHeight)
        _this.setState({
          scrollHeight: (viewPortHeight - tabBodyTop - tabHeight)
        })
      }).exec()
    })
  }

  /* 筛选框完成事件 */
  initEvent() {
    eventCenter.on('event_filter_complete', () => {
      this.setState({
        filterOpen: false
      })

      let index = null
      if (getGlobalData('pure_radio_select')) {
        index = getGlobalData('pure_radio_select').index
      } else {
        index = this.props.activeIdx
      }

      this.syncUpdateActiveIndexAndTabList(index)

      let optionData = getGlobalData('sort_radio_select')
      this.updateGlobal(optionData.option, index)
    })
  }

  /* 初始化筛选面板初始数据 */
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

  /* 初始完成更新面板数据 */
  updateGlobal(option, index) {
    let array = getGlobalData('filter_data')
    array[index] = {
      selectType: option.id,
      sortType: option.upArrow
    }
    setGlobalData('filter_data', array)
  }

  /* 获取分类 */
  async fetchCategoryAndInitGlobal() {
    try {
      let tabList = await getJSON({ url: apis.getCategory })
      let tempList = tabList.map((i, idx) => {
        return {
          ...i,
          selected: idx === 0 ? true : false,
          title: i.name
        }
      })
      await this.props.updateTabList(tempList)
      this.initGlobalData()
    } catch (error) {
    }
  }

  /* 获取用户信息 */
  async fetchUserInfo() {
    try {
      let userInfo = await getJSON({ url: apis.getUserInfo })
      this.props.syncUser(userInfo)
      this.props.syncFlag(userInfo.flag)
    } catch (error) {
    }
  }

  /* 调用签到接口 */
  async fetchClockIn() {
    try {
      let result = await postJSON({ url: apis.clockIn })
      this.props.syncFlag(result.flag ? result.flag : true)
      this.props.syncUser(result)
    } catch (error) {
    }
  }

  hideModel() {
    this.setState({
      filterOpen: false
    })
  }

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

      } else {
        item.selected = false
      }
      return item
    })
    this.props.updateTabList(tempList)
    this.props.changeActiveIdx(idx)


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

  // 打卡行为
  handleClockInClick() {
    let { nickName } = this.props.userInfo
    const fn = async () => {
      gotoPage({ url: '../../sub/share/index' })
      // 调用签到接口
      await this.fetchClockIn()
    }

    if (nickName) {
      fn()
    } else {
      loggingDecorator(fn);
    }
  }

  /**
   *  打卡蒙层 隐藏
   */
  onClose() {
    this.setState({
      isCurtainOpened: false
    })
  }

  onShareAppMessage() {
    return {
      title: '搞定企业面试真题，就用面试宝典',
      path: '/pages/first/index',
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/share/share_common.png'
    }
  }

  render() {
    let { flag, activeIdx = 0, tabList } = this.props
    let { isCurtainOpened } = this.state
    let { clockinNumbers = 0, avatar = '', nickName = '' } = this.props.userInfo

    let defaultAvatar = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
    avatar = (avatar && avatar !== '') ? avatar : defaultAvatar

    return (
      <View className='first-page'>

        <View className='top-part'>
          {/* 搜索框 disabled */}
          <View className='first-search-bar' onClick={() => gotoPage({ url: '../../sub/search/index' })}>
            <AtSearchBar disabled />
          </View>

          {(flag && nickName) ? (
            <View className='first_clock_wrap' onClick={() => gotoPage({ url: '../../sub/share/index' })}>
              <Image className='first-clock-in-btn' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/clock_img.png' />
              <View className='clock_text-wrap'>
                <View className='clock_text-wrap-top'><Text className='clock_text-wrap-top-number'>{clockinNumbers}</Text>天</View>
                <View className='clock_text-wrap-bottom'>连续打卡</View>
              </View>
            </View>
          ) : (
            <View className='first_clock_wrap'>
              <Image className='first-clock-in-btn' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/un_clock_img.png' />
              <Button className='clock_text-wrap clock_text' lang="zh_CN" onClick={() => this.handleClockInClick()}>打卡</Button>
            </View>
          )}
        </View>

        {/* 占位图片 */}
        <Image className='index__swiper-img' src={require('../../assets/ad.png')} />
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
        <DTabContent tabList={this.props.tabList} tabActiveIdx={activeIdx} index={activeIdx} scrollHeight={this.state.scrollHeight} />
        <Image style={{ display: 'none' }} src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/share_bg%402x.png' />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { activeIdx, tabList } = state.first
  let { userInfo, flag } = state.common
  return {
    activeIdx,
    tabList,
    userInfo,
    flag
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(firstActions, dispatch),
  ...bindActionCreators(commonActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
