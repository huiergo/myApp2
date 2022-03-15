import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import DSortItem from '../DSortItem'
import './index.css'

let upArrow = null
export default class DPureRadio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // 
      optionsList: [
        { name: '默认', id: '0', upArrow: '0' },
        { name: '难易', id: '1', upArrow: '0' },
        { name: '浏览量', id: '2', upArrow: '0' },]
    }
  }

  componentWillReceiveProps(next) {
    console.log('next---', next)
    if (next.isReset) {
      let optionsList = this.state.optionsList
      optionsList.map((item, idx) => {
        optionsList[idx].selected = false
      })
      this.setState({
        optionsList: this.state.optionsList
      })
    }
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
    this.writeToGlobal(option, index)
  }

  writeToGlobal(option, index) {
    console.log('writeToGlobal sort----', option, 'index---', index)
    setGlobalData('sort_radio_select', {
      option: {
        ...option,
        upArrow: upArrow == true ? '0' : '1'
      }, index
    })
  }

  onStatus(v) {
    upArrow = v
    console.log('sort status---', v)
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
          >
            <DSortItem name={option.name} selected={option.selected} onStatus={this.onStatus.bind(this)} />
          </View>
        ))}
      </View>



      // <View className={classNames('cu-radio', className)} style={customStyle}>
      // {options.map(option => (
      //   <View
      //     key={option.id}
      //     className={classNames({ 'cu-radio__title cu-sort-radio__title': true, 'cu-radio__title--checked  cu-sort-radio__title--checked': id === option.id })}
      //     onClick={this.handleClick.bind(this, option)}
      //   >
      //     <SortItem name={option.name} isSelf={id === option.id} onStatus={this.onStatus.bind(this)} />
      //   </View>
      // ))}
      // </View>
    )
  }
}
