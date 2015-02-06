<?php
/*
Template Name: Services Page
*/
?>
<?php while (have_posts()) : the_post(); ?>
  <?php //get_template_part('templates/page', 'header'); ?>
  
  <div class="services-col-1 taped-up">
  <h2><?php the_field('headline_one'); ?></h1>
  <?php the_field('text_one'); ?>
  </div>
  
  <div class="services-col-2 taped-up">
  <h2><?php the_field('headline_two'); ?></h1>
  <?php the_field('text_two'); ?>
  </div>
  
  <div class="services-col-3 taped-up">
  <h2><?php the_field('headline_three'); ?></h1>
  <?php the_field('text_three'); ?>
  </div>
  
  <?php //get_template_part('templates/content', 'page'); ?>
<?php endwhile; ?>
