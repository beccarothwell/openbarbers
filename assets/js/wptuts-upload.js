/*jQuery(document).ready(function($){
	$('#upload_logo_button').click(function() {
		tb_show('Upload a logo', 'media-upload.php?referer=wptuts-settings&amp;type=image&amp;TB_iframe=true&amp;post_id=0', false);
		return false;
	});
		
	window.send_to_editor = function(html) {
		var image_url = $('img',html).attr('src');
		$('#logo_url').val(image_url);
		tb_remove();
		$('#upload_logo_preview img').attr('src',image_url);
		
		$('#submit_options_form').trigger('click');
		
	};
	
});

*/

jQuery(document).ready(function($){
  var _custom_media = true,
      _orig_send_attachment = wp.media.editor.send.attachment;

  $('#upload_logo_button .button').click(function(e) {
    var send_attachment_bkp = wp.media.editor.send.attachment;
    var button = $(this);
    var id = button.attr('id').replace('_button', '');
    _custom_media = true;
    wp.media.editor.send.attachment = function(props, attachment){
      if ( _custom_media ) {
        $("#"+id).val(attachment.url);
      } else {
        return _orig_send_attachment.apply( this, [props, attachment] );
      }
    };

    wp.media.editor.open(button);
    return false;
  });

  $('.add_media').on('click', function(){
    _custom_media = false;
  });
});