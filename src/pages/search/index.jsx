import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "../../actions/search.action";
import SearchRecord from '../../components/searchRecord'
import SearchList from '../../components/searchList'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  onChange(value) {
    this.setState({
      value: value
    })
  }

  render() {
    const { initSearchData, loadSearchMore } = this.props
    return (
      <View className='index'>
        搜索框
        <AtSearchBar
          placeholder='请输入搜索关键词'
          value={this.state.value}
          onChange={(value) => this.onChange(value)}
          onActionClick={() => console.log("开始搜索...key:", this.state.value)}
        />
        <SearchRecord />
        <SearchList
          list
          page
          initData={initSearchData}
          loadMore={loadSearchMore}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { recordList, isEdit } = state.search
  return {
    recordList,
    isEdit
  }
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
