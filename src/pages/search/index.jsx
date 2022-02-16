import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtSearchBar } from 'taro-ui'
import SearchResult from '../../components/searchResult'
import SearchRecord from '../../components/searchRecord'

@connect((store) => ({ ...store, recordList: store.search.recordList }), (dispatch) => ({

}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasInput: false
    }
  }
  render() {
    const { hasInput } = this.state
    const showRecordList = this.props.recordList && this.props.recordList.length > 0
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.value}
        />
        {!hasInput && showRecordList && <SearchRecord />}
        {hasInput && <SearchResult />}
      </View>
    )
  }
}
export default Index

