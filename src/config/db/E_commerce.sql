SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+07:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTEorders_detailR_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(100) DEFAULT NULL,
    `password` VARCHAR(200) DEFAULT NULL,
    `name` VARCHAR(100) DEFAULT NULL,
    `dob` DATE DEFAULT NULL,
    `phone` CHAR(12) DEFAULT NULL,
    `role` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '1 : Customer- 2 : Seller',
    `address` VARCHAR(100) DEFAULT NULL,
    `email` VARCHAR(100) NOT NULL,
    `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '1: Active- 0 : Inactive',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `total_price` INT(11) NOT NULL,
    `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '0 : Hết hàng - 1 : báo giá - 2 : hủy - 3: đã bán',
    payment_mode TINYINT(4) NOT NULL COMMENT '0: Tiền mặt - 1: Chuyển khoản',
    payment_date DATETIME,
    shipment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    require_date TIMESTAMP,
    shipped_date TIMESTAMP,
    address VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user INT(11) NOT NULL
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `orders_detail` / cart
--

CREATE TABLE `orders_detail` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `quantity` INT(11) NOT NULL COMMENT 'số lượng',
    unit_price DECIMAL(10 , 2 ),
    color INT(11) DEFAULT NULL,
    discount DECIMAL(10 , 2 ) DEFAULT NULL,
    id_product INT(11) NOT NULL,
    id_orders INT(11) NOT NULL
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `image_product`
--

CREATE TABLE `image_product` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `link` VARCHAR(300) NOT NULL,
    `id_product` INT(11) NOT NULL
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` INT(11) NOT NULL,
    `description` NVARCHAR(4000),
    quantityPerUnit INT(11) DEFAULT NULL COMMENT 'số lượng',
    unitInStock INT(11) NOT NULL,
    unitInOrders INT(11),
    reOrderLevel INT(11) COMMENT 'Mức tối thiểu của mặt hàng',
    list_color VARCHAR(100) NOT NULL,
    status TINYINT(4) NOT NULL DEFAULT '1' COMMENT '0: Không bán - 1: mới - 2 : bình thường',
	created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_type INT(11) NOT NULL
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `type`
--

CREATE TABLE `type` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
	`gender` TINYINT(4) NOT NULL COMMENT '0: nữ - 1: nam',
    `size_form` INT(11) DEFAULT NULL,
    `size_to` INT(11) DEFAULT NULL
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `posses_product`
--

CREATE TABLE `posses_product` (
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES `user` (id),
    FOREIGN KEY (product_id)
        REFERENCES `product` (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
    `review_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `rating` INT NOT NULL,
    `review_text` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES `user` (id),
    FOREIGN KEY (product_id)
        REFERENCES `product` (id)
);

--
-- Chỉ mục cho các bảng
--

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD KEY `id_user` (`id_user`);

--
-- Chỉ mục cho bảng `orders_detail`
--

ALTER TABLE `orders_detail`
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_orders` (`id_orders`);

--
-- Chỉ mục cho bảng `image_product`
--
ALTER TABLE `image_product`
  ADD KEY `id_product` (`id_product`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD KEY `id_type` (`id_type`);
  
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD CONSTRAINT `orders_detail_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `orders_detail_ibfk_2` FOREIGN KEY (`id_orders`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `image_product`
--
ALTER TABLE `image_product`
  ADD CONSTRAINT `image_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `type` (`id`);

COMMIT;

-- Note: Insert into Orders values(123,'PoppyCounter','Chocltae',now(),now())

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;