export default defineAppConfig({
  pages: [
    'pages/first-past/index',
    'pages/experience/index',
    'pages/favorite/index',
    'pages/mine/index',
  ],
  subPackages: [
    {
      root: 'sub/',
      pages: [
        'search/index',
        'sub_detail_interview/index',
        'sub_detail_question/index',
        'sub_history/index',
        'sub_zan/index',
        'sub_aboutUs/index',
      ],
    },
  ],
  tabBar: {
    list: [
      {
        iconPath: 'assets/bottom_tabs_icons/first.png',
        selectedIconPath: 'assets/bottom_tabs_icons/first_select.png',
        pagePath: 'pages/first-past/index',
        text: '首页',
        selectedColor: '#3C3E42',
      },
      {
        iconPath: 'assets/bottom_tabs_icons/experience.png',
        selectedIconPath: 'assets/bottom_tabs_icons/experience_select.png',
        pagePath: 'pages/experience/index',
        text: '面经',
      },
      {
        iconPath: 'assets/bottom_tabs_icons/favorite.png',
        selectedIconPath: 'assets/bottom_tabs_icons/favorite_select.png',
        pagePath: 'pages/favorite/index',
        text: '收藏',
      },
      {
        iconPath: 'assets/bottom_tabs_icons/mine.png',
        selectedIconPath: 'assets/bottom_tabs_icons/mine_select.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
    color: '#999',
    selectedColor: '#3C3E42',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
