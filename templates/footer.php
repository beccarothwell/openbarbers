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
    <div class="footer-col footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
    <div class="footer-col footer-col-two">
        <?php dynamic_sidebar( 'second-footer-widget-area' ); ?>
    </div><!-- .second .widget-area -->
 
    <div class="footer-col footer-col-three">
        <?php dynamic_sidebar( 'third-footer-widget-area' ); ?>
    </div><!-- .third .widget-area -->
 
    <div class="footer-col footer-col-four">
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
    <div class="footer-col footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
    <div class="footer-col footer-col-two">
        <?php dynamic_sidebar( 'second-footer-widget-area' ); ?>
    </div><!-- .second .widget-area -->
 
    <div class="footer-col footer-col-three">
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
    <div class="footer-col footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
    <div class="footer-col footer-col-two">
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
    <div class="footer-col footer-col-one">
        <?php dynamic_sidebar( 'first-footer-widget-area' ); ?>
    </div><!-- .first .widget-area -->
 
</div><!-- #fatfooter -->

 <?php 
    //end of all sidebar checks.
    endif;?>

	<div class="clearfix"></div>
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
  </div>
</footer>

<?php wp_footer(); ?>
