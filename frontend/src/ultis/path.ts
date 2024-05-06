import ProductDetail from 'pages/ProductDetail'

const path = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  ProductDetail: ':id'
} as const

export default path
