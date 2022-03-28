<?php
/*
Plugin Name: Hello Gutenberg
Plugin URI: http://artmanns.at
description: A beautiful, reduced gallery for creative people
Version: 0.9
Author: Charly Artmann
Author URI: http://artmanns.at
License: GPL2
*/

if (!defined('ABSPATH')) {
    exit;
}



function artmanns_hello_gutenberg_register_scripts()
{

    $version = WP_DEBUG ? time() : "V0.1";
    // load js files

    $plugin_dir_url = plugin_dir_url( __FILE__ );

    if (WP_DEBUG === true) {
        wp_register_script(
            'art-hello-gutenberg-editor-script',
            $plugin_dir_url . 'dist/art-hello-gutenberg-editor.bundle.js',
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components', 'lodash', 'wp-blob', 'wp-data', 'wp-html-entities', 'wp-core-data','wp-compose', 'jquery'), $version
        );

        wp_register_script(
            'art-hello-gutenberg-script',
            $plugin_dir_url . 'dist/art-hello-gutenberg-script.bundle.js',
            [], $version
        );

        wp_register_style(
            'art-hello-gutenberg-editor-style',
            $plugin_dir_url . 'dist/art-hello-gutenberg-editor.style.css',
            array('wp-edit-blocks'), $version
        );

        wp_register_style(
            'art-hello-gutenberg-style',
            $plugin_dir_url . 'dist/art-hello-gutenberg-script.style.css', [], $version
        );
    } else {
        wp_register_script(
            'art-hello-gutenberg-editor-script',
            $plugin_dir_url . 'dist/art-hello-gutenberg-editor.bundle.min.js',
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components', 'lodash', 'wp-blob', 'wp-data', 'wp-html-entities', 'wp-core-data','wp-compose', 'jquery', 'date'), $version
        );

        wp_register_script(
            'art-hello-gutenberg-script',
            $plugin_dir_url . 'dist/art-hello-gutenberg-script.bundle.min.js',
            [], $version
        );

        wp_register_style(
            'art-hello-gutenberg-editor-style',
            $plugin_dir_url . 'dist/art-hello-gutenberg-editor.style.min.css',
            array('wp-edit-blocks'), $version
        );

        wp_register_style(
            'art-hello-gutenberg-style',
            $plugin_dir_url . 'dist/art-hello-gutenberg-script.style.min.css', [], $version
        );
    }

}

add_action('init', 'artmanns_hello_gutenberg_register_scripts');

if ( ! function_exists( 'art_hello_gutenberg_add_styles_to_editor' ) ) :
    function art_hello_gutenberg_add_styles_to_editor() {
        add_editor_style( 'dist/art-hello-gutenberg-editor.style.css' );
    }
endif;
add_action( 'after_setup_theme', 'art_hello_gutenberg_add_styles_to_editor' );


require_once plugin_dir_path(__FILE__) . 'src/blocks/my-first-block/index.php';
require_once plugin_dir_path(__FILE__) . 'src/blocks/my-second-block/index.php';