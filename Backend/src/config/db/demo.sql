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
VALUES ('Áo thun nam', 200000, 'Áo thun cotton dành cho nam', 1, 100, 10, 20, 'Đen, Trắng, Xanh', 1, 1,1, 10, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu4h4rucsv816f'),
        ('Quần jean nam', 500000, 'Quần jean dành cho nam', 1, 30, 3, 10, 'Xanh, Đen, Trắng', 1, 1, 1,123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lf5rilhgtu1j04, https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luip98pv6nmad8'),
        ('Áo sơ mi nam', 700000, 'Áo sơ mi dành cho nam', 1, 20, 2, 5, 'Trắng, Xanh, Đỏ', 1, 1, 1,231, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lh32revbew37fd, https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lh32revbevxu7c, https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lh32revbuc6q57'),
        ('Áo thun nữ', 150000, 'Áo thun cotton dành cho nữ', 1, 100, 10, 20, 'Đen, Trắng, Xanh', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rd3u-luj2fyxdm82k3b'),
        ('Quần jean nữ', 400000, 'Quần jean dành cho nữ', 1, 30, 3, 10, 'Xanh, Đen, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rd4s-lua6riw7edgt09'),
        ('Áo sơ mi nữ', 600000, 'Áo sơ mi dành cho nữ', 1, 20, 2, 5, 'Trắng, Xanh, Đỏ', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rccn-ls2j4vw9jjni2d'),
        ('Áo khoác nam', 800000, 'Áo khoác dành cho nam', 1, 20, 2, 5, 'Đen, Xanh, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljtecn8fia4402'),
        ('Áo khoác nữ', 700000, 'Áo khoác dành cho nữ', 1, 20, 2, 5, 'Đen, Xanh, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rd3l-luj0jch4tmyodb'),
        ('Quần short nam', 300000, 'Quần short dành cho nam', 1, 30, 3, 10, 'Xanh, Đen, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt6igktcly9w6c'),
        ('Quần short nữ', 250000, 'Quần short dành cho nữ', 1, 30, 3, 10, 'Xanh, Đen, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt6igktcq5z8d0'),
        ('Áo len nam', 400000, 'Áo len dành cho nam', 1, 20, 2, 5, 'Đen, Xanh, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rbms-lnnppih39mmg94'),
        ('Áo len nữ', 350000, 'Áo len dành cho nữ', 1, 20, 2, 5, 'Đen, Xanh, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rcf3-lstns2r9p65h10'),
        ('Áo khoác gió nam', 600000, 'Áo khoác gió dành cho nam', 1, 20, 2, 5, 'Đen, Xanh, Trắng', 1, 1, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhiiostnbjcxa1'),
        ('Máy giặt', 1000000, 'Máy giặt dành cho gia đình', 1, 10, 1, 3, 'Trắng', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-luzv67uzm90lf4, https://down-vn.img.susercontent.com/file/20ee69895668bf86f789c9d326b038f6'),
        ('Tivi', 1500000, 'Tivi Oled 4K dành cho gia đình', 1, 5, 0, 2, 'Đen', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lkbxqnlvwhigcd, https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lkbxqnlvh19k7f'),
        ('Tủ lạnh', 2000000, 'Tủ lạnh dành cho gia đình', 1, 5, 0, 2, 'Trắng', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rce0-ltozai19jrshc9, https://down-vn.img.susercontent.com/file/sg-11134201-7rcdf-ltozaih2wmun21'),
        ('Bếp từ', 4000000, 'Bếp từ dành cho gia đình', 1, 5, 0, 2, 'Đen', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnjjh4ncsezxcf, https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lttju2igccgdab'),
        ('Bếp gas', 5000000, 'Bếp gas dành cho gia đình', 1, 5, 0, 2, 'Đen', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltsavzf3yiode5, https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltsavzf41bt9d0'),
        ('Nồi cơm điện', 1000000, 'Nồi cơm điện dành cho gia đình', 1, 5, 0, 2, 'Trắng', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134211-7r98o-lpc1wua18klq1f'),
        ('Nồi chiên không dầu', 2000000, 'Nồi chiên không dầu dành cho gia đình', 1, 5, 0, 2, 'Đen', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-22120-3z04y8db4xkvb1'),
        ('Lò vi sóng', 1500000, 'Lò vi sóng dành cho gia đình', 1, 5, 0, 2, 'Trắng', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lr89zu3asbrtad'),
        ('Máy xay sinh tố', 500000, 'Máy xay sinh tố dành cho gia đình', 1, 5, 0, 2, 'Đen', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfexpjtkln5w85'),
        ('Máy lọc nước', 3000000, 'Máy lọc nước dành cho gia đình', 1, 5, 0, 2, 'Trắng', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lo5b2syzs1vv5b'),
        ('Máy hút bụi', 2000000, 'Máy hút bụi dành cho gia đình', 1, 5, 0, 2, 'Đen', 1, 2, 1, 123, 'https://down-vn.img.susercontent.com/file/sg-11134201-7rcdj-ltddo0p8p7upee'),
        ('Iphone 12', 20000000, 'Iphone 12 128GB', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/0982de1d517eed28495a9bbcaced5881'),
        ('Samsung Galaxy S24', 15000000, 'Samsung Galaxy S21 128GB', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lt70jrhkpf2x8c'),
        ('Macbook Pro 2021', 30000000, 'Macbook Pro 2021 256GB', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/1cba156175a5ef0b0d356b52451b4c42'),
        ('Dell XPS 13', 25000000, 'Dell XPS 13 256GB', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lpt62oyf3x9z52'),
        ('Sony WH-1000XM4', 5000000, 'Tai nghe Sony WH-1000XM4', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/cd0ef5e2d0b03e6744732c7aecc603e4'),
        ('Airpods Pro', 7000000, 'Tai nghe Airpods Pro', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln2isj5kib4o79'),
        ('Apple Watch Series 6', 10000000, 'Apple Watch Series 6', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ln8j4tf1z1v743'),
        ('Samsung Galaxy Watch 3', 8000000, 'Samsung Galaxy Watch 3', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/748eb7dedab1ab4327cf51f0930142b0'),
        ('Sony A7III', 30000000, 'Máy ảnh Sony A7III', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-luug3x4jf0ie38'),
        ('Canon EOS R6', 35000000, 'Máy ảnh Canon EOS R6', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lugfd8bt464hd9'),
        ('Sony 16-35mm f/2.8 GM', 30000000, 'Ống kính Sony 16-35mm f/2.8 GM', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134211-7r98o-lnl6575mr33u4c'),
        ('Canon 24-70mm f/2.8L II', 35000000, 'Ống kính Canon 24-70mm f/2.8L II', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lop7k0kf3vwwb3'),
        ('DJI Mavic Air 2', 20000000, 'Flycam DJI Mavic Air 2', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhy7998if3k15c'),
        ('GoPro Hero 9', 10000000, 'Action cam GoPro Hero 9', 1, 5, 0, 2, 'Đen', 1, 3, 1, 123, 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-luofarsjfd3k13'),
        ('Gạo', 50000, 'Gạo thường', 1, 100, 10, 20, 'Trắng', 1, 4, 1, 10, 'https://down-vn.img.susercontent.com/file/a3dc3a80f827f8c3a04aa26489485c8d'),
        ('Bánh mì', 10000, 'Bánh mì truyền thống', 1, 200, 20, 30, 'Nâu', 1, 4, 1, 20, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltp7pd0cd79p9a'),           
        ('Rau cải', 20000, 'Rau cải xanh', 1, 50, 5, 10, 'Xanh', 1, 4, 1, 40, 'https://down-vn.img.susercontent.com/file/98c34bfd630e09a563a62c0a77818a37'),
        ('Thịt bò', 100000, 'Thịt bò sạch', 1, 50, 5, 10, 'Đỏ', 1, 4, 1, 50, 'https://down-vn.img.susercontent.com/file/f55bd4088d700634b6b1270f37c90284'),
        ('Thịt heo', 80000, 'Thịt heo sạch', 1, 50, 5, 10, 'Hồng', 1, 4, 1, 60, 'https://down-vn.img.susercontent.com/file/eaa44ead36d693b2760b85e7fe5074e4'),
        ('Thịt gà', 60000, 'Thịt gà sạch', 1, 50, 5, 10, 'Vàng', 1, 4, 1, 70, 'https://down-vn.img.susercontent.com/file/10caa67ce35facda0787e063dc8ee0dc'),
        ('Cá', 70000, 'Cá', 1, 50, 5, 10, 'Xanh', 1, 4, 1, 80, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmu9yajedx3z77'),
        ('Khô Cá Lóc 3 Nắng', 90000, 'Khô Cá Lóc 3 Nắng', 1, 50, 5, 10, 'Đa dạng', 1, 4, 1, 90, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-zkkcabegksovd8'),
        ('Sữa', 20000, 'Sữa tươi', 1, 50, 5, 10, 'Trắng', 1, 4, 1, 100, 'https://down-vn.img.susercontent.com/file/b1b92a5e6f7b8c0d3c3c91961f491ff3'),
        ('Coca-cola', 10000, 'Nước ngọt', 1, 50, 5, 10, 'Đa dạng', 1, 4, 1, 110, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lfz5hku8h81j62'),
        ('Bia', 20000, 'Thùng 12 lon bia Budweiser 500ml', 1, 50, 5, 10, 'Vàng', 1, 4, 1, 120, 'https://down-vn.img.susercontent.com/file/6477898c8517623a745a4a776cf625d7'),
        ('Rượu', 30000, 'Rượu apple meomeo', 1, 50, 5, 10, 'Vàng', 1, 4, 1, 130, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lkfdo55f03ag93');

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

