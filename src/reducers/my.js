export default function my(preState, action) {
  switch (action.type) {
    case 'getUserInfo':
      return {
        ...preState,
        userInfo: action.userInfo,
        flag: action.userInfo.flag,
      };
    case 'updateToken':
      return {
        ...preState,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case 'changeClockInStatus':
      return {
        ...preState,
        flag: action.flag,
      };
    default:
      return {
        ...preState,
      };
  }
}
