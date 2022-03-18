import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components'
import { AtSearchBar, AtCurtain } from 'taro-ui'
import * as firstActions from "./first.action"
import * as commonActions from "../../actions/common.action"
import { gotoPage } from "../../utils/index"
import Filter from './Filter/index'
import DTabs from './DTabs'
import ClockInModel from "../../components/clockInModel";
import './index.scss'
import { getJSON, postJSON } from '../../services/method';
import apis from '../../services/apis'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import DTabContent from "./DTabContent/index";

class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: '',
      filterOpen: false,
      isCurtainOpened: false,
    }
  }
  $instance = getCurrentInstance()

  componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    let viewPortHeight = 0
    let tabbodyTop = 0
    let tabHeight = 44
    let searchBarHeight = 0
    let _this = this
    Taro.setStorageSync('at_tabs_height', tabHeight)
    eventCenter.once(onReadyEventId, () => {
      // onReady 触发后才能获取小程序渲染层的节点
      let query = Taro.createSelectorQuery()

      //获取 tabbodyTop 顶部高度，并缓存
      //获取 search Bar高度，并缓存
      query.select('.first-search-bar').boundingClientRect()
      query.select('.at-tabs__body').boundingClientRect()
        .exec(res => {
          searchBarHeight = res[0].height
          tabbodyTop = res[1].top
          Taro.setStorageSync('at_search_height', searchBarHeight)
        })

      Taro.createSelectorQuery().selectViewport().boundingClientRect(function (res) {
        viewPortHeight = res.height
        Taro.setStorageSync('viewport_height', viewPortHeight)
        _this.setState({
          scrollHeight: (viewPortHeight - tabbodyTop - tabHeight)
        })
      }).exec()
    })
  }

  async componentDidMount() {
    // 请求 type类型接口
    await this.fetchCategory()
    this.fetchUserInfo()
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

      await this.props.updateTabList(tempList)
      await this.props.changeActiveIdx(0)
    } catch (error) {
    }
  }

  /**
   * 获取用户信息
   */
  async fetchUserInfo() {
    try {
      let userInfo = await getJSON({ url: apis.getUserInfo })
      this.props.syncUser(userInfo)
      console.log('33333======', userInfo)
      this.props.syncFlag(userInfo.flag)
    } catch (error) {
    }
  }


  /**
   * 调用签到接口
   */
  async fetchClockIn() {
    try {
      let result = await postJSON({ url: apis.clockIn })
      this.props.syncFlag(result)
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


  onClickClockIn() {
    if (this.props.userInfo && this.props.userInfo.nickName) {
      console.log('if...')
      this.handleClockInClick(this.props.flag)
    } else {
      console.log('else...')
      this.getUserProfile()
    }
  }

  /**
   *  打卡蒙层 展示与否
   */
  async handleClockInClick(flag) {
    if (!flag) {
      // 调用签到接口
      await this.fetchClockIn()
      await this.setState({
        isCurtainOpened: true
      })
    }
  }
  /**
   * 用于完善会员资料
   */
  getUserProfile() {
    let _this = this
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (res) => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log('【UserProfile=======】', res)
        let { nickName, avatarUrl } = res.userInfo

        _this.handleClockInClick(this.props.flag)

        let user = {
          ..._this.props.userInfo,
          avatar: avatarUrl,
          nickName: nickName
        }
        _this.props.syncUser(user)
        let { code } = await Taro.login();
        _this.props.submitUserInfo({ ...res, code })
      }
    })

  }


  /**
   *  打卡蒙层 隐藏
   */
  onClose() {
    this.setState({
      isCurtainOpened: false
    })
  }

  render() {
    let { flag, activeIdx = 0, tabList } = this.props
    let { isCurtainOpened } = this.state
    let { clockinNumbers = 0, avatar = '', nickName = '' } = this.props.userInfo


    console.log('22222========', this.props.tabList && this.props.tabList.length > 0)
    return (
      <View className='first-page'>

        <View className='top-part'>
          {/* 搜索框 disabled */}
          <View className='first-search-bar' onClick={() => gotoPage({ url: '../../sub/search/index' })}>
            <AtSearchBar disabled />
          </View>

          {(flag && nickName) ? (
            <View className='first_clock_wrap'>
              <Image className='first-clock-in-btn' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/clock_img.png' />
              <View className='clock_text-wrap'>
                <View className='clock_text-wrap-top'>{clockinNumbers}天</View>
                <View className='clock_text-wrap-bottom'>连续签到</View>
              </View>
            </View>
          ) : (
            <View className='first_clock_wrap'>
              <Image className='first-clock-in-btn' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/clock_img.png' />
              <Button className='clock_text-wrap clock_text' open-type='getUserProfile' lang="zh_CN" onClick={() => this.onClickClockIn()}>打卡</Button>
            </View>
          )}
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
        <DTabContent tabList={this.props.tabList} tabActiveIdx={activeIdx} index={activeIdx} scrollHeight={this.state.scrollHeight} />


        {/* <DTabContent tabList={this.props.tabList} tabActiveIdx={activeIdx} index={activeIdx} scrollHeight={this.state.scrollHeight} /> */}
        <View>
          <AtCurtain
            closeBtnPosition='top-right'
            isOpened={isCurtainOpened}
            onClose={() => this.onClose()}
          >
            <ClockInModel avatar={avatar} nickName={nickName} />
          </AtCurtain>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { activeIdx, tabList } = state.first
  let { userInfo, flag } = state.common
  console.log('[mapStateToProps]  userInfo, flag ========', userInfo, flag)
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

export default connect(mapStateToProps, mapDispatchToProps)(First);
