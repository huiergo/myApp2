import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'
// 写死，这里需要判断 当前是首页还是面经页面的tab ，然后渲染的  QuestionItem or InterviewItem
import QuestionItem from '../../../components/questionItem'
import './index.css'
import { SEARCH_CLICK, LOADING_DESC } from '../../../utils/constant'

let timer = null
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
    // todo: 等待传递 写死 questionBankType=9
    if (this.props.searchAction === SEARCH_CLICK) {
      Taro.showLoading({
        title: LOADING_DESC
      })
    }
    let { pageTotal, rows: list } = await getJSON({
      url: apis.getQuestionList,
      data: { page: 1, keyword: this.props.keyword, questionBankType: 9, pageSize: 30 },
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
        {this.state.list.map((item, index) => {
          return <QuestionItem item={item} key={index} />
        })}
      </View>
    )
  }
}

export default Search
