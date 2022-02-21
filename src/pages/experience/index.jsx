import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { tabShow } from "../../actions/common"
import QuestionItem from '../../components/questionItem'
import InterviewItem from '../../components/interviewItem'


@connect((store) => ({ ...store, tabList: store.home.list }), (dispatch) => ({
  tabShow(params) {
    dispatch(tabShow(params))
  }
}))

class Experience extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() {
    tabShow('experience')
  }

  componentDidHide() { }

  render() {
    return (
      <View className='experience-page'>
        <QuestionItem />
        <InterviewItem />
      </View>
    )
  }
}
export default Experience


