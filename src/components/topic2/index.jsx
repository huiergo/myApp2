import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import InterviewItem from '../interviewItem'

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style='.css'>
      <InterviewItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {
  loading = false
  init = true

  componentWillMount() {
    this.initByTabChange(0)
    // 监听一个事件，接受参数
    eventCenter.on('eventChange_experience', (currentIndex) => {
      console.log("[topic2 eventChange_experience  currentIndex]", currentIndex, this.props.index)
      this.initByTabChange(currentIndex)
    })

    //收藏 用的是qustionItem ,  eventChange_favorite
    eventCenter.on('eventChange_favorite_interview', (currentIndex) => {
      this.initByTabChange(currentIndex)
    })

    // 我的收藏，浏览，点赞 子页面 监听 ： 
    eventCenter.on('eventChange_sub_history_interview', (currentIndex) => {
      this.initByTabChange(currentIndex)
    })

  }

  initByTabChange(currentIndex = 0) {
    console.log("[topic2 initByTabChange]========", currentIndex)
    if (this.init && (this.props.index === currentIndex)) {
      this.init = false
      // type, page: page + 1, current, index 
      console.log("topic 2  initdata")
      this.props.initData({ type: this.props.type, page: 1, current: currentIndex, questionBankType: this.props.questionBankType, optType: this.props.optType })
    }
  }

  componentWillUnmount() {
    // 卸载
    eventCenter.off('eventChange_experience')
    eventCenter.off('eventChange_favorite_interview')
    eventCenter.off('eventChange_sub_history_interview')
  }

  render() {
    const { type, list, page, pageTotal, initData, loadMore, current, index, optType } = this.props

    const dataLen = list.length
    const itemSize = 140

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
              loadMore({ type, page: page + 1, current, index, optType })
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
