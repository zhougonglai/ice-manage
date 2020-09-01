import userService from '@/services/auth';

export default {
  state: {
    user: '',
  },
  reducers: {
    update(_, user = '') {
      sessionStorage.setItem('account_token', user.account_token);
      return { user };
    },
  },
  effects: (dispatch) => ({
    async login(body) {
      const res = await userService.login(body);
      // console.log(res);
      dispatch.user.update(res.data);
      return res;
    },
  }),
};
