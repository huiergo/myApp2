import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'

export default class Tags extends Component {
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
    let list2 = list.map((item, i) => {
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
    console.log("list2---", list2)
    this.setState({
      list: list2
    })
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
