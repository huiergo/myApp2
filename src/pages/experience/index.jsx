import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

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

  }
  change(v) {
    this.props.changeTab(v)
    eventCenter.trigger('eventChange_experience', v)
    console.log("change......====", v)
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
    let tabBarHeight = Taro.getStorageSync('at_tabs_height')
    let searchBarHeight = Taro.getStorageSync('at_search_height')
    let viewportHeight = Taro.getStorageSync('viewport_height')
    let scrollHeight = viewportHeight - searchBarHeight - tabBarHeight

    return (
      <View className='index'>
        <View className='index__search-bar' onClick={() => gotoPage({ url: '../../sub/search/index' })}>
          <AtSearchBar
            placeholder='请输入搜索关键词'
            disabled
          />
        </View>
        <AtTabs
          scroll
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
                    scrollHeight={scrollHeight}
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
