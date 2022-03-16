import { Component } from 'react'
import { View, Button, Text, ScrollView } from '@tarojs/components'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Taro from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'

import QuestionItem from '../../../components/questionItem'
import './index.css'
import { set as setGlobalData, get as getGlobalData } from '../../../global_data'

import * as firstActions from "../first.action"


class DTabContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      page: 0,
      pageTotal: '',
    }
  }

  init = false

  requestParams = {
    selectType: '0',
    sortType: '0'
  }

  componentDidMount() {
    this.initActiveTabList(0)
  }

  async initActiveTabList(tabActiveIdx) {
    //  首先默认0 ，设置下全局keyword
    if (tabActiveIdx === this.props.index && !this.init) {
      await this.initData()
    }
  }

  componentWillReceiveProps(next, prev) {
    if (!next) {
      return
    }
    if (next.tabActiveIdx != this.props.index) {
      return
    }

    let globalData = getGlobalData('filter_data')
    let itemData = globalData[this.props.index]

    console.log("DTabContent", this.requestParams)
    console.log("DTabContent", globalData)

    if (!this.init) {
      this.requestParams = itemData
      this.initData()
    } else if (this.requestParams.selectType == itemData.selectType && this.requestParams.sortType == itemData.sortType) {
      console.log("DTabContent", "完全一致")
    } else {
      this.requestParams = itemData
      this.initData()
    }
  }

  async initData() {
    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '加载中...'
    })

    console.log("DContent extraParams", this.props.extraParams)
    let { pageTotal, rows: list } = await getJSON({
      url: apis.getQuestionList,
      data: {
        page: 1,
        keyword: this.props.keyword,
        questionBankType: 10,
        ...this.props.extraParams,
        type: this.props.type,
        sort: this.requestParams.selectType + this.requestParams.sortType
      },
    });

    this.setState({
      pageTotal,
      list
    })

    this.init = true
    setTimeout(() => {
      Taro.hideLoading()
    }, 300);

  }

  async loadMore() {
    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '加载中...'
    })

    if ((this.state.page + 1) <= this.state.pageTotal) {
      let { pageTotal, rows: list } = await getJSON({
        url: apis.getQuestionList,
        data: { page: 1, keyword: this.props.keyword, questionBankType: 9, ...this.props.extraParams },
      });
      this.setState({
        pageTotal,
        list: this.state.list.concat(list)
      })
    }
    setTimeout(() => {
      Taro.hideLoading()
    }, 300);
  }

  render() {
    let scrollHeight = this.props.scrollHeight

    return (
      <ScrollView className='tab-content-scroll' style={{ height: scrollHeight }}
        upperThreshold={50}
        scrollY
        scrollWithAnimation
        onScrollToUpper={() => {
          this.initData()
        }}
        onScrollToLower={() => {
          this.loadMore()
        }}
      >
        {this.state.list.map((item, index) => {
          return <QuestionItem item={item} key={index} />
        })}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  let { extraParams, } = state.first
  return {
    extraParams
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(firstActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DTabContent);

