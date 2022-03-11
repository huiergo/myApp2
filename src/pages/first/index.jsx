import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Text, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar, AtCurtain } from 'taro-ui'
import * as tagActions from "../../actions/tag.action"
import * as firstActions from "../../actions/first.action"
import * as mineActions from "../../actions/mine.action";

import { gotoPage } from "../../utils/index"
import CustomModel from '../../components/customModel'
import CustomTags from '../../components/customTags'
import Topic from '../../components/topic'
import './index.scss'
import { handleGetToken } from '../../services/method'
import ClockInModel from "../../components/clockInModel";


class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false,
      isCurtainOpened: false,
      avatar: '',
      nickName: '',
      scrollHeight: 469
    }
  }
  async componentDidMount() {
    await handleGetToken()
    await this.props.category()
    await this.initMineData()
    this.getScrollHeight()
  }

  initMineData() {
    const { loadUserInfo, loadFlag } = this.props;
    loadUserInfo();
    loadFlag()
  }

  change(v) {
    this.props.changeTab(v)
    // 触发事件，传入多个参数
    eventCenter.trigger('eventChange', v)
  }
  getExtralParams() {
    const { sortList, cataList } = this.props
    let keyword = '';
    let sort = '';
    let selectIndex = 0
    sortList.map((item, index) => {
      if (item.active) {
        sort = index.toString() + item.specialStatus.toString()
      }
    })
    cataList.map((item, index) => {
      if (item.active) {
        selectIndex = index
        keyword = item.name
      }
    })

    return {
      keyword,
      sort,
      selectIndex
    }

  }
  reset() {
    this.props.resetTagList()
  }
  complete() {
    let params = this.getExtralParams()
    let { key, sort, selectIndex } = params
    // todo: 1.需要定位到相应的tab   3.需要请求数据
    if (selectIndex > -1) {
      this.change(selectIndex)
    }
    // 2. 需要同步状态
    this.props.submitFilterParams({ key, sort })
    // 3.需要请求数据


    this.props.triggerModel(false)
    this.setState({
      isOpened: false
    })
  }

  handleClockInClick(flag) {
    if (!flag) {
      // 调用签到接口
      this.props.clockIn()
      this.setState({
        isCurtainOpened: true
      })
    }
  }


  onClose() {
    this.setState({
      isCurtainOpened: false
    })
  }

  getUserProfile() {
    if (!Taro.getStorageSync('nickName')) {
      Taro.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          let { nickName, avatarUrl } = res.userInfo
          Taro.setStorageSync('nickName', nickName)
          Taro.setStorageSync('avatarUrl', avatarUrl)
        }
      })
    }
    this.handleClockInClick(this.props.flag)
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/first/index'
    }
  }

  getScrollHeight() {
    let _this = this
    let top1 = ''
    let total = ''
    let query = Taro.createSelectorQuery()
    query.select('.at-tabs__body').boundingClientRect()
    query.select('.at-search-bar').boundingClientRect()
    query.exec(res => {
      top1 = res[0].top
      Taro.setStorageSync('at_tabs_height', 44)
      Taro.setStorageSync('at_search_height', res[1].height)
    })

    Taro.createSelectorQuery().selectViewport().boundingClientRect(function (res) {
      total = res.height
      Taro.setStorageSync('viewport_height', total)
      _this.setState({
        scrollHeight: (total - top1 - 44)
      })
    }).exec()
  }

  render() {
    const { cataList, sortList, updateTagList } = this.props
    const { isOpened, scrollHeight } = this.state
    const {
      currentIdx,
      tabList,
      chineseTabList,
      exprState,
      initData,
      loadMore,

    } = this.props

    const { clockinNumbers = 0 } = this.props.userInfo
    const { flag } = this.props
    const { avatar, nickName, } = this.state


    return (
      <View className='index'>
        <View className='top-part'>
          <View className='index__search-bar' onClick={() => gotoPage({ url: '../../sub/search/index' })}>
            <AtSearchBar
              placeholder='请输入搜索关键词'
              disabled
            />
          </View>
          {/*  onClick={() => this.handleClockInClick(flag)} */}
          <View className='index_clock_wrap'>
            <Image className='index__clock-in-btn' src={require('../../assets/clock_img.png')} />
            {flag ?
              (<View className='clock_text-wrap'>
                <View className='clock_text-wrap-top'>{clockinNumbers}天</View>
                <View className='clock_text-wrap-bottom'>连续签到</View>
              </View>) :
              // (<View className='clock_text-wrap clock_text'>打卡</View>)
              (<Button className='clock_text-wrap clock_text' open-type='getUserProfile' lang="zh_CN" onClick={this.getUserProfile}>打卡</Button>)
            }
          </View>

        </View>
        <Image className='index__swiper-img' src={require('../../assets/other_icons/swiper_img.png')} />

        {/* <View onClick={() => this.setState({ isOpened: true })}>筛选按钮</View> */}
        <CustomModel isOpened={isOpened} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()}>
          <View className='custom__tag-title'> 题目排序 </View>
          <CustomTags type='sortList' circle={false} list={sortList} updateTagList={updateTagList} />
          <View className='custom__tag-title'> 选择阶段</View>
          <CustomTags type='cataList' circle={true} list={cataList} updateTagList={updateTagList} />
        </CustomModel>

        <View className='index-tab-wrap'>
          <AtTabs
            className='index-tab'
            scroll
            current={currentIdx}
            tabList={chineseTabList}
            onClick={this.change.bind(this)}
          >

            {
              chineseTabList.map((item, idx) => {
                return (
                  <AtTabsPane key={idx} current={currentIdx} index={idx} >
                    <Topic
                      scrollHeight={scrollHeight}
                      current={currentIdx}
                      index={idx}
                      type={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      questionBankType={10}
                      initData={initData}
                      loadMore={loadMore}
                    />
                  </AtTabsPane>
                )
              })
            }
          </AtTabs>
          <Image className='test-filter-btn' src={require('../../assets/filter_icon.png')} onClick={() => this.setState({ isOpened: true })} />
        </View>
        <AtCurtain
          closeBtnPosition='top-right'
          isOpened={this.state.isCurtainOpened}
          onClose={this.onClose.bind(this)}
        >
          <ClockInModel avatar={avatar} nickName={nickName} />
        </AtCurtain>
      </View>
    )
  }
}

const mapStateToProps = (state) => {

  let { currentIdx } = state.first
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  console.log("state.first----", state.first)
  let tabList = Object.keys(state.first).filter(i => (i !== 'currentIdx' && i !== 'extraParams'))

  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.first[k].des).filter(i => i).map(j => ({ title: j }))
  let { flag, userInfo } = state.mine
  return {
    showModal: state.first,
    sortList: state.tag.sortList,
    cataList: state.tag.cataList,
    // 以下是tab列表相关的，将来会用抽离成共用组件
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.first,
    flag,
    userInfo
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(tagActions, dispatch),
  ...bindActionCreators(firstActions, dispatch),
  ...bindActionCreators(mineActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(First);
