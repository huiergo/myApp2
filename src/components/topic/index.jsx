import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import QuestionItem from '../questionItem'

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      <QuestionItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {
  loading = false

  render() {
    const { tabType, list, page, initData, loadMore } = this.props

    const dataLen = list.length
    const itemSize = 100
    return (
      <VirtualList
        className='List'
        height={300}
        itemData={list}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        onScrollToLower={() => {
          loadMore({ tabType, page: page + 1 })
          // if (!this.loading) {
          //   this.loading = true
          //   loadMore({ type, page: page + 1 })
          //   this.loading = false
          // }
        }}
        onScrollToUpper={() => {
          initData({ tabType, page: 1 })
          // if (!this.loading) {
          //   this.loading = true
          //   initData({ type, page })
          //   this.loading = false
          // }
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default Topic
