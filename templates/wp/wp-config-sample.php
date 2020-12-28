<?php
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

// Replace with your DB credentials and name
define( 'DB_NAME',     'db_name' );
define( 'DB_USER',     'db_user' );
define( 'DB_PASSWORD', 'db_password' );
// See https://wordpress.org/support/article/editing-wp-config-php/#set-database-host
define( 'DB_HOST',     '127.0.0.1:3306' );

$table_prefix  = 'wp_';

define( 'WP_CONTENT_DIR', __DIR__ . '/wp-content' );

define( 'WP_DEBUG_DISPLAY', true );
define( 'WP_DEBUG',         true );
define( 'SAVEQUERIES',      true );

define( 'FS_METHOD', 'direct' );

if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', __DIR__ . '/wp/' );

require_once ABSPATH . 'wp-settings.php';