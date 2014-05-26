<?php

// Default options values
$sa_options = array(
	'col1_header' => '',
	'col1_text' => '',
	'col2_header' => '',
	'col2_text' => '',
	'col3_header' => '',
	'col3_text' => ''
);

if ( is_admin() ) : // Load only if we are viewing an admin page

function sa_register_settings() {
	// Register settings and call sanitation functions
	register_setting( 'sa_theme_options', 'sa_options', 'sa_validate_options' );
}

add_action( 'admin_init', 'sa_register_settings' );

function sa_theme_options() {
	// Add theme options page to the addmin menu
	add_theme_page( 'Theme Options', 'Theme Options', 'edit_theme_options', 'theme_options', 'sa_theme_options_page' );
}

add_action( 'admin_menu', 'sa_theme_options' );

// Function to generate options page
function sa_theme_options_page() {
	global $sa_options;

	if ( ! isset( $_REQUEST['updated'] ) )
		$_REQUEST['updated'] = false; // This checks whether the form has just been submitted. ?>

	<div class="wrap">

	<?php screen_icon(); echo "<h2>" . get_current_theme() . __( ' Theme Options' ) . "</h2>";
	// This shows the page's name and an icon if one has been provided ?>

	<?php if ( false !== $_REQUEST['updated'] ) : ?>
	<div><p><strong><?php _e( 'Options saved' ); ?></strong></p></div>
	<?php endif; // If the form has just been submitted, this shows the notification ?>

	<form method="post" action="options.php">

	<?php $settings = get_option( 'sa_options', $sa_options ); ?>
	
	<?php settings_fields( 'sa_theme_options' );
	/* This function outputs some hidden fields required by the form,
	including a nonce, a unique number used to ensure the form has been submitted from the admin page
	and not somewhere else, very important for security */ ?>

	<table class="form-table"><!-- Grab a hot cup of coffee, yes we're using tables! -->

	<tr valign="top"><th scope="row"><label for="col1_header">Column One Header</label></th>
	<td>
	<textarea id="col1_header" name="sa_options[col1_header]" rows="1" cols="30"><?php echo stripslashes($settings['col1_header']); ?></textarea>
	</td>
	</tr>
	<tr valign="top"><th scope="row"><label for="col1_text">Column One Text</label></th>
	<td>
	<textarea id="col1_text" name="sa_options[col1_text]" rows="5" cols="30"><?php echo stripslashes($settings['col1_text']); ?></textarea>
	</td>
	</tr>
	
	<tr valign="top"><th scope="row"><label for="col2_header">Column Two Header</label></th>
	<td>
	<textarea id="col2_header" name="sa_options[col2_header]" rows="1" cols="30"><?php echo stripslashes($settings['col2_header']); ?></textarea>
	</td>
	</tr>
	<tr valign="top"><th scope="row"><label for="col2_text">Column Two Text</label></th>
	<td>
	<textarea id="col2_text" name="sa_options[col2_text]" rows="5" cols="30"><?php echo stripslashes($settings['col2_text']); ?></textarea>
	</td>
	</tr>
	
	<tr valign="top"><th scope="row"><label for="col3_header">Column Three Header</label></th>
	<td>
	<textarea id="col3_header" name="sa_options[col3_header]" rows="1" cols="30"><?php echo stripslashes($settings['col3_header']); ?></textarea>
	</td>
	</tr>
	<tr valign="top"><th scope="row"><label for="col3_text">Column Three Text</label></th>
	<td>
	<textarea id="col3_text" name="sa_options[col3_text]" rows="5" cols="30"><?php echo stripslashes($settings['col3_text']); ?></textarea>
	</td>
	</tr>

	</table>

	<p class="submit"><input type="submit" class="button-primary" value="Save Options" /></p>

	</form>

	</div>

	<?php
}

function sa_validate_options( $input ) {
	global $sa_options;

	$settings = get_option( 'sa_options', $sa_options );
	
	// We strip all tags from the text field, to avoid vulnerablilties like XSS
	$input['col1_text'] = wp_filter_post_kses( $input['col1_text'] );
	
	// We strip all tags from the text field, to avoid vulnerablilties like XSS
	$input['col1_header'] = wp_filter_post_kses( $input['col1_header'] );
	
	// We strip all tags from the text field, to avoid vulnerablilties like XSS
	$input['col2_header'] = wp_filter_post_kses( $input['col2_header'] );
	
	// We strip all tags from the text field, to avoid vulnerablilties like XSS
	$input['col2_text'] = wp_filter_post_kses( $input['col2_text'] );
	
	// We strip all tags from the text field, to avoid vulnerablilties like XSS
	$input['col3_header'] = wp_filter_post_kses( $input['col3_header'] );
	
	// We strip all tags from the text field, to avoid vulnerablilties like XSS
	$input['col3_text'] = wp_filter_post_kses( $input['col3_text'] );
	
	return $input;
}

endif;  // EndIf is_admin()