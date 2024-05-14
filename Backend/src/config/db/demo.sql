USE e_shop;

-- `user`
INSERT INTO `user` (`id`, `username`, `password`, `name`, `dob`, `phone`, `role`, `address`, `email`, `status`) VALUES
(1, 'namnam', '123123', 'namnam', '2018-01-17', '23453254', 4, 'dsffasdfs', 'nghai@gmail.com', 0),
(2, 'admin', 'admin', 'admin', '2018-01-17', '453453', 1, 'sdfsadfs', 'admin@gmail.com', 0),
(3, 'admin35', '123123',  'Hồ Nhật Nam', '2018-01-10', '08481742', 1, 'feriv qeiwe', 'tini@gmail.com', 1),
(4, 'admin35', '123123',  'sdfsdf', '2018-02-13', '3242342', 3, 'fdsdfád', 'nghdfdsia@gmail.com', 1);

-- type 
INSERT INTO `type` ( `name`) VALUES
( 'Quần áo'),
( 'Đồ gia dụng'),
( 'Thiết bị điện tử'),
( 'Thực phẩm');


-- product
INSERT INTO `product` (`name`, `price`, `description`, `quantity_per_unit`, `unit_in_stock`, `unit_in_orders`, `re_order_level`, `list_color`, `status`, `id_type`, `id_seller`, `sold`, `image`)
VALUES ('Áo thun nam', 200000, 'Áo thun cotton dành cho nam', 1, 100, 10, 20, 'Đen, Trắng, Xanh', 1, 1,1, 10, null),
       ('Váy hoa nữ', 300000, 'Váy hoa dài tay dành cho nữ', 1, 50, 5, 15, 'Hồng, Xanh lá, Vàng', 1, 3, 1, 23, null),
         ('Quần jean nam', 500000, 'Quần jean dành cho nam', 1, 30, 3, 10, 'Xanh, Đen, Trắng', 1, 2, 1,123, null),
         ('Áo khoác nam', 700000, 'Áo khoác dành cho nam', 1, 20, 2, 5, 'Đen, Xanh, Đỏ', 1, 4, 1,231, null);

-- order
INSERT INTO `orders` (`total_price`, `status`, `payment_mode`, `payment_date`, `require_date`, `address`, `id_user`)
VALUES (500000, 1, 0, '2024-04-13', '2024-04-15', '123 Đường ABC, Quận XYZ, Thành phố HCM', 3),
       (700000, 1, 1, '2024-04-12', '2024-04-14', '456 Đường XYZ, Quận ABC, Thành phố HCM', 4),
        (1500000, 1, 0, '2024-05-11', '2024-04-13', '789 Đường XYZ, Quận ABC, Thành phố HCM', 2),
        (1000000, 1, 0, '2024-06-11', '2024-04-13', '44 Đường XYZ, Quận ABC, Thành phố HCM', 1);


-- orderdetail
INSERT INTO `orders_detail` (`quantity`, `unit_price`, `color`, `discount`, `id_product`, `id_orders`)
VALUES (2, 250000, 1, NULL, 1, 1),
       (3, 150000, 2, 0.1, 2, 1),
       (1, 300000, 1, NULL, 3, 2),
        (1, 700000, 1, NULL, 4, 3),
        (2, 500000, 1, NULL, 2, 4),
        (3, 200000, 2, 0.1, 9, 4);
	
-- posses
INSERT INTO `posses_product` (`user_id`, `product_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2);
INSERT INTO `cart` (`quantity`, `color`, `discount`, `size`, `user_id`, `product_id`) VALUES
(2, 1, 0, 1, 1, 1),
(3, 2, 0.1, 1, 1, 2),
(1, 1, 0, 1, 1, 1);

