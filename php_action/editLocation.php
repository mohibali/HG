

<?php 	

require_once 'core.php';

$valid = array('success' => false, 'messages' => array());

if($_POST) {	

	$locationName = $_POST['editLocationName'];
  $locationStatus = $_POST['editLocationStatus']; 
  $locationId = $_POST['locationId'];

	$sql = "UPDATE locations SET location_name = '$locationName', location_active = '$locationStatus' WHERE location_id = '$locationId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the members";
	}
	 
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST