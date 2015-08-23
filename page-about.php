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
				<div class="about-text">
					<?php the_field('first_text_area'); ?>
				</div>
				<div class="about-image">
					<?php $image = get_field('first_image'); if( !empty($image) ): ?>
					<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" class="img-responsive"/>
				</div>
				<?php endif; ?>
			</div>
			<div class="about-row">
				<div class="about-text">
					<?php the_field('second_text_area'); ?>
				</div>
				<div class="about-image">
					<?php $image = get_field('second_image'); if( !empty($image) ): ?>
					<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" class="img-responsive"/>
				</div>
				<?php endif; ?>
			</div>
			<div class="about-row">
				<div class="about-text-three">
					<?php the_field('third_text_area'); ?>
				</div>
			</div>
		</div>
		<div class="about-side">
				<?php $location = get_field('ob_map'); if( !empty($location) ):?>
				<div class="acf-map">
					<div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
				</div>
				<?php endif; ?>
				<div><?php the_field('sidebar_text'); ?></div>
		</div>
	</div>
  
<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; ?>