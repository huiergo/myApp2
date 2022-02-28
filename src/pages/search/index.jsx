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

    this.props.inputTrigger(value)
  }

  render() {
    const { list, page, initSearchData, loadSearchMore, unShiftRecord, editTrigger, hasInput } = this.props
    return (
      <View className='index'>
        <AtSearchBar
          placeholder='请输入搜索关键词'
          value={this.state.value}
          onChange={(value) => this.onChange(value)}
          onFocus={() => editTrigger(false)}
          onActionClick={() => {
            // 搜索关键词请求
            initSearchData({ keyword: this.state.value, page: 1 })
            // 
            unShiftRecord({ item: this.state.value })
          }}
        />
        {!hasInput && <SearchRecord onChange={(value) => this.onChange(value)} />}
        {hasInput && <SearchList
          list={list}
          page={page}
          initData={initSearchData}
          loadMore={loadSearchMore}
        />}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { list, isEdit, page, hasInput } = state.search
  console.log("[search ...]", state.search)

  return {
    list,
    page,
    isEdit,
    hasInput
  }
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
