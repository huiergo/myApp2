const rootPath = 'https://mock.boxuegu.com/mock/1508';
const apiObject = {
  // ========  get 请求 ========
  //  首页-分类 （待补充）

  //   首页-是否已经打卡
  getClockIn: `${rootPath}/wxmini/hasClockIn`,

  //   查询试题/面经列表---> 入参：type（0全部&模块的类型），questionBankType（9面经10小程序面试题），非必选：keyword，sort，pageSize，page
  getQuestionList: `${rootPath}/wxmini/question/list`,

  //   查询试题/面经详情信息  入参： id
  getQuestionDetail: `${rootPath}/wxmini/question/:id`,

  //   查询面经推荐列表  入参：无
  getRecommendList: `${rootPath}/wxmini/question/recommends`,

  //   查询收藏的试题/面经列表---> 同上
  getCollectList: `${rootPath}/wxmini/question/collection/list`,

  //   查询点赞的试题/面经列表---> 同上
  getLikeList: `${rootPath}/wxmini/question/like/list`,

  //   搜索记录-面经或者试题  /wxmini/question/searchHistory
  getSearchHistory: `${rootPath}/wxmini/question/searchHistory`,

  // 查询历史记录的试题/面经列表  ---> 同上
  getHistoryList: `${rootPath}/wxmini/question/history/list`,

  // ========  post 请求 ========
  // 首页-登录 入参：code (调用 wx.login() 获取 临时登录凭证code)
  login: `${rootPath}/wxmini/login`,

  //   首页-刷新token 入参：refreshToken
  refreshToken: `${rootPath}/wxmini/refreshToken`,

  //   首页-打卡 入参：无
  clockIn: `${rootPath}/wxmini/clockIn`,

  //   收藏试题或者面经  入参： id，type(0面试题1面经)
  collection: `${rootPath}/wxmini/question/collection`,

  //   取消收藏试题或者面经  入参： id，type(0面试题1面经)
  unCollection: `${rootPath}/wxmini/question/uncollection`,

  //   点赞试题/面经  入参： id，type(0面试题1面经)
  likeQuestion: `${rootPath}/wxmini/question/like`,

  //   取消点赞试题/面经  入参： id，type(0面试题1面经)
  unLikeQuestion: `${rootPath}/wxmini/question/unlike`,

  // ========  delete 请求 ========
  //   删除试题/面经搜索记录(单条或者全部） 入参： id，type(为空或者0，删除单条，1删除全部)
  collection: `${rootPath}/wxmini/question/searchHistory`,
};
export default apiObject;
