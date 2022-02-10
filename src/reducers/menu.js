const menuState = {
  menuList: [
    {
      type: 'all',
      title: '全部',
      result: [
        {
          title: '全部1',
        },
        {
          title: '全部2',
        },
      ],
    },
    {
      type: 'JavaScript',
      title: 'JavaScript',
      result: [
        {
          title: 'JavaScript1',
        },
        {
          title: 'JavaScript2',
        },
      ],
    },
    { type: 'React', title: 'React' },
    { type: 'Vue', title: 'Vue' },
    { type: 'mobile', title: '移动端布局' },
    { type: 'css', title: 'CSS' },
    { type: 'JavaScript1', title: 'JavaScript' },
    { type: 'React1', title: 'React' },
    { type: 'Vue1', title: 'Vue' },
    { type: 'css1', title: 'CSS1' },
  ],
  currentMenu: { type: 'all', title: '全部' },
};

export default function menu(preState = menuState, action) {
  switch (action.type) {
    case 'changeMenu':
      return {
        ...preState,
        currentMenu: action.currentMenu,
      };
    default:
      return {
        ...preState,
      };
  }
}
