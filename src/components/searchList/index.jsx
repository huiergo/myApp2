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

class SearchList extends Component {
  loading = false

  render() {
    const { list, page, initData, loadMore } = this.props

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
          loadMore({ page: page + 1 })
        }}
        onScrollToUpper={() => {
          initData({ page: 1 })
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default SearchList
