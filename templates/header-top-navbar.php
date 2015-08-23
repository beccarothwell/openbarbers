<?php $ob_option = ob_get_global_options(); ?>
<header class="banner navbar navbar-default navbar-fixed-top" role="banner">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="btn btn-accent navbar-btn navbar-right navbar-link mobile-only">Book an appointment</button>
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
		<button type="button" class="btn btn-accent navbar-btn navbar-right navbar-link not-mobile">Book an appointment</button>
		</nav>
	</div>
</header>
