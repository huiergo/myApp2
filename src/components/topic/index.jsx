import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import QuestionItem from '../questionItem'
import * as firstActions from "../../actions/first.action"


const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style='.css'>
      <QuestionItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {
  // loading = false
  init = true

  componentWillMount() {
    this.initByTabChange(0)
    // 监听一个事件，接受参数
    eventCenter.on('eventChange', (...args) => {
      console.log('args----', args)
      // const { selectIndex, keyword, sort } = args

      let selectIndex = args[0]
      let keyword = args[1]
      let sort = args[2]
      // console.log("[topic eventChange  currentIndex]", currentIndex, this.props.index)
      this.initByTabChange(selectIndex, keyword, sort)
    })
    //收藏 用的是qustionItem ,  eventChange_favorite
    eventCenter.on('eventChange_favorite_question', (currentIndex, isForceReload) => {
      if (isForceReload) {
        this.forceReload(currentIndex)
      } else {
        this.initByTabChange(currentIndex)
      }
    })
    // 我的收藏，浏览，点赞 子页面 监听 ： 
    eventCenter.on('eventChange_sub_history_question', (currentIndex, isForceReload) => {
      if (isForceReload) {
        this.forceReload(currentIndex)
      } else {
        this.initByTabChange(currentIndex)
      }
    })

  }

  initByTabChange(currentIndex = 0, ...extraParams) {

    console.log('initData extraParams----', extraParams)
    if (this.props.index === currentIndex) {
      this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType, extraParams: extraParams })
    }
  }

  forceReload(currentIndex = 0) {
    this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType })
  }

  componentWillUnmount() {
    // 卸载


    if (this.props.fromType == 'sub_history') {
      eventCenter.off('eventChange_sub_history_question')
    } else if (this.props.fromType == 'favorite') {
      eventCenter.off('eventChange_favorite_question')
    } else {
      eventCenter.off('eventChange')
    }
  }

  render() {
    const { type, list, page, pageTotal, initData, loadMore, questionBankType, optType, extraParams } = this.props
    const dataLen = list.length
    const itemSize = 80

    return (
      <VirtualList
        className='List'
        height={this.props.scrollHeight}
        // height={300}
        itemData={list}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        bounces={false}
        // upperThreshold={100}
        // lowerThreshold={100}
        overscanCount={30}

        onScroll={({ scrollDirection, scrollOffset, detail }) => {
          console.log('scrollOffset---', scrollOffset, dataLen * itemSize)
          console.log('scroll  top -----', detail.scrollTop)

          // 上拉加载
          if (!this.props.loading &&
            // 只有往前滚动我们才触发
            scrollDirection === 'forward' &&
            // 5 = (列表高度 / 单项列表高度)
            // 100 = 滚动提前加载量，可根据样式情况调整
            scrollOffset > (dataLen * itemSize - 600)
          ) {

            if ((page + 1) <= pageTotal) {
              console.log('loadmore before')
              loadMore({ type, page: page + 1, questionBankType, optType, extraParams })
              console.log('loadmore after')
            }
          }
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default Topic