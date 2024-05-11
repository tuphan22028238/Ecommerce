SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+07:00";

CREATE TABLE `user` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(100),
    `password` VARCHAR(200),
    `name` VARCHAR(100),
    `dob` DATE,
    `phone` CHAR(12),
    `role` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '0: seller, 1: customer',
    `address` VARCHAR(100),
    `email` VARCHAR(100),
    `status` TINYINT(4) NOT NULL DEFAULT '1',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `orders` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `total_price` INT(11),
    `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '0 : Done - 1 : Processing - 2 : Cancelled - 3 : Shipping - 4 : Shipped - 5 : Refunded - 6 : Returned',
    `payment_mode` TINYINT(4) COMMENT '0: Bank Transfer, 1: Cash',
    `payment_date` DATETIME,
    `shipment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `require_date` TIMESTAMP,
    `shipped_date` TIMESTAMP, 
    `address` VARCHAR(255),
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `id_user` INT(11) NOT NULL,
    INDEX `id_user` (`id_user`),
    CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`)
        REFERENCES `user` (`id`)
);

CREATE TABLE `type` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `gender` TINYINT(4) NOT NULL,
    `size_from` INT(11),
    `size_to` INT(11)
);

CREATE TABLE `product` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` INT(11) NOT NULL,
    `description` NVARCHAR(4000),
    `quantity_per_unit` INT(11),
    `unit_in_stock` INT(11) NOT NULL,
    `unit_in_orders` INT(11),
    `re_order_level` INT(11),
    `list_color` VARCHAR(100) NOT NULL,
    `status` TINYINT(4) NOT NULL DEFAULT '1',
    `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `id_type` INT(11) NOT NULL,
    `id_seller` INT(11) NOT NULL,
    `sold` INT(11) NOT NULL DEFAULT '0',
    `image` VARCHAR(300),
    INDEX `id_type` (`id_type`),
    INDEX `id_seller` (`id_seller`),
    FOREIGN KEY (`id_type`)
        REFERENCES `type` (`id`),
    FOREIGN KEY (`id_seller`)
        REFERENCES `user` (`id`)
);
CREATE TABLE `orders_detail` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `quantity` INT(11) NOT NULL,
    `unit_price` DECIMAL(10 , 2 ),
    `color` INT(11),
    `discount` DECIMAL(10 , 2 ),
    `id_product` INT(11) NOT NULL,
    `id_orders` INT(11) NOT NULL,
    `size` INT(11),
    `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '0: Not confirm - 1: Confirmed - 2: Cancelled - 3: Shipped',
    INDEX `id_product` (`id_product`),
    INDEX `id_orders` (`id_orders`),
    FOREIGN KEY (`id_product`)
        REFERENCES `product` (`id`),
    FOREIGN KEY (`id_orders`)
        REFERENCES `orders` (`id`)
);

CREATE TABLE `image_product` (
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `link` VARCHAR(300) NOT NULL,
    `id_product` INT(11) NOT NULL,
    INDEX `id_product` (`id_product`),
    FOREIGN KEY (`id_product`)
        REFERENCES `product` (`id`)
);


CREATE TABLE `posses_product` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`),
    FOREIGN KEY (`product_id`)
        REFERENCES `product` (`id`)
);

CREATE TABLE `reviews` (
    `review_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `rating` INT NOT NULL,
    `review_text` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`),
    FOREIGN KEY (`product_id`)
        REFERENCES `product` (`id`)
);

CREATE TABLE `cart` (
    `cart_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT,
    `color` INT,
    `discount` DECIMAL(10 , 2 ),
    `size` INT,
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

COMMIT;
