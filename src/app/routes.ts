export const PATH = {
  listView: '/',
  calendarView: '',
  notification: '',
  myPage: '',

  login: '/login',
  register: '/register',
  forgotEmail: '/forgot/email',
  forgotPassword: '/forgot/password',

  itemAdd: '/item/add',
  addDetail: 'item/add/detail',
  //addCustom: 'add/detail/custom',
  itemDetail: (itemId: number) => `item/${itemId}/detail`,
  itemEdit: (itemId: number) => `item/${itemId}/edit`,

  group: '/group',
  groupAdd: '/group/add',
  groupDetail: (groupId: number) => `/group/${groupId}`,
  groupEdit: (groupId: number) => `/group/${groupId}/edit`,
  groupMember: (groupId: number) => `/group/${groupId}/member`,
}
