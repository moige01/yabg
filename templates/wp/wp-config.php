<?php

// Include local database config
require_once __DIR__ . '/local-config.php';

define( 'WP_CONTENT_DIR', __DIR__ . '/wp-content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/wp-content' );

define( 'WP_DEBUG_DISPLAY', true );
define( 'WP_DEBUG', true );
define( 'SAVEQUERIES', true );

if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', __DIR__ . '/wp/' );

require_once ABSPATH . 'wp-settings.php';