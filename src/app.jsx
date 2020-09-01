import { createApp, store } from 'ice';
import { Message } from '@alifd/next';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: [
    {
      baseURL: 'http://dev-staff-netbarapi.leigod.com',
      interceptors: {
        request: {
          onConfig: (config) => {
            const token = sessionStorage.getItem('account_token');
            return token
              ? { ...config, params: { account_token: token } }
              : config;
          },
        },
        response: {
          onConfig: (response) => {
            // console.log(response);
            if (response.data.code === 1) {
              Message.info(response.data.msg);
            }
            return response;
          },
        },
      },
    },
  ],
  router: {
    type: 'browser',
  },
};
createApp(appConfig);
