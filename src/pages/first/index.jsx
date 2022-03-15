import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Text, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar, AtCurtain, AtFloatLayout } from 'taro-ui'
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
import PureRadio from '../../components/pureRadio'
import SortRadio from '../../components/sortRadio'
import NewPureRadio from '../../components/newPureRadio'

class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false,
      isCurtainOpened: false,
      avatar: '',
      nickName: '',
      scrollHeight: 469,
      radioOptions: [
        {
          "id": 18,
          "name": "HTML5"
        }, {
          "id": 19,
          "name": "CSS3"
        }, {
          "id": 20,
          "name": "移动端布局"
        }, {
          "id": 21,
          "name": "JavaScript"
        }, {
          "id": 22,
          "name": "jQuery"
        }, {
          "id": 23,
          "name": "AJAX"
        }, {
          "id": 24,
          "name": "Git"
        }, {
          "id": 25,
          "name": "Node"
        }, {
          "id": 26,
          "name": "Vue"
        }, {
          "id": 28,
          "name": "小程序"
        }, {
          "id": 27,
          "name": "React"
        }, {
          "id": 42,
          "name": "迁移学习"
        }, {
          "id": 313,
          "name": "移动端开发"
        }, {
          "id": 304,
          "name": "其它"
        }, {
          "id": 393,
          "name": "早读内容[背诵]"
        }
      ],
      radioId: 18,

      sortOptions: [
        { name: '默认', id: '0', upArrow: '0' },
        { name: '难易', id: '1', upArrow: '0' },
        { name: '浏览量', id: '2', upArrow: '0' },
      ],
      sortId: 0,

      upArrow: '',
      selectIndex: ''

    }
  }

  async componentDidMount() {
    try {
      Taro.showLoading()
      await handleGetToken({ showLoad: false })
      await this.props.category()
      this.initMineData()
      this.getScrollHeight()
      Taro.hideLoading()
    } catch (error) {
      Taro.hideLoading()
    }
  }

  handleRadioChange(id, index) {
    this.setState({
      radioId: id,
      selectIndex: index
    })
  }

  handleUpArrow(upArrow) {
    if (upArrow) {
      if (upArrow == '1') {
        return '0'
      }
      if (upArrow == '0') {
        return '1'
      }
    } else {
      return 'none'
    }
  }

  handleSortRadioChange(id) {
    this.setState({
      sortId: id
    })
  }

  onStatus(v) {
    this.setState({
      upArrow: v == true ? '0' : '1'
    })
  }

  initMineData() {
    const { loadUserInfo, loadFlag } = this.props;
    loadUserInfo();
    loadFlag()
  }

  change({ selectIndex, keyword, sort }) {
    console.log('changge  ----', selectIndex, keyword, sort)
    this.props.changeTab(selectIndex)
    // 触发事件，传入多个参数
    eventCenter.trigger('eventChange', selectIndex, keyword, sort)
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
  // reset() {
  //   this.props.resetTagList()
  // }

  reset() {
    this.setState({
      radioOptions: [
        {
          "id": 18,
          "name": "HTML5"
        }, {
          "id": 19,
          "name": "CSS3"
        }, {
          "id": 20,
          "name": "移动端布局"
        }, {
          "id": 21,
          "name": "JavaScript"
        }, {
          "id": 22,
          "name": "jQuery"
        }, {
          "id": 23,
          "name": "AJAX"
        }, {
          "id": 24,
          "name": "Git"
        }, {
          "id": 25,
          "name": "Node"
        }, {
          "id": 26,
          "name": "Vue"
        }, {
          "id": 28,
          "name": "小程序"
        }, {
          "id": 27,
          "name": "React"
        }, {
          "id": 42,
          "name": "迁移学习"
        }, {
          "id": 313,
          "name": "移动端开发"
        }, {
          "id": 304,
          "name": "其它"
        }, {
          "id": 393,
          "name": "早读内容[背诵]"
        }
      ],
      radioId: 18,

      sortOptions: [
        { name: '默认', id: '0', upArrow: '0' },
        { name: '难易', id: '1', upArrow: '0' },
        { name: '浏览量', id: '2', upArrow: '0' },
      ],
      sortId: 0,
      selectIndex: 0
    })

  }

  complete() {
    const { radioId, selectIndex, sortId, upArrow } = this.state

    const params = {
      keyword: this.state.radioOptions && this.state.radioOptions[selectIndex] && this.state.radioOptions[selectIndex].name,
      sort: sortId + upArrow.toString(),
      selectIndex
    }
    console.log('change extraParams----', params.keyword, params.sort)

    // todo: radioId 怎么使用
    if (selectIndex > -1) {
      this.change({
        selectIndex,
        keyword: this.state.radioOptions && this.state.radioOptions[selectIndex] && this.state.radioOptions[selectIndex].name,
        sort: sortId + upArrow.toString(),
      })
    }

    // 2. 需要同步状态
    this.props.submitFilterParams({ key: params.keyword, sort: params.sort })
    console.log('keywords---', params.keyword)
    console.log('sort---', params.sort)

    // 3.需要请求数据
    this.props.triggerModel(false)
    this.setState({
      isOpened: false
    })
  }

  pureClose() {
    this.setState({
      isOpened: false
    })
  }
  // complete() {
  //   let params = this.getExtralParams()
  //   let { key, sort, selectIndex } = params
  //   // todo: 1.需要定位到相应的tab   3.需要请求数据
  //   if (selectIndex > -1) {
  //     this.change(selectIndex)
  //   }
  //   // 2. 需要同步状态
  //   this.props.submitFilterParams({ key, sort })
  //   // 3.需要请求数据


  //   this.props.triggerModel(false)
  //   this.setState({
  //     isOpened: false
  //   })
  // }

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
    let _this = this
    if (!Taro.getStorageSync('nickName')) {
      Taro.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          let { nickName, avatarUrl } = res.userInfo
          Taro.setStorageSync('nickName', nickName)
          Taro.setStorageSync('avatarUrl', avatarUrl)
          _this.handleClockInClick(_this.props.flag)
        }
      })
    } else {
      this.handleClockInClick(this.props.flag)
    }
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '面试宝典',
      path: '/pages/first/index',
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/swiper_img.png'
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

  handlePureRadio(v) {
    console.log('handlePureRadio----', v)
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
      extraParams
    } = this.props
    console.log('render extraParams-------', extraParams)
    const { clockinNumbers = 0 } = this.props.userInfo
    const { flag } = this.props
    const { avatar, nickName } = this.state

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
            <Image className='index__clock-in-btn' src={require('../../assets/other_icons/clock_img.png')} />
            {flag ?
              (<View className='clock_text-wrap'>
                <View className='clock_text-wrap-top'>{clockinNumbers}天</View>
                <View className='clock_text-wrap-bottom'>连续签到</View>
              </View>) :
              (<Button className='clock_text-wrap clock_text' open-type='getUserProfile' lang="zh_CN" onClick={this.getUserProfile.bind(this)}>打卡</Button>)
            }
          </View>

        </View>
        <Image className='index__swiper-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/swiper_img.png' />

        {/* <View onClick={() => this.setState({ isOpened: true })}>筛选按钮</View> */}
        {/* <CustomModel isOpened={isOpened} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()}>
          <View className='custom__tag-title'> 题目排序 </View>
          <CustomTags type='sortList' circle={false} list={sortList} updateTagList={updateTagList} />
          <View className='custom__tag-title'> 选择阶段</View>
          <CustomTags type='cataList' circle={true} list={cataList} updateTagList={updateTagList} />
        </CustomModel> */}

        <CustomModel isOpened={isOpened} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()} onPureClose={() => this.pureClose()}>
          <View className='panel__content no-padding'>
            <View className='custom__tag-title'> 题目排序 </View>
            <View className='sort-container'>
              <SortRadio options={this.state.sortOptions} id={this.state.sortId} onClick={this.handleSortRadioChange.bind(this)} onStatus={this.onStatus.bind(this)} />
            </View>

            <View className='custom__tag-title'> 选择阶段</View>
            <View className='radio-container'>
              <PureRadio options={this.state.radioOptions} id={this.state.radioId} onClick={this.handleRadioChange.bind(this)} />
            </View>
            <View className='custom__tag-title'> 测试阶段</View>
            <View className='radio-container'>
              <NewPureRadio onClick={this.handlePureRadio.bind(this)} />
            </View>

          </View>

        </CustomModel>

        <View className='index-tab-wrap'>
          <AtTabs
            className='index-tab'
            scroll
            swipeable={false}
            current={currentIdx}
            tabList={chineseTabList}
            onClick={(i) => this.change({ selectIndex: i })}
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
                      loading={exprState[tabList[idx]].loading}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      questionBankType={10}
                      initData={initData}
                      loadMore={loadMore}
                      extraParams={extraParams}
                    />
                  </AtTabsPane>
                )
              })
            }
          </AtTabs>
          <Image className='test-filter-btn' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/filter_icon.png' onClick={() => this.setState({ isOpened: true })} />
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

  let { currentIdx, extraParams } = state.first
  console.log('extraParams----', state.first.extraParams)
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
    extraParams,
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
