<?php

/**
 * Define our settings sections
 *
 * array key=$id, array value=$title in: add_settings_section( $id, $title, $callback, $page );
 * @return array
 */
function ob_options_page_sections() {
     
    $sections = array();
    // $sections[$id]       = __($title, 'ob_textdomain');
	$sections['navbar']    = __('Navbar', 'ob_textdomain');
	$sections['jumbotron']   = __('Jumbotron', 'ob_textdomain');
    $sections['column1']    = __('Column 1', 'ob_textdomain');
    $sections['column2']    = __('Column 2', 'ob_textdomain');
    $sections['column3']     = __('Column 3', 'ob_textdomain');
     
    return $sections;   
}

/**
 * Define our form fields (settings) 
 *
 * @return array
 */
function ob_options_page_fields() {
	// Navbar
	
	$options[] = array(
        "section" => "navbar",
        "id"      => OB_SHORTNAME . "_logo",
        "title"   => __( 'Image Upload', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );
	
	//Jumbotron Section
	
	$options[] = array(
        "section" => "jumbotron",
        "id"      => OB_SHORTNAME . "_jumbotron_image",
        "title"   => __( 'Image Upload', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );

    // Column One section
	
	$options[] = array(
        "section" => "column1",
        "id"      => OB_SHORTNAME . "_column1_header",
        "title"   => __( 'Header', 'ob_textdomain' ),
        "desc"    => __( 'A regular text input field. Some inline HTML (&lt;a&gt;, &lt;b&gt;, &lt;em&gt;, &lt;i&gt;, &lt;strong&gt;) is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => __('Some default value','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "column1",
        "id"      => OB_SHORTNAME . "_column1_image",
        "title"   => __( 'Image Upload', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "column1",
        "id"      => OB_SHORTNAME . "_column1_blurb",
        "title"   => __( 'Textarea - HTML OK!', 'ob_textdomain' ),
        "desc"    => __( 'A textarea for a block of text. HTML tags allowed!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain')
    );
	
	// Column Two Section
	
	$options[] = array(
        "section" => "column2",
        "id"      => OB_SHORTNAME . "_column2_header",
        "title"   => __( 'Header', 'ob_textdomain' ),
        "desc"    => __( 'A regular text input field. Some inline HTML (&lt;a&gt;, &lt;b&gt;, &lt;em&gt;, &lt;i&gt;, &lt;strong&gt;) is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => __('Some default value','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "column2",
        "id"      => OB_SHORTNAME . "_column2_image",
        "title"   => __( 'Image Upload', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "column2",
        "id"      => OB_SHORTNAME . "_column2_blurb",
        "title"   => __( 'Textarea - HTML OK!', 'ob_textdomain' ),
        "desc"    => __( 'A textarea for a block of text. HTML tags allowed!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain')
    );
	
	// Column Three Section
	
	$options[] = array(
        "section" => "column3",
        "id"      => OB_SHORTNAME . "_column3_header",
        "title"   => __( 'Header', 'ob_textdomain' ),
        "desc"    => __( 'A regular text input field. Some inline HTML (&lt;a&gt;, &lt;b&gt;, &lt;em&gt;, &lt;i&gt;, &lt;strong&gt;) is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => __('Some default value','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "column3",
        "id"      => OB_SHORTNAME . "_column3_image",
        "title"   => __( 'Image Upload', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "column3",
        "id"      => OB_SHORTNAME . "_column3_blurb",
        "title"   => __( 'Textarea - HTML OK!', 'ob_textdomain' ),
        "desc"    => __( 'A textarea for a block of text. HTML tags allowed!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain')
    );
	
	/*
	
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_txt_input",
        "title"   => __( 'Text Input - Some HTML OK!', 'ob_textdomain' ),
        "desc"    => __( 'A regular text input field. Some inline HTML (&lt;a&gt;, &lt;b&gt;, &lt;em&gt;, &lt;i&gt;, &lt;strong&gt;) is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => __('Some default value','ob_textdomain')
    );
     
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_nohtml_txt_input",
        "title"   => __( 'No HTML!', 'ob_textdomain' ),
        "desc"    => __( 'A text input field where no html input is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => __('Some default value','ob_textdomain'),
        "class"   => "nohtml"
    );
     
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_numeric_txt_input",
        "title"   => __( 'Numeric Input', 'ob_textdomain' ),
        "desc"    => __( 'A text input field where only numeric input is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => "123",
        "class"   => "numeric"
    );
     
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_multinumeric_txt_input",
        "title"   => __( 'Multinumeric Input', 'ob_textdomain' ),
        "desc"    => __( 'A text input field where only multible numeric input (i.e. comma separated numeric values) is allowed.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => "123,234,345",
        "class"   => "multinumeric"
    );
     
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_url_txt_input",
        "title"   => __( 'URL Input', 'ob_textdomain' ),
        "desc"    => __( 'A text input field which can be used for urls.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => "http://wp.tutsplus.com",
        "class"   => "url"
    );
     
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_email_txt_input",
        "title"   => __( 'Email Input', 'ob_textdomain' ),
        "desc"    => __( 'A text input field which can be used for email input.', 'ob_textdomain' ),
        "type"    => "text",
        "std"     => "email@email.com",
        "class"   => "email"
    );
     
    $options[] = array(
        "section" => "txt_section",
        "id"      => OB_SHORTNAME . "_multi_txt_input",
        "title"   => __( 'Multi-Text Inputs', 'ob_textdomain' ),
        "desc"    => __( 'A group of text input fields', 'ob_textdomain' ),
        "type"    => "multi-text",
        "choices" => array( __('Text input 1','ob_textdomain') . "|txt_input1", __('Text input 2','ob_textdomain') . "|txt_input2", __('Text input 3','ob_textdomain') . "|txt_input3", __('Text input 4','ob_textdomain') . "|txt_input4"),
        "std"     => ""
    );
     
    // Textarea Form Fields section
    $options[] = array(
        "section" => "txtarea_section",
        "id"      => OB_SHORTNAME . "_txtarea_input",
        "title"   => __( 'Textarea - HTML OK!', 'ob_textdomain' ),
        "desc"    => __( 'A textarea for a block of text. HTML tags allowed!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain')
    );
 
    $options[] = array(
        "section" => "txtarea_section",
        "id"      => OB_SHORTNAME . "_nohtml_txtarea_input",
        "title"   => __( 'No HTML!', 'ob_textdomain' ),
        "desc"    => __( 'A textarea for a block of text. No HTML!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain'),
        "class"   => "nohtml"
    );
     
    $options[] = array(
        "section" => "txtarea_section",
        "id"      => OB_SHORTNAME . "_allowlinebreaks_txtarea_input",
        "title"   => __( 'No HTML! Line breaks OK!', 'ob_textdomain' ),
        "desc"    => __( 'No HTML! Line breaks allowed!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain'),
        "class"   => "allowlinebreaks"
    );
 
    $options[] = array(
        "section" => "txtarea_section",
        "id"      => OB_SHORTNAME . "_inlinehtml_txtarea_input",
        "title"   => __( 'Some Inline HTML ONLY!', 'ob_textdomain' ),
        "desc"    => __( 'A textarea for a block of text. 
            Only some inline HTML 
            (&lt;a&gt;, &lt;b&gt;, &lt;em&gt;, &lt;strong&gt;, &lt;abbr&gt;, &lt;acronym&gt;, &lt;blockquote&gt;, &lt;cite&gt;, &lt;code&gt;, &lt;del&gt;, &lt;q&gt;, &lt;strike&gt;)  
            is allowed!', 'ob_textdomain' ),
        "type"    => "textarea",
        "std"     => __('Some default value','ob_textdomain'),
        "class"   => "inlinehtml"
    );  
     
    // Select Form Fields section
    $options[] = array(
        "section" => "select_section",
        "id"      => OB_SHORTNAME . "_select_input",
        "title"   => __( 'Select (type one)', 'ob_textdomain' ),
        "desc"    => __( 'A regular select form field', 'ob_textdomain' ),
        "type"    => "select",
        "std"    => "3",
        "choices" => array( "1", "2", "3")
    );
     
    $options[] = array(
        "section" => "select_section",
        "id"      => OB_SHORTNAME . "_select2_input",
        "title"   => __( 'Select (type two)', 'ob_textdomain' ),
        "desc"    => __( 'A select field with a label for the option and a corresponding value.', 'ob_textdomain' ),
        "type"    => "select2",
        "std"    => "",
        "choices" => array( __('Option 1','ob_textdomain') . "|opt1", __('Option 2','ob_textdomain') . "|opt2", __('Option 3','ob_textdomain') . "|opt3", __('Option 4','ob_textdomain') . "|opt4")
    );
     
    // Checkbox Form Fields section
    $options[] = array(
        "section" => "checkbox_section",
        "id"      => OB_SHORTNAME . "_checkbox_input",
        "title"   => __( 'Checkbox', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "checkbox",
        "std"     => 1 // 0 for off
    );
     
    $options[] = array(
        "section" => "checkbox_section",
        "id"      => OB_SHORTNAME . "_multicheckbox_inputs",
        "title"   => __( 'Multi-Checkbox', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "multi-checkbox",
        "std"     => '',
        "choices" => array( __('Checkbox 1','ob_textdomain') . "|chckbx1", __('Checkbox 2','ob_textdomain') . "|chckbx2", __('Checkbox 3','ob_textdomain') . "|chckbx3", __('Checkbox 4','ob_textdomain') . "|chckbx4")  
    );
	
	// Image Uploads Form Fields section
    $options[] = array(
        "section" => "imageupload_section",
        "id"      => OB_SHORTNAME . "_imageupload_input",
        "title"   => __( 'Image Upload', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "imageupload_section",
        "id"      => OB_SHORTNAME . "_imageupload_input2",
        "title"   => __( 'Image Upload Two', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );
	
	$options[] = array(
        "section" => "imageupload_section",
        "id"      => OB_SHORTNAME . "_imageupload_input3",
        "title"   => __( 'Image Upload Three', 'ob_textdomain' ),
        "desc"    => __( 'Some Description', 'ob_textdomain' ),
        "type"    => "image-uploader",
        "std"     => "http://placekitten.com/g/300/140",
		"btn"     => __('Upload Image','ob_textdomain')
    );*/
     
    return $options;    
}

/**
 * Contextual Help
 */
function ob_options_page_contextual_help() {
     
    $text   = "<h3>" . __('OB Settings - Contextual Help','ob_textdomain') . "</h3>";
    $text   .= "<p>" . __('Contextual help goes here. You may want to use different html elements to format your text as you want.','ob_textdomain') . "</p>";
     
    // return text
    return $text;
}

?>