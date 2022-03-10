import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import Topic from '../../components/topic'
import Topic2 from '../../components/topic2'
import * as sub_historyActions from "../../actions/sub_history.action"

class Sub extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      scrollHeight: 550
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.getScrollHeight()
    }, 1000);

  }

  getScrollHeight() {
    let _this = this
    let tabBarHeight = Taro.getStorageSync('at_tabs_height')

    Taro.createSelectorQuery().selectViewport().boundingClientRect(async function (res) {
      let total = res.height
      let scrollHeight = total - tabBarHeight
      _this.setState({
        scrollHeight: scrollHeight
      })
    }).exec()
  }
  componentDidShow() {
    this.change(0)
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
      loadMore,
      optType
    } = this.props
    const { scrollHeight } = this.state
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
                    /> : <Topic2
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
  console.log('[state----]', state)
  let { currentIdx, } = state.sub_history
  let { optType } = state.mine
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.sub_history).filter(i => i !== 'currentIdx')
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
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