import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './index.css'

export default class DPureRadio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      optionsList: [{
        "id": 18,
        "name": "HTML5",
        selected: true
      }, {
        "id": 19,
        "name": "CSS3",
        selected: false

      }, {
        "id": 20,
        "name": "移动端布局"
      }, {
        "id": 21,
        "name": "JavaScript"
      }, {
        "id": 22,
        "name": "jQuery"
      },]
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
    console.log('xxx----', this.state.optionsList)
    this.setState({
      optionsList: this.state.optionsList
    })
    this.props.onAcceptPureSelect(option)
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
