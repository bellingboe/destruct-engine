DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
 `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
 `is_file` tinyint(1) NOT NULL DEFAULT '0',
 `contact_id` int(20) unsigned NOT NULL,
 `user_id` int(20) unsigned NOT NULL,
 `enc_text` text COLLATE utf8_unicode_ci NOT NULL,
 `enc_file` longblob NOT NULL,
 `read_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `sent_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci