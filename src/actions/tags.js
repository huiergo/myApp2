// 重置标签
export function resetTags() {
  console.log('reset tags action触发了111');
  return {
    type: 'reset',
  };
}

// 更新 tags
export function updateTags(type, list) {
  console.log('reset tags action触发了333');

  return {
    type: 'updateSort',
    tagType: type,
    list: list,
  };
}
