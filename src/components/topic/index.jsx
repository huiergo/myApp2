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
    //收藏 用的是qustionItem ,  eventChange_favorite
    eventCenter.on('eventChange_favorite_question', (currentIndex) => {
      this.initByTabChange(currentIndex)
    })
    // 我的收藏，浏览，点赞 子页面 监听 ： 
    eventCenter.on('eventChange_sub_history_question', (currentIndex) => {
      this.initByTabChange(currentIndex)
    })

  }

  initByTabChange(currentIndex) {
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
    console.log("topic type-----", type)
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
          if ((page + 1) <= pageTotal) {
            loadMore({ type, page: page + 1, questionBankType, optType })
          }
        }}
        onScrollToUpper={() => {
          initData({ type, page: 1, questionBankType, optType })
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
