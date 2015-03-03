<?php
	header('Content-type: application/json');
	$status = array(
		'type'=>'success',
		'message'=>'Dziękujemy za kontakt z nami  :) '
	);
    $name = @trim(stripslashes($_GET['name'])); 
    $email = @trim(stripslashes($_GET['email'])); 
	$message = @trim(stripslashes($_GET['message'])); 
	$subject = 'Wiadomość ze strony weselnej';
	
    $email_to = 'lukasz.osiadly@gmail.com';//replace with your email

    $body = 'Name: ' . $name . "\n\n" . 'Email: ' . $email . "\n\n". 'Message: ' . $message;

    $success = @mail($email_to, $subject, $body, 'From: <'.$email.'>');

    echo json_encode($status);
    die;