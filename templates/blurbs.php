<?php $ob_option = ob_get_global_options(); ?>
<div class="blurbs">
	<div class="blurb-col-one">
		<h2><?php the_field('column_one_header'); ?></h2>
		<div class="blurb-img">
			<img src="<?php the_field('column_one_image'); ?>" class="img-responsive">
		</div>
		<p><?php the_field('column_one_text'); ?></p>
		<p><a class="btn btn-default" href="<?php the_field('column_one_button_url'); ?>" role="button"><?php the_field('column_one_button_text'); ?></a></p>
	</div><!-- /.col-lg-4 -->
	<div class="blurb-col-two">
		<h2><?php the_field('column_two_header'); ?></h2>
		<div class="blurb-img">
			<img src="<?php the_field('column_two_image'); ?>" class="img-responsive">
		</div>
		<p><?php the_field('column_two_text'); ?></p>
		<p><a class="btn btn-default" href="<?php the_field('column_two_button_url'); ?>" role="button"><?php the_field('column_two_button_text'); ?></a></p>
	</div><!-- /.col-lg-4 -->
</div>
<div class="blurbs">
	<div class="blurb-col-one">
		<h2><?php the_field('column_three_header'); ?></h2>
		<div class="blurb-img">
			<img src="<?php the_field('column_three_image'); ?>" class="img-responsive">
		</div>
		<p><?php the_field('column_three_text'); ?></p>
		<p><a class="btn btn-default" href="<?php the_field('column_three_button_url'); ?>" role="button"><?php the_field('column_three_button_text'); ?></a></p>
	</div><!-- /.col-lg-4 -->
	<div class="blurb-col-two">
		<h2><?php the_field('column_four_header'); ?></h2>
		<div class="blurb-img">
			<img src="<?php the_field('column_four_image'); ?>" class="img-responsive">
		</div>
		<p><?php the_field('column_four_text'); ?></p>
		<p><a class="btn btn-default" href="<?php the_field('column_four_button_url'); ?>" role="button"><?php the_field('column_four_button_text'); ?></a></p>
	</div><!-- /.col-lg-4 -->
</div>