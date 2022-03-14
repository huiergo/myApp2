import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View, Image } from '@tarojs/components'


export default class SortItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true
    }
  }

  handleSortFlag() {
    let flag = this.state.flag
    if (this.props.isSelf) {
      this.props.onStatus(!flag)
      this.setState({
        flag: !flag
      })
    } else {
      this.props.onStatus(flag)
      this.setState({
        flag: flag
      })
    }

  }
  render() {
    return (
      <View onClick={() => this.handleSortFlag()}>
        <Text >{this.props.name} </Text>
        {
          this.props.name == '默认' ? '' : (this.props.isSelf ? (this.state.flag ? <Image className='filter-sort-arrow' src={require('../../../assets/other_icons/up_arrow_icon.png')} /> : <Image className='filter-sort-arrow' src={require('../../../assets/other_icons/down_arrow_icon.png')} />) : <Image className='filter-sort-arrow' src={require('../../../assets/other_icons/up_arrow_icon.png')} />)
        }
      </View>
    )
  }
}