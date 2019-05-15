export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
        ],
      },
      {
        path: '/account/settings',
        name: 'settings',
        component: './Account/Settings/Info',
        hideInMenu: true,
      },
      {
        path: '/notes',
        name: 'Note',
        component: './Note',
        icon: 'ordered-list',
      },
      // members
      {
        path: '/members',
        name: 'Member',
        component: './Member',
        icon: 'team',
      },
      {
        path: '/members/detail/:id',
        name: 'Member Detail',
        component: './Member/Detail',
        hideInMenu: true,
      },
      {
        path: '/members/edit/:id',
        name: 'Member Edit',
        component: './Member/Edit',
        hideInMenu: true,
      },
      {
        path: '/TaskListDraft',
        name: 'taskListDraft',
        component: './TaskListDraft',
        hideInMenu: true,
      },
      {
        component: '404',
      },
    ],
  },
];
