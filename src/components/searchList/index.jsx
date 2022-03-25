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
        itemData={list}
        itemCount={dataLen}
        itemSize={itemSize}
        width='100%'
        upperThreshold={100}
        lowerThreshold={100}
        height={this.props.scrollHeight}
        bounces={false}
        overscanCount={30}

        onScroll={({ scrollDirection, scrollOffset, detail }) => {
          if (!this.props.loading &&
            scrollDirection === 'forward' &&
            scrollOffset > (dataLen * itemSize - 600)
          ) {

            if ((page + 1) <= pageTotal) {
              loadMore({ page: page + 1, keyword, questionBankType })
            }
          }
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default SearchList
