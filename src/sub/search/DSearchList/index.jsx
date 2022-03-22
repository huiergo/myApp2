import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'
import QuestionItem from '../../../components/questionItem'
import InterviewItem from '../../../components/interviewItem'

import './index.css'
import { SEARCH_CLICK, LOADING_DESC } from '../../../utils/constant'

let timer = null

const renderQuestionList = (list, isLoad) => {
  if (list && list.length > 0) {
    return list.map((item, index) => {
      return <QuestionItem item={item} key={index} />
    })
  } else {
    return isLoad && (<View className='blank_page'>
      {/* 内容展示区 */}
      <View className='blank-content'>
        <Image className='blank-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/blank.png' />
        <View className='blank-des'>暂无记录</View>
      </View>
    </View>)

  }
}

const renderInterviewList = (list, isLoad) => {
  if (list && list.length > 0) {
    return list.map((item, index) => {
      return <InterviewItem item={item} key={index} />
    })
  } else {
    return isLoad && (<View className='blank_page'>
      {/* 内容展示区 */}
      <View className='blank-content'>
        <Image className='blank-img' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/login_share_icons/blank.png' />
        <View className='blank-des'>暂无记录</View>
      </View>
    </View>)
  }

}
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      page: 0,
      pageTotal: '',
      isLoad: false
    }

  }

  async componentDidMount() {
    await this.initData()
  }

  componentWillReceiveProps(prev, next) {
    this.setState({
      isLoad: false
    })
    const debounce = (fn, delay = 300) => {
      return function () {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {

          fn.apply(this, args);
        }, delay);
      };
    }
    let fn = debounce(() => {
      this.initData()
    }, 1000)
    fn()
  }

  async initData() {
    if (this.props.searchAction === SEARCH_CLICK) {
      Taro.showLoading({
        title: LOADING_DESC
      })
    }
    let type = this.props.fromType == 'experience' ? 9 : 10
    let { pageTotal, rows: list } = await getJSON({
      url: apis.getQuestionList,
      data: { page: 1, keyword: this.props.keyword, questionBankType: type, pageSize: 30 },
    });


    this.setState({
      isLoad: true,
      pageTotal,
      list
    })
    if (this.props.searchAction === SEARCH_CLICK) {
      Taro.hideLoading()
    }
  }

  render() {
    const { scrollHeight } = this.props
    return (
      <View className='search-scroll' style={{ height: scrollHeight }}>
        {
          this.props.fromType == 'experience'
            ? renderInterviewList(this.state.list, this.state.isLoad) :
            renderQuestionList(this.state.list, this.state.isLoad)
        }

      </View>
    )
  }
}

export default Search
