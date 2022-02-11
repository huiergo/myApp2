const questionState = {
  type1: {
    list: [
      {
        title: '全部1',
      },
      {
        title: '全部2',
      },
    ],
    page: 1,
    init: false,
  },
  type2: {
    list: [
      {
        title: 'JS1',
      },
      {
        title: 'JS2',
      },
    ],
    page: 2,
    init: true,
  },
};
export default function question(preState = questionState, action) {
  const type = action.identityId;
  switch (type) {
    case 'getInitList':
      preState[type] = {
        list: action.list,
        page: 1,
        init: true,
      };
      return {
        ...preState,
      };
    case 'appendList':
      preState[type] = {
        list: preState[type].list.concat(action.list),
        page: action.page,
        init: true,
      };
      return {
        ...preState,
      };
    default:
      return {
        ...preState,
      };
  }
}
