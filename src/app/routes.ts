export const PATH = {
  listView: '/',
  notification: '/notification',
  mypage: '/mypage',
  mypageEdit: '/mypage/edit',

  login: '/login',
  register: '/register',
  forgotPassword: '/forgot/password',

  itemAdd: '/item/add',
  addDetail: '/item/add/detail',
  itemDetail: (id: string | number) => `/item/${id}/detail`,
  itemEdit: (id: string | number) => `/item/${id}/edit`,
  // itemDetail: (itemId: number) => `/item/${itemId}/detail`,
  // itemEdit: (itemId: number) => `/item/${itemId}/edit`,
}
