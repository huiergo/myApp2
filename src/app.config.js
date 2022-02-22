export default defineAppConfig({
  pages: [
    'pages/mine/index',
    // 'pages/home/index',
    // 'pages/experience/index',
    'pages/favorite/index',
    // 'pages/search/index',
  ],
  tabBar: {
    list: [
      // {
      //   iconPath: 'assets/home.png',
      //   selectedIconPath: 'assets/home_select.png',
      //   pagePath: 'pages/home/index',
      //   text: '首页',
      // },
      // {
      //   iconPath: 'assets/home.png',
      //   selectedIconPath: 'assets/home_select.png',
      //   pagePath: 'pages/experience/index',
      //   text: '面经',
      // },
      {
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_select.png',
        pagePath: 'pages/favorite/index',
        text: '收藏',
      },
      {
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_select.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
    color: '#000',
    selectedColor: '#56abe4',
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
