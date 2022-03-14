import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button, Text } from '@tarojs/components';
import apis from '../../services/apis';

import { getJSON, postJSON } from "../../services/method";

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
    Taro.showLoading()
    let result = await getJSON({ url: apis.getQuestionDetail + id });

    this.setState({
      item: result
    })
    Taro.hideLoading()
  }

  // 赞 事件
  async handleZan(flag) {
    console.log("点赞id----", this.state.item.id)
    let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 0, optType: 1 })
    result && this.setState({
      item: {
        ...this.state.item,
        likeFlag: !flag
      }
    })
  }
  // 收藏 事件
  async handleFavorite(flag) {
    console.log("收藏 id----", this.state.item.id)
    let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 0, optType: 2 })
    console.log("题目详情页： 收藏 请求 结果----", result)
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
  async unitOptRequest({ action, id, type = 0, optType }) {
    let api = action == 'opt' ? apis.opt : apis.unOpt
    let result = await postJSON({ url: api, data: { id, type, optType } });
    console.log("题目详情页： 收藏 入参'result----", result)

    return result
  }
  render() {
    let { item } = this.state
    let { collectFlag, likeFlag } = item
    console.log('是否会变----', likeFlag, collectFlag)
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
        <View className='detail-content' dangerouslySetInnerHTML={{ __html: item.answer }} ></View>
        {/* <View className='detail-content'>{item.answer}</View> */}



        {/* 点赞和收藏按钮 */}
        <View className='zan-favorite-btns'>
          <Image className='zan-btn' src={likeFlag ? 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/zan-fav/zan_select.png' : 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/zan-fav/zan.png'} onClick={() => this.handleZan(likeFlag)} />
          <Image className='favorite-btn' src={collectFlag ? 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/zan-fav/fav-select.png' : 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/zan-fav/fav.png'} onClick={() => this.handleFavorite(collectFlag)} />
        </View>


        {/* 上一题下一题 */}
        {/* <CustomPagination lastId={1} nextId={5} pageClick={this.pageClick} /> */}
      </View>
    )
  }
}

export default SubDetail
