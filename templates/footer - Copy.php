<footer class="content-info" role="contentinfo">
  <div class="container">
    <?php //dynamic_sidebar('sidebar-footer'); ?>
	<div class="footer-row">
		<div class="footer-col-first">
			<div class="fb-like-box" data-href="https://www.facebook.com/openbarbers" data-width="300" data-height="400" data-colorscheme="light" data-show-faces="true" data-header="false" data-stream="false" data-show-border="false"></div>
		</div>
		<div class="footer-col-after">
		<a class="twitter-timeline" width="300" height="400" href="https://twitter.com/OpenBarbers" data-widget-id="448482105949827072" data-chrome="noscrollbar transparent">Tweets by @OpenBarbers</a>
		</div>
	</div>
	<div class="clearfix"></div>
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
  </div>
</footer>

<?php wp_footer(); ?>
