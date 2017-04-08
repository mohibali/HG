<?php
// check user from session (by naveed)
$userId = $_SESSION['userId'];

// get user from db
$user = array(); // todo
$sql = "SELECT * FROM users WHERE user_id = $userId";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $user = $result->fetch_array();
}
// echo "<pre>";
// print_r($user);
// exit;


// check user role
$userRole = $user['role'];

// assign pages to user roles
$operaterPages = array('/stock/categories.php');

// get current page
$currentPage = $_SERVER['REQUEST_URI'];

// check access
if($userRole == 'Data Entry Operator' && in_array($currentPage, $operaterPages)) {
	header('location: /stock/dashboard.php');
}

//echo "<pre>";
//print_r($_SERVER);


// var_dump($_SESSION);
// exit;