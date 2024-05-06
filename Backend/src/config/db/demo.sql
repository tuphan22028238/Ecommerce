USE e_shop;

-- `user`
INSERT INTO `user` (`id`, `username`, `password`, `name`, `dob`, `phone`, `role`, `address`, `email`, `status`) VALUES
(1, 'namnam', '123123', 'namnam', '2018-01-17', '23453254', 4, 'dsffasdfs', 'nghai@gmail.com', 0),
(2, 'admin', 'admin', 'admin', '2018-01-17', '453453', 1, 'sdfsadfs', 'admin@gmail.com', 0),
(3, 'admin35', '123123',  'Hồ Nhật Nam', '2018-01-10', '08481742', 1, 'feriv qeiwe', 'tini@gmail.com', 1),
(4, 'admin35', '123123',  'sdfsdf', '2018-02-13', '3242342', 3, 'fdsdfád', 'nghdfdsia@gmail.com', 1);
-- order
INSERT INTO `orders` (`total_price`, `status`, `payment_mode`, `payment_date`, `require_date`, `address`, `id_user`)
VALUES (500000, 1, 0, '2024-04-13', '2024-04-15', '123 Đường ABC, Quận XYZ, Thành phố HCM', 3),
       (700000, 1, 1, '2024-04-12', '2024-04-14', '456 Đường XYZ, Quận ABC, Thành phố HCM', 4);

-- orderdetail
INSERT INTO `orders_detail` (`quantity`, `unit_price`, `color`, `discount`, `id_product`, `id_orders`)
VALUES (2, 250000, 1, NULL, 1, 1),
       (3, 150000, 2, 0.1, 2, 1),
       (1, 300000, 1, NULL, 2, 2);
	
-- product
INSERT INTO `product` (`name`, `price`, `description`, `quantity_per_unit`, `unit_in_stock`, `unit_in_orders`, `re_order_level`, `list_color`, `status`, `id_type`, `id_seller`)
VALUES ('Áo thun nam', 200000, 'Áo thun cotton dành cho nam', 1, 100, 10, 20, 'Đen, Trắng, Xanh', 1, 1,1),
       ('Váy hoa nữ', 300000, 'Váy hoa dài tay dành cho nữ', 1, 50, 5, 15, 'Hồng, Xanh lá, Vàng', 1, 3, 1);
-- type 
INSERT INTO `type` ( `name`, `gender`, `size_from`, `size_to`) VALUES
( 'Áo sơ mi', 1, 36, 42),
( 'Quần jean', 1, 28, 34),
( 'Váy dài', 0, 34, 40),
( 'Áo khoác', 1, 40, 46);
-- posses
INSERT INTO `posses_product` (`user_id`, `product_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2);
INSERT INTO `cart` (`quantity`, `color`, `discount`, `size`, `id_user`, `id_product`) VALUES
(2, 1, 0, 1, 1, 1),
(3, 2, 0.1, 1, 1, 2),
(1, 1, 0, 1, 1, 2);

