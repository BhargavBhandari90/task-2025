<?php
/**
 * Task-2025 theme functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage task_2025
 * @since task-2025 1.0
 */

// Adds theme support for post formats.
if ( ! function_exists( 'task_2025_post_format_setup' ) ) :
	/**
	 * Adds theme support for post formats.
	 *
	 * @since Task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_post_format_setup() {
		add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );
	}
endif;
add_action( 'after_setup_theme', 'task_2025_post_format_setup' );

// Enqueues editor-style.css in the editors.
if ( ! function_exists( 'task_2025_editor_style' ) ) :
	/**
	 * Enqueues editor-style.css in the editors.
	 *
	 * @since Task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_editor_style() {
		add_editor_style( 'assets/css/editor-style.css' );
		add_editor_style( 'dist/style.css' );
		add_editor_style( 'dist/block.css' );
	}
endif;
add_action( 'after_setup_theme', 'task_2025_editor_style' );

// Enqueues style.css on the front.
if ( ! function_exists( 'task_2025_enqueue_styles' ) ) :
	/**
	 * Enqueues style.css on the front.
	 *
	 * @since Task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_enqueue_styles() {
		// Prefer built CSS from dist if available; otherwise, fallback to style.css.
		$dist_style_path = get_stylesheet_directory() . '/dist/style.css';
		$dist_style_uri  = get_stylesheet_directory_uri() . '/dist/style.css';
		$handle          = 'task-2025-style';
		if ( file_exists( $dist_style_path ) ) {
			wp_enqueue_style( $handle, $dist_style_uri, array(), filemtime( $dist_style_path ) );
		} else {
			wp_enqueue_style( $handle, get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
		}
	}
endif;
add_action( 'wp_enqueue_scripts', 'task_2025_enqueue_styles' );

// Add editor styles support for the theme.
if ( ! function_exists( 'task_2025_setup' ) ) :
	/**
	 * Adds editor styles support for the theme.
	 *
	 * @since task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_setup() {
		add_theme_support( 'editor-styles' );
	}
endif;
add_action( 'after_setup_theme', 'task_2025_setup' );

// Enqueue editor-only script bundle compiled to dist/block.js.
if ( ! function_exists( 'task_2025_enqueue_block_editor_assets' ) ) :
	/**
	 * Enqueue the block editor script if present.
	 *
	 * @since task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_enqueue_block_editor_assets() {
		$dist_block_path = get_stylesheet_directory() . '/dist/block.js';
		$dist_block_uri  = get_stylesheet_directory_uri() . '/dist/block.js';
		if ( file_exists( $dist_block_path ) ) {
			wp_enqueue_script(
				'task-2025-editor',
				$dist_block_uri,
				array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
				filemtime( $dist_block_path ),
				true
			);
		}
	}
endif;
add_action( 'enqueue_block_editor_assets', 'task_2025_enqueue_block_editor_assets' );

// Using dist assets; block registration handled in JS bundle.

// Registers custom block styles.
if ( ! function_exists( 'task_2025_block_styles' ) ) :
	/**
	 * Registers custom block styles.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function task_2025_block_styles() {
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'twentytwentyfive' ),
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
	}
endif;
add_action( 'init', 'task_2025_block_styles' );

// Registers pattern categories.
if ( ! function_exists( 'task_2025_pattern_categories' ) ) :
	/**
	 * Registers pattern categories.
	 *
	 * @since Task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_pattern_categories() {

		register_block_pattern_category(
			'task_2025_page',
			array(
				'label'       => __( 'Pages', 'task-2025' ),
				'description' => __( 'A collection of full page layouts.', 'task-2025' ),
			)
		);

		register_block_pattern_category(
			'task_2025_post-format',
			array(
				'label'       => __( 'Post formats', 'task-2025' ),
				'description' => __( 'A collection of post format patterns.', 'task-2025' ),
			)
		);
	}
endif;
add_action( 'init', 'task_2025_pattern_categories' );

// Registers block binding sources.
if ( ! function_exists( 'task_2025_register_block_bindings' ) ) :
	/**
	 * Registers the post format block binding source.
	 *
	 * @since Task-2025 1.0
	 *
	 * @return void
	 */
	function task_2025_register_block_bindings() {
		register_block_bindings_source(
			'task-2025/format',
			array(
				'label'              => _x( 'Post format name', 'Label for the block binding placeholder in the editor', 'task-2025' ),
				'get_value_callback' => 'task_2025_format_binding',
			)
		);
	}
endif;
add_action( 'init', 'task_2025_register_block_bindings' );

// Registers block binding callback function for the post format name.
if ( ! function_exists( 'task_2025_format_binding' ) ) :
	/**
	 * Callback function for the post format name block binding source.
	 *
	 * @since Task-2025 1.0
	 *
	 * @return string|void Post format name, or nothing if the format is 'standard'.
	 */
	function task_2025_format_binding() {
		$post_format_slug = get_post_format();

		if ( $post_format_slug && 'standard' !== $post_format_slug ) {
			return get_post_format_string( $post_format_slug );
		}
	}
endif;
