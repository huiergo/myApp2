import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from "react-redux";
import Taro, { eventCenter } from '@tarojs/taro';
import { View } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '../../global_data'
import DSortItem from '../DSortItem'
import './index.css'

let upArrow = null
class DSortRadio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      optionsList: [
        { name: '默认', id: '0', upArrow: '0', selected: true },
        { name: '难易', id: '1', upArrow: '0' },
        { name: '浏览量', id: '2', upArrow: '0' }
      ],
    }
  }

  componentDidMount() {
    eventCenter.on('event_update_sort_view', () => {
      let array = getGlobalData('filter_data')
      let activeObj = array[this.props.activeIdx]
      setGlobalData('sort_radio_select', {
        option: {
          name: '默认',
          id: activeObj.selectType,
          upArrow: activeObj.sortType
        },
        index: this.props.activeIdx
      })

      let tempList = this.state.optionsList.map((item, idx) => {
        if (item.id === activeObj.selectType) {
          item.selected = true
          item.upArrow = activeObj.sortType
        } else {
          item.selected = false
          item.upArrow = '0'
        }
        return item
      })
      this.setState({
        optionsList: tempList
      })
    })

    eventCenter.on('event_reset_sort', () => {
      setGlobalData('sort_radio_select', {
        option: {
          name: '默认',
          id: '0',
          upArrow: '0'
        },
        index: 0
      })

      let tempList = this.state.optionsList.map((item, idx) => {
        if (item.id === '0') {
          item.selected = true
          item.upArrow = '0'
        } else {
          item.selected = false
          item.upArrow = '0'
        }
        return item
      })

      this.setState({
        optionsList: tempList
      })
    })
  }

  componentWillUnmount() {
    eventCenter.off('event_update_sort_view')
    eventCenter.off('event_reset_sort')
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
    this.writeToGlobal(option, index)
  }

  writeToGlobal(option, index) {
    setGlobalData('sort_radio_select', {
      option: {
        ...option,
        upArrow: upArrow == true ? '0' : '1'
      }, index
    })
  }

  onStatus(idx) {
    let tempList = this.state.optionsList.map((item, index) => {
      if (index === idx) {
        item.upArrow = item.upArrow == '0' ? '1' : '0'
        upArrow = item.upArrow == '0' ? '1' : '0'
      }
      return item
    })
    this.setState({
      optionsList: tempList
    })
  }

  render() {
    const { customStyle, className } = this.props
    return (
      <View className={classNames('cu-radio', className)} style={customStyle}>
        {this.state.optionsList.map((option, index) => (
          <View
            key={option.id}
            className={classNames({ 'cu-radio__title cu-sort__title': true, 'cu-radio__title--checked': option.selected })}
            onClick={() => this.handleClick(option, index)}
          >
            <DSortItem name={option.name} index={index} selected={option.selected} upArrow={option.upArrow} onStatus={this.onStatus.bind(this)} />
          </View>
        ))}
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  let { activeIdx } = state.first
  return {
    activeIdx,
  }
};
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DSortRadio);
