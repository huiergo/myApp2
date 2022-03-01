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
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      <QuestionItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {
  loading = false
  init = true

  componentWillMount() {
    this.initByTabChange()
    // 监听一个事件，接受参数
    eventCenter.on('eventChange', (currentIndex) => {
      console.log("[topic eventChange  currentIndex]", currentIndex, this.props.index)
      this.initByTabChange(currentIndex)
    })
  }

  initByTabChange(currentIndex) {
    if (this.init && (this.props.index === currentIndex)) {
      this.init = false
      this.props.initData({ tabType: this.props.tabType, page: 1 })
    }
  }

  componentWillUnmount() {
    // 卸载
    eventCenter.off('eventChange')
  }

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
        }}
        onScrollToUpper={() => {
          initData({ tabType, page: 1 })
        }}
      >
        {Row}
      </VirtualList>
    );
  }
}
export default Topic



// const mapStateToProps = (state) => {
//   let { currentIdx } = state.first
//   return {
//     currentIdx,
//   }
// };
// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators(firstActions, dispatch)

// });
// export default connect(mapStateToProps, mapDispatchToProps)(Topic)
