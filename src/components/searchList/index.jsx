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
    const { list, page, initData, loadMore, pageTotal, questionBankType, keyword } = this.props

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
        upperThreshold={100}
        lowerThreshold={100}
        onScrollToLower={() => {
          console.log("[search onScrollToLower.....]", page, pageTotal)
          if ((page + 1) <= pageTotal) {
            loadMore({ page: page + 1, keyword, questionBankType })
          }

        }}
        onScrollToUpper={() => {
          initData({ page: 1, keyword, questionBankType })
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default SearchList
