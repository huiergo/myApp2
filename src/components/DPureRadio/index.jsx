import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';

import './index.css'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'

export default class DPureRadio extends Component {

  constructor(props) {
    super(props)

    // todo  : optionsList 替换成  this.props.tabList
    this.state = {
      optionsList: []
    }
  }

  componentDidMount() {

    eventCenter.on('event_reset_pure', () => {
      //  触发 sortRadio 刷新，数据取自 globalData
      this.resetToHandleClick()
    })
  }

  componentWillReceiveProps(next) {
    if (next.tabList) {
      this.setState({
        optionsList: next.tabList
      })
    }
  }


  componentWillUnmount() {
    eventCenter.off('event_reset_pure')
  }

  handleClick(option, index) {
    let optionsList = this.state.optionsList

    optionsList.map((item, idx) => {
      if (idx === index) {
        optionsList[idx].selected = true
      } else {
        optionsList[idx].selected = false
      }
    })
    this.setState({
      optionsList: this.state.optionsList
    })
    // 存到全局变量里面
    setGlobalData('pure_radio_select', {
      option, index
    })
  }

  resetToHandleClick() {
    let resetIndex = 0
    let optionsList = this.state.optionsList

    optionsList.map((item, idx) => {
      if (idx === resetIndex) {
        optionsList[idx].selected = true
      } else {
        optionsList[idx].selected = false
      }
    })

    this.setState({
      optionsList: optionsList
    })
    // 存到全局变量里面
    setGlobalData('pure_radio_select', {
      option: optionsList[resetIndex],
      index: resetIndex
    })

  }



  render() {
    const { customStyle, className, id } = this.props
    return (
      <View className={classNames('cu-radio', className)} style={customStyle}>
        {this.state.optionsList.map((option, index) => (
          <View
            key={option.id}
            className={classNames({ 'cu-radio__title': true, 'cu-radio__title--checked': option.selected })}
            onClick={() => this.handleClick(option, index)}
          >{option.name}</View>
        ))}
      </View>
    )
  }
}
