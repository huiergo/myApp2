import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'
import QuestionItem from '../../../components/questionItem'
import InterviewItem from '../../../components/interviewItem'

import './index.css'
import { SEARCH_CLICK, LOADING_DESC } from '../../../utils/constant'

let timer = null

const renderQuestionList = (list) => {
  return list.map((item, index) => {
    return <QuestionItem item={item} key={index} />
  })
}

const renderInterviewList = (list) => {
  return list.map((item, index) => {
    return <InterviewItem item={item} key={index} />
  })
}
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      page: 0,
      pageTotal: '',

    }
  }

  async componentDidMount() {
    await this.initData()
  }

  componentWillReceiveProps(prev, next) {
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
      pageTotal,
      list
    })
    if (this.props.searchAction === SEARCH_CLICK) {
      Taro.hideLoading()
    }
  }

  // async loadmore() {
  //   // let {page,pageTotal}=this.state
  //   if ((this.state.page + 1) <= this.state.pageTotal) {
  //     let { pageTotal, rows: list } = await getJSON({
  //       url: apis.getQuestionList,
  //       data: { page: 1, keyword: this.props.keyword, questionBankType: 9 },
  //     });
  //     console.log('拼接数组----', this.state.list.concat(list))
  //     this.setState({
  //       pageTotal,
  //       list: this.state.list.concat(list)
  //     })
  //   }
  // }

  render() {
    const { scrollHeight } = this.props
    return (
      <View className='search-scroll' style={{ height: scrollHeight }}>
        {
          this.props.fromType == 'experience'
            ? renderInterviewList(this.state.list) :
            renderQuestionList(this.state.list)
        }

      </View>
    )
  }
}

export default Search
