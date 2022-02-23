// getToken
import { createAction } from 'redux-actions';

/**
 * 获取用户信息
 */
export const getToken = createAction('get token');
/**
 * 获取是否打卡状态
 */
export const getRefreshToken = createAction('refresh token');
