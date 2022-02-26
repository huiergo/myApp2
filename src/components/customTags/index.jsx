import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtTag } from 'taro-ui'

class CustomTags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.list
    }
  }

  componentDidMount() {
    console.log("[componentDidMount]", this.state.list)
  }

  onClick(index) {
    this.props.updateTagList({ type:this.props.type, index })
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
// const mapStateToProps = (state) => {
 
//   return {
  
//   }
// };
// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators(experienceActions, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Experience);
