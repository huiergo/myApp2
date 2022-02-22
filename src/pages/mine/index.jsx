import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import * as mineActions from "../../actions/mine.action";


class Mine extends Component {
  constructor(props) {
    super(props)
    console.log("111111========", props)
  }
  componentDidMount() {
    console.log("[mine props=====]", this.props)
    const { loadUserInfo } = this.props;
    loadUserInfo();
    console.log("[after props=====]", this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log("will receive=====", this.props, nextProps)

  }
  componentDidUpdate() {
    console.log("will receive2222=====", this.props)

  }

  // changeProductNumber(cid, event) {
  //   const { changeServiceProductNumber } = this.props;
  //   // 获取商品的最新数量
  //   const count = event.target.value;
  //   // 向服务器端发送请求 告诉服务器端我们要将哪一个商品的数量更改成什么
  //   changeServiceProductNumber({ cid, count });
  // }
  render() {
    // const { userInfo } = this.props;
    console.log("[xxxxxxxxx=======]", this.props)
    return (
      <View>
        hahah
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps====", state)
  return {
    userInfo: state.userInfo,
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(mineActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
