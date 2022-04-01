import React, { Component } from "react";
import Taro from '@tarojs/taro';
import '@tarojs/taro/html.css'
import { View, Image, Button, Text, RichText } from '@tarojs/components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import hljs from 'highlight.js/lib/common';
import { decode } from 'html-entities';
import * as commonActions from "../../actions/common.action"
import apis from '../../services/apis';
import { loggingDecorator, getCurrentPageUrlWithArgs } from "../../utils/index"
import { getJSON, postJSON } from "../../services/method";
import './index.scss'

const replaceCode = (html) => {
  const result = html.replace(/<code>([\s\S]*?)<\/code>/g, (match, p1) => `<code class="hljs">${hljs.highlightAuto(decode(p1)).value}</code>`);
  return result
}

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
  url = ''
  title = ''
  currentId = ''
  startTime = new Date().getTime()

  componentDidMount() {
    this.url = getCurrentPageUrlWithArgs()
    console.log('url------', this.url)
  }

  // onLoad
  async onLoad(options) {
    const { id } = options
    console.log("[SubDetail questionn------]", id)
    await this.initSubQuestionDetail(id)
    this.currentId = id
    Taro.reportEvent('question_detail', {
      id: id,
    })
  }

  componentDidShow() {
    this.startTime = new Date().getTime()
    console.log('开始时间')
  }

  componentWillUnmount() {
    let stayTime = (new Date().getTime() - this.startTime) / 1000
    console.log('时间差', stayTime)
    Taro.reportEvent('question_stay', {
      id: this.currentId,
      stay_time: stayTime.toString()
    })
  }


  async initSubQuestionDetail(id) {
    Taro.showLoading({
      title: '加载中...'
    })
    let result = await getJSON({ url: apis.getQuestionDetail + id });

    await this.setState({
      item: result
    })

    this.title = result.stem
    Taro.hideLoading()
  }

  // 赞 事件
  async handleZan(flag) {
    const fn = async () => {
      let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 0, optType: 1 })
      await result && this.setState({
        item: {
          ...this.state.item,
          likeFlag: !flag
        }
      }, () => {
        if (flag) {
          Taro.showToast({
            title: '点赞已取消',
            duration: 1000
          })
        } else {
          Taro.showToast({
            title: '感谢您的认可',
            duration: 1000
          })
        }
      })

    }
    loggingDecorator(fn)
  }

  // 收藏 事件
  async handleFavorite(flag) {
    const fn = async () => {
      let result = await this.unitOptRequest({ action: flag ? 'unOpt' : 'opt', id: this.state.item.id, type: 0, optType: 2 })
      await result && this.setState({
        item: {
          ...this.state.item,
          collectFlag: !flag
        }
      }, () => {
        if (flag) {
          Taro.showToast({
            title: '收藏已取消',
            duration: 1000
          })
        } else {
          Taro.showToast({
            title: '收藏成功',
            duration: 1000
          })
        }
      })

    }
    loggingDecorator(fn)
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

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.title,
      path: this.url,
      imageUrl: 'http://teachoss.itheima.net/heimaQuestionMiniapp/assets/share/share_common.png'
    }
  }

  render() {
    let { item } = this.state
    let { collectFlag, likeFlag } = item
    console.log('是否会变----', likeFlag, collectFlag)
    return (
      <View className='index'>
        <IconText title='题目：' />
        <View className='des-content'>{item.stem}</View>

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
        <View className='detail-content'>
          {item.answer && item.answer.indexOf('<code>') > -1
            ? <RichText className='taro_html rich-text' nodes={replaceCode(item.answer)} />
            : <RichText className='taro_html rich-text' nodes={item.answer} />
          }
        </View>

        {/* 点赞和收藏按钮 */}
        <View className='zan-favorite-btns'>
          <Image className='favorite-btn' src={collectFlag ? require('../../assets/zan_fav_btns/fav_select.png') : require('../../assets/zan_fav_btns/fav.png')} onClick={() => this.handleFavorite(collectFlag)} />
          <Image className='zan-btn' src={likeFlag ? require('../../assets/zan_fav_btns/zan_select.png') : require('../../assets/zan_fav_btns/zan.png')} onClick={() => this.handleZan(likeFlag)} />
        </View>


        {/* 上一题下一题 */}
        {/* <CustomPagination lastId={1} nextId={5} pageClick={this.pageClick} /> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  let { userInfo, flag } = state.common
  return {
    userInfo, flag
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(commonActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SubDetail);
