import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Topic from '../../components/topic'
import Topic2 from '../../components/topic2'
import { gotoPage } from '../../utils/index'
import * as sub_historyActions from "../../actions/sub_history.action"

class Sub extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      optType: ''
    }
  }

  // // onLoad
  onLoad(options) {
    this.setState({
      optType: options.gridType
    })
  }

  change(v) {
    this.props.changeTab(v)
    if (v === 0) {
      // 0 题目
      eventCenter.trigger('eventChange_sub_history_question', v)
    } else {
      // 1 面经
      eventCenter.trigger('eventChange_sub_history_interview', v)

    }
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

                  {idx === 0 ?
                    <Topic
                      optType={3 || this.state.optType}
                      current={currentIdx}
                      index={idx}
                      type={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      initData={initData}
                      loadMore={loadMore}
                      questionBankType={10}
                    /> : <Topic2
                      optType={this.state.optType}
                      current={currentIdx}
                      index={idx}
                      type={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      pageTotal={exprState[tabList[idx]].pageTotal}
                      initData={initData}
                      loadMore={loadMore}
                      questionBankType={9}
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
  let { currentIdx } = state.sub_history
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.sub_history).filter(i => i !== 'currentIdx')
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.sub_history[k].des).filter(i => i).map(j => ({ title: j }))

  return {
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.sub_history
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(sub_historyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sub);
