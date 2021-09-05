<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'grocery' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '2q4%ii_x=|I|hLtw]?z1DqlYti`c,AEq,:a^F<7WvS]9Zq,#L=*,~cA0+pO)!X-J' );
define( 'SECURE_AUTH_KEY',  'a,ga+QOHjpf^P`e-;$s3EP[^4u5,aa^te Y,HW2,l%A}Lx;3s{XD1cSiOfcaQ<zZ' );
define( 'LOGGED_IN_KEY',    'z2|@-8jd3_bb6W#un$) ,-2- E%4)tpgQ*NO^rv{JJPo?aT%h{afjJkaEQ$*,NV0' );
define( 'NONCE_KEY',        '2[b}Bny_ 2iu]]%&xF}~xNt4,yc=@AbxEM1`^G`yBsWO~]chs^WYVjy7wAoe/nIR' );
define( 'AUTH_SALT',        'WW_eM|IB&e7W3a>awH%44,ECp#h|WNM2f}(g:efBtTXa65ZW5V.G7GIs`^-N|}|h' );
define( 'SECURE_AUTH_SALT', ':?PB0V-;zTxN  9y]JF]Q{f[$5$f(Qm.aV0nfB!,Kk*Rr$h>,RRwGpL{3WE2Lg6M' );
define( 'LOGGED_IN_SALT',   'v.ZXr{)|6)X]ZnlO>G>bN?Bex!|%<zLx`u+xt4;t2ax#QX(C72RUV]N+}{6|0jYM' );
define( 'NONCE_SALT',       'xr:v~qE_ =?/1QE ?4|6$r9J 3$QyuznD>X[3A#zyfUrR^smB9D@XvVPiA([5zoz' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
