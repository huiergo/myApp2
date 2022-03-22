import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Topic from '../../components/topic'
import Topic2 from '../../components/topic2'
import * as favoriteActions from "../../actions/favorite.action"

class Favorite extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      hasLogin: false
    }
  }

  componentDidMount() {
    let { nickName } = this.props.userInfo
    if (nickName) {
      this.setState({
        hasLogin: true
      })
    } else {
      this.setState({
        hasLogin: false
      })
      Taro.showToast({
        title: '请先登录',
        icon: 'error'
      })
    }
  }

  componentDidShow() {
    this.triggerEvent(this.mCurIndex, true)
  }

  mCurIndex = 0

  change(index) {
    this.mCurIndex = index
    this.props.changeTab(index)
    this.triggerEvent(index, true)
  }

  triggerEvent(index, forceReload) {
    if (index === 0) {
      // 0 题目
      eventCenter.trigger('eventChange_favorite_question', index, forceReload)
    } else {
      // 1 面经
      eventCenter.trigger('eventChange_favorite_interview', index, forceReload)
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
    let tabBarHeight = Taro.getStorageSync('at_tabs_height')
    let viewportHeight = Taro.getStorageSync('viewport_height')
    let scrollHeight = viewportHeight - tabBarHeight

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
                  {/* index-{item.title} - {idx} */}
                  {idx === 0 ?
                    <Topic
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
                      questionBankType={10}
                      fromType='favorite'
                    /> : <Topic2
                      scrollHeight={scrollHeight}
                      current={currentIdx}
                      index={idx}
                      type={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      loading={exprState[tabList[idx]].loading}
                      initData={initData}
                      loadMore={loadMore}
                      questionBankType={9}
                      fromType='favorite'
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
  let { currentIdx } = state.favorite
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.favorite).filter(i => i !== 'currentIdx')
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.favorite[k].des).filter(i => i).map(j => ({ title: j }))
  let { userInfo } = state.common
  return {
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.favorite,
    userInfo
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(favoriteActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
