import { lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import OrderManage from '@/pages/OrderManage';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [{ path: '/login', component: Login }],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/business/account', component: Dashboard },
      { path: '/business/order', component: OrderManage },
      { path: '/', redirect: '/business/account' },
    ],
  },
];

export default routerConfig;
