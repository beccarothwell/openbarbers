/*############### Error messages ######################*/	
jQuery(function(){
	var error_msg = jQuery("#message p[class='setting-error-message']");
	// look for admin messages with the "setting-error-message" error class
	if (error_msg.length != 0) {
		// get the title
		var error_setting = error_msg.attr('title');
		
		// look for the label with the "for" attribute=setting title and give it an "error" class (style this in the css file!)
		jQuery("label[for='" + error_setting + "']").addClass('error');
		
		// look for the input with id=setting title and add a red border to it.
		jQuery("input[id='" + error_setting + "']").attr('style', 'border-color: red');
	}	
});

/*############### Media uploader ######################*/	

// Uploading files
/** Thanks to Thomas Griffin for his thoroughly commented example of a custom uploader on Github: https://github.com/thomasgriffin/New-Media-Image-Uploader/blob/master/js/media.js

And to Marcin Bobowski and Bainternet on Wordpress Development Stack Exchange for making this work with multiple upload fields: http://wordpress.stackexchange.com/questions/86884/3-5-media-manager-callout-in-metaboxes
*/

jQuery(document).ready(function($){
    $('.media-upload-button').click(function(e) {
        e.preventDefault();
        upload_image($(this));
        return false; 
    });
});
function upload_image(el){
    var $ = jQuery;
    var custom_uploader;
    var button = $(el);
    var id = button.attr('id').replace('_button', '');
    if (custom_uploader) {
        custom_uploader.open();
        return;
    }

    //Extend the wp.media object
    custom_uploader = wp.media.frames.file_frame = wp.media({
        title: jQuery( this ).data( 'uploader_title' ),
        button: {
            text: jQuery( this ).data( 'uploader_button_text' )
        },
        multiple: false
    });

    //When a file is selected, grab the URL and set it as the text field's value
    custom_uploader.on('select', function() {
        attachment = custom_uploader.state().get('selection').first().toJSON();
        $('#'+id).val(attachment.url);
        $('#'+id+'_preview').attr('src', attachment.url);
        //console.log(attachment);
        console.log(id);
        //custom_uploader.close();
    });

    //Open the uploader dialog
    custom_uploader.open();
}
