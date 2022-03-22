import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { View, Image, Button } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import InterviewItem from '../interviewItem'
import './index.scss'

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style='.css'>
      <InterviewItem item={data[index]} />
    </View>
  );
})

class Topic extends Component {
  loading = false
  init = true

  componentWillMount() {
    this.initByTabChange(0)

    if (this.props.fromType == 'sub_history') {
      eventCenter.on('eventChange_sub_history_interview', (currentIndex, isForceReload) => {
        if (isForceReload) {
          this.forceReload(currentIndex)
        } else {
          this.initByTabChange(currentIndex)
        }
      })
    } else if (this.props.fromType == 'favorite') {
      eventCenter.on('eventChange_favorite_interview', (currentIndex, isForceReload) => {
        if (isForceReload) {
          this.forceReload(currentIndex)
        } else {
          this.initByTabChange(currentIndex)
        }
      })
    } else {
      eventCenter.on('eventChange_experience', (currentIndex) => {
        this.initByTabChange(currentIndex)
      })
    }

  }

  initByTabChange(currentIndex = 0) {
    if (this.props.index === currentIndex) {
      // type, page: page + 1, current, index 
      this.props.initData({ type: this.props.type, page: 1, current: currentIndex, questionBankType: this.props.questionBankType, optType: this.props.optType })
    }
  }

  forceReload(currentIndex = 0) {
    this.props.initData({ type: this.props.type, page: 1, questionBankType: this.props.questionBankType, optType: this.props.optType })
  }

  componentWillUnmount() {
    // 反注册时间
    if (this.props.fromType == 'sub_history') {
      eventCenter.off('eventChange_sub_history_interview')
    } else if (this.props.fromType == 'favorite') {
      eventCenter.off('eventChange_favorite_interview')
    } else {
      eventCenter.off('eventChange_experience')
    }
  }

  render() {
    const { type, list, page, pageTotal, initData, loadMore, current, index, optType } = this.props

    const dataLen = list.length
    const itemSize = 150

    return (
      <View>
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
            overscanCount={30}
            enhanced
            showScrollbar={false}
            onScroll={({ scrollDirection, scrollOffset, detail }) => {
              console.log('scrollOffset---', scrollOffset, dataLen * itemSize)
              console.log('scroll  top -----', detail.scrollTop)

              // 上拉加载
              if (!this.props.loading &&
                // 只有往前滚动我们才触发
                scrollDirection === 'forward' &&
                // 5 = (列表高度 / 单项列表高度)
                // 100 = 滚动提前加载量，可根据样式情况调整
                scrollOffset >= (dataLen * itemSize - this.props.scrollHeight - 50)
              ) {

                if ((page + 1) <= pageTotal) {
                  loadMore({ type, page: page + 1, current, index, optType })
                }
              }
            }}
          >
            {Row}
          </VirtualList> :
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
