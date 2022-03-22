import { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { eventCenter } from '@tarojs/taro';
import CustomModel from '../../../components/customModel'
import DPureRadio from '../../../components/DPureRadio'
import DSortRadio from '../../../components/DSortRadio'
import * as firstActions from '../first.action'
import './index.css'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReset: false
    }
  }

  reset() {
    // 重置应该  不需要跟外界  交互
    this.setState({
      isReset: true
    })

    eventCenter.trigger('event_reset_sort')
    eventCenter.trigger('event_reset_pure')
  }



  complete() {
    // // 消息通知首页刷新
    eventCenter.trigger('event_filter_complete')
  }
  render() {
    return (
      <CustomModel
        className='custom-model-layout'
        isOpened={this.props.filterOpen}
        title='重置'
        closeText='完成'
        onReset={() => this.reset()}
        onClose={() => this.complete()}
        onHideModel={() => this.props.hideModel()}
      >
        <View className='panel__content no-padding'>
          <View className='custom__tag-title'>题目排序</View>
          <View className='radio-container'>
            <DSortRadio isReset={this.state.isReset} />
          </View>

          <View className='custom__tag-title'>选择阶段</View>
          <View className='radio-container'>
            <DPureRadio tabList={this.props.tabList} isReset={this.state.isReset} />
          </View>

        </View>

      </CustomModel>
    )
  }
}

const mapStateToProps = (state) => {
  let { tabList } = state.first
  return {
    tabList
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(firstActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
