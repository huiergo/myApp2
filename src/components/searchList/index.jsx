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
        // height={300}
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
              loadMore({ page: page + 1, keyword, questionBankType })
            }
          }
        }}

      // onScrollToLower={() => {
      //   console.log("[search onScrollToLower.....]", page, pageTotal)
      //   if ((page + 1) <= pageTotal) {
      //     loadMore({ page: page + 1, keyword, questionBankType })
      //   }

      // }}
      // onScrollToUpper={() => {
      //   initData({ page: 1, keyword, questionBankType })
      // }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default SearchList
