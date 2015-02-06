/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages	
	/*$(function(){
		$('.navbar').data('size','big');
	});

	$(window).scroll(function(){
		if($(document).scrollTop() > 0) {
			if($('.navbar').data('size') === 'big') {
				$('.navbar').data('size','small');
				$('.navbar').stop().animate({
					height:'50px'
				},600);
			}
		}
		else {
			if($('.navbar').data('size') === 'small') {
				$('.navbar').data('size','big');
				$('.navbar').stop().animate({
					height:'100px'
				},600);
			}
		}
	});*/
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
    }
  },
  // About page
  about: {
    init: function() {
	  // JavaScript to be fired on the about page
    }
  },
  gallery: {
    init: function() {
	  // JavaScript to be fired on the gallery page
	    /*$(document).ready(function(){
	        $('img').on('click',function(){
		        var src = $(this).attr('src');
			    var img = '<img src="' + src + '" class="img-responsive"/>';
			    $('#myModal').modal();
			    $('#myModal').on('shown.bs.modal', function(){
			        $('#myModal .modal-body').html(img);
			    });
		    $('#myModal').on('hidden.bs.modal', function(){
			    $('#myModal .modal-body').html('');
			});
			});
		});*/
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
