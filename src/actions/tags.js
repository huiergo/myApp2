// 重置标签
export function resetTags() {
  return (dispatch) => {
    dispatch({
      type: 'reset',
    });
  };
}

// 更新 tags
export function updateTags(type, list) {
  return (dispatch) => {
    dispatch({
      type: 'updateSort',
      tagType: type,
      list: list,
    });
  };
}
