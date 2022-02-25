import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Topic from '../../components/topic'
import * as oneActions from "../../actions/one.action"

class One extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
  }

  handleChangeTab(value) {
    this.props.changeTab(value)
  }

  render() {
    const {
      tabList,
      currentIdx,
    } = this.props
    return (
      <View className='index'>
        <AtTabs
          current={currentIdx}
          tabList={tabList}
          onClick={this.handleChangeTab.bind(this)}
        >
          {
            this.props.tabList.map((item, idx) => {
              return (
                <AtTabsPane key={idx} current={currentIdx} index={idx} >
                  index-{item.title} - {idx}
                  <Topic />
                </AtTabsPane>
              )
            })
          }
        </AtTabs>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('one=====', state)
  const { tabList, currentIdx } = state.one
  return {
    tabList,
    currentIdx,
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(oneActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(One);
