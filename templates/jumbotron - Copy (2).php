<?php $ob_option = ob_get_global_options(); ?>
<div class="jumbotron" style="background-image:url('<?php the_field('jumbotron_image'); ?>');">
	<div class="container">
		<div class="jumbotron-content">
			<img src="<?php the_field('jumbotron_logo'); ?>" class="img-responsive">
			
			<a class="btn btn-primary btn-lg" role="button" href="<?php the_field('jumbotron_button_url'); ?>" target="_blank"><?php the_field('jumbotron_button_text'); ?></a>
		</div>
		<div class="jumbotron-strapline">
			<p><?php the_field('jumbotron_strapline'); ?></p>
		</div>
	</div>
</div>