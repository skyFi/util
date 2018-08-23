'use strict';

/**
 * 校验邮箱格式
 * @param {string} email 待校验的字符串
 * @return {boolean} 输入的是邮箱则返回true
 * */
export const isEmail = (email) => {
  const re = /^[\w!#\$%&'\*\+\/\=\?\^`\{\|\}~\-]+(:?\.[\w!#\$%&'\*\+\/\=\?\^`\{\|\}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i;
  return email && typeof email === 'string' && re.test(email);
};

/**
 * 国内手机号码格式简单校验
 * @param phone 手机号码
 * @return {boolean} 是手机号则返回true
 * */
export const isPhoneNum = (phone) => {
  return /^1\d{10}$/.test(phone);
};