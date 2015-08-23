<?php
/*
Template Name: Accessibility Page
*/
?>
<?php while (have_posts()) : the_post(); ?>
  <?php //get_template_part('templates/page', 'header'); ?>
  <div class="accessibility-main">
	<?php get_template_part('templates/content', 'page'); ?>
	</div>
<?php endwhile; ?>