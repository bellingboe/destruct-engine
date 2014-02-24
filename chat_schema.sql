SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `tinycrypt` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `tinycrypt`;

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `contact_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `requester_id` int(20) unsigned NOT NULL,
  `user_id` int(20) unsigned NOT NULL,
  `approved_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `requested_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(20) unsigned NOT NULL,
  `user_id` int(20) unsigned NOT NULL,
  `enc_text` text COLLATE utf8_unicode_ci NOT NULL,
  `read_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `sent_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `pairs`;
CREATE TABLE `pairs` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(20) unsigned NOT NULL,
  `key_label` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `key_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `pub_string` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `email_address` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acct_pw` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

