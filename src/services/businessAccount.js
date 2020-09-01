import { request } from 'ice';

export default {
  async netbarList(params) {
    return await request.get('/netbar/net-bar/list', { params });
  },
};
