import { Component, useState, useEffect } from 'react'
import { View, Button, Text, ScrollView } from '@tarojs/components'
// import { TaroVirtualList } from 'taro-virtual-list'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Taro, { eventCenter } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'

import QuestionItem from '../../../components/questionItem'
import TaroVirtualList from '../../../components/VirtualList'

// import './index.css'

import { set as setGlobalData, get as getGlobalData } from '../../../global_data'

import * as firstActions from "../first.action"

let TAG = 'DTabContent'
class DTabContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoScrollTop: false,
      list: [],
      page: 1,
      pageTotal: '',
      virtualListId: 'zt-virtial-list'
    }
  }

  tabActiveIdx = -1
  requestParams = {
    selectType: '0',
    sortType: '0'
  }


  componentDidMount() {
  }

  componentWillReceiveProps(next, prev) {
    console.log('111next---', next)

    if (!next || next.tabActiveIdx == -1) {
      return
    }

    let globalData = getGlobalData('filter_data')
    let itemData = globalData[next.tabActiveIdx]

    // 防止同一tab点击刷新，防止filter参数完全一致刷新
    if (next.tabActiveIdx === this.tabActiveIdx && this.requestParams.selectType === itemData.selectType
      && this.requestParams.sortType == itemData.sortType) {
      return
    }

    this.tabActiveIdx = next.tabActiveIdx
    this.requestParams = itemData
    this.initData()
  }

  async initData() {

    if (this.tabActiveIdx < 0) return

    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '加载中...'
    })
    let sortTemp = this.requestParams.selectType + this.requestParams.sortType
    sortTemp = sortTemp == '00' ? '0' : sortTemp

    console.log("DContent extraParams", this.props.extraParams)

    let { pageTotal, rows: list } = await getJSON({
      url: apis.getQuestionList,
      data: {
        page: 1,
        keyword: this.props.keyword,
        questionBankType: 10,
        ...this.props.extraParams,
        type: this.props.tabList[this.tabActiveIdx].id, // this.props.type,
        sort: sortTemp
      },
    });

    let tempList = [].concat(list)
    this.setState({
      page: 1,
      pageTotal,
      list: tempList,
      autoScrollTop: true
    }, () => {
      console.log(TAG, '【init setData 设置完成】')
    })

    setTimeout(() => {
      Taro.hideLoading()
    }, 300);
  }

  async loadMore() {
    // todo: 等待传递 写死 questionBankType=9

    let sortTemp = this.requestParams.selectType + this.requestParams.sortType
    sortTemp = sortTemp == '00' ? '0' : sortTemp
    let currentPage = this.state.page
    if ((currentPage + 1) <= this.state.pageTotal) {
      Taro.showLoading({
        title: '加载中...'
      })


      let { pageTotal, rows: list } = await getJSON({
        url: apis.getQuestionList,
        data: {
          page: currentPage + 1,
          keyword: this.props.keyword,
          questionBankType: 10,
          ...this.props.extraParams,
          type: this.props.tabList[this.tabActiveIdx].id, // this.props.type,
          sort: sortTemp
        },
      });
      console.log("【loadmore ====】", list, pageTotal)
      this.setState({
        autoScrollTop: false,
        page: currentPage + 1,
        pageTotal,
        list: this.state.list.concat(list)
      })
      Taro.hideLoading()

    }

  }

  renderFunc(item, index, pageIndex) {
    return (
      <QuestionItem item={item} key={index} />
    )
  }

  onPageScrollToLower = () => {
    this.loadMore()
  }

  onComplete = () => {
    try {
      Taro.hideLoading()
    } catch (error) {

    }
  }

  render() {
    let scrollHeight = this.props.scrollHeight

    return (
      <View>
        <TaroVirtualList
          listId={this.state.virtualListId}
          autoScrollTop={this.state.autoScrollTop}
          resetTwoList={this.state.autoScrollTop}
          listType="multi"
          list={this.state.list}
          pageNum={this.state.page}
          onComplete={() => this.onComplete()}
          onRender={this.renderFunc.bind(this)}
          onGetScrollData={(res) => { console.log(res) }}
          scrollViewProps={{
            onScrollToLower: this.onPageScrollToLower.bind(this),
            scrollTop: 100,
            lowerThreshold: 50,
            style: {
              "height": scrollHeight,
            },
          }}
        />

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { extraParams, activeIdx, } = state.first
  return {
    extraParams,
    activeIdx,
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(firstActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DTabContent);


