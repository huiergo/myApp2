import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import QuestionItem from '../questionItem'
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
    if (this.props.index === currentIndex) {
      this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType, extraParams: extraParams })
    }
  }

  forceReload() {
    this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType })
  }

  render() {
    const { type, list, page, pageTotal, loadMore, questionBankType, optType, extraParams } = this.props
    const dataLen = list.length
    const itemSize = 80

    return (
      <View className='topic-page'>
        {list && list.length > 0 ?
          <VirtualList
            className='List'
            height={this.props.scrollHeight}
            itemData={list}
            itemCount={dataLen}
            itemSize={itemSize}
            width='100%'
            bounces={false}
            enhanced
            overscanCount={30}
            showScrollbar={false}
            onScroll={({ scrollDirection, scrollOffset, detail }) => {
              this.handleScroll = throttle(() => {
                if (!this.props.loading &&
                  scrollDirection === 'forward' &&
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