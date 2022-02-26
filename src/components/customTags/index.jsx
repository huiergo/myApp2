import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
import { AtTag } from 'taro-ui'

class CustomTags extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("[componentDidMount]", this.props.list)
  }

  onClick(index) {
    this.props.updateTagList({ type: this.props.type, index })
  }
  render() {
    const { list } = this.props
    return (
      <View className='container'>
        {
          list.map((item, index) => {
            return (
              <AtTag
                key={index}
                name='tag-1'
                type='primary'
                circle={false}
                active={item.active}
                onClick={() => { this.onClick(index) }}
              >
                {item.canSort ? item.specialStatus : ''}
                {item.name}
              </AtTag>
            )
          })
        }
      </View>
    )
  }
}

export default CustomTags