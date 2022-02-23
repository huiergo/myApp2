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
 * 同步数据
 */
export const saveMineData = createAction('save data');
