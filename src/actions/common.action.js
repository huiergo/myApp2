import { createAction } from 'redux-actions';

/**
 * 获取用户信息
 */
export const loadUserInfo = createAction('load userInfo');
/**
 * 获取是否打卡状态
 */
export const loadFlag = createAction('load flag');
/**
 * 打卡签到
 */
export const clockIn = createAction('clock in');
/**
 *  同步用户信息
 *  和 mine 页面 保持同步的 登录信息（头像，昵称，签到flag） 用户信息+签到状态
 */
export const syncUser = createAction('sync user');

/**
 *  同步打卡情况
 *  和 mine 页面 保持同步的 登录信息（头像，昵称，签到flag） 用户信息+签到状态
 */
export const syncFlag = createAction('sync flag');

/**
 *  静默提交用户头像
 */
export const submitUserInfo = createAction('submit user');
