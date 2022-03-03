import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import InterviewItem from '../interviewItem'

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      <InterviewItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {
  loading = false
  init = true

  componentWillMount() {
    console.log("topic 2  组件。。。。")
    this.initByTabChange()
    // 监听一个事件，接受参数
    eventCenter.on('eventChange_experience', (currentIndex) => {
      console.log("[topic2 eventChange_experience  currentIndex]", currentIndex, this.props.index)
      this.initByTabChange(currentIndex)
    })
  }

  initByTabChange(currentIndex = 0) {
    console.log("[topic2 initByTabChange]========", currentIndex)
    if (this.init && (this.props.index === currentIndex)) {
      this.init = false
      // type, page: page + 1, current, index 
      console.log("topic 2  initdata")
      this.props.initData({ type: this.props.type, page: 1, current: currentIndex })
    }
  }

  componentWillUnmount() {
    // 卸载
    eventCenter.off('eventChange_experience')
  }

  render() {
    const { type, list, page, pageTotal, initData, loadMore, current, index } = this.props

    const dataLen = list.length
    const itemSize = 140
    return (
      <VirtualList
        className='List'
        height={700}
        itemData={list}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        onScrollToLower={() => {
          if ((page + 1) <= pageTotal) {
            loadMore({ type, page: page + 1, current, index })
          }
        }}
        onScrollToUpper={() => {
          initData({ type, page: 1, current, index })
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default Topic
