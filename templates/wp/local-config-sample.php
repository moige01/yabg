<?php
/**
* This is a sample local-config.php file
* In it, you *MUST* include the four main database defines
* You may include other settings here that you only want enabled on your local development checkouts
*/

define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// Grab these from https://api.wordpress.org/secret-key/1.1/salt
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );

define( 'DB_NAME', 'db_name' );
define( 'DB_USER', 'db_user' );
define( 'DB_PASSWORD', 'db_passowrd' );
// See https://wordpress.org/support/article/editing-wp-config-php/#set-database-host
define( 'DB_HOST', '127.0.0.1:3306' );

$table_prefix  = 'wp_';