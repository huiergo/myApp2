import { createAction } from 'redux-actions';

export const loadUserInfo = createAction('load userInfo');
export const saveUserInfo = createAction('save userInfo');

// 5. 向服务器端发送请求 告诉服务器端我们要删除哪一个商品
export const deleteProductFromCart = createAction('deleteProductFromCart');

// * 1、获取用户数据
// pageshow时候: 刷新页面（点赞数和签到数）
// * 3、flag: 判断签到模块的展示
// * 4、点击签到，请求接口
