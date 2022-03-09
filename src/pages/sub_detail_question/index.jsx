import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import CustomPagination from "../../components/customPagination";
import { redirectToPage } from "../../utils";
import apis from '../../services/apis';

import { getJSON } from "../../services/method";

import './index.scss'

const handleTag = (tag) => {
  switch (tag) {
    case 1:
      return {
        className: 'simple',
        des: '简单'
      }
    case 2:
      return {
        className: 'normal',
        des: '一般'
      }
    case 3:
      return {
        className: 'hard',
        des: '困难'
      }
    default:
      return {
        className: 'normal',
        des: '一般'
      }
  }
}

const IconText = ({ title, des }) => {
  return (<View className='icon-text'>
    <View className='vertical-line'></View>
    <View className='icon-text-title'>{title}</View>
    <View className='icon-text-des'>{des}</View>
  </View>)
}

const HorizonLine = () => {
  return (<View className='horizon-line'></View>)
}

class SubDetail extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      item: {}
    }
  }
  // onLoad
  async onLoad(options) {
    const { id } = options
    console.log("[SubDetail questionn------]", id)
    await this.initSubQuestionDetail(id)
  }

  async initSubQuestionDetail(id) {
    let result = await getJSON(apis.getQuestionDetail + id);
    if (result && result.data && result.data.data) {
      this.setState({
        item: result.data.data
      })
    }
  }

  // 赞 事件
  async handleZan(flag) {
    console.log("点赞id----", this.state.item.id)
    // todo: 这里type先写死
    let result = this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 1, optType: 1 })
    result && this.setState({
      item: {
        ...this.state.item,
        likeFlag: !flag
      }
    })
  }
  // 收藏 事件
  handleFavorite(flag) {
    console.log("收藏 id----", this.state.item.id)
    // todo: 这里type先写死
    let result = this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 1, optType: 2 })
    result && this.setState({
      item: {
        ...this.state.item,
        collectFlag: !flag
      }
    })
  }
  /**
   * type:     0面试题1面经
   * optType:  1点赞2收藏3浏览
   */
  async unitOptRequest({ action, id, type = 1, optType }) {
    let api = action == 'opt' ? apis.opt : apis.unOpt
    let result = await getJSON(api, { id, type, optType });
    if (result && result.data && result.data.data) {
      return true
    }
  }
  render() {
    let { item } = this.state
    let { collectFlag, likeFlag } = item
    return (
      <View className='index'>
        <IconText title='题目：' des={item.stem} />
        <View className='detail-item__tag-wrapper'>
          <View className={`detail-item__tag ${handleTag(item.difficulty).className}`}>
            {handleTag(item.difficulty).des}
          </View>
          <View className={`detail-item__tag ${handleTag(2).className}`}>
            {item.stage}
          </View>
        </View>

        <HorizonLine />
        <IconText title='答案：' />
        {/* <View className='detail-content' dangerouslySetInnerHTML={{ __html: html }}></View> */}
        <View className='detail-content'>{item.answer}</View>

        {/* 点赞和收藏按钮 */}
        <View className='zan-favorite-btns'>
          <Image className='zan-btn' src={likeFlag ? require('../../assets/zan_favorite_icons/zan_select.png') : require('../../assets/zan_favorite_icons/zan.png')} onClick={() => this.handleZan(likeFlag)} />
          <Image className='favorite-btn' src={collectFlag ? require('../../assets/zan_favorite_icons/favorite_select.png') : require('../../assets/zan_favorite_icons/favorite.png')} onClick={() => this.handleFavorite(collectFlag)} />
        </View>


        {/* 上一题下一题 */}
        {/* <CustomPagination lastId={1} nextId={5} pageClick={this.pageClick} /> */}
      </View>
    )
  }
}

export default SubDetail
