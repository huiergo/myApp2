import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import QuestionItem from '../questionItem'
import * as firstActions from "../../actions/first.action"
import './index.scss'
import { throttle } from "../../utils";


const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style='.css'>
      <QuestionItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {

  componentWillMount() {
    this.initByTabChange(0)
    if (this.props.fromType == 'sub_history') {
      eventCenter.on('eventChange_sub_history_question', (currentIndex, isForceReload) => {
        if (isForceReload) {
          this.forceReload(currentIndex)
        } else {
          this.initByTabChange(currentIndex)
        }
      })
    } else if (this.props.fromType == 'favorite') {
      eventCenter.on('eventChange_favorite_question', (currentIndex, isForceReload) => {
        if (isForceReload) {
          this.forceReload(currentIndex)
        } else {
          this.initByTabChange(currentIndex)
        }
      })
    } else {

    }
  }

  componentWillUnmount() {
    // 卸载
    if (this.props.fromType == 'sub_history') {
      eventCenter.off('eventChange_sub_history_question')
    } else if (this.props.fromType == 'favorite') {
      eventCenter.off('eventChange_favorite_question')
    } else {

    }
  }

  initByTabChange(currentIndex = 0, ...extraParams) {
    console.log('initData extraParams----', extraParams)
    if (this.props.index === currentIndex) {
      this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType, extraParams: extraParams })
    }
  }

  forceReload(currentIndex = 0) {
    this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType })
  }

  render() {
    const { type, list, page, pageTotal, initData, loadMore, questionBankType, optType, extraParams } = this.props
    const dataLen = list.length
    const itemSize = 80

    return (
      <View className='topic-page'>
        {list && list.length > 0 ?
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
            enhanced
            overscanCount={30}
            showScrollbar={false}
            onScroll={({ scrollDirection, scrollOffset, detail }) => {
              this.handleScroll = throttle(() => {
                // 上拉加载
                if (!this.props.loading &&
                  // 只有往前滚动我们才触发
                  scrollDirection === 'forward' &&
                  // 5 = (列表高度 / 单项列表高度)
                  // 100 = 滚动提前加载量，可根据样式情况调整
                  // scrollOffset > (dataLen * itemSize - 600)
                  scrollOffset >= (dataLen * itemSize - this.props.scrollHeight - 50)

                ) {
                  if ((page + 1) <= pageTotal) {
                    loadMore({ type, page: page + 1, questionBankType, optType, extraParams })
                  }
                }
              }, 300, 300);
              this.handleScroll()
            }}
          >
            {Row}
          </VirtualList>
          :
          <View className='blank_page'>
            {/* 内容展示区 */}
            <View className='blank-content'>
              <Image className='blank-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/blank.png' />
              <View className='blank-des'>暂无记录</View>
            </View>
          </View>
        }

      </View>

    );
  }
}
export default Topic