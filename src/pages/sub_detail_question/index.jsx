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

// let item = {
//   difficulty: 1,
//   title: '收藏 题目1-Question的优势是什么？',
//   likeCount: 666,
//   views: 99,
//   likeFlag: true,
//   stage: 'vue',
//   currentId: 5,
//   nextId: 6,
//   lastId: 4
// }

// let item1 = {
//   content: "周华元会原需书县便山式声。济开记们在应林北取太果广身。术毛民少使铁水即增料业位办细。色红这员方市何关万北根过史维难北几。有再土备建值半月可发型子元。"
// createdAt: "2007-12-08"
// difficulty: 3
// id: 310000197711147400
// likeCount: 605
// likeFlag: 0
// planSceneName: "核心提炼"
// questionNo: "41"
// questionType: 4
// stem: "条格议大水米联头因技但严行史务圆"
// stemAttachmentId: "cid://nmy.hn/guhb"
// subjectName: "关保件到王"
// views: 597
// }

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
const html = `<p><b>面试公司：</b>广州欣芝妍化妆品有限公司<br></p><p><b>面试岗位：</b>前端开发</p><p><br></p><p>
</p><p><b>面试问题：
</b></p><p>1.<a href="https://www.itcast.cn/news/20211007/11050312845.shtml" target="_blank"> let、const、var区别</a>
</p><p>2. 是否使用过vuex，vuex里面的几个核心模块有哪些
</p><p>3. <a href="https://www.itcast.cn/news/20180105/13395719059.shtml" target="_blank">闭包</a>
</p><p>4. <a href="https://www.itheima.com/news/20211019/110800.html" target="_blank">原型链</a>
</p><p>5. <a href="https://www.itcast.cn/news/20201016/11023220300.shtml" target="_blank">深拷贝的方</a>法（json方法的缺点：不能拷贝函数和 undefined）
</p><p>6. <a href="https://www.itcast.cn/news/20210929/17580567129.shtml" target="_blank">vue生命周期</a>（mounted和created的区别，mounted是否任何情况下都能操作到dom）
</p><p>7. 深拷贝如何实现
</p><p>8. <a href="https://www.itcast.cn/news/20210506/15001052902.shtml" target="_blank">基本数据类型</a>
</p><p>9. 基本数据类型和引用数据类型你是怎么理解的
</p><p>10. 简述项目中遇到的问题，如何解决
</p><p>11. 如何判断数据类型（typeof和instanceof、对象的constructor）
</p><p>12. 职业发展规划</p><p>
</p><p>`
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
    await this.initSubDetail(id)
  }

  async initSubDetail(id) {
    let result = await getJSON(apis.getQuestionDetail, { id });
    if (result && result.data && result.data.data) {
      this.setState({
        item: result.data.data
      })
    }
  }

  // // 上一页下一页点击事件
  // pageClick(id) {
  //   console.log("上一页下一页id", id)
  //   // redirectToPage({ url: `./index?id=${id}` })
  // }

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
          <Image className='zan-btn' src={likeFlag ? require('../../assets/zan.png') : require('../../assets/delete.png')} onClick={() => this.handleZan(likeFlag)} />
          <Image className='favorite-btn' src={collectFlag ? require('../../assets/favorite-icon.png') : require('../../assets/delete.png')} onClick={() => this.handleFavorite(collectFlag)} />
        </View>


        {/* 上一题下一题 */}
        {/* <CustomPagination lastId={1} nextId={5} pageClick={this.pageClick} /> */}
      </View>
    )
  }
}

export default SubDetail
