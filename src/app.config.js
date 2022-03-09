export default defineAppConfig({
  pages: [
    'pages/first/index',
    'pages/sub_detail_interview/index',
    'pages/sub_detail_question/index',
    'pages/sub_aboutUs/index',
    'pages/sub_history/index',
    'pages/sub_zan/index',
    'pages/experience/index',
    'pages/search/index',
    'pages/favorite/index',
    'pages/mine/index',
  ],
  tabBar: {
    list: [
      {
        iconPath: 'assets/bottom_tabs_icons/first.png',
        selectedIconPath: 'assets/bottom_tabs_icons/first_select.png',
        pagePath: 'pages/first/index',
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
