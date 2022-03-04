const baseUrl = 'https://mock.boxuegu.com/mock/1508';
// const baseUrl = 'http://api-teach.itheima.net/';
const apiObject = {
  // ========  get 请求 ========
  //  首页-获取分类
  getCategory: `${baseUrl}/wxmini/question/type`,

  //   首页-是否已经打卡
  getFlag: `${baseUrl}/wxmini/hasClockIn`,

  //   查询试题/面经列表---> 入参：type（0全部&模块的类型），questionBankType（9面经10小程序面试题），非必选：keyword，sort，pageSize，page
  getQuestionList: `${baseUrl}/wxmini/question/list`,

  //   查询试题/面经详情信息  入参： id
  getQuestionDetail: `${baseUrl}/wxmini/question/`,

  //   查询面经推荐列表  入参：无
  getRecommendList: `${baseUrl}/wxmini/question/recommends`,

  //   查询收藏的试题/面经列表---> 同上
  getCollectList: `${baseUrl}/wxmini/question/collection/list`,

  //   查询点赞的试题/面经列表---> 同上
  getLikeList: `${baseUrl}/wxmini/question/like/list`,

  //   搜索记录-面经或者试题  /wxmini/question/searchHistory
  getSearchHistory: `${baseUrl}/wxmini/question/searchHistory`,

  // 查询历史记录的试题/面经列表  ---> 同上
  getHistoryList: `${baseUrl}/wxmini/question/history/list`,

  // 获取用户数据
  getUserInfo: `${baseUrl}/wxmini/userInfo`,

  // ========  post 请求 ========
  // 首页-登录 入参：code (调用 wx.login() 获取 临时登录凭证code)
  login: `${baseUrl}/wxmini/login`,

  //   首页-刷新token 入参：refreshToken
  refreshToken: `${baseUrl}/wxmini/refreshToken`,

  //   首页-打卡 入参：无
  clockIn: `${baseUrl}/wxmini/clockin`,

  // 查询收藏、点赞、浏览的试题/面经列表
  getOptList: `${baseUrl}/wxmini/question/opt/list`,

  //   收藏、点赞、浏览试题 或者面经  入参： id，type(0面试题1面经) optType 1点赞2收藏3浏览
  opt: `${baseUrl}/wxmini/question/opt`,

  //   取消收藏、点赞、浏览试题 或者面经  入参： id，type(0面试题1面经) optType 1点赞2收藏3浏览
  unOpt: `${baseUrl}/wxmini/question/unOpt`,

  // ========  delete 请求 ========
  //   删除试题/面经搜索记录(单条或者全部） 入参： id，type(为空或者0，删除单条，1删除全部)
  deleteSearchHistory: `${baseUrl}/wxmini/question/searchHistory`,
};
export default apiObject;
