<?php $ob_option = ob_get_global_options(); ?>
<header class="banner navbar navbar-default navbar-fixed-top" role="banner">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<?php echo home_url(); ?>/"><?php 
					if ($ob_option['OB_logo'] != '') {
						echo "<img src='" . $ob_option['OB_logo'] . "'>";
					}
					else {
						bloginfo('name');
					}	
					?>
			</a>
		</div>
		<ul id="sprites" class="nav navbar-nav navbar-right">
			<li id="facebook"><a href="/"></a></li>
			<li id="twitter"><a href="/"></a></li>
			<li id="tumblr"><a href="/"></a></li>
		</ul>
		<button type="button" class="btn btn-accent navbar-btn navbar-right navbar-link">Book an appointment</button>
		<nav class="collapse navbar-collapse" role="navigation">
			<?php
			if (has_nav_menu('primary_navigation')) : wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'nav navbar-nav nav-pills nav-stacked'));
			endif;
			?>
		</nav>
	</div>
</header>
