
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `contact_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `requester_id` int(20) unsigned NOT NULL,
  `user_id` int(20) unsigned NOT NULL,
  `apprived` timestamp NULL DEFAULT NULL,
  `requested` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `message_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `contact_id` int(20) unsigned NOT NULL,
  `user_id` int(20) unsigned NOT NULL,
  `enc_text` text COLLATE utf8_unicode_ci NOT NULL,
  `read_ts` timestamp NULL DEFAULT NULL,
  `sent_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pairs`
--

DROP TABLE IF EXISTS `pairs`;
CREATE TABLE IF NOT EXISTS `pairs` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(20) unsigned NOT NULL,
  `key_label` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `key_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `pub_string` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;
COMMIT;
