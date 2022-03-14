import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro';
import { getJSON } from '../../../services/method';
import apis from '../../../services/apis'

let timer = null
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [{
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      }, {
        stem: '列表1'
      }, {
        stem: '列表2'
      }, {
        stem: '列表3'
      },],
      page: 0,
      pageTotal: ''
    }
  }

  async componentDidMount() {
    await this.initData()
  }
  componentWillReceiveProps(prev, next) {
    console.log('[componentWillReceiveProps---]', prev, next)

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
    let fn = debounce(async () => {
      // todo: 等待传递 写死 questionBankType=9
      let { pageTotal, rows: list } = await getJSON({
        url: apis.getQuestionList,
        data: { page: 1, keyword: this.props.keyword, questionBankType: 9 },
      });
      console.log(' componentWillReceiveProps  请求数据---', list)
      this.setState({
        pageTotal,
        list
      })
    }, 1000)
    fn()
  }

  async initData() {
    // todo: 等待传递 写死 questionBankType=9

    let { pageTotal, rows: list } = await getJSON({
      url: apis.getQuestionList,
      data: { page: 1, keyword: this.props.keyword, questionBankType: 9 },
    });
    console.log(' componentWillReceiveProps  初始化请求---', list)

    console.log('拼接数组----', this.state.list.concat(list))

    this.setState({
      pageTotal,
      list
    })

  }

  async loadmore() {
    // let {page,pageTotal}=this.state
    if ((this.state.page + 1) <= this.state.pageTotal) {
      let { pageTotal, rows: list } = await getJSON({
        url: apis.getQuestionList,
        data: { page: 1, keyword: this.props.keyword, questionBankType: 9 },
      });
      console.log('拼接数组----', this.state.list.concat(list))
      this.setState({
        pageTotal,
        list: this.state.list.concat(list)
      })
    }
  }

  render() {
    return (
      <View className='index'>
        {this.state.list.map((item, index) => {
          return <View>{item.stem}</View>
        })}
      </View>
    )
  }
}

export default Search
