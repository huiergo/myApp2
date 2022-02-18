import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { connect } from 'react-redux'
import { updateTags } from '../../actions/tags'

@connect((store) => (store), (dispatch) => ({
  updateTags(params) {
    dispatch(updateTags(params))
  }
}))
class Tags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.list
    }
  }

  componentDidMount() {
    console.log("[componentDidMount]", this.state.list)
  }

  onClick(item, index) {
    let { list } = this.state
    let tempList = list.map((item, i) => {
      if (!item.special) {
        i == index ? item.active = true : item.active = false;
      } else {
        i == index ? item.active = true : item.active = false;
        if (i == index && item.specialStatus == 0) {
          console.log("if", i)
          item.specialStatus = 1
        } else {
          console.log("else", i)
          item.specialStatus = 0
        }
      }
      return item

    })
    this.setState({
      list: tempList
    })
    if (this.props.type === 'sort') {
      updateTags('sort', tempList)
    }
    if (this.props.type === 'cata') {
      updateTags('cata', tempList)
    }
  }
  render() {
    return (
      <View className='container'>
        {
          this.state.list.map((item, index) => {
            return (
              <AtTag
                key={index}
                name='tag-1'
                type='primary'
                circle={false}
                active={item.active}
                onClick={() => { this.onClick(item, index) }}
              >
                {item.special ? item.specialStatus : ''}
                {item.name}
              </AtTag>
            )
          })
        }
      </View>
    )
  }
}

export default Tags