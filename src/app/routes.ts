export const PATH = {
  listView: '/',
  notification: '',
  myPage: '',

  login: '/login',
  register: '/register',
  forgotEmail: '/forgot/email',
  forgotPassword: '/forgot/password',

  add: '/add',
  detail: 'add/detail',
  addCustom: 'add/detail/custom',

  group: '/group',
  groupAdd: '/group/add',
  groupDetail: (groupId: number) => `/group/${groupId}`,
  groupEdit: (groupId: number) => `/group/${groupId}/edit`,
  groupMember: (groupId: number) => `/group/${groupId}/member`,

  calendarView: '/calendar',
}
