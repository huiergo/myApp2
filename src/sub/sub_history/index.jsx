import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import VirtualQuestion from '../../components/virtualQuestion'
import VirtualInterview from '../../components/virtualInterview'
import * as sub_historyActions from "../../actions/sub_history.action"
import './index.css'

class Sub extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      scrollHeight: 0
    }
  }

  mCurIndex = this.props.currentIdx || 0
  $instance = getCurrentInstance()

  componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    let tabHeight = 44
    let _this = this
    Taro.setStorageSync('at_tabs_height', tabHeight)
    eventCenter.once(onReadyEventId, () => {
      let tabBarHeight = Taro.getStorageSync('at_tabs_height')
      Taro.createSelectorQuery().selectViewport().boundingClientRect(async function (res) {
        let total = res.height
        let scrollHeight = total - tabBarHeight
        _this.setState({
          scrollHeight: scrollHeight
        })
      }).exec()
    })
  }

  componentDidMount() {
    // this.change(0)
    Taro.setNavigationBarTitle({
      title: this.handleNavTitle(this.props.optType)
    })

  }

  componentDidShow() {
    this.triggerEvent(this.mCurIndex, true)
  }

  componentWillUnmount() {
    this.props.changeTab(0)
  }

  change(index) {
    this.mCurIndex = index
    this.props.changeTab(index)

    this.triggerEvent(index, true)
  }

  triggerEvent(index, forceReload) {
    if (index === 0) {
      // 0 题目
      eventCenter.trigger('eventChange_sub_history_question', index, forceReload)
    } else {
      // 1 面经
      eventCenter.trigger('eventChange_sub_history_interview', index, forceReload)
    }
  }

  handleNavTitle(optType) {
    switch (optType) {
      case 3:
        return '历史记录'
      case 2:
        return '我的收藏'
      case 1:
        return '我的点赞'
      default:
        return '详情'
    }
  }


  onShareAppMessage() {
    return {
      title: '搞定企业面试真题，就用面试宝典',
      path: '/pages/first/index',
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/share/share_common.png'
    }
  }

  render() {
    const {
      currentIdx,
      tabList,
      chineseTabList,
      exprState,
      initData,
      loadMore,
      optType
    } = this.props
    const { scrollHeight } = this.state
    return (
      <View className='index'>
        <AtTabs
          scroll
          animated={false}
          swipeable={false}
          current={currentIdx}
          tabList={chineseTabList}
          onClick={this.change.bind(this)}
        >
          {
            chineseTabList.map((item, idx) => {
              return (
                <AtTabsPane key={idx} current={currentIdx} index={idx} >

                  {idx === 0 ?
                    <VirtualQuestion
                      scrollHeight={scrollHeight}
                      optType={optType}
                      current={currentIdx}
                      index={idx}
                      type={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      initData={initData}
                      loadMore={loadMore}
                      questionBankType={10}
                      fromType='sub_history'
                    /> : <VirtualInterview
                      scrollHeight={scrollHeight}
                      optType={optType}
                      current={currentIdx}
                      index={idx}
                      type={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      initData={initData}
                      loadMore={loadMore}
                      questionBankType={9}
                      fromType='sub_history'
                    />
                  }

                </AtTabsPane>
              )
            })
          }
        </AtTabs>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { currentIdx, } = state.sub_history
  let { optType } = state.mine
  let tabList = Object.keys(state.sub_history).filter(i => i !== 'currentIdx')
  let chineseTabList = tabList.map(k => state.sub_history[k].des).filter(i => i).map(j => ({ title: j }))

  return {
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.sub_history,
    optType
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(sub_historyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sub);
