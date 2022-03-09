import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import * as tagActions from "../../actions/tag.action"
import * as firstActions from "../../actions/first.action"
import * as mineActions from "../../actions/mine.action";

import { gotoPage } from "../../utils/index"
import CustomModel from '../../components/customModel'
import CustomTags from '../../components/customTags'
import Topic from '../../components/topic'
import './index.scss'
import { handleGetToken } from '../../services/method'


class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
  }
  async componentDidMount() {
    await handleGetToken()
    await this.props.category()
    // const { loadFlag, loadUserInfo } = this.props;
    // await loadFlag()
    // await loadUserInfo()

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
        isOpened: true
      })
    }
  }
  render() {
    const { cataList, sortList, updateTagList } = this.props
    const { isOpened } = this.state
    const {
      currentIdx,
      tabList,
      chineseTabList,
      exprState,
      initData,
      loadMore,
      flag,

    } = this.props
    // const { clockinNumbers } = this.props.userInfo

    console.log("flag----", flag)
    return (
      <View className='index'>
        <View className='top-part'>
          <View className='index__search-bar' onClick={() => gotoPage({ url: '../search/index' })}>
            <AtSearchBar
              placeholder='请输入搜索关键词'
              disabled
            />
          </View>
          {/* <View className='index_clock_wrap' onClick={() => this.handleClockInClick(flag)}>
            <Image className='index__clock-in-btn' src={require('../../assets/clock_img.png')} />
            {flag ?
              (<View className='clock_text-wrap'>
                <View className='clock_text-wrap-top'>{clockinNumbers}天</View>
                <View className='clock_text-wrap-bottom'>连续签到</View>
              </View>) :
              (<View className='clock_text-wrap clock_text'>打卡</View>)
            }
          </View> */}

        </View>
        <Image className='index__swiper-img' src={require('../../assets/jianbian.jpeg')} />

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

      </View>
    )
  }
}

const mapStateToProps = (state) => {

  let { currentIdx } = state.first
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
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
    // flag,
    // userInfo
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(tagActions, dispatch),
  ...bindActionCreators(firstActions, dispatch),
  // ...bindActionCreators(mineActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(First);
