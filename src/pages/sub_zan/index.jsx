import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Topic from '../../components/topic'

import { gotoPage } from '../../utils/index'
import * as sub_zanActions from "../../actions/sub_zan.action"

class Sub extends Component {
  constructor() {
    super(...arguments)

  }
  change(v) {
    this.props.changeTab(v)
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

    return (
      <View className='index'>
        {/* <View onClick={() => initData({ type: 'recommend', page: 1 })}>上拉</View>
        <View onClick={() => loadMore({ type: 'recommend', page: 2 })}>下拉</View> */}

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
                  index-{item.title} - {idx}
                  <Topic
                    type={tabList[idx]}
                    list={exprState[tabList[idx]].list}
                    page={exprState[tabList[idx]].page}
                    initData={initData}
                    loadMore={loadMore}
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
  let { currentIdx } = state.sub_zan
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.sub_zan).filter(i => i !== 'currentIdx')
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.sub_zan[k].des).filter(i => i).map(j => ({ title: j }))

  return {
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.sub_zan
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(sub_zanActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sub);
