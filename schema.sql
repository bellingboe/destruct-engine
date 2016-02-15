
--
-- MySQL DATABASE SCHEMA FOR Destruct-Engine (https://github.com/bellingboe/destruct-engine)
--

-- --------------------------------------------------------

--
-- Table for AES messages - base site feature
--

CREATE TABLE `crypt_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `b` text COLLATE utf8_unicode_ci NOT NULL,
  `n` char(16) COLLATE utf8_unicode_ci NOT NULL,
  `created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (id)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- Contacts for encrypted chat
--

CREATE TABLE `contacts` (
  `contact_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `requester_id` int(20) unsigned NOT NULL,
  `user_id` int(20) unsigned NOT NULL,
  `approved_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `requested_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (contact_id)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- The actual encrypted chat messages
--

CREATE TABLE `messages` (
 `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
 `is_file` tinyint(1) NOT NULL DEFAULT '0',
 `contact_id` int(20) unsigned NOT NULL,
 `user_id` int(20) unsigned NOT NULL,
 `enc_text` text COLLATE utf8_unicode_ci NOT NULL,
 `enc_file` longblob NOT NULL,
 `read_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
 `sent_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (id)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- User accounts for key management and chat
--

CREATE TABLE `users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `email_address` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acct_pw` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- User-provided public keys for the key manager
--

CREATE TABLE IF NOT EXISTS `pubkeys` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(20) unsigned NOT NULL,
  `key_label` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `key_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------

--
-- The encrypted public/private key pairs for each account
--

CREATE TABLE `pairs` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(20) unsigned NOT NULL,
  `key_label` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `key_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `pub_string` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------