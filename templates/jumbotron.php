<?php $ob_option = ob_get_global_options(); ?>
<div class="jumbotron" style="background-image:url('<?php echo $ob_option['OB_jumbotron_image']; ?>');">
	<!--<img src="<?php echo $ob_option['OB_jumbotron_image']; ?>" class="img-responsive">-->
	<div class="container">
		<img src="<?php echo $ob_option['OB_jumbotron_logo']; ?>" class="img-responsive">
		<!--<h1>Open Barbers</h1>-->
		<p>Hairdressing for all genders and sexualities.</p>
		<p><a class="btn btn-primary btn-lg" role="button">Book an appointment</a></p>
	</div>
</div>