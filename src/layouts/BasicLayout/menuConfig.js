const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: '业务管理',
    path: '/business',
    children: [
      {
        name: '会员账号管理',
        path: '/business/account',
      },
      {
        name: '订单管理',
        path: '/business/order',
      },
    ],
  },
];
export { headerMenuConfig, asideMenuConfig };
