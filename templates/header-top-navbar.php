<?php $ob_option = ob_get_global_options(); ?>
<header class="banner navbar navbar-default navbar-fixed-top" role="banner">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="<?php echo home_url(); ?>/"><?php 
					if ($ob_option['OB_logo'] != '') {
						echo "<img src='" . $ob_option['OB_logo'] . "'>";
					}
					else {
						bloginfo('name');
					}	
					?>
			</a>
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
		<nav class="collapse navbar-collapse" role="navigation">
			<?php
			if (has_nav_menu('primary_navigation')) : wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'nav navbar-nav nav-pills nav-stacked'));
			endif;
			?>
		</nav>
		<a href="https://uk.bookingbug.com/home/39254" target="_blank" role="button" type="button" class="btn btn-primary navbar-btn navbar-right">Book an appointment</a>
	</div>
</header>
