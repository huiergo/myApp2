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

import './index.css'

import { set as setGlobalData, get as getGlobalData } from '../../../global_data'

import * as firstActions from "../first.action"


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

  init = false
  tabActiveIdx = -1
  requestParams = {
    selectType: '0',
    sortType: '0'
  }


  componentDidMount() {
    // this.initActiveTabList(0)
  }

  // async initActiveTabList(tabActiveIdx) {
  //   //  首先默认0 ，设置下全局keyword
  //   if (tabActiveIdx === this.props.index && !this.init) {
  //     await this.initData()
  //   }
  // }

  componentWillReceiveProps(next, prev) {
    console.log('111next---', next)
    this.tabActiveIdx = next.tabActiveIdx
    this.initData()
    // if (!next) {
    //   return
    // }
    // if (next.tabActiveIdx != this.props.index) {
    //   return
    // }

    // let globalData = getGlobalData('filter_data')
    // let itemData = globalData[this.props.index]

    // console.log("DTabContent", this.requestParams)
    // console.log("DTabContent", globalData)

    // if (!this.init) {
    //   this.requestParams = itemData
    //   this.initData()
    // } else if (this.requestParams.selectType == itemData.selectType && this.requestParams.sortType == itemData.sortType) {
    //   console.log("DTabContent", "完全一致")
    // } else {
    //   this.requestParams = itemData
    //   this.initData()
    // }
  }

  async initData() {

    if (this.tabActiveIdx < 0) return
    this.setState({
      // virtualListId: 'zt-virtial-list' + this.props.tabList[this.tabActiveIdx].id,
      autoScrollTop: true
    })
    console.log('1======', this.tabActiveIdx)
    console.log('2======', this.props.tabList[this.tabActiveIdx])
    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '加载中...'
    })
    let sortTemp = this.requestParams.selectType + this.requestParams.sortType
    sortTemp = sortTemp == '00' ? '0' : sortTemp

    console.log("DContent extraParams", this.props.extraParams)
    this.setState({
      page: 1,
      pageTotal: '',
      list: [{
        "id": "18207",
        "questionNo": "ZT025646",
        "stem": "骨架屏",
        "content": "",
        "subjectName": "前端与移动开发",
        "questionType": 5,
        "difficulty": 3,
        "views": "4",
        "likeCount": "1",
        "questionBankType": 10,
        "creatorName": "294",
        "creatorAvatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
        "createdAt": "2021-11-09",
        "likeFlag": 0
      }, {
        "id": "12750",
        "questionNo": "ZT020177",
        "stem": "骨架屏",
        "content": "",
        "subjectName": "前端与移动开发",
        "questionType": 5,
        "difficulty": 2,
        "views": "1",
        "likeCount": "0",
        "questionBankType": 10,
        "creatorName": "4552",
        "creatorAvatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
        "createdAt": "2021-09-01",
        "likeFlag": 0
      }, {
        "id": "12915",
        "questionNo": "ZT020342",
        "stem": "骨架屏......",
        "content": "",
        "subjectName": "前端与移动开发",
        "questionType": 5,
        "difficulty": 2,
        "views": "1",
        "likeCount": "0",
        "questionBankType": 10,
        "creatorName": "1077",
        "creatorAvatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
        "createdAt": "2021-09-04",
        "likeFlag": 0
      }, {
        "id": "14139",
        "questionNo": "ZT021567",
        "stem": "骨架屏......",
        "content": "",
        "subjectName": "前端与移动开发",
        "questionType": 5,
        "difficulty": 4,
        "views": "1",
        "likeCount": "0",
        "questionBankType": 10,
        "creatorName": "1007",
        "creatorAvatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
        "createdAt": "2021-09-16",
        "likeFlag": 0
      }, {
        "id": "6013",
        "questionNo": "ZT013393",
        "stem": "骨架屏......",
        "content": "",
        "subjectName": "前端与移动开发",
        "questionType": 5,
        "difficulty": 2,
        "views": "1",
        "likeCount": "0",
        "questionBankType": 10,
        "creatorName": "1742",
        "creatorAvatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png",
        "createdAt": "2021-04-29",
        "likeFlag": 0
      },]
    })
    // if (this.tabActiveIdx < 1) {
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
      autoScrollTop: false
    })

    this.init = true
    setTimeout(() => {
      Taro.hideLoading()
    }, 300);
    // } else {

    // }




    // let { pageTotal, rows: list } = await getJSON({
    //   url: apis.getQuestionList,
    //   data: {
    //     page: 1,
    //     keyword: this.props.keyword,
    //     questionBankType: 10,
    //     ...this.props.extraParams,
    //     type: this.props.tabList[this.tabActiveIdx].id, // this.props.type,
    //     sort: sortTemp
    //   },
    // });

    // this.setState({
    //   page: 1,
    //   pageTotal,
    //   list
    // })

    // this.init = true
    // setTimeout(() => {
    //   Taro.hideLoading()
    // }, 300);

  }

  async loadMore() {
    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '加载中...'
    })
    let sortTemp = this.requestParams.selectType + this.requestParams.sortType
    sortTemp = sortTemp == '00' ? '0' : sortTemp
    let currentPage = this.state.page
    if ((currentPage + 1) <= this.state.pageTotal) {
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
      this.setState({
        autoScrollTop: false,
        page: currentPage + 1,
        pageTotal,
        list: this.state.list.concat(list)
      })
    }
    setTimeout(() => {
      Taro.hideLoading()
    }, 300);
  }

  // renderFunc = (item, index, pageIndex) => {
  //   <QuestionItem item={item} key={index} />
  // }

  renderFunc(item, index, pageIndex) {
    // console.log('111------', item, index)
    return (
      // <View className="el">{`当前是第${item.subjectName}个元素，是第${pageIndex}屏的数据`}</View>
      <QuestionItem item={item} key={index} />
    )
  }

  renderDemo() {
    return (
      <View className="el">{`当前是第\个元素，是第/屏的数据`}</View>
    )
  }
  onPageScrollToLower = () => {

    // 执行分页数据请求
    console.log('到底了。。', this.state.page)
    this.loadMore()
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
          // segmentNum={20}
          onRender={this.renderFunc.bind(this)}
          // onRenderTop={this.renderDemo.bind(this)}
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

