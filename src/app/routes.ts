export const PATH = {
  listView: '/',
  calendarView: '',
  notification: '',
  myPage: '',

  login: '/login',
  register: '/register',
  forgotEmail: '/forgot/email',
  forgotPassword: '/forgot/password',

  add: 'item/add',
  addDetail: 'item/add/detail',
  addCustom: 'item/add/detail/custom',
  delete: 'item/delete',
  modify: 'item/modify',

  group: '/group',
  groupAdd: '/group/add',
  groupDetail: (groupId: number) => `/group/${groupId}`,
  groupEdit: (groupId: number) => `/group/${groupId}/edit`,
  groupMember: (groupId: number) => `/group/${groupId}/member`,
}
