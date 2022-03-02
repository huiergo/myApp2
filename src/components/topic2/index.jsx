import React, { Component } from "react";
import Taro from '@tarojs/taro';

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

  render() {
    const { type, list, page, initData, loadMore } = this.props

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
          loadMore({ type, page: page + 1 })
        }}
        onScrollToUpper={() => {
          initData({ type, page: 1 })
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default Topic
