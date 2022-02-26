import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import * as tagActions from "../../actions/tag.action"
import * as firstActions from "../../actions/first.action"


import { gotoPage } from "../../utils/index"

import CustomModel from '../../components/customModel'
import CustomTags from '../../components/customTags'

import Topic from '../../components/topic'



class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
  }
  change(v) {
    this.props.changeTab(v)
    console.log("change......====", v)
  }
  getExtralParams() {
    const { sortList, cataList } = this.props
    let keyword = '';
    let sort = '';
    sortList.map((item, index) => {
      if (item.active) {
        sort = index.toString() + item.specialStatus.toString()
      }
    })
    cataList.map((item, index) => {
      if (item.active) {
        keyword = item.name
      }
    })
    return {
      keyword,
      sort
    }

  }
  reset() {
    this.props.resetTagList()
  }
  complete() {
    let params = this.getExtralParams()
    this.props.submitFilterParams(params)
    this.props.triggerModel(false)
    this.setState({
      isOpened: false
    })
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
      loadMore
    } = this.props

    return (
      <View className='index'>
        假的搜索框
        <View onClick={() => gotoPage({ url: '../search/index' })}>
          <AtSearchBar
            placeholder='请输入搜索关键词'
            disabled
          />
        </View>

        <View onClick={() => this.setState({ isOpened: true })}>筛选按钮</View>
        <CustomModel isOpened={isOpened} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()}>
          题目排序
          <CustomTags type='sortList' list={sortList} updateTagList={updateTagList} />
          选择阶段
          <CustomTags type='cataList' list={cataList} updateTagList={updateTagList} />
        </CustomModel>

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
                    tabType={tabList[idx]}
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

  let { currentIdx } = state.first
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.first).filter(i => (i !== 'currentIdx' && i !== 'extraParams'))
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.first[k].des).filter(i => i).map(j => ({ title: j }))

  return {
    showModal: state.first,
    sortList: state.tag.sortList,
    cataList: state.tag.cataList,
    // 以下是tab列表相关的，将来会用抽离成共用组件
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.first
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(tagActions, dispatch),
  ...bindActionCreators(firstActions, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(First);
