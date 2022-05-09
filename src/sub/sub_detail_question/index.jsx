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
import { loggingDecorator, getCurrentPageUrlWithArgs, gotoPage } from "../../utils/index"
import { getJSON, postJSON } from "../../services/method";
import './index.scss'

const stayCode = (html) => {
  const result = html.replace(/<code>([\s\S]*?)<\/code>/g, (match, p1) => `<code class="hljs">${p1}</code>`);
  return result
}

const replaceCode = (html) => {
  if (html.indexOf('hljs-') > -1) {
    return stayCode(html)
  } else {
    const result = html.replace(/<code>([\s\S]*?)<\/code>/g, (match, p1) => `<code class="hljs">${hljs.highlightAuto(decode(p1)).value}</code>`);
    return result
  }
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

  handleFeedback(id) {
    gotoPage({ url: `../../sub/feedback/index?id=${id}` })
  }

  render() {
    // let { item } = this.state

    let item = {
      "id": "28652",
      "stem": "css选择器优先级，权重",
      "content": null,
      "answer": "<p>1、</p>\n<pre><code>const newArr = arr.<span class=\"hljs-keyword\">map</span>(<span class=\"hljs-type\">item</span> =&gt; typeof <span class=\"hljs-type\">item</span> === <span class=\"hljs-string\">&#x27;number&#x27;</span> ? ++<span class=\"hljs-type\">item</span> : <span class=\"hljs-type\">item</span>)\nconsole.log(newArr)\n<span class=\"hljs-keyword\">let</span> num = <span class=\"hljs-number\">1</span>\nconst newArr = arr.<span class=\"hljs-keyword\">map</span>(<span class=\"hljs-type\">item</span> =&gt; {\n  <span class=\"hljs-keyword\">if</span> (typeof <span class=\"hljs-type\">item</span> === <span class=\"hljs-string\">&#x27;number&#x27;</span>) {\n    <span class=\"hljs-type\">item</span> = <span class=\"hljs-type\">item</span> + <span class=\"hljs-number\">1</span>\n    num *= <span class=\"hljs-type\">item</span>\n  }\n  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-type\">item</span>\n})\nconsole.log(num)\n\n</code></pre>\n<p>2、</p>\n<pre><code>target.match(<span class=\"hljs-regexp\">/\\d+/g</span>)\ntarget.replace(<span class=\"hljs-regexp\">/[^,\\w]/g</span>,<span class=\"hljs-string\">&#x27;*&#x27;</span>)\n\n</code></pre>\n<p>3、jsonp，反向代理，cros，nginx</p>\n<p>4、</p>\n<pre><code><span class=\"hljs-keyword\">const</span> cloneDeep1 = <span class=\"hljs-function\">(<span class=\"hljs-params\">target, hash = <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">WeakMap</span>()</span>) =&gt;</span> {\n  <span class=\"hljs-comment\">// 对于传入参数处理</span>\n  <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-keyword\">typeof</span> target !== <span class=\"hljs-string\">&#x27;object&#x27;</span> || target === <span class=\"hljs-literal\">null</span>) {\n    <span class=\"hljs-keyword\">return</span> target;\n  }\n  <span class=\"hljs-comment\">// 哈希表中存在直接返回</span>\n  <span class=\"hljs-keyword\">if</span> (hash.has(target)) <span class=\"hljs-keyword\">return</span> hash.get(target);\n\n  <span class=\"hljs-keyword\">const</span> cloneTarget = <span class=\"hljs-built_in\">Array</span>.isArray(target) ? [] : {};\n  hash.set(target, cloneTarget);\n\n  <span class=\"hljs-comment\">// 针对Symbol属性</span>\n  <span class=\"hljs-keyword\">const</span> symKeys = <span class=\"hljs-built_in\">Object</span>.getOwnPropertySymbols(target);\n  <span class=\"hljs-keyword\">if</span> (symKeys.length) {\n    symKeys.forEach(<span class=\"hljs-function\"><span class=\"hljs-params\">symKey</span> =&gt;</span> {\n      <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-keyword\">typeof</span> target[symKey] === <span class=\"hljs-string\">&#x27;object&#x27;</span> &amp;&amp; target[symKey] !== <span class=\"hljs-literal\">null</span>) {\n        cloneTarget[symKey] = cloneDeep1(target[symKey]);\n      } <span class=\"hljs-keyword\">else</span> {\n        cloneTarget[symKey] = target[symKey];\n      }\n    })\n  }\n\n  <span class=\"hljs-keyword\">for</span> (<span class=\"hljs-keyword\">const</span> i <span class=\"hljs-keyword\">in</span> target) {\n    <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-built_in\">Object</span>.prototype.hasOwnProperty.call(target, i)) {\n      cloneTarget[i] =\n        <span class=\"hljs-keyword\">typeof</span> target[i] === <span class=\"hljs-string\">&#x27;object&#x27;</span> &amp;&amp; target[i] !== <span class=\"hljs-literal\">null</span>\n        ? cloneDeep1(target[i], hash)\n        : target[i];\n    }\n  }\n  <span class=\"hljs-keyword\">return</span> cloneTarget;\n}\n\n</code></pre>\n<p>5、</p>\n<pre><code><span class=\"hljs-keyword\">function</span> <span class=\"hljs-keyword\">new</span><span class=\"hljs-constructor\">ArrFn(<span class=\"hljs-params\">arr</span>, <span class=\"hljs-params\">rootValue</span> = 0)</span> {\n    return arr.reduce((acc, cur) =&gt; {\n      <span class=\"hljs-keyword\">if</span> (cur.p_id<span class=\"hljs-operator\"> === </span>rootValue) {\n        const children = <span class=\"hljs-keyword\">new</span><span class=\"hljs-constructor\">ArrFn(<span class=\"hljs-params\">arr</span>, <span class=\"hljs-params\">cur</span>.<span class=\"hljs-params\">id</span>)</span>\n        <span class=\"hljs-keyword\">if</span> (children.length) {\n            cur.children = children\n        }\n        acc.push(cur) <span class=\"hljs-comment\">// 返回值 新数组的长度</span>\n      }\n      return acc\n    }, <span class=\"hljs-literal\">[]</span>)\n}\nconsole.log(<span class=\"hljs-keyword\">new</span><span class=\"hljs-constructor\">ArrFn(<span class=\"hljs-params\">arr</span>)</span>)\n\n\n</code></pre>\n<p>6、</p>\n<pre><code><span class=\"hljs-keyword\">function</span> <span class=\"hljs-keyword\">new</span><span class=\"hljs-constructor\">ArrFn(<span class=\"hljs-params\">arr</span>)</span> {\n    return arr.reduce((acc, cur) =&gt; acc.concat(<span class=\"hljs-module-access\"><span class=\"hljs-module\"><span class=\"hljs-identifier\">Array</span>.</span></span>is<span class=\"hljs-constructor\">Array(<span class=\"hljs-params\">cur</span>)</span> ? <span class=\"hljs-keyword\">new</span><span class=\"hljs-constructor\">ArrFn(<span class=\"hljs-params\">cur</span>)</span> : cur), <span class=\"hljs-literal\">[]</span>)\n}\n\n</code></pre>\n<p>7、</p>\n<pre><code><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">add</span><span class=\"hljs-params\">()</span> </span>{\n  <span class=\"hljs-keyword\">const</span> _args = [...arguments];\n  <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">fn</span><span class=\"hljs-params\">()</span> </span>{\n    _args.push(...arguments);\n    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-function\"><span class=\"hljs-keyword\">fn</span></span>;\n  }\n  fn.toString = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span><span class=\"hljs-params\">()</span> </span>{\n    <span class=\"hljs-keyword\">return</span> _args.reduce((sum, cur) =&gt; sum + cur);\n  }\n  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-function\"><span class=\"hljs-keyword\">fn</span></span>;\n}\n\n\n</code></pre>\n<p>8、内容太多，就不展开写了</p>\n<p>9、</p>\n<pre><code><span class=\"hljs-built_in\">Promise</span>.myAll = function (promiseArr) {\n  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Promise</span>(<span class=\"hljs-function\"><span class=\"hljs-params\">(resolve, reject)</span> =&gt;</span> {\n    const ans = []\n    let index = <span class=\"hljs-number\">0</span>\n    <span class=\"hljs-keyword\">for</span> (let i = <span class=\"hljs-number\">0</span>; i &lt; promiseArr.length; i++) {\n      promiseArr[i].<span class=\"hljs-keyword\">then</span>(<span class=\"hljs-function\"><span class=\"hljs-params\">(res)</span> =&gt;</span> {\n        ans[i] = res\n        index++\n        <span class=\"hljs-keyword\">if</span> (index === promiseArr.length) {\n          resolve(ans)\n        }\n      }).<span class=\"hljs-keyword\">catch</span>(<span class=\"hljs-function\"><span class=\"hljs-params\">(err)</span> =&gt;</span> reject(err))\n    }\n  })\n}\n<span class=\"hljs-built_in\">Promise</span>.myAll([p1, p2]).<span class=\"hljs-keyword\">then</span>(<span class=\"hljs-function\"><span class=\"hljs-params\">(res)</span> =&gt;</span> {\n  <span class=\"hljs-built_in\">console</span>.log(res)\n})\n\n\n</code></pre>\n<p>10、</p>\n<pre><code><span class=\"hljs-built_in\">Promise</span>.myRace = function (promiseArr) {\n  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Promise</span>(<span class=\"hljs-function\"><span class=\"hljs-params\">(resolve, reject)</span> =&gt;</span> {\n    promiseArr.forEach(<span class=\"hljs-function\"><span class=\"hljs-params\">(p)</span> =&gt;</span> {\n      <span class=\"hljs-regexp\">//</span> 如果不是<span class=\"hljs-built_in\">Promise</span>实例需要转化为<span class=\"hljs-built_in\">Promise</span>实例\n      <span class=\"hljs-built_in\">Promise</span>.resolve(p).<span class=\"hljs-keyword\">then</span>(\n        <span class=\"hljs-function\"><span class=\"hljs-params\">(val)</span> =&gt;</span> resolve(val),\n        <span class=\"hljs-function\"><span class=\"hljs-params\">(err)</span> =&gt;</span> reject(err)\n      )\n    })\n  })\n}\n<span class=\"hljs-built_in\">Promise</span>.myRace([p1, p2]).<span class=\"hljs-keyword\">then</span>(<span class=\"hljs-function\"><span class=\"hljs-params\">(res)</span> =&gt;</span> {\n  <span class=\"hljs-built_in\">console</span>.log(res)\n})\n<span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">111</span>)\n\n\n</code></pre>\n",
      // "answer": "<p>！Important&gt;行内样式&gt;ID选择器&gt;类选择器&gt;标签&gt;通配符&gt;继承&gt;浏览器默认属性</p>\n\n<p><strong><strong>权重</strong></strong></p>\n\n<p>CSS权重是由四个数值决定，4个等级的定义如下：</p>\n\n<p>第一等：内联样式，如：style=&quot;color:red;&quot;，权值为1000.（该方法会造成css难以管理， 所以不推荐使用）</p>\n\n<p>第二等：ID选择器，如：#header，权值为0100</p>\n\n<p>第三等：类、伪类、属性选择器如：.bar， 权值为0010</p>\n\n<p>第四等：标签、伪元素选择器，如：div ::first-line 权值为0001</p>\n\n<p>最后把这些值加起来，再就是当前元素的权重了</p>\n\n<p><strong><strong>其他：</strong></strong></p>\n\n<p>无条件优先的属性只需要在属性后面使用!important。它会覆盖页面内任何位置定义的元素样式。（ie6支持上有些bug）</p>\n\n<p>通配符，子选择器，相邻选择器等。如*，&gt;,+, 权值为0000.</p>\n\n<p>继承的样式没有权值</p>\n\n<p><strong><strong>CSS权重计算方式</strong></strong></p>\n\n<p>计算选择符中的ID选择器的数量（=a）</p>\n\n<p>计算选择符中类、属性和伪类选择器的数量（=b）</p>\n\n<p>计算选择符中标签和伪元素选择器的数量（=c）</p>\n\n<p>忽略全局选择器</p>\n\n<p>在分别计算a、b、c的值后，按顺序连接abc三个数字组成一个新的数字，改值即为所计算的选择符的权重。如果两个选择符的计算权重值相同，则采取&ldquo;就近原则&rdquo;。</p>\n\n<p>示例：</p>\n\n<p>div#app.child[name=&quot;appName&quot;] /a=1,b=2,c=1 &mdash;&gt;权重 = 1 + 100 + 10 +10 = 121/</p>",
      "difficulty": 1,
      "stage": ["HTML5"],
      "collectFlag": 0,
      "likeFlag": 0,
      "likeCount": "11",
      "views": "160",
      "createdAt": "2021-05-05",
      "creatorName": "4147",
      "creatorAvatar": "http://teachoss.itheima.net/heimaQuestionMiniapp/%E5%AE%98%E6%96%B9%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F%402x.png"
    }


    let { collectFlag, likeFlag } = item
    return (
      <View className='index'>
        <IconText title='题目：' />
        <View className='des-content'>{item.stem}</View>

        <View className='detail-item__tag-wrapper'>
          <View className={`detail-item__tag ${handleTag(item.difficulty).className}`}>
            {handleTag(item.difficulty).des}
          </View>
          {item.stage && item.stage.map((i, index) => (
            <View className={`detail-item__tag ${handleTag(2).className}`} key={index}>
              {i}
            </View>
          ))}
        </View>

        <HorizonLine />
        <IconText title='答案：' />
        <View className='detail-content'>
          {/* <RichText className='taro_html rich-text' nodes={item.answer} /> */}
          {item.answer && item.answer.indexOf('<code>') > -1
            ? <RichText className='taro_html rich-text' nodes={replaceCode(item.answer)} />
            : <RichText className='taro_html rich-text' nodes={item.answer} />
          }
          <View className='detail-feedback' onClick={() => this.handleFeedback(item.id)}>
            <Image className='detail-feedback-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/feedback/feed-icon.png' />
            有问题？点我反馈
          </View>
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
