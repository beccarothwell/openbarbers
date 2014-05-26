<?php $ob_option = ob_get_global_options(); ?>
<div class="row blurbs">
	<div class="col-lg-4">
		<h2><?php echo $ob_option['OB_column1_header']; ?></h2>
		<img src="<?php echo $ob_option['OB_column1_image']; ?>">
		<p><?php echo $ob_option['OB_column1_blurb']; ?></p>
		<p><a class="btn btn-default" href="#" role="button">Find out more</a></p>
	</div><!-- /.col-lg-4 -->
	<div class="col-lg-4">
		<h2><?php echo $ob_option['OB_column2_header']; ?></h2>
		<img src="<?php echo $ob_option['OB_column2_image']; ?>">
		<p><?php echo $ob_option['OB_column2_blurb']; ?></p>
		<p><a class="btn btn-default" href="#" role="button">View details</a></p>
	</div><!-- /.col-lg-4 -->
	<div class="col-lg-4">
		<h2><?php echo $ob_option['OB_column3_header']; ?></h2>
		<img src="<?php echo $ob_option['OB_column3_image']; ?>">
		<p><?php echo $ob_option['OB_column3_blurb']; ?></p>
		<p><a class="btn btn-default" href="#" role="button">View details</a></p>
	</div><!-- /.col-lg-4 -->
</div>