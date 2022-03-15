import { Component } from 'react'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'

import QuestionItem from '../../../components/questionItem'
import './index.css'

class DTabContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      page: 0,
      pageTotal: '',
    }
  }

  init = true
  async componentDidMount() {
    await this.initActiveTabList(0)
  }

  async initActiveTabList(tabActiveIdx) {
    if (tabActiveIdx === this.props.index && this.init) {
      this.init = false
      await this.initData()
    }
  }

  async componentWillReceiveProps(next, prev) {

    if (next) {
      if (next.tabActiveIdx === this.props.index && this.init) {
        this.init = false
        await this.initData()
      }
    }

  }

  // this.props.tabActiveIdx 这个值就不要传递了，全局监听好了

  // initByTabChange(currentIndex = 0) {
  //   if (this.init && (this.props.tabActiveIdx === currentIndex)) {
  //     this.init = false
  //     this.initData()
  //     // this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType, extraParams: extraParams })
  //   }
  // }

  // componentWillMount() {
  //   this.initByTabChange(0)
  //   // 监听一个事件，接受参数
  //   eventCenter.on('eventChange', (...args) => {
  //     console.log('args----', args)
  //     // const { selectIndex, keyword, sort } = args

  //     let selectIndex = args[0]
  //     let keyword = args[1]
  //     let sort = args[2]
  //     // console.log("[topic eventChange  currentIndex]", currentIndex, this.props.index)
  //     this.initByTabChange(selectIndex, keyword, sort)
  //   })
  //   //收藏 用的是qustionItem ,  eventChange_favorite
  //   eventCenter.on('eventChange_favorite_question', (currentIndex) => {
  //     this.initByTabChange(currentIndex)
  //   })
  //   // 我的收藏，浏览，点赞 子页面 监听 ： 
  //   eventCenter.on('eventChange_sub_history_question', (currentIndex) => {
  //     this.initByTabChange(currentIndex)
  //   })

  // }


  // initByTabChange(currentIndex = 0, ...extraParams) {

  //   console.log('initData extraParams----', extraParams)
  //   if (this.init && (this.props.index === currentIndex)) {
  //     this.init = false
  //     this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType, extraParams: extraParams })
  //   }
  // }
  async initData() {
    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '刷新。。。'
    })
    let { pageTotal, rows: list } = await getJSON({
      url: apis.getQuestionList,
      data: { page: 1, keyword: this.props.keyword, questionBankType: 9 },
    });

    this.setState({
      pageTotal,
      list
    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 300);

  }

  async loadMore() {
    // todo: 等待传递 写死 questionBankType=9
    Taro.showLoading({
      title: '加载更多。。。'
    })

    if ((this.state.page + 1) <= this.state.pageTotal) {
      let { pageTotal, rows: list } = await getJSON({
        url: apis.getQuestionList,
        data: { page: 1, keyword: this.props.keyword, questionBankType: 9 },
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

export default DTabContent
