<footer class="content-info" role="contentinfo">
<div class="container">
<?php
    /* The footer widget area is triggered if any of the areas
     * have widgets. So let's check that first.
     *
     * If none of the sidebars have widgets, then let's bail early.
     */
    if (   ! is_active_sidebar( 'first-footer-widget-area'  )
        && ! is_active_sidebar( 'second-footer-widget-area' )
        && ! is_active_sidebar( 'third-footer-widget-area'  )
        && ! is_active_sidebar( 'fourth-footer-widget-area' )
    )
        return;
 
 if (   is_active_sidebar( 'first-footer-widget-area'  )
    && is_active_sidebar( 'second-footer-widget-area' )
    && is_active_sidebar( 'third-footer-widget-area'  )
    && is_active_sidebar( 'fourth-footer-widget-area' )
) : ?>
 
<div class="footer-row">
    <div class="footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
    <div class="footer-col-two">
        <?php dynamic_sidebar( 'second-footer-widget-area' ); ?>
    </div><!-- .second .widget-area -->
 
    <div class="footer-col-three">
        <?php dynamic_sidebar( 'third-footer-widget-area' ); ?>
    </div><!-- .third .widget-area -->
 
    <div class="footer-col-four">
        <?php dynamic_sidebar( 'fourth-footer-widget-area' ); ?>
    </div><!-- .fourth .widget-area -->
</div><!-- #fatfooter -->
 
 <?php 
elseif ( is_active_sidebar( 'first-footer-widget-area'  )
    && is_active_sidebar( 'second-footer-widget-area' )
    && is_active_sidebar( 'third-footer-widget-area'  )
    && ! is_active_sidebar( 'fourth-footer-widget-area' )
) : ?>
<div class="footer-row">
    <div class="footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
    <div class="footer-col-two">
        <?php dynamic_sidebar( 'second-footer-widget-area' ); ?>
    </div><!-- .second .widget-area -->
 
    <div class="footer-col-three">
        <?php dynamic_sidebar( 'third-footer-widget-area' ); ?>
    </div><!-- .third .widget-area -->
 
</div><!-- #fatfooter -->

<?php
elseif ( is_active_sidebar( 'first-footer-widget-area'  )
    && is_active_sidebar( 'second-footer-widget-area' )
    && ! is_active_sidebar( 'third-footer-widget-area'  )
    && ! is_active_sidebar( 'fourth-footer-widget-area' )
) : ?>
<div class="footer-row">
    <div class="footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
    <div class="footer-col-two">
        <?php dynamic_sidebar( 'second-footer-widget-area' ); ?>
    </div><!-- .second .widget-area -->
 
</div><!-- #fatfooter -->

<?php
elseif ( is_active_sidebar( 'first-footer-widget-area'  )
    && ! is_active_sidebar( 'second-footer-widget-area' )
    && ! is_active_sidebar( 'third-footer-widget-area'  )
    && ! is_active_sidebar( 'fourth-footer-widget-area' )
) :
?>
<div class="footer-row">
    <div class="footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
</div><!-- #fatfooter -->

 <?php 
    //end of all sidebar checks.
    endif;?>

  <div class="container">
    <?php dynamic_sidebar('sidebar-footer'); ?>
	<div class="footer-row">
		<div class="footer-col-one">
		
		</div>
		<div class="footer-col-two">
		
		</div>
		
		<div class="footer-col-three">
		<h2>Find Us</h2>
		<p>Address: Back room at Chaps and Dames, 154 Tollington Park, London, N4 3AD</br>
		Email: openbarbers@gmail.com</p>

		<p>Telephone:</br>
		Greygory 07712090553</br>
		Felix 07920832320</br>
		</p>
		<h2>Social</h2>
		<ul id="sprites">
			<li id="facebook"><a href="/"></a></li>
			<li id="twitter"><a href="/"></a></li>
			<li id="tumblr"><a href="/"></a></li>
			<li id="instagram"><a href="/"></a></li>
			<li id="youtube"><a href="/"></a></li>
		</ul>
		</div>
	</div>
	<div class="clearfix"></div>
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
  </div>
</footer>

<?php wp_footer(); ?>
