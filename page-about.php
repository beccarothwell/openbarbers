<?php
/*
Template Name: About Page
*/
?>
<?php while (have_posts()) : the_post(); ?>
<?php //get_template_part('templates/page', 'header'); ?>
	
	<div class="row">
		<div class="about-main">
			<div class="about-row">
				<?php $image = get_field('first_image'); if( !empty($image) ): ?>
				<img class="about-image-two" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
				<?php endif; ?>
				<div class="about-text-one"><?php the_field('first_text_area'); ?></div>
			</div>
			<div class="about-row">
				<div class="about-text-two"><?php the_field('second_text_area'); ?></div>
				<?php $image = get_field('second_image'); if( !empty($image) ): ?>
				<img class="about-image-two" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
				<?php endif; ?>
			</div>
			<div class="about-row">
				<div class="about-text-three"><?php the_field('third_text_area'); ?></div>
			</div>
		</div>
		<div class="about-side">
			<div class="about-row">
				<?php $location = get_field('ob_map'); if( !empty($location) ):?>
				<div class="acf-map">
					<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
				</div>
				<?php endif; ?>
				<div class="col-sm-12"><?php the_field('sidebar_text'); ?></div>
			</div>
		</div>
	</div>
  
<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; ?>