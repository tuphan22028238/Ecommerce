const path = {
  home : '/',
  login : '/login',
  register : '/register',
  profile : '/profile',
  product : '/show/:id',
  order_checkout : '/orderCheckout',
  seller : {
    list_product : '/seller/listProduct/:id',
    edit_product : '/seller/editProduct/:id',
    add_product : '/seller/addProduct',
    view_order : '/seller/viewOrder',
    view_order_detail : '/seller/orderDetail/:productId',
    confirm_order : '/seller/confirmOrder/:orderDetailId/:productId',
  },
  cart : '/cart',
}

export default path

