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
    eventCenter.on('eventChange', (currentIndex) => {
      console.log("[topic eventChange  currentIndex]", currentIndex, this.props.index)
      this.initByTabChange(currentIndex)
    })
    //收藏 用的是qustionItem ,  eventChange_favorite
    eventCenter.on('eventChange_favorite_question', (currentIndex) => {
      this.initByTabChange(currentIndex)
    })
    // 我的收藏，浏览，点赞 子页面 监听 ： 
    eventCenter.on('eventChange_sub_history_question', (currentIndex) => {
      this.initByTabChange(currentIndex)
    })

  }

  initByTabChange(currentIndex = 0) {
    if (this.init && (this.props.index === currentIndex)) {
      this.init = false
      this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType })
    }
  }

  componentWillUnmount() {
    // 卸载
    eventCenter.off('eventChange')
    eventCenter.off('eventChange_favorite_question')
    eventCenter.off('eventChange_sub_history_question')
  }

  render() {
    const { type, list, page, pageTotal, initData, loadMore, questionBankType, optType } = this.props
    const dataLen = list.length
    const itemSize = 100

    return (
      <VirtualList
        className='List'
        // height={this.props.scrollHeight}
        height={300}
        itemData={list}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        bounces={false}
        style={{ background: 'red' }}
        // upperThreshold={100}
        // lowerThreshold={100}
        overscanCount={30}

        onScroll={({ scrollDirection, scrollOffset, detail }) => {
          console.log('scrollOffset---', scrollOffset, dataLen * itemSize)
          console.log('scroll  top -----', detail.scrollTop)
          // // 下拉刷新
          // if (!this.props.loading &&
          //   // 只有往前滚动我们才触发
          //   scrollDirection === 'backward' &&
          //   // 5 = (列表高度 / 单项列表高度)
          //   // 100 = 滚动提前加载量，可根据样式情况调整
          //   scrollOffset < 50
          // ) {

          //   if ((page + 1) <= pageTotal) {
          //     console.log('loadmore before')
          //     loadMore({ type, page: page + 1, questionBankType, optType })
          //     console.log('loadmore after')
          //   }
          // }

          // 上拉加载
          if (!this.props.loading &&
            // 只有往前滚动我们才触发
            scrollDirection === 'forward' &&
            // 5 = (列表高度 / 单项列表高度)
            // 100 = 滚动提前加载量，可根据样式情况调整
            scrollOffset > (dataLen * itemSize - 350)
          ) {

            if ((page + 1) <= pageTotal) {
              console.log('loadmore before')
              loadMore({ type, page: page + 1, questionBankType, optType })
              console.log('loadmore after')
            }
          }
        }}
      // onScrollToLower={() => {
      //   if (this.props.loading) {
      //     return
      //   } else {
      //     if ((page + 1) <= pageTotal) {
      //       console.log('loadmore before')
      //       loadMore({ type, page: page + 1, questionBankType, optType })
      //       console.log('loadmore after')
      //     }
      //   }
      // }}
      // onScrollToUpper={() => {
      //   if (this.props.loading) {
      //     return
      //   } else {
      //     initData({ type, page: 1, questionBankType, optType })
      //   }
      // }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default Topic