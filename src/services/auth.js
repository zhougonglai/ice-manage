import { request } from 'ice';

export default {
  /**
   * {name}
   * {captcha}
   * {captcha_key}
   * {password}
   * @param {*} data
   */
  async login(data) {
    return await request.post('/auth/system/login-by-pwd', data);
  },
  async captcha(data) {
    return await request.post('/auth/system/get-captcha', data);
  },
};
