import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import Taro from '@tarojs/taro';
import './index.css'

const setStorage = (key, data) => {
  Taro.setStorage({
    key,
    data
  })
}

class Search extends Component {
  constructor(props) {
    super(props)
    this.props.onRef(this)
    this.state = {
      list: [],
      isEditAll: false
    }
  }

  componentDidMount() {
    let tempList = Taro.getStorageSync('record_list');
    this.setState({
      list: tempList || [],
      isEditAll: false
    })
  }

  componentDidShow() {

  }

  addValue(v) {
    console.log('----', v)
    this.onAdd(v)
  }

  searchValue(v) {
    this.onAdd(v)
    setStorage('record_list', [...this.state.list]);
  }

  // 当搜索完成时候，调用此方法
  onAdd(v) {
    let index = this.state.list.indexOf(v);
    if (index > -1) {
      this.state.list.splice(index, 1);
    }
    this.state.list.unshift(v)

    this.setState({
      list: [...this.state.list]
    })

  }

  // 单个删除按钮
  onDeleteItem(index) {
    this.state.list.splice(index, 1)
    this.setState({
      list: [...this.state.list]
    })
    setStorage('record_list', [...this.state.list]);

  }

  // 删除全部
  onDeleteAll() {
    this.setState({
      list: []
    })
    setStorage('record_list', []);

  }

  onEditTrigger(editFlag) {
    this.setState({
      isEditAll: editFlag
    })
  }

  render() {
    const { isEditAll, list } = this.state
    return (

      <View className='search-record'>
        <View className='search-record-top'>
          <View className='search-record-left'>
            搜索记录
          </View>
          <View className='search-record-right'>
            {!isEditAll &&
              <Image className='trash-icon'
                src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/trash.png'
                onClick={() => this.onEditTrigger(true)}
              />
            }
            {isEditAll && (<View className='edit-group'>
              <Text className='edit-delete-all'
                onClick={() => this.onDeleteAll()}
              >全部删除</Text>
              <Text className='edit-split'> | </Text>
              <Text className='edit-complete'
                onClick={() => this.onEditTrigger(false)}
              >完成</Text>
            </View>)}
          </View>
        </View>

        {list.map((item, index) => (
          <AtTag className='tag-search' key={index} type='primary' circle>
            <Text
              onClick={() => {
                this.onAdd(item)
              }}
            >{item}</Text>
            {isEditAll ?
              <Image
                className='edit-item-delete-icon'
                src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/delete.png'
                onClick={() => this.onDeleteItem(index)}
              />
              : null}
          </AtTag>))
        }
      </View>
    )
  }
}

export default Search
