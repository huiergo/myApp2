import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components';
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import Topic2 from '../../components/topic2'

import { gotoPage } from '../../utils/index'
import * as experienceActions from "../../actions/experience.action"

class Experience extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      scrollHeight: 0,
    }
  }

  $instance = getCurrentInstance()

  componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    let _this = this
    eventCenter.once(onReadyEventId, () => {
      let tabBarHeight = Taro.getStorageSync('at_tabs_height')
      let searchBarHeight = Taro.getStorageSync('at_search_height')
      let viewportHeight = Taro.getStorageSync('viewport_height')
      let scrollHeight = viewportHeight - searchBarHeight - tabBarHeight

      _this.setState({
        scrollHeight
      })
    })
  }

  change(v) {
    this.props.changeTab(v)
    eventCenter.trigger('eventChange_experience', v)
    console.log("change......====", v)
  }


  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
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
      loadMore
    } = this.props

    return (
      <View className='index'>
        <View className='index__search-bar' onClick={() => gotoPage({ url: '../../sub/search/index?fromType=experience' })}>
          <AtSearchBar
            placeholder='请输入搜索关键词'
            disabled
          />
        </View>
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
                  {/* index-{item.title} - {idx} */}
                  <Topic2
                    scrollHeight={this.state.scrollHeight}
                    current={currentIdx}
                    index={idx}
                    type={tabList[idx]}
                    list={exprState[tabList[idx]].list}
                    page={exprState[tabList[idx]].page}
                    loading={exprState[tabList[idx]].loading}
                    pageTotal={exprState[tabList[idx]].pageTotal}
                    initData={initData}
                    loadMore={loadMore}
                    questionBankType={9}
                  />
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
  let { currentIdx } = state.experience
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.experience).filter(i => i !== 'currentIdx')
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.experience[k].des).filter(i => i).map(j => ({ title: j }))

  return {
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.experience
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(experienceActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
